import { ApiModel, Model, Parent, Property } from "zimoykin-dynamodb-orm"
import { ActivityType } from "./shared/types"
import { User } from "./user.entity"

@Model()
export class Activity extends ApiModel{
    @Property({ nullable: false, validate: 'asString', output: true })
    activityType: ActivityType
    
    @Property({ nullable: false, validate: 'asNumber', output: true })
    duration: number

    @Property({ alias: 'burned', nullable: false, validate: 'asNumber', output: true })
    callories: number

    @Parent({ alias: 'owner', type: () => User, nullable: false, output: true })
    userId: string
}