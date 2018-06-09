import { KosztaModule } from './koszta.module';

describe('KosztaModule', () => {
  let kosztaModule: KosztaModule;

  beforeEach(() => {
    kosztaModule = new KosztaModule();
  });

  it('should create an instance', () => {
    expect(kosztaModule).toBeTruthy();
  });
});
