import jpeg from 'jpeg-js'

const IMAGE_QUALITY = 50

export const decodeImage = (imageBuffer) => jpeg.decode(imageBuffer);

export const encodeImage = (rawImageData) => jpeg.encode(rawImageData, IMAGE_QUALITY).data;