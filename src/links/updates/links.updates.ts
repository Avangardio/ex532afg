import { Injectable, UseFilters } from '@nestjs/common';
import { Ctx, Hears, Help, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { SceneContext } from 'telegraf/scenes';
import {
  ADD_LINK_SCENE,
  DELETE_LINK_SCENE,
  GET_LINK_SCENE,
} from '../links.templates';
import { TelegrafFilter } from '../../misc/filters/telegraf.filter';

@Injectable()
@Update()
@UseFilters(TelegrafFilter)
export class LinksUpdates {
  constructor() {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.telegram.setMyCommands([
      {
        command: 'start',
        description: 'Вызов начальной точки.',
      },
      {
        command: 'help',
        description: 'Узнать, что умеет бот.',
      },
    ]);

    await ctx.replyWithMarkdownV2(
      'Добро пожаловать в бота для сохранения ссылок\\! \nВоспользуйтесь командами из кнопок\\.',
      Markup.keyboard([
        Markup.button.text('Добавить ссылку'),
        Markup.button.text('Получить ссылку'),
        Markup.button.text('Посмотреть мои ссылки'),
        Markup.button.text('Удалить ссылку'),
      ])
        .oneTime()
        .resize(),
    );
  }

  /**
   * Добавление ссылок
   */
  @Hears('Добавить ссылку')
  async action_test(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter(ADD_LINK_SCENE);
  }

  /**
   * Удаление ссылок
   */
  @Hears('Удалить ссылку')
  async deleteLink(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.scene.enter(DELETE_LINK_SCENE);
  }

  /**
   * Получение ссылки по коду
   */
  @Hears('Получить ссылку')
  async getLink(@Ctx() ctx: SceneContext): Promise<void> {
    await ctx.scene.enter(GET_LINK_SCENE);
  }

  @Help()
  async help(@Ctx() ctx: SceneContext): Promise<void> {
    const message = `Что умеет данный бот?
*Добавлять ссылки*
*Удалять ссылки*
*Получить ссылки по кодам*
*Получить таблицу со своими ссылками*`;
    await ctx.replyWithMarkdownV2(message);
  }
}
