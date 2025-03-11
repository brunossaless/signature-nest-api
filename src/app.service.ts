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

  async getUser(email: string, password: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email,
        password,
      },
    });
  }

  async createUser(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
