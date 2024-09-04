import { Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { ADD_LINK_SCENE } from '../links.templates';
import { Context } from 'telegraf';
import { LinksService } from '../links.service';

@Scene(ADD_LINK_SCENE)
export class AddLinksScene {
  constructor(private readonly linksService: LinksService) {}

  @SceneEnter()
  async onEnter(@Ctx() ctx: Context) {
    await ctx.reply('Пришлите ссылку в корректном формате.');
  }

  @Hears(/.+ .+/)
  async addLink(@Ctx() ctx: Context): Promise<void> {
    // В любом случае будет и url и name из-за регулярки.
    const [url, name] = ctx.text.split(' ');
    const linkRegistrationResult = await this.linksService.addLink({
      url,
      name,
      userId: ctx.from.id,
    })

    if (linkRegistrationResult === null) {
      await ctx.reply('Вы ввели некорректную ссылку, попробуйте ещё раз.');
    } else {
     await ctx.replyWithHTML(`Ссылка "${name}" добавлена. Ее можно получить, предоставив код: <b>${linkRegistrationResult}</b>`);
    }
  }
}
