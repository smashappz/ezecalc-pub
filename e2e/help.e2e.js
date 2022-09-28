describe('help', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('links', async () => {
    await element(by.id('help-tab')).tap();
    await expect(element(by.id('version'))).toBeVisible();

    await element(by.id('help-link0')).tap();
    await expect(element(by.id('screen0'))).toExist();
    await element(by.id('scroll-view')).scrollTo('top');

    await element(by.id('help-link1')).tap();
    await expect(element(by.id('screen1'))).toExist();
    await element(by.id('scroll-view')).scrollTo('top');

    await element(by.id('help-link2')).tap();
    await expect(element(by.id('screen2'))).toExist();
    await element(by.id('scroll-view')).scrollTo('top');

    await element(by.id('help-link3')).tap();
    await expect(element(by.id('screen3'))).toExist();
    await element(by.id('scroll-view')).scrollTo('top');

    await element(by.id('help-link4')).tap();
    await expect(element(by.id('screen4'))).toExist();
    await element(by.id('scroll-view')).scrollTo('top');
  });
});
