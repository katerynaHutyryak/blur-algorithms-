import { boxBlur } from '../algorithms/boxBlur.js'
import { asyncBoxBlur } from '../algorithms/asyncBoxBlur.js';
import { motionBlur } from '../algorithms/motionBlur.js';
import { gaussianBlur } from '../algorithms/gaussianBlur.js';
import { multicoreBoxBlur } from '../algorithms/multicoreMainThread.js';
import type { Algorithm } from '../types.js';


enum AlgorithmType {
    boxBlur = 'boxBlur',
    asyncBoxBlur = 'asyncBoxBlur',
    multicoreBoxBlur = 'multicoreBoxBlur',
    gaussianBlur = 'gaussianBlur',
    motionBlur = 'motionBlur',
};

function isValidAlgorithm(userInput: string): userInput is AlgorithmType {
    return userInput in AlgorithmType
} 

export function getAlgorithm(): Algorithm {
    const algorithm = process.argv[2]

    if (!isValidAlgorithm(algorithm)) {
        throw new Error('Unknown algorithm type')
    }

    switch (algorithm) {
        case AlgorithmType.boxBlur:
            return boxBlur;
        case AlgorithmType.asyncBoxBlur:
            return asyncBoxBlur;
        case AlgorithmType.multicoreBoxBlur: 
            return multicoreBoxBlur;
        case AlgorithmType.gaussianBlur:
            return gaussianBlur;
        case AlgorithmType.motionBlur:
            return motionBlur;
    }
}