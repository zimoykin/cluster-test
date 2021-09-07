import { PDF } from "../utils/pdfCreater"
import { Activity } from "../model/activity.entity"
import { RestController } from "./shared/restApi.controller"
import { Request, Response } from "express"
import { repository } from "../model/repository"
import { User } from "../model/user.entity"

export class ActivityController extends RestController<Activity> {
    static instance(){
        return new ActivityController(Activity)
    }
    report = (req: Request, res: Response) => {
        const user = req['user'] as User
        repository.query(Activity, {
            userId: user.id
        }).then( vals => {
            const activity = vals.sort((a,b) => a.createdAt > b.createdAt ? 0 : -1)[0]
            PDF.createDoc(user, res, {
                User: `${user.firstName}  ${user.lastName}`,
                Activity: {
                    type: activity.activityType,
                    time: activity.duration,
                    callories: activity.callories,
                    laps: [
                        29.21,
                        30,43
                    ]
                }
            }, {
                img: `https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=450&q=80`
            })
        })
        .catch( err => {

        })
    }
}