import { UstawieniaModule } from './ustawienia.module';

describe('UstawieniaModule', () => {
  let ustawieniaModule: UstawieniaModule;

  beforeEach(() => {
    ustawieniaModule = new UstawieniaModule();
  });

  it('should create an instance', () => {
    expect(ustawieniaModule).toBeTruthy();
  });
});
