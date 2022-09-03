import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  BadGatewayException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  reqId: string;
}
import { tap } from 'rxjs/operators';
import { catchError, timeout } from 'rxjs/operators';
@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, Response<any>> {
  private readonly logger = new Logger('LoggerInterceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const { ip, method, originalUrl: url } = req;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hostname = require('os').hostname();
    const server = req.get('host') || '';
    const reqId = uuidv4();
    const now = Date.now();
    const body = JSON.stringify(req.body) || '';
    const query = JSON.stringify(req.query) || '';
    const headers = JSON.stringify(req.headers) || '';
    res.locals.reqId = reqId;
    this.logger.log(
      `Incoming Request reqId=${reqId} server="${server}" hostname="${hostname}" src="${ip}" method="${method}" url="${url}" body="${body}" query="${query}" header="${headers}" `,
    );
    return next.handle().pipe(
      timeout(5000),
      map((data) => ({
        statusCode: ctx.getResponse().statusCode,
        message: data.message || '',
        data: data,
        version: 'v1',
        reqId: ctx.getResponse().locals.reqId,
      })),
      tap((data) => {
        const delay = Date.now() - now;
        this.logger.log(
          `Response Request reqId=${reqId} content="${JSON.stringify(
            data,
          )}" \x1b[33m +${delay}ms`,
        );
      }),
      catchError((err) => {
        const delay = Date.now() - now;
        this.logger.log(
          `Response Request reqId=${reqId} content="${JSON.stringify(
            err,
          )}" \x1b[33m +${delay}ms`,
        );
        return throwError(() => err);
      }),
    );
  }
}
