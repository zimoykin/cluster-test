import { ApiModel, Repository } from "zimoykin-dynamodb-orm"
import { Request, Response } from "express"
import { response } from '../../utils/response'

export class RestController<T extends ApiModel> {
    public repo: Repository<T>
    public path: string
    constructor(
        type: new (...args: any[]) => T
        ) {
        this.repo = new Repository<T>(type)
        this.path = new type().modelSetting().tableName||type.name.toLowerCase()
    }

    findOne = (req: Request, res: Response) => {
        this.repo.findOne(req.params.id, true, '')
            .then(vals => response(req, res, 200, vals.output()))
            .catch(err => res.status(400).json({error: err}))
    }
    find = (req: Request, res: Response) => {
        this.repo.find(req.query, true, '')
            .then(vals => response(req, res, 200, vals.map(val => val.output())))
            .catch(err => res.status(400).json({error: err}))
    }
    create = (req: Request, res: Response) => {
        this.repo.create(req.body)
            .then(vals => res.status(200).json(Array.isArray(vals) ? vals.map(value => value.output()) : vals.output()))
            .catch(err => res.status(400).json({error: err}))
    }
    patch = (req: Request, res: Response) => {
        this.repo.update(req.params.id, req.body)
            .then(vals => res.status(200).json(Array.isArray(vals) ? vals.map(value => value.output()) : vals.output()))
            .catch(err => res.status(400).json({error: err}))
    }
    delete = (req: Request, res: Response) => {
        this.repo.delete(req.params.id)
            .then(() => res.status(200).json({ deleted: req.params.id }))
            .catch(err => res.status(400).json({error: err}))
    }

}