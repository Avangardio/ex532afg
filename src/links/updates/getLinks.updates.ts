import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { ILinksService, LinksService } from '../links.service';
import { Action, Ctx, Hears, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { TABLE_LIMIT } from '../links.templates';
import { TelegrafFilter } from '../../misc/filters/telegraf.filter';

@Injectable()
@Update()
@UseFilters(TelegrafFilter)
export class GetLinksUpdates {
  constructor(@Inject(LinksService) private linksService: ILinksService) {}

  /**
   * Просмотр ссылок
   */
  @Hears('Посмотреть мои ссылки')
  async tableStart(@Ctx() ctx: Context): Promise<void> {
    const page = 1;
    const tableWithCount = await this.linksService.getLinks({
      userId: ctx.from.id,
      page,
    });
    const keyboard = [Markup.button.callback(`Страница ${page}`, 'table')];
    if (tableWithCount.count > TABLE_LIMIT) {
      keyboard.push(
        Markup.button.callback('Вперед', `table_further_${page + 1}`),
      );
    }
    await ctx.replyWithHTML(
      tableWithCount.table,
      Markup.inlineKeyboard(keyboard),
    );
  }

  @Action(/^table_further_(\d+)$/)
  async tableFurther(@Ctx() ctx: Context) {
    const messageId = ctx.callbackQuery.message.message_id;
    const currentPage = +ctx.callbackQuery['data'].replace(
      'table_further_',
      '',
    );
    const { table, count } = await this.linksService.getLinks({
      userId: ctx.from.id,
      page: currentPage,
    });
    // Заполняем клавиатуру
    const keyboard = [
      Markup.button.callback(`Назад`, `table_back_${currentPage - 1}`),
      Markup.button.callback(`Страница ${currentPage}`, 'table'),
    ];

    // Если есть еще страница
    if (count > currentPage * TABLE_LIMIT) {
      keyboard.push(
        Markup.button.callback(`Вперед`, `table_further_${currentPage + 1}`),
      );
    }
    if (messageId) {
      await ctx.editMessageText(table, {
        parse_mode: 'HTML',
        reply_markup: Markup.inlineKeyboard([keyboard]).reply_markup, // Здесь используется inline_keyboard
      });
    }
  }

  @Action(/^table_back_(\d+)$/)
  async tableBack(@Ctx() ctx: Context): Promise<void> {
    const messageId = ctx.callbackQuery.message.message_id;
    const currentPage = +ctx.callbackQuery['data'].replace('table_back_', '');
    const { table, count } = await this.linksService.getLinks({
      userId: ctx.from.id,
      page: currentPage,
    });
    const keyboard = [
      Markup.button.callback(`Страница ${currentPage}`, 'table'),
      Markup.button.callback(`Вперед`, `table_further_${currentPage + 1}`),
    ];

    // Если есть еще страница
    if (currentPage > 1) {
      keyboard.unshift(
        Markup.button.callback(`Назад`, `table_back_${currentPage - 1}`),
      );
    }
    if (messageId) {
      await ctx.editMessageText(table, {
        parse_mode: 'HTML',
        reply_markup: Markup.inlineKeyboard([keyboard]).reply_markup, // Здесь используется inline_keyboard
      });
    }
  }
}
