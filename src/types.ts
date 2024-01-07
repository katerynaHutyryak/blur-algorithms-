import { BufferRet } from "jpeg-js";

export type Algorithm = (rawImage: BufferRet) => BufferRet | Promise<BufferRet> 
