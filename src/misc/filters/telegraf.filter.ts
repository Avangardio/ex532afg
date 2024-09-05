import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { UserFaultException } from '../exceptions/userFault.exception';

@Catch()
export class TelegrafFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const telegrafCtx = TelegrafArgumentsHost.create(host);
    const ctx: Context = telegrafCtx.getContext();

    if (exception instanceof UserFaultException) {
      await ctx.reply(exception.message);
      return;
    }
    console.error(exception);
    await ctx.reply('❌ Произошла ошибка, повторите позже.');
  }
}
