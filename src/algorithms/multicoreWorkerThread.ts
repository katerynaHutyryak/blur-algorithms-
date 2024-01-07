import { parentPort, workerData } from 'node:worker_threads'

const RADIUS = 10
const BYTES_PER_PIXEL = 4

const { width, height, data} = workerData
const bluredPixelData = Buffer.alloc(data.length)  

for (let vrt = 0; vrt < height; vrt++) {
    for (let hrz = 0; hrz < width; hrz++) {
        const offset = (vrt * width + hrz) * BYTES_PER_PIXEL

        let counter = 0

        let totalRed = 0
        let totalGreen = 0
        let totalBlue = 0

        for (let y = vrt - 9; y < vrt + RADIUS; y++) {
            for (let x = hrz - 9; x < hrz + RADIUS; x++) {
                
                if (y < 0 || y >= height) continue
                if (x < 0 || x >= width) continue

                const offsetSquare = (y * width + x) * BYTES_PER_PIXEL

                const squareRed = data[offsetSquare]
                const squareGreen = data[offsetSquare + 1]
                const squareBlue = data[offsetSquare + 2]

                counter = counter + 1

                totalRed = totalRed + squareRed
                totalGreen = totalGreen + squareGreen
                totalBlue = totalBlue + squareBlue
            }
        }

        const averageR = Math.floor(totalRed / counter)
        const averageG = Math.floor(totalGreen / counter)
        const averageB = Math.floor(totalBlue / counter)

        bluredPixelData[offset] = averageR
        bluredPixelData[offset + 1] = averageG
        bluredPixelData[offset + 2] = averageB                
    }
}

parentPort!.postMessage(bluredPixelData)

parentPort!.close()
