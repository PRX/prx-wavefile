/**
* WaveFile: https://github.com/rochars/wavefile
* Copyright (c) 2017-2018 Rafael da Silva Rocha. MIT License.
*
* Tests for sample rate conversion, sinc method.
* 
*/

const assert = require('assert');
const fs = require("fs");
const WaveFile = require("../../test/loader.js");
const path = "./test/files/";

console.log('sinc');

// Test file integrity

describe('Upsample a 16bit 8kHz file', function() {
  
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "16-bit-8kHz-noBext-mono.wav"));

  // Convert to another sample rate
  wav.toSampleRate(16000, {method: 'sinc', clip: 'clamp'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-16-bit-16001kHz-noBext-mono.wav",
    wav.toBuffer());

  // Read the written 16kHz file 
  let wav2 = new WaveFile(
    fs.readFileSync(
      path +"/out/to-sample-rate/sinc-16-bit-16001kHz-noBext-mono.wav"));

  // Check the attributes of the resampled file
  it("chunkId should be 'RIFF'", function() {
    assert.equal(wav2.container, "RIFF");
  });
  it("fmtChunkId should be 'fmt '", function() {
    assert.equal(wav2.fmt.chunkId, "fmt ");
  });
  it("format should be 'WAVE'", function() {
    assert.equal(wav2.format, "WAVE");
  });
  it("fmtChunkSize should be 16", function() {
    assert.equal(wav2.fmt.chunkSize, 16);
  });
  it("audioFormat should be 1 (PCM)", function() {
    assert.equal(wav2.fmt.audioFormat, 1);
  });
  it("numChannels should be 1", function() {
    assert.equal(wav2.fmt.numChannels, 1);
  });
  it("sampleRate should be 16000", function() {
    assert.equal(wav2.fmt.sampleRate, 16000);
  });
  it("byteRate should be 32000", function() {
    assert.equal(wav2.fmt.byteRate, 32000);
  });
  it("blockAlign should be 2", function() {
    assert.equal(wav2.fmt.blockAlign, 2);
  });
  it("bitsPerSample should be 16", function() {
    assert.equal(wav2.fmt.bitsPerSample, 16);
  });
  it("dataChunkId should be 'data'", function() {
    assert.equal(wav2.data.chunkId, 'data');
  });
  it("dataChunkSize should be > 0", function() {
    assert.ok(wav2.data.chunkSize > 0);
  });
  it("samples.length should be > 0", function() {
    assert.ok(wav2.data.samples.length > 0);
  });
});

// Chirps, FP

describe('Downsample a 32-bit 44.1kHz log sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "32fp-44100Hz-mono-chirp-1-22050-log.wav"));

  // Convert to another sample rate
  wav.toSampleRate(16000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-32fp-16000Hz-mono-chirp-1-22050-log.wav",
    wav.toBuffer());
});

describe('Upsample a 32-bit 44.1kHz log sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "32fp-44100Hz-mono-chirp-1-22050-log.wav"));

  // Convert to another sample rate
  wav.toSampleRate(96000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-32fp-96000Hz-mono-chirp-1-22050-log.wav",
    wav.toBuffer());
});

describe('Downsample a 32-bit 44.1kHz linear sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "32fp-44100Hz-mono-chirp-1-22050-linear.wav"));

  // Convert to another sample rate
  wav.toSampleRate(16000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-32fp-16000Hz-mono-chirp-1-22050-linear.wav",
    wav.toBuffer());
});

describe('Upsample a 32-bit 44.1kHz linear sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "32fp-44100Hz-mono-chirp-1-22050-linear.wav"));

  // Convert to another sample rate
  wav.toSampleRate(96000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-32fp-96000Hz-mono-chirp-1-22050-linear.wav",
    wav.toBuffer());
});

// Chirps, int

describe('Downsample a 16-bit 44.1kHz log sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "16bit-44100Hz-mono-chirp-1-22050-log.wav"));

  // Convert to another sample rate
  wav.toSampleRate(16000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-16bit-16000Hz-mono-chirp-1-22050-log.wav",
    wav.toBuffer());
});

describe('Upsample a 16-bit 44.1kHz log sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "16bit-44100Hz-mono-chirp-1-22050-log.wav"));

  // Convert to another sample rate
  wav.toSampleRate(96000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-16bit-96000Hz-mono-chirp-1-22050-log.wav",
    wav.toBuffer());
});

describe('Downsample a 16-bit 44.1kHz linear sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "16bit-44100Hz-mono-chirp-1-22050-linear.wav"));

  // Convert to another sample rate
  wav.toSampleRate(16000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-16bit-16000Hz-mono-chirp-1-22050-linear.wav",
    wav.toBuffer());
});

describe('Upsample a 16-bit 44.1kHz linear sine sweep', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "16bit-44100Hz-mono-chirp-1-22050-linear.wav"));

  // Convert to another sample rate
  wav.toSampleRate(96000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-16bit-96000Hz-mono-chirp-1-22050-linear.wav",
    wav.toBuffer());
});

// Songs

describe('Downsample a 16bit 44.1kHz file', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "song1.wav"));

  // Convert to another sample rate
  wav.toSampleRate(16000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-song1-16kHz.wav",
    wav.toBuffer());
});

describe('Upsample a 16bit 44.1kHz file', function() {
  // Read a 8kHz wav 
  let wav = new WaveFile(
    fs.readFileSync(path + "song1.wav"));

  // Convert to another sample rate
  wav.toSampleRate(96000, {method: 'sinc'});

  // Write the file
  fs.writeFileSync(
    path + "/out/to-sample-rate/sinc-song1-96kHz.wav",
    wav.toBuffer());
});
