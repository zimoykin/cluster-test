import { ApiModel, Model, Property } from "zimoykin-dynamodb-orm"

@Model()
export class Advertising extends ApiModel {
    @Property({ nullable: true, output: true, validate: 'asString' })
    title: string
    @Property({ nullable: true, output: true, validate: 'asDate' })
    ExpiresIn: string
} 