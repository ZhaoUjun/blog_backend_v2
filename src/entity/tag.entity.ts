import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { Article } from './article.entity'

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createTime:number;

    @Column({ length: 50 })
    name: string;

    @ManyToMany(type => Article, article => article.tags, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    @JoinTable()
    articles:Article[]

}