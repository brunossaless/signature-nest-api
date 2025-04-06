import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUser(
    @Query('email') email: string,
    @Query('password') password: string,
  ): Promise<User | null> {
    return await this.appService.getUser(email, password);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.appService.createUser(user);
  }
}
