import { Entity, Column, PrimaryGeneratedColumn, ManyToMany,JoinTable } from 'typeorm';
import { Article } from './article.entity'

import * as moment from 'moment'

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'timestamp',
        default:moment.now()
    })
    createTime:number;

    @Column({ length: 50 })
    name: string;

    @ManyToMany(type => Article, article => article.tags, {  // 备注: 会在下面的Photo类里添加"albums"属性
        cascadeInsert: true, // 在添加Album时，会自动添加相册里的Photo
        cascadeUpdate: true, // 在更新Album时，会自动更新相册里的Photo
    })
    @JoinTable()
    articles:Article[]

}