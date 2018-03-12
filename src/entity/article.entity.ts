import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToMany,ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './author.entity'
import { Comment } from './comment.entity'
import * as moment from 'moment'
import {Tag} from "./tag.entity";

@Entity()
export class Article {
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
    title: string;

    @Column({
        type:'longtext'
    })
    content: string;

    @Column('text')
    preview: number;

    @Column()
    status: number;

    @Column()
    readCnt: number;

    @ManyToOne(type=>Author,author=>author.articles)
    author: Author;

    @ManyToMany(type => Tag, album => album.articles, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    tags: Tag[] = [];

    @OneToMany(type => Comment,comment => comment.article)
    comments: number;
}