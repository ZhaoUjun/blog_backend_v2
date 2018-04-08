import { SelectQueryBuilder } from 'typeorm'
import { PAGINATION } from '../constant'

export function withPagination<T>(ql:SelectQueryBuilder<T>,page=1,pageSize=PAGINATION.DEFAULT_PAGE_SIZE):Promise<T[]>{
    return ql.offset((page-1)*pageSize).limit(pageSize).getMany()
}