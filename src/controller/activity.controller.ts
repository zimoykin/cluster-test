import { PDF } from "../utils/pdfCreater"
import { Activity } from "../model/activity.entity"
import { RestController } from "./shared/restApi.controller"
import { Request, Response } from "express"

export class ActivityController extends RestController<Activity> {
    static instance(){
        return new ActivityController(Activity)
    }
    report = (_: Request, res: Response) => PDF.createDoc(res, {
        UserName: 'D.Zimoykin',
        UserEmail: 'zimoykin@gmail.com',
        Activity: {
            type: 'running',
            time: 59.66,
            completed: true,
            laps: [
                29.21,
                30,43
            ]
        }
    }, {
        img: `https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=450&q=80`
    })
}