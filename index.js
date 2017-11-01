/*!
 * Wavefile
 * Read wave files with 4, 8, 16, 24, 32 PCM, 32 IEEE & 64-bit data.
 * Copyright (c) 2017 Rafael da Silva Rocha. MIT License.
 * https://github.com/rochars/wavefile
 * 
 */

const byteData = require("byte-data");

const unsupportedFormatError = "Not a supported format.";
const noWAVEChunkError = "Could not find the 'WAVE' chunk";
const noFmtChunkError = "Could not find the 'fmt ' chunk";
const noDataChunkError = "Could not find the 'data' chunk";

/*
 * A wave file.
 * Objects can be created by passing a Uint8Array
 * representing a wave file.
 */
class Wavefile {

    /**
     * @param {Uint8Array} wavBytes an array representing the wave file.
     */
    constructor(wavBytes) {
        /** @type {string} */
        this.chunkId = ""; // "RIFF"
        /** @type {number} */
        this.chunkSize = 0;
        /** @type {string} */
        this.subChunk1Id = ""; // "WAVE"
        /** @type {string} */
        this.format = ""; // "fmt "
        /** @type {number} */
        this.subChunk1Size = 0;
        /** @type {number} */
        this.audioFormat = 0;
        /** @type {number} */
        this.numChannels = 0;
        /** @type {number} */
        this.sampleRate = 0;
        /** @type {number} */
        this.byteRate = 0;
        /** @type {number} */
        this.blockAlign = 0;
        /** @type {number} */
        this.bitsPerSample = 0;
        /** @type {string} */
        this.subChunk2Id = ""; // "data"
        /** @type {number} */
        this.subChunk2Size = 0;
        /** @type {!Array<number>} */
        this.samples = [];
        /** @type {string} */
        this.bitDepth_ = "";
        if(wavBytes) {
            this.readRIFFChunk_(wavBytes);
            this.readWAVEChunk_(wavBytes);
            this.readFmtChunk_(wavBytes);
            this.readDataChunk_(wavBytes);
        }
    }

    /**
     * Read the RIFF chunk a wave file.
     * @param {Uint8Array} bytes an array representing the wave file.
     * @throws {Error} If no "RIFF" chunk is found.
     */
    readRIFFChunk_(bytes) {
        this.chunkId = byteData.stringFromBytes(bytes.slice(0, 4));
        if (this.chunkId != "RIFF") {
            throw Error(unsupportedFormatError);
        }
        this.chunkSize = byteData.intFrom4Bytes(
            bytes.slice(4, 8))[0];
    }

    /**
     * Read the WAVE chunk of a wave file.
     * @param {Uint8Array} bytes an array representing the wave file.
     * @throws {Error} If no "WAVE" chunk is found.
     */
    readWAVEChunk_(bytes) {
        let start = byteData.findString(bytes, "WAVE");
        if (start === -1) {
            throw Error(noWAVEChunkError);
        }
        this.subChunk1Id = byteData.stringFromBytes(
                bytes.slice(start, start + 4));
    }

    /**
     * Read the "fmt " chunk of a wave file.
     * @param {Uint8Array} bytes an array representing the wave file.
     * @throws {Error} If no "fmt " chunk is found.
     */
    readFmtChunk_(bytes) {
        let start = byteData.findString(bytes, "fmt ");
        if (start === -1) {
            throw Error(noFmtChunkError);
        }
        this.format = byteData.stringFromBytes(
            bytes.slice(start, start + 4));
        this.subChunk1Size = byteData.uIntFrom4Bytes(
            bytes.slice(start + 4, start + 8))[0];
        this.audioFormat = byteData.intFrom2Bytes(
            bytes.slice(start + 8, start + 10))[0];
        this.numChannels = byteData.uIntFrom2Bytes(
            bytes.slice(start + 10, start + 12))[0];
        this.sampleRate = byteData.uIntFrom4Bytes(
            bytes.slice(start + 12, start + 16))[0];
        this.byteRate = byteData.uIntFrom4Bytes(
            bytes.slice(start + 16, start + 20))[0];
        this.blockAlign = byteData.uIntFrom2Bytes(
            bytes.slice(start + 20, start + 22))[0];
        this.bitsPerSample = byteData.uIntFrom2Bytes(
            bytes.slice(start + 22, start + 24))[0];
        // The bitDepth_ is used internally to determine
        // wich function use to read the samples
        if (this.audioFormat == 3 && this.bitsPerSample == 32) {
            this.bitDepth_ = "32f";
        }else {
            this.bitDepth_ = this.bitsPerSample.toString();
        }
    }

    /**
     * Read the "data" chunk of a wave file.
     * @param {Uint8Array} bytes an array representing the wave file.
     * @throws {Error} If no "data" chunk is found.
     */
    readDataChunk_(bytes) {
        let start = byteData.findString(bytes, "data");
        if (start === -1) {
            throw Error(noDataChunkError);
        }
        this.subChunk2Id = byteData.stringFromBytes(
            bytes.slice(start, start + 4));
        this.subChunk2Size = byteData.intFrom4Bytes(
            bytes.slice(start + 4, start + 8))[0];
        this.readSamples_(bytes, start);
    }

    /**
     * Find and return the start offset of the data chunk on a wave file.
     * @param {Uint8Array} bytes Array of bytes representing the wave file.
     * @param {number} start The offset to start reading.
     */
    readSamples_(bytes, start) {
        let readingFunctions_ = {
            '4': byteData.intFrom1Byte,
            '8': byteData.uIntFrom1Byte,
            '16': byteData.intFrom2Bytes,
            '24': byteData.intFrom3Bytes,
            '32': byteData.intFrom4Bytes,
            '32f': byteData.floatFrom4Bytes,
            '64' : byteData.floatFrom8Bytes
        };
        this.samples = readingFunctions_[this.bitDepth_](
                bytes.slice(
                        start + 8,
                        start + 8 + this.subChunk2Size
                    )
            );
    }
}

module.exports.Wavefile = Wavefile;
