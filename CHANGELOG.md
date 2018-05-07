# CHANGELOG

## version 6.4.1 (2018-05-07)
- Using compilationLevel: ADVANCED with Closure Compiler.

## version 6.4.0 (2018-05-07)
- WaveFile.toBase64() and WaveFile.toDataURI() to export the file as a Base64 string or a DataURI.

## version 6.3.0 (2018-05-06)
- fromIMAADPCM, fromALaw and fromMuLaw can receive an optional parameter: the bit depth of the output. If ommited, defaults to "16".
- Fix: argument validation in fromScratch

## version 6.2.0 (2018-05-04)
- Limited support of RF64. Need to be tested with files > 4gb in size.

## version 6.1.1 (2018-05-03)
- Using byte-data^7.0.0 and riff-chunks^4.0.1.

## version 6.1.0 (2018-05-02)
- Reading and writing the data in the "cue " chunk.

## version 6.0.0 (2018-05-02)
- New API. Methods have the same name, but properties have changed.
	- The samples are now under WaveFile.data.samples, not WaveFile.samples.
	- "fmt " data is now an object under WaveFile.fmt
	- "data" data is now under WaveFile.data
	- "fact" data is now under WaveFile.fact
	- "bext" data is now under WaveFile.bext
- Support for direct conversion of any bith depth to any compression type.
- Samples are automatically interleaved when reading/writing files