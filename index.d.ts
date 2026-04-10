// Type definitions for wavefile 11.0
// Project: https://github.com/PRX/prx-wavefile
// Definitions by: Rafael da Silva Rocha <https://github.com/rochars>

export class WaveFile {
    /**
     * The bit depth code according to the samples.
     */
    bitDepth: string;
    /**
     * The container identifier.
     * 'RIFF', 'RIFX' and 'RF64' are supported.
     */
    container: 'RIFF' | 'RIFX' | 'RF64';
    chunkSize: number;
    /**
     * The format.
     * Always 'WAVE'.
     */
    format: 'WAVE';
    /**
     * The data of the 'fmt' chunk.
     */
    fmt: WaveFileFmtChunk;
    /**
     * The data of the 'fact' chunk.
     */
    fact: WaveFileFactChunk;
    /**
     * The data of the 'cue ' chunk.
     */
    cue: WaveFileCueChunk;
    /**
     * The data of the 'smpl' chunk.
     */
    smpl: WaveFileSmplChunk;
    /**
     * The data of the 'bext' chunk.
     */
    bext: WaveFileBextChunk;
    /**
     * The data of the 'mext' chunk.
     */
    mext: WaveFileMextChunk;
    /**
     * The data of the 'cart' chunk.
     */
    cart: WaveFileCartChunk;
    /**
     * The data of the 'iXML' chunk.
     */
    iXML: WaveFileIXMLChunk;
    /**
     * The data of the 'ds64' chunk.
     * Used only with RF64 files.
     */
    ds64: WaveFileDs64Chunk;
    /**
     * The data of the 'data' chunk.
     */
    data: WaveFileDataChunk;
    /**
     * The data of the 'LIST' chunks.
     */
    LIST: WaveFileLISTChunk[];
    /**
     * The data of the 'junk' chunk.
     */
    junk: WaveFileJunkChunk;
    /**
     * The data of the '_PMX' chunk.
     */
    _PMX: WaveFilePMXChunk;
    /**
     * Whether to apply a pad byte or not.
     * Defaults to true.
     */
     padBytes: boolean;

    /**
     * @param wavBuffer A wave file buffer.
     * @throws {Error} If no 'RIFF' chunk is found.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @throws {Error} If no 'data' chunk is found.
     */
    constructor(wavBuffer?: Uint8Array);

    /**
     * Return the samples packed in a Float64Array.
     * @param interleaved True to return interleaved samples,
     *   false to return the samples de-interleaved.
     * @param OutputObject The sample container.
     * @return The samples.
     */
    getSamples(interleaved?: boolean, OutputObject?: Function): Float64Array;

    /**
     * Return the sample at a given index.
     * @param index The sample index.
     * @return The sample.
     * @throws {Error} If the sample index is off range.
     */
    getSample(index: number): number;

    /**
     * Set the sample at a given index.
     * @param index The sample index.
     * @param sample The sample.
     * @throws {Error} If the sample index is off range.
     */
    setSample(index: number, sample: number): void;

    /**
     * Set up the WaveFileCreator object based on the arguments passed.
     * Existing chunks are reset.
     * @param numChannels The number of channels.
     * @param sampleRate The sample rate.
     *    Integers like 8000, 44100, 48000, 96000, 192000.
     * @param bitDepthCode The audio bit depth code.
     *    One of '4', '8', '8a', '8m', '16', '24', '32', '32f', '64'
     *    or any value between '8' and '32' (like '12').
     * @param samples The samples.
     * @param options Optional. Used to force the container
     *    as RIFX with {'container': 'RIFX'}
     * @throws {Error} If any argument does not meet the criteria.
     */
    fromScratch(
      numChannels: number,
      sampleRate: number,
      bitDepthCode: string,
      samples:
        | Array<number>
        | Array<Array<number>>
        | ArrayLike<any>
        | Array<ArrayLike<any>>,
      options?: object
    ): void;

    /**
     * Set up the WaveFileCreator object from an mpeg buffer and/or optional info.
     * @param mpegBuffer The buffer.
     * @param info Optional Mpeg info such as version, layer, etc.
     * @throws {Error} If the mpeg file cannot be parsed
     */
    fromMpeg(mpegBuffer: Uint8Array, info?: object): void;

    /**
     * Set up the WaveFileParser object from a byte buffer.
     * @param bytes The buffer.
     * @param samples True if the samples should be loaded.
     * @throws {Error} If container is not RIFF, RIFX or RF64.
     * @throws {Error} If format is not WAVE.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @throws {Error} If no 'data' chunk is found.
     */
    fromBuffer(bytes: Uint8Array, samples?: boolean): void;

    /**
     * Return a byte buffer representig the WaveFileParser object as a .wav file.
     * The return value of this method can be written straight to disk.
     * @return A wav file.
     * @throws {Error} If bit depth is invalid.
     * @throws {Error} If the number of channels is invalid.
     * @throws {Error} If the sample rate is invalid.
     */
    toBuffer(): Uint8Array;

