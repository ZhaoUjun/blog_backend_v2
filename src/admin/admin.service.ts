import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entity/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto'

@Component()
export class AdminService {
    constructor(

        @InjectRepository(Account)
        private readonly AccountRepository: Repository<Account>,

        @Inject('RedisProvider')
        private redisProvider,

    ) {}

    async findOne(accountVo:CreateAccountDto){
        return this.AccountRepository
            .createQueryBuilder('account')
            .where('account.account = account',{account:accountVo.account})
            .andWhere('account.password = password',{password:accountVo.password})
            .getOne()
    }

    async createAccount(createAccountDto:CreateAccountDto):Promise<Account>{
        const account=new Account();
        account.account=createAccountDto.account;
        account.password=createAccountDto.password;
        return this.AccountRepository.save(account)
    }

    async checkCaptcha(captcha:string):Promise<Boolean>{
        return this.redisProvider.existsAsync(captcha)
    }
}