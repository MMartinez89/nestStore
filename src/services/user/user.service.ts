import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  private counterId = 1;
  private user: User[] = [
    {
      id: 1,
      email: 'manuel@manuel.com',
      password: '1234',
      role: 'admin',
    },
  ];

  getAll() {
    return this.user;
  }

  getOne(id: number) {
    const user = this.user.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(payLoad: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payLoad,
    };
    this.user.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.getOne(id);
    if (user) {
      const index = this.user.findIndex((user) => user.id === id);
      this.user[index] = {
        ...user,
        ...payload,
      };
      return this.user[index];
    }
    return null;
  }

  remove(id: number) {
    const user = this.user.findIndex((user) => user.id === id);
    if (user === -1) {
      throw new NotFoundException(`User ${user} not found`);
    }
    this.user.splice(user, 1);
    return true;
  }
}