    /**
     * Use a .wav file encoded as a base64 string to load the WaveFile object.
     * @param base64String A .wav file as a base64 string.
     * @throws {Error} If any property of the object appears invalid.
     */
    fromBase64(base64String: string): void;

    /**
     * Return a base64 string representig the WaveFile object as a .wav file.
     * @return A .wav file as a base64 string.
     * @throws {Error} If any property of the object appears invalid.
     */
    toBase64(): string;

    /**
     * Return a DataURI string representig the WaveFile object as a .wav file.
     * The return of this method can be used to load the audio in browsers.
     * @return A .wav file as a DataURI.
     * @throws {Error} If any property of the object appears invalid.
     */
    toDataURI(): string;

    /**
     * Use a .wav file encoded as a DataURI to load the WaveFile object.
     * @param dataURI A .wav file as DataURI.
     * @throws {Error} If any property of the object appears invalid.
     */
    fromDataURI(dataURI: string): void;

    /**
     * Force a file as RIFF.
     */
    toRIFF(): void;

    /**
     * Force a file as RIFX.
     */
    toRIFX(): void;

    /**
     * Change the bit depth of the samples.
     * @param newBitDepth The new bit depth of the samples.
     *    One of '8' ... '32' (integers), '32f' or '64' (floats)
     * @param changeResolution A boolean indicating if the
     *    resolution of samples should be actually changed or not.
     * @throws {Error} If the bit depth is not valid.
     */
    toBitDepth(newBitDepth: string, changeResolution?: boolean): void;

    /**
     * Convert the sample rate of the file.
     * @param sampleRate The target sample rate.
     * @param options The extra configuration, if needed.
     */
    toSampleRate(sampleRate: number, options?: object): void;

    /**
     * Encode a 16-bit wave file as 4-bit IMA ADPCM.
     * @throws {Error} If sample rate is not 8000.
     * @throws {Error} If number of channels is not 1.
     */
    toIMAADPCM(): void;

    /**
     * Decode a 4-bit IMA ADPCM wave file as a 16-bit wave file.
     * @param bitDepthCode The new bit depth of the samples.
     *  One of '8' ... '32' (integers), '32f' or '64' (floats).
     */
    fromIMAADPCM(bitDepthCode?: string): void;

    /**
     * Encode a 16-bit wave file as 8-bit A-Law.
     */
    toALaw(): void;

    /**
     * Decode a 8-bit A-Law wave file into a 16-bit wave file.
     * @param bitDepthCode The new bit depth of the samples.
     *  One of '8' ... '32' (integers), '32f' or '64' (floats).
     */
    fromALaw(bitDepthCode?: string): void;

    /**
     * Encode 16-bit wave file as 8-bit mu-Law.
     */
    toMuLaw(): void;

    /**
     * Decode a 8-bit mu-Law wave file into a 16-bit wave file.
     * @param bitDepthCode The new bit depth of the samples.
     *  One of '8' ... '32' (integers), '32f' or '64' (floats).
     */
    fromMuLaw(bitDepthCode?: string): void;

    /**
     * Write a RIFF tag in the INFO chunk. If the tag do not exist,
     * then it is created. It if exists, it is overwritten.
     * @param tag The tag name.
     * @param value The tag value.
     * @throws {Error} If the tag name is not valid.
     */
    setTag(tag: string, value: string): void;

    /**
     * Return the value of a RIFF tag in the INFO chunk.
     * @param tag The tag name.
     * @return The value if the tag is found, null otherwise.
     */
    getTag(tag: string): string | null;

    /**
     * Return a Object<tag, value> with the RIFF tags in the file.
     * @return The file tags.
     */
    listTags(): Record<string, string>;

    /**
     * Remove a RIFF tag in the INFO chunk.
     * @param tag The tag name.
     * @return True if a tag was deleted.
     */
    deleteTag(tag: string): boolean;

    /**
     * Create a cue point in the wave file.
     * @param pointData The data of the cue point.
     */
    setCuePoint(pointData: CuePointInput): void;

    /**
     * Remove a cue point from a wave file.
     * @param index the index of the point. First is 1,
     *  second is 2, and so on.
     */
    deleteCuePoint(index: number): void;

    /**
     * Return an array with all cue points in the file, in the order they appear
     * in the file.
     */
    listCuePoints(): CuePointOutput[];

    /**
     * Update the label of a cue point.
     * @param pointIndex The ID of the cue point.
     * @param label The new text for the label.
     */
    updateLabel(pointIndex: number, label: string): void;

    /**
     * Set the value of the iXML chunk.
     * @param iXMLValue The value for the iXML chunk.
     * @throws {TypeError} If the value is not a string.
     */
    setiXML(iXMLValue: string): void;

    /**
     * Return the value of the iXML chunk.
     * @return The contents of the iXML chunk.
     */
    getiXML(): string;

    /**
     * Set the value of the _PMX chunk.
     * @param _PMXValue The value for the _PMX chunk.
     * @throws {TypeError} If the value is not a string.
     */
    set_PMX(_PMXValue: string): void;

    /**
     * Get the value of the _PMX chunk.
     * @return The contents of the _PMX chunk.
     */
    get_PMX(): string;
}

