import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {CatsController} from './cats.controller'

@Module({
  imports: [],
  controllers: [AppController,CatsController],
  components: [],
})
export class ApplicationModule {}
