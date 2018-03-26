import { Module } from '@nestjs/common';
import { CommonService } from './common.service'

@Module({
    imports: [],
    components: [
        CommonService,
    ],
    exports:[CommonService]
})
export class CommonModule {}