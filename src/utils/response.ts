import { Request, Response } from "express"
import { setCache } from "./cache"

export function response (req: Request, res: Response, status: number, data: any) {
    setCache(req, status, data)
    res.status(status).json(data)
}