import _ from 'lodash'

const MAX_SIZE = 2097150
const BYTES_PER_PIXEL = 4
// TODO: Add box size constant

export async function asyncBoxBlur(rawImage) {   
    const {width, height, data} = rawImage
     
    const processedData = Buffer.alloc(data.length)

    const promises = []

    for (let vrt = 0; vrt < height; vrt++) {
        for (let hrz = 0; hrz < width; hrz++) {

            const promise = new Promise((resolve) => {
                const offset = (vrt * width + hrz) * BYTES_PER_PIXEL

                let counter = 0
    
                let totalRed = 0
                let totalGreen = 0
                let totalBlue = 0
    
                for (let y = vrt - 9; y < vrt + 10; y++) {
                    for (let x = hrz - 9; x < hrz + 10; x++) {
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
    
                processedData[offset] = averageR
                processedData[offset + 1] = averageG
                processedData[offset + 2] = averageB  
                resolve()
            })

            promises.push(promise)
            
        }
    }

    const [chunk1, chunk2] = _.chunk(promises, MAX_SIZE)

    await Promise.all(chunk1)
    await Promise.all(chunk2)

    return {
        data: processedData,
        width,
        height,
    }
}       
