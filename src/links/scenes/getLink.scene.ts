import { Action, Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { GET_LINK_END, GET_LINK_SCENE } from '../links.templates';
import { Context, Markup } from 'telegraf';
import { ILinksService, LinksService } from '../links.service';
import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { TelegrafFilter } from '../../misc/filters/telegraf.filter';
import { SceneContext } from 'telegraf/scenes';

@Injectable()
@Scene(GET_LINK_SCENE)
@UseFilters(TelegrafFilter)
export class GetLinkScene {
  constructor(@Inject(LinksService) private linksService: ILinksService) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      'Для получения ссылки пришлите код в корректном формате: <b>[код]</b>',
      Markup.inlineKeyboard([
        Markup.button.callback('Закончить', GET_LINK_END),
      ]),
    );
  }

  @Hears(/.+/)
  async getLinkByCode(@Ctx() ctx: Context): Promise<void> {
    const code = ctx.text;
    const link = await this.linksService.getLink(code);

    await ctx.replyWithMarkdownV2(
      'Ваша ссылка:\n' + '```' + link + '```',
      Markup.inlineKeyboard([
        Markup.button.callback('Закончить', GET_LINK_END),
      ]),
    );
  }

  @Action(GET_LINK_END)
  async getLinkEnd(@Ctx() ctx: SceneContext) {
    await ctx.scene.leave();
    await ctx.reply('Благодарим за использование!');
  }
}
