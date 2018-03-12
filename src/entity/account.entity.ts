import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Author } from './author.entity'
import * as moment from 'moment'

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'timestamp',
        default:moment.now()
    })
    createTime:number;

    @UpdateDateColumn({
        type:'timestamp',
        default:moment.now()
    })
    updateTime:number;

    @Column({ length: 50 })
    account: string;

    @Column({ length: 50 })
    password: string;

    @OneToOne(type=>Author,Author=>Author.account)
    author:Author


}