import { Action, Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { DELETE_LINK_END, DELETE_LINK_SCENE } from '../links.templates';
import { Context, Markup } from 'telegraf';
import { ILinksService, LinksService } from '../links.service';
import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { TelegrafFilter } from '../../misc/filters/telegraf.filter';
import { SceneContext } from 'telegraf/scenes';

@Injectable()
@Scene(DELETE_LINK_SCENE)
@UseFilters(TelegrafFilter)
export class DeleteLinkScene {
  constructor(@Inject(LinksService) private linksService: ILinksService) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      'Для удаления пришлите ссылку в корректном формате: <b>[ссылка]</b>',
      Markup.inlineKeyboard([
        Markup.button.callback('Закончить', DELETE_LINK_END),
      ]),
    );
  }

  @Hears(/\w+/)
  async deleteLink(@Ctx() ctx: Context): Promise<void> {
    const url = ctx.text;
    const deleteResult = await this.linksService.deleteLink(url, ctx.from.id);

    let message: string;

    if (deleteResult) {
      message = `✅ Ссылка "${url}" удалена, введите еще ссылку или нажмите на кнопку.`;
    } else {
      message = `❌ Ссылки не существует или она не была добавлена Вами!`;
    }

    await ctx.reply(
      message,
      Markup.inlineKeyboard([
        Markup.button.callback('Закончить', DELETE_LINK_END),
      ]),
    );
  }

  @Action(DELETE_LINK_END)
  async addLinkEnd(@Ctx() ctx: SceneContext) {
    await ctx.scene.leave();
    await ctx.reply('Благодарим за использование!');
  }
}
