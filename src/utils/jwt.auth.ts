import { User } from "../model/user.entity"
import * as jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import { Repository } from "zimoykin-dynamodb-orm"

export function generateTokens(user: User) {
    const acc = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT || 'secret',
        { expiresIn: '2h' })
    const ref = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT || 'secret',
        { expiresIn: '7d' })
    return {
        accessToken: acc,
        refreshToken: ref
    }
}
export function authorization(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        if (req.headers.authorization.includes('Bearer')) {
            const token = req.headers.authorization?.replace('Bearer ', '')
            jwt.verify(token, process.env.JWT || 'secret', (err, decoded) => {
                if (err) return res.status(401).json({ error: err.message })
                else {
                    const repo = new Repository(User)
                    repo.findOne(decoded?.id)
                        .then(val => {
                            res['user'] = val
                            next()
                        })
                        .catch(err => res.status(401).json({ error: err }))
                }
            })

        } else res.status(401).json({ error: '1 unauthorized' })
    } else res.status(401).json({ error: 'unauthorized' })
}
