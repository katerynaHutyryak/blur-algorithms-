const BYTES_PER_PIXEL = 4
const SIGMA = 3
const BOXES_COUNT = 2

function getBoxes (n) {
    let wIdeal = Math.sqrt((12 * SIGMA * SIGMA / n) + 1)
    let wl = Math.floor(wIdeal)

    if(wl % 2 === 0) wl--
    let wu = wl + 2

    let mIdeal = (12 * SIGMA * SIGMA - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4)
    let m = Math.round(mIdeal)

    let sizes = new Array(n)
    for (let i = 0; i < n; i++) {
        if (i < m) {
            sizes[i] = Math.floor(wl)
        } else {
            sizes[i] = Math.floor(wu)
        }
    }
    return sizes
}

function runGaussian(rawImage, radius) {
    const {width, height, data} = rawImage;

    const processedData = Buffer.alloc(data.length)
    const hrzPixelData = Buffer.alloc(data.length)

    for (let vrt = 0; vrt < height; vrt++) {
        for (let hrz = 0; hrz < width; hrz++) {
            const offset = (vrt * width + hrz) * BYTES_PER_PIXEL

            let hRed = 0
            let hGreen = 0
            let hBlue = 0
            let hPixels = 0

            for(let x = hrz - radius + 1; x < hrz + radius; x++) {
                if (x < 0 || x >= width) continue
                const offsetBlur = (vrt * width + x) * BYTES_PER_PIXEL

                hRed += data[offsetBlur]
                hGreen += data[offsetBlur + 1]
                hBlue += data[offsetBlur + 2]
                hPixels++
            }

            const averageR = Math.floor(hRed / hPixels)
            const averageG = Math.floor(hGreen / hPixels)
            const averageB = Math.floor(hBlue / hPixels)

            hrzPixelData[offset] = averageR
            hrzPixelData[offset + 1] = averageG
            hrzPixelData[offset + 2] = averageB
        }
    }

    for (let hrz = 0; hrz < width; hrz++) {
        for (let vrt = 0; vrt < height; vrt++) {
            const offset = (vrt * width + hrz) * BYTES_PER_PIXEL

            let vRed = 0
            let vGreen = 0
            let vBlue = 0
            let vPixels = 0

            for(let y = vrt - radius + 1; y < vrt + radius; y++) {
                if (y < 0 || y >= height) continue
                const offsetBlur = (y * width + hrz) * BYTES_PER_PIXEL

                vRed += hrzPixelData[offsetBlur]
                vGreen += hrzPixelData[offsetBlur + 1]
                vBlue += hrzPixelData[offsetBlur + 2]
                vPixels++
            }

            const averageR = Math.floor(vRed / vPixels)
            const averageG = Math.floor(vGreen / vPixels)
            const averageB = Math.floor(vBlue / vPixels)

            processedData[offset] = averageR
            processedData[offset + 1] = averageG
            processedData[offset + 2] = averageB
        }
    }

    return {
        data: processedData,
        width,
        height,
    }
}

export function gaussianBlur(rawImage) {
    const bxs = getBoxes(BOXES_COUNT)

    let runCount = 0
    let processedImage;
    while(runCount < BOXES_COUNT) {
        processedImage = runGaussian(processedImage || rawImage, bxs[runCount])
        runCount++
    }
    
    return processedImage
}
