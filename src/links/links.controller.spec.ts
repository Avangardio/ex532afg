import { Test, TestingModule } from '@nestjs/testing';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

describe('AppController', () => {
  let appController: LinksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [LinksService],
    }).compile();

    appController = app.get<LinksController>(LinksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
