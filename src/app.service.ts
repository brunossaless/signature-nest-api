import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
        password,
      },
    });

    if (user && user.password === password) {
      return user;
    }

    throw new Error('User not found');
  }

  async createUser(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
