var FFmpeg = require('fluent-ffmpeg');

function convertFile(file, opts) {
  // const file = '/Users/joshua/Downloads/deadmau5 ft Kat Von D - Ghosts N Luv N Stuff (MASHUP).webm';
  opts = Object.assign({}, opts);

  const { bitrate, quality, frequency } = opts;
  const datetime = new Date();
  const command =
    new FFmpeg({
      source: file,
      timeout: 0
    })

    // .withAudioCodec('libmp3lame')

    .withAudioBitrate(bitrate || 320)

    // .withAudioChannels(2)

    .withAudioFrequency(frequency || 44100)

    .withAudioQuality(quality || 5)

    .toFormat('mp3')

    .on('start', function (commandLine)

      {
        console.log(datetime + " DEBUG: " + "Audio Extraction Started");
      })

    .on('error', function (err, stdout, stderr)

      {
        console.log(datetime + " DEBUG: " + "Audio Extraction Failed.");
        console.log(err);
      })

    .on('progress', function (progress)

      {
        console.log(datetime + " DEBUG: " + "Audio Extraction Percentage ..." + progress.percent);
      })

    .on('end', function ()

      {
        console.log(datetime + " DEBUG: " + "Audio Extraction Ended");
      })

    .saveToFile("/Users/joshua/Downloads/test.mp3");
}

module.exports = {
  convertFile
};
