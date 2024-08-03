import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services';
import { User } from './entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ UsersService ],
  exports: [ UsersService ],
})
export class UsersModule {}
