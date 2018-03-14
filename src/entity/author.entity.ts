import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, OneToMany,CreateDateColumn} from 'typeorm';
import { Account } from './account.entity'
import { Article } from './article.entity'
import * as moment from 'moment'

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createTime:Date;

    @UpdateDateColumn()
    updateTime:Date;

    @Column({ length: 50 })
    name: string;

    @OneToOne(type => Account,account=>account.author)
    account: Account;

    @OneToMany(type=> Article,article=>article.author)
    articles:Article[]

}