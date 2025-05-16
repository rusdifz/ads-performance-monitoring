import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  checkHealthApps(): string {
    return 'Apps is Run';
  }
}
