import { Request, Response } from "express"
import { User } from "../model/user.entity"
import { RestController } from "./shared/restApi.controller"

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
                    if (user.password === req.body.password) {
                        res.status(200).json({ status: 'okay' })
                    }
                } else res.status(404).json({ error: 'user not found' })

            })
            .catch(err => res.status(400).json({ error: err }))
    }
}