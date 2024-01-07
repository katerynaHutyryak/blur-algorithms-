import os from 'os'
import { Worker } from 'node:worker_threads'
import { Buffer } from 'node:buffer'

import type { Algorithm } from '../types'

const BYTES_PER_PIXEL = 4
const THREADS_COUNT = os.cpus().length
const WORKER_URL = new URL('./multicoreWorkerThread', import.meta.url)

export const multicoreBoxBlur: Algorithm = async (rawImage) => {
    const { width, height, data } = rawImage

    const chunkRows = Math.ceil(height / THREADS_COUNT);
    const chunkPixels = chunkRows * width;

    const promises: Promise<Uint8Array>[] = []

    for (let i = 0; i < THREADS_COUNT; i++) {
        const promise = new Promise <Uint8Array>((resolve, reject) => {
            
            const start = i * chunkPixels * BYTES_PER_PIXEL;
            const end = Math.min(start + (chunkPixels * BYTES_PER_PIXEL), data.length)
            // Array.slice saves a couple of second comparing to lodash.chunk
            const chunkData = data.subarray(start, end) 

            const worker = new Worker(WORKER_URL, {
                workerData: {
                    width,
                    height: chunkRows,
                    data: chunkData,
                },
            })
            
            worker.on('message', resolve);
            worker.on('error', reject)
        })

        promises.push(promise)
    }

    const results = await Promise.all(promises)
    const processedData = Buffer.concat(results)
    
    return {
        data: processedData,
        width,
        height,
    }
}
