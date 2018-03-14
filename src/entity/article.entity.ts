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
    AfterLoad
} from 'typeorm';
import { Author } from './author.entity'
import { Comment } from './comment.entity'
import { Tag } from "./tag.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createTime:Date;

    @UpdateDateColumn()
    updateTime:Date;

    @Column({ length: 50 })
    title: string;

    @Column({
        type:'longtext'
    })
    content: string;

    @Column('text')
    preview: string;

    @Column({
        default:0
    })
    status: number;

    @Column({
        default:0
    })
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

    @AfterLoad()
    updateCounters() {
        this.readCnt++;
    }
}