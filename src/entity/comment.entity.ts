import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from './article.entity'
import * as moment from 'moment'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'timestamp',
        default:moment.now()
    })
    createTime:number;

    @Column({ length: 50 })
    name: string;

    @Column({type:'longtext'})
    content: string;

    @Column('text')
    email: number;

    @ManyToOne(type => Article,article => article.comments)
    article:Article

}