import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    JoinTable
} from 'typeorm';
import { Author } from './author.entity'
import { Comment } from './comment.entity'
import { Tag } from "./tag.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createTime:number;

    @UpdateDateColumn()
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
    @JoinColumn({name:'tag_ids'})
    tags: Tag[] = [];

    @OneToMany(type => Comment,comment => comment.article)
    comments: Comment[]=[];
}