import { Activity } from "../model/activity.entity"
import { User } from "../model/user.entity"
import { RestController } from "./shared/restApi.controller"

export class ActivityController extends RestController<Activity> {
    static instance(){
        return new ActivityController(Activity)
    }
}