import { ApiModel, BeforeCreate, Model, Property, Unique } from "zimoykin-dynamodb-orm"
import { hashSync } from 'bcrypt'

@Model()
@Unique('email')
export class User extends ApiModel {
    @Property({ nullable: false, validate: 'asString', output: true })
    firstName: string
    
    @Property({ nullable: false, validate: 'asString', output: true })
    lastName: string

    @Property({ nullable: false, validate: 'asString', output: true })
    email: string
    
    @Property({ nullable: false, validate: 'asString' })
    password: string

    @BeforeCreate()
    saltPassword() {
        this.password = hashSync(this.password, 10)
    }
}