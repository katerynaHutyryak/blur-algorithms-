import fs from 'fs'

export const readOriginalImage = () => fs.readFileSync('media/original.jpg')

export const writeProcessedImage = (imageData) => fs.writeFileSync(`media/blured.jpg`, imageData)
