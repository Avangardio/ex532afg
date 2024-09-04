import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { LinksService } from './links.service';
import { Action, Ctx, Hears, Help, InjectBot, On, Start, TelegrafContextType, Update } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/scenes';
import { ADD_LINK_SCENE } from './links.templates';

@Update()
export class LinksController {
  constructor(
    private readonly appService: LinksService,
    @InjectBot() private bot: Telegraf
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.replyWithMarkdownV2('Добро пожаловать в бота для сохранения ссылок\\! \nВоспользуйтесь командами из кнопок\\.', Markup.keyboard([
      Markup.button.callback('Добавить ссылку', 'add_link'),
    ]).oneTime().resize())
  }

  @Hears('Добавить ссылку')
  async action_test(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter(ADD_LINK_SCENE)
 }
  @Action('vv')
  async action_test1(@Ctx() ctx: Context) {
    await ctx.reply('👍vv');
  }
  @Action('oo')
  async action_test2(@Ctx() ctx: Context) {
    await ctx.reply('👍oo');
  }

  @On('sticker')
  async on(@Ctx() ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    await ctx.reply('Hey there');
  }
}
