import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(
    @Body() credentials: { email: string; password: string },
  ): Promise<User | null> {
    return await this.appService.login(credentials.email, credentials.password);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.appService.createUser(user);
  }
}
