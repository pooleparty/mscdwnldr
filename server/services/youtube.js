const fs = require('fs');
const url = require('url');
const path = require('path');
const _ = require('lodash');
const uuid = require('uuid/v4');
const ytdl = require('ytdl-core');
const google = require('googleapis');
const NodeCache = require('node-cache');
const log = require('../log');
const config = require('../../config');

const youtubeClient = google.youtube('v3');
const cache = new NodeCache({
    stdTTL: 600 // in seconds
});

// youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function exec(err, output) {
//     if (err) {
//         throw err;
//     }
//     console.log(output.join('\n'));
// });

function getInfo(videoUrl, callback) {
    log(`Getting youtube info for ${videoUrl}`);

    // check to see if url is a playlist
    const parsedUrl = url.parse(videoUrl, true);
    if (parsedUrl.query && parsedUrl.query.list) {
        return getPlaylistItems(parsedUrl.query.list, callback);
    }

    const cachedVideoInfo = cache.get(videoUrl);
    if (cachedVideoInfo) {
        console.log(`Found cached video info ${videoUrl}`);
        return callback(null, {
            info: cachedVideoInfo
        });
    }

    ytdl.getInfo(videoUrl, function (err, info) {
        if (err) {
            return callback(err);
        }

        cache.set(videoUrl, info);

        // info.formats = ytdl.filterFormats(info.formats, 'audioonly');

        callback(null, {
            info
        });
    });
}

function getPlaylistItems(playlistId, callback) {
    console.log(`Getting youtube playlist info for playlist ${playlistId}`);

    const cachedPlaylist = cache.get(playlistId);
    if (cachedPlaylist) {
        console.log(`Found cached playlist info ${playlistId}`);
        return callback(null, Object.assign({ isPlaylist: true }, cachedPlaylist));
    }

    youtubeClient.playlistItems.list({
        key: config.YOUTUBE_API_KEY,
        part: 'snippet',
        maxResults: 50,
        fields: 'items(snippet(playlistId,resourceId,thumbnails,title)),nextPageToken,pageInfo,prevPageToken',
        playlistId
    }, (err, response) => {
        if (!err) {
            cache.set(playlistId, response);
        }
        callback(err, Object.assign({ isPlaylist: true }, response));
    });
}

function download(url, args, startCallback, progressCallback, doneCallback) {
    try {
        const downloadId = uuid();

        if (url.toLowerCase().startsWith('test')) {
            testDownload(url, downloadId, startCallback, progressCallback, doneCallback);
            return;
        }

        const video = ytdl(url,
            // Optional arguments passed to youtube-dl.
            args);

        let videoInfo;
        video.on('info', function (info, format) {
            videoInfo = info;
            log('Got video info');
            var file = path.join(config.DEFAULT_DOWNLOAD_PATH, `${info.title}.${format.container}`);
            video.pipe(fs.createWriteStream(file));

            if (_.isFunction(startCallback)) {
                startCallback.call(null, {
                    downloadId,
                    videoInfo,
                    format
                });
            }
        });

        video.on('response', function (response) {
            // log(response);
        });

        let lastPercent = 0;
        video.on('progress', function data(chunkLength, downloaded, downloadLength) {
            if (downloadLength) {
                var percent = (downloaded / downloadLength * 100).toFixed(2);
                try {
                    process.stdout.cursorTo(0);
                    process.stdout.clearLine(1);
                    process.stdout.write(percent + '%');
                } catch (e) {

                }

                if (percent - lastPercent >= 10) {
                    lastPercent = percent;
                    if (_.isFunction(progressCallback)) {
                        progressCallback.call(null, {
                            downloadId,
                            videoInfo,
                            percent
                        });
                    }
                }
            }
        });

        video.on('end', function end() {
            console.log('\nDone');
            doneCallback.call(null, null, {
                downloadId,
                videoInfo
            });
        });
    } catch (e) {
        doneCallback.call(null, e);
    }
}

const TEST_PROGRESS_INTERVAL = 30;
const TEST_PROGRESS_TIMEOUT_INTERVAL = 1000;

function testDownload(url, downloadId, startCallback, progressCallback, doneCallback) {
    console.log('Testing download');
    const videoInfo = {
        title: `test-${downloadId}`
    };

    if (_.isFunction(startCallback)) {
        startCallback.call(null, {
            downloadId,
            videoInfo
        });
    }

    let progress = 0;

    function testProgress() {
        progress += Math.ceil(Math.random() * TEST_PROGRESS_INTERVAL);

        if (progress >= 100) {
            console.log('\nTest Done');
            doneCallback.call(null, null, {
                downloadId,
                videoInfo
            });
            return;
        }

        if (_.isFunction(progressCallback)) {
            console.log(`Testing download progress: ${progress}`);
            progressCallback.call(null, {
                downloadId,
                videoInfo,
                percent: progress
            });
        }

        setTimeout(testProgress, TEST_PROGRESS_TIMEOUT_INTERVAL);
    }

    setTimeout(testProgress, TEST_PROGRESS_TIMEOUT_INTERVAL);
}

module.exports = {
    getInfo,
    download
};
