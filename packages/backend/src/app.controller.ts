import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return { status: 'ok', by: 'JCat' };
  }
}
