import { SelectQueryBuilder } from 'typeorm'
import { PAGINATION } from '../constant'

export function withPagination(ql:SelectQueryBuilder<any>,page=1,pageSize=PAGINATION.DEFAULT_PAGE_SIZE){
    console.log((page-1)*pageSize);
    return ql.offset((page-1)*pageSize).limit(pageSize).getMany()
}