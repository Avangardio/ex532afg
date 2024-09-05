import { Action, Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { ADD_LINK_END, ADD_LINK_SCENE } from '../links.templates';
import { Context, Markup } from 'telegraf';
import { ILinksService, LinksService } from '../links.service';
import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { TelegrafFilter } from '../../misc/filters/telegraf.filter';
import { SceneContext } from 'telegraf/scenes';

@Injectable()
@Scene(ADD_LINK_SCENE)
@UseFilters(TelegrafFilter)
export class AddLinkScene {
  constructor(@Inject(LinksService) private linksService: ILinksService) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      'Пришлите ссылку и имя в корректном формате: <b>[ссылка]</b> <b>[имя]</b>',
      Markup.inlineKeyboard([
        Markup.button.callback('Закончить', ADD_LINK_END),
      ]),
    );
  }

  @Hears(/.+ .+/)
  async addLink(@Ctx() ctx: Context): Promise<void> {
    // В любом случае будет и url и name из-за регулярки.
    const [url, name] = ctx.text.split(' ');
    const linkRegistrationResult = await this.linksService.addLink({
      url,
      name,
      userId: ctx.from.id,
    });

    await ctx.replyWithHTML(
      `✅ Ссылка "${name}" добавлена. Ее можно получить, предоставив код: <b>${linkRegistrationResult}</b>`,
      Markup.inlineKeyboard([
        Markup.button.callback('Закончить', ADD_LINK_END),
      ]),
    );
  }

  @Action(ADD_LINK_END)
  async addLinkEnd(@Ctx() ctx: SceneContext) {
    await ctx.scene.leave();
    await ctx.reply('Благодарим за использование!');
  }
}
