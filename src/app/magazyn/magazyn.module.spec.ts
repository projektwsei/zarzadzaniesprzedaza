import { MagazynModule } from './magazyn.module';

describe('MagazynModule', () => {
  let magazynModule: MagazynModule;

  beforeEach(() => {
    magazynModule = new MagazynModule();
  });

  it('should create an instance', () => {
    expect(magazynModule).toBeTruthy();
  });
});
