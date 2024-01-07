import * as jpeg from 'jpeg-js'

const IMAGE_QUALITY = 50

export const decodeImage = (imageBuffer: Buffer): jpeg.BufferRet => jpeg.decode(imageBuffer);

export const encodeImage = (rawImageData: jpeg.BufferRet): Buffer => jpeg.encode(rawImageData, IMAGE_QUALITY).data;