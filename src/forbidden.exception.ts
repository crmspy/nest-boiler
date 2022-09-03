import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class SuccessException extends HttpException {
  constructor() {
    super('success', HttpStatus.ACCEPTED);
  }
}

export class Success extends HttpException {
  constructor() {
    super('success', HttpStatus.ACCEPTED);
  }
}
