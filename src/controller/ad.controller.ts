import { Advertising } from "../model/advertising.entity"
import { RestController } from "./shared/restApi.controller"

export class AdvertisingController extends RestController<Advertising> {
    static instance(){
        return new AdvertisingController(Advertising)
    }
}