export type WaveFileDataChunk = {
    chunkId: string;
    chunkSize: number;
    samples: Uint8Array;
};

export type WaveFileFmtChunk = {
    chunkId: string;
    chunkSize: number;
    audioFormat: number;
    numChannels: number;
    sampleRate: number;
    byteRate: number;
    blockAlign: number;
    bitsPerSample: number;
    cbSize: number;
    validBitsPerSample: number;
    dwChannelMask: number;
    /** 4 32-bit values representing a 128-bit ID */
    subformat: number[];
    /** MPEG fields (present when audioFormat == 80) */
    headLayer: number;
    headBitRate: number;
    headMode: number;
    headModeExt: number;
    headEmphasis: number;
    headFlags: number;
    ptsLow: number;
    ptsHigh: number;
};

export type WaveFileFactChunk = {
    chunkId: string;
    chunkSize: number;
    dwSampleLength: number;
};

export type WaveFileCuePoint = {
    dwName: number;
    dwPosition: number;
    fccChunk: string;
    dwChunkStart: number;
    dwBlockStart: number;
    dwSampleOffset: number;
};

export type WaveFileCueChunk = {
    chunkId: string;
    chunkSize: number;
    dwCuePoints: number;
    points: WaveFileCuePoint[];
};

export type WaveFileSmplLoop = {
    dwName: number;
    dwType: number;
    dwStart: number;
    dwEnd: number;
    dwFraction: number;
    dwPlayCount: number;
};

export type WaveFileSmplChunk = {
    chunkId: string;
    chunkSize: number;
    dwManufacturer: number;
    dwProduct: number;
    dwSamplePeriod: number;
    dwMIDIUnityNote: number;
    dwMIDIPitchFraction: number;
    dwSMPTEFormat: number;
    dwSMPTEOffset: number;
    dwNumSampleLoops: number;
    dwSamplerData: number;
    loops: WaveFileSmplLoop[];
};

export type WaveFileBextChunk = {
    chunkId: string;
    chunkSize: number;
    description: string;
    originator: string;
    originatorReference: string;
    originationDate: string;
    originationTime: string;
    /** 2 32-bit values, timeReference high and low */
    timeReference: [number, number];
    version: number;
    UMID: string;
    loudnessValue: number;
    loudnessRange: number;
    maxTruePeakLevel: number;
    maxMomentaryLoudness: number;
    maxShortTermLoudness: number;
    reserved: string;
    codingHistory: string;
};

export type WaveFileMextChunk = {
    chunkId: string;
    chunkSize: number;
    soundInformation: number;
    frameSize: number;
    ancillaryDataLength: number;
    ancillaryDataDef: number;
    reserved: string;
};

export type WaveFileCartPostTimer = {
    usage: string;
    value: number;
};

export type WaveFileCartChunk = {
    chunkId: string;
    chunkSize: number;
    version: string;
    title: string;
    artist: string;
    cutId: string;
    clientId: string;
    category: string;
    classification: string;
    outCue: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    producerAppId: string;
    producerAppVersion: string;
    userDef: string;
    levelReference: number;
    postTimer: WaveFileCartPostTimer[];
    reserved: string;
    url: string;
    tagText: string;
};

export type WaveFileIXMLChunk = {
    chunkId: string;
    chunkSize: number;
    value: string;
};

export type WaveFileDs64Chunk = {
    chunkId: string;
    chunkSize: number;
    riffSizeHigh: number;
    riffSizeLow: number;
    dataSizeHigh: number;
    dataSizeLow: number;
    originationTime: number;
    sampleCountHigh: number;
    sampleCountLow: number;
};

export type WaveFileLISTChunk = {
    chunkId: string;
    chunkSize: number;
    format: string;
    subChunks: object[];
};

export type WaveFileJunkChunk = {
    chunkId: string;
    chunkSize: number;
    chunkData: number[];
};

export type WaveFilePMXChunk = {
    chunkId: string;
    chunkSize: number;
    value: string;
};

/** Input data for creating a cue point via setCuePoint(). */
export type CuePointInput = {
    /** The position of the point in milliseconds (required). */
    position: number;
    /** A string label for the cue point. */
    label?: string;
    /** End position in milliseconds for regions. */
    end?: number;
    dwPurposeID?: number;
    dwCountry?: number;
    dwLanguage?: number;
    dwDialect?: number;
    dwCodePage?: number;
};

/** Output data returned by listCuePoints(). */
export type CuePointOutput = {
    /** The position in milliseconds. */
    position: number;
    /** The label text. */
    label: string;
    /** The end position in milliseconds, or null if not a region. */
    end: number | null;
    dwName: number;
    dwPosition: number;
    fccChunk: string;
    dwChunkStart: number;
    dwBlockStart: number;
    /** The position as a sample offset. */
    dwSampleOffset: number;
    /** The region length as a sample count, 0 if not a region. */
    dwSampleLength: number;
    dwPurposeID: number;
    dwCountry: number;
    dwLanguage: number;
    dwDialect: number;
    dwCodePage: number;
};
