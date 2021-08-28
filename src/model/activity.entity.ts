import { ApiModel, Model, Parent, Property } from "zimoykin-dynamodb-orm"
import { User } from "./user.entity"

@Model()
export class Activity extends ApiModel{
    @Property({ nullable: false, validate: 'asString', output: true })
    activityType: 'runnig'|'walking'|'cycling'|'high intensive'|'cross-fit'
    @Property({ nullable: false, validate: 'asNumber', output: true })
    duration: number
    @Property({ alias: 'burned', nullable: false, validate: 'asNumber', output: true })
    callories: number
    @Parent({ nullable: false, output: true, alias: 'owner', type: () => User })
    userId: string
}