// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

const filename = './jestem_damian.l.flac';
// const gcsUri = 'gs://my-bucket/audio.raw';
const encoding = 'FLAC';
const sampleRateHertz = 44100;
const languageCode = 'pl-PL';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
  // uri: gcsUri
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: `, transcription);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });