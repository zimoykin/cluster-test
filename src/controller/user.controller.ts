import { Request, Response } from "express"
import { generateTokens } from "../utils/jwt.auth"
import { User } from "../model/user.entity"
import { RestController } from "./shared/restApi.controller"
import { compare } from 'bcrypt'

export class UserController extends RestController<User> {
    static instance() {
        return new UserController(User)
    }
    login = (req: Request, res: Response) => {
        this.repo.find({ email: req.body.email }, true, '')
            .then(users => {
                const filtred = users.filter(val => val.email === req.body.email)
                if (filtred.length > 0) {
                    const user = filtred[0]
                    compare(req.body.password, user.password, (err, match) => {
                        if (err) res.status(404).json({ error: 'wrong password' })
                        else if (match) res.status(200).json(generateTokens(user))
                        else res.status(404).json({ error: 'wrong password' })
                    })
                } else res.status(404).json({ error: 'user not found' })

            })
            .catch(err => res.status(400).json({ error: err }))
    }
}