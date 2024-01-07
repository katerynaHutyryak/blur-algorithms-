import chalk from 'chalk'
import { BufferRet } from 'jpeg-js'
import type { Algorithm } from '../types'

export async function withTimeMeasure(func: Algorithm, rawImage: BufferRet): Promise<BufferRet> {
    const algorithm = process.argv[2]

    console.time(chalk.yellow(algorithm))
    const res = await func(rawImage)
    console.timeEnd(chalk.yellow(algorithm))
    
    return res
}