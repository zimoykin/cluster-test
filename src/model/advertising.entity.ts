import { ApiModel, BeforeCreate, Model, Property } from "zimoykin-dynamodb-orm"

@Model()
export class Advertising extends ApiModel {
    @Property({ nullable: false, output: true, validate: 'asString' })
    title: string
    
    @Property({ nullable: false, output: true, validate: 'asDate' })
    expiresIn: string

    @BeforeCreate()
    prepareDate(){
        const expiresIn = new Date(this.expiresIn)
        this.expiresIn = new Date(Date.UTC(expiresIn.getFullYear(), expiresIn.getMonth(), expiresIn.getDate())).toISOString()
    }
} 