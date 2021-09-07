import { ApiModel, Repository } from "zimoykin-dynamodb-orm"

type Class<T> = new (...args: any[])=>T
export namespace repository {
    export function query <T extends ApiModel> (
        type: Class<T>,
        query: any
    ):Promise<T[]>{
        const repo = new  Repository(type)
        return repo.find(query, true, type.name)
    }
    export function find <T extends ApiModel> (
        type: Class<T>,
        id: string
    ):Promise<T>{
        const repo = new Repository(type)
        return repo.findOne(id, true, type.name)
    }
}