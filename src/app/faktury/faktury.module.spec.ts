import { FakturyModule } from './faktury.module';

describe('FakturyModule', () => {
  let fakturyModule: FakturyModule;

  beforeEach(() => {
    fakturyModule = new FakturyModule();
  });

  it('should create an instance', () => {
    expect(fakturyModule).toBeTruthy();
  });
});
