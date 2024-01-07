import * as fs from 'fs'

export const readOriginalImage = (): Buffer => fs.readFileSync('media/original.jpg')

export const writeProcessedImage = (imageData: Buffer) => fs.writeFileSync(`media/blured.jpg`, imageData)
