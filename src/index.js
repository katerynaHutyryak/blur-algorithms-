import { withTimeMeasure } from "./helpers/timeMeasurer.js"
import { decodeImage, encodeImage } from "./helpers/decoder.js"
import { readOriginalImage, writeProcessedImage } from "./helpers/fileManager.js"
import { getAlgorithm } from "./helpers/getAlgorithm.js"

const originalImageBuffer = readOriginalImage()
const originalRawImage = decodeImage(originalImageBuffer)

const algorithm = getAlgorithm()

withTimeMeasure(algorithm, originalRawImage)
    .then(processedRawImage => {
        const processedBuffer = encodeImage(processedRawImage)
        writeProcessedImage(processedBuffer)
    })


