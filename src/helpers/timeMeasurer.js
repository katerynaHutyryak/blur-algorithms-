import chalk from 'chalk'

export async function withTimeMeasure(func, ...params) {
    const algorithm = process.argv[2]

    console.time(chalk.yellow(algorithm))
    const res = await func(...params)
    console.timeEnd(chalk.yellow(algorithm))
    
    return res;
}