import { boxBlur } from '../algorithms/boxBlur.js'
import { asyncBoxBlur } from '../algorithms/asyncBoxBlur.js';
import { motionBlur } from '../algorithms/motionBlur.js';
import { gaussianBlur } from '../algorithms/gaussianBlur.js';
import { multicoreBoxBlur } from '../algorithms/multicoreMainThread.js';

export function getAlgorithm() {
    const algorithm = process.argv[2]

    switch (algorithm) {
        case 'boxBlur':
            return boxBlur;
        case 'asyncBoxBlur':
            return asyncBoxBlur;
        case 'multicoreBoxBlur': 
            return multicoreBoxBlur;
        case 'gaussianBlur':
            return gaussianBlur;
        case 'motionBlur':
            return motionBlur;
        default: console.error('Unknown algorythm type')
    }
}