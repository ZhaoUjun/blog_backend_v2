import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Author } from './author.entity'

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createTime:Date;

    @UpdateDateColumn()
    updateTime:Date;

    @Column({ length: 50 })
    account: string;

    @Column({ length: 50 })
    password: string;

    @OneToOne(type=>Author,Author=>Author.account)
    @JoinColumn()
    author:Author
}