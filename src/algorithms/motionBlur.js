const RADIUS = 10
const BYTES_PER_PIXEL = 4

export function motionBlur(rawImage) {
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

            for(let x = hrz - RADIUS + 1; x < hrz + RADIUS; x++) {
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

            for(let y = vrt - RADIUS + 1; y < vrt + RADIUS; y++) {
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
