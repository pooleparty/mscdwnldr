var fs = require('fs');
var youtubedl = require('youtube-dl');
const log = require('../log');

// var video = youtubedl(url,
//   // Optional arguments passed to youtube-dl.
//   ['--format=18'],
//   // Additional options can be given for calling `child_process.execFile()`.
//   { cwd: __dirname });

// // Will be called when the download starts.
// video.on('info', function(info) {
//   console.log('Download started');
//   console.log(info);
// });

// video.pipe(fs.createWriteStream('bad_at_titles.mp4'));

// youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function exec(err, output) {
//     if (err) {
//         throw err;
//     }
//     console.log(output.join('\n'));
// });

function getInfo(url, callback) {
    log(`Getting youtube info for ${url}`);
    
    youtubedl.getInfo(url, (err, info) => {
        if (err) {
            return callback(err);
        }

        log(info);

        callback(null, info);
    });
}

module.exports = {
    getInfo
};