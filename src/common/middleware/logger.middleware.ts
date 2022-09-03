import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { json } from 'stream/consumers';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HttpMiddleware');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl: url } = req;
    const hostname = require('os').hostname();
    const server = req.get('host') || '';
    const reqId = uuidv4();
    const { statusCode, statusMessage } = res;
    const contentLength = res.get('content-length');
    const now = Date.now();
    const body = JSON.stringify(req.body) || ""
    const query = JSON.stringify(req.query) || ""
    const headers = JSON.stringify(req.headers) || ""
    // this.logger.log(
    //   `Incoming Request session=${reqId} server="${server}" hostname="${hostname}" src="${ip}" method="${method}" url="${url}" body="${body}" query="${query}" header="${headers}"`,
    // );
    // req.on('close', () => {
    //   const delay = Date.now() - now;
    //   this.logger.log(
    //     `Response Request session=${reqId} statusCode="${statusCode}" statusMessage="${res.get('body')}" \x1b[33m +${delay}ms`)
    //   });
    res.locals.reqId = reqId;
    next();
  }
}
