import { User } from "../model/User.entity"
import { Repository } from "zimoykin-dynamodb-orm"
import { Request, Response } from "express"

export class UserController {
    private repo: Repository<User>
    constructor() {
        this.repo = new Repository(User)
    }
    static instance () {
        return new UserController()
    }

    findOne = (req: Request, res: Response) => {
        this.repo.findOne(req.params.id, true, '')
        .then ( vals => res.status(200).json(vals.output()))
        .catch( err => res.json(new Error('something went wrong')))
    }
    find = (req: Request, res: Response) => {
        this.repo.find({}, true, '')
        .then ( vals => res.status(200).json(vals.map( val => val.output())))
        .catch( err => res.json(new Error('something went wrong')))
    }
    create = (req: Request, res: Response) => {
        this.repo.create(req.body)
        .then ( vals => res.status(200).json(Array.isArray(vals) ? vals.map(value=> value.output()) : vals.output()))
        .catch( err => res.json(new Error('something went wrong')))
    }

}