import { NextFunction } from "connect"
import { Request, Response } from "express"
import * as NodeCache from "node-cache"

export const cacheManager = new NodeCache({ maxKeys: 100, stdTTL: 15 });
export function cache (req: Request, res: Response, next: NextFunction){
    let value = cacheManager.get(req.method + '-' + req.url) as any
    console.log(value)
    if (value) res.status(value.status).json(value.data)
    else next()
}
export function setCache (req: Request, status: number, data: any) {
    cacheManager.set(req.method + '-' + req.url, {status: status, data: data })
}