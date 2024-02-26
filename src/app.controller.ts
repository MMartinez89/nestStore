import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  getNew(): string {
    return `Yo soy nuevo`;
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
