import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [UserEntity],
      synchronize: false,
      database: 'users',
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
