import { Request, Response } from "express"
import { Advertising } from "../model/advertising.entity"
import { RestController } from "./shared/restApi.controller"

export class AdvertisingController extends RestController<Advertising> {
    static instance(){
        return new AdvertisingController(Advertising)
    }
    override findOne = async (req: Request, res: Response) => {
        console.log(`${(req as any).user}`)
        console.log(`${req['user'].id}`)
        res.status(403).json({ error: 'not implemented yet'})
    }
}