/*
 * Copyright (c) 2017-2019 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @fileoverview The interleave function.
 * @see https://github.com/rochars/wavefile
 */

/**
 * Interleave de-interleaved samples.
 * @param {!Array|!TypedArray} samples The samples.
 * @return {!Array|!TypedArray}
 */
export function interleave(samples) {
  /** @type {!Array|!TypedArray} */
  let finalSamples = [];
  if (samples.length > 0) {
    if (samples[0].constructor !== Number) {
      finalSamples = new Float64Array(samples[0].length * samples.length);
      let x = 0;
      for (let i = 0, len = samples[0].length; i < len; i++) {
        for (let j = 0, subLen = samples.length; j < subLen; j++) {
          finalSamples[x] = samples[j][i];
          x++;
        }
      }
    } else {
      finalSamples = samples;
    }
  }
  return finalSamples;
}

/**
 * De-interleave samples into multiple channels.
 * @param {!Array|TypedArray} samples The samples.
 * @param {number} numChannels The number of channels to split the samples.
 * @param {?Function=} outputObject The Typed Array object to write the
 *   samples. Assumes Float64Array by default.
 * @return {!Array|!TypedArray}
 */
export function deInterleave(samples, numChannels, outputObject=Float64Array) {
  /** @type {!Array|!TypedArray} */
  let finalSamples = [];
  for (let i = 0; i < numChannels; i++) {
    finalSamples[i] = new outputObject(samples.length / numChannels);
  }
  for (let i = 0; i < numChannels; i ++) {
    let s = 0;
    for (let j = i; j < samples.length; j+= numChannels) {
      finalSamples[i][s++] = samples[j];
    }
  }
  return finalSamples;
}
