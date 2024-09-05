import { Test, TestingModule } from '@nestjs/testing';
import { LinksUpdates } from './updates/links.updates';
import { LinksService } from './links.service';

describe('AppController', () => {
  let appController: LinksUpdates;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LinksUpdates],
      providers: [LinksService],
    }).compile();

    appController = app.get<LinksUpdates>(LinksUpdates);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
