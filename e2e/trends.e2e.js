describe('trends', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('no trends', async () => {
    await element(by.id('trends-tab')).tap();
    await expect(
      element(by.text('Add a diary entry to see your statistics')),
    ).toBeVisible();
    await expect(element(by.id('trends-nodata-pic'))).toBeVisible();
  });

  it('new post', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('new-post')).tap();

    await element(by.id('systolic')).typeText('120');
    await element(by.id('diastolic')).typeText('80');
    await element(by.id('pulse')).typeText('75');

    await element(by.id('body-picker')).tap();
    await element(by.id('body-leftwrist')).multiTap(2);

    await element(by.id('posture-picker')).tap();
    await element(by.id('posture-sitting')).multiTap(2);

    await element(by.id('notes')).typeText('Relaxing at home');
    await element(by.id('save')).tap();
  });

  it('view charts', async () => {
    await element(by.id('trends-tab')).tap();
    await element(by.id('scroll-view')).scrollTo('bottom');

    await expect(element(by.id('pie-chart'))).toExist();
    await expect(element(by.id('heat-map'))).toBeVisible();
  });

  it('view basic trends', async () => {
    await element(by.id('trends-tab')).tap();

    await expect(element(by.text('120 / 80'))).toBeVisible();
    await expect(element(by.text('Normal'))).toBeVisible();

    await element(by.id('time-picker')).tap();
    await element(by.id('time-7 days')).multiTap(2);

    await expect(element(by.text('120 / 80'))).toBeVisible();
    await expect(element(by.text('Normal'))).toBeVisible();

    await element(by.id('tag-picker')).tap();
    await element(by.id('tag-leftwrist')).multiTap(2);

    await expect(element(by.text('120 / 80'))).toBeVisible();
    await expect(element(by.text('Normal'))).toBeVisible();
  });

  it('view extra trends', async () => {
    await element(by.id('config-tab')).tap();
    await element(by.id('scroll-view')).scroll(250, 'down');
    await element(by.id('extraResults')).tap();

    await element(by.id('trends-tab')).tap();

    await expect(element(by.text('120 / 80'))).toBeVisible();
    await expect(element(by.text('Normal'))).toBeVisible();

    await expect(element(by.text('93'))).toBeVisible();
    await expect(element(by.text('40'))).toBeVisible();

    await expect(element(by.text('120 - 120'))).toBeVisible();
    await expect(element(by.text('80 - 80'))).toBeVisible();

    await expect(element(by.text('75 - 75'))).toBeVisible();
    await expect(element(by.text('93 - 93'))).toBeVisible();

    await expect(element(by.text('40 - 40'))).toBeVisible();

    await element(by.id('config-tab')).tap();
    await element(by.id('scroll-view')).scroll(250, 'down');
    await element(by.id('extraResults')).tap();
  });

  it('del post', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('post-edit-0')).swipe('left');

    await element(by.id('post-del-0')).tap();
    await element(by.id('del-ok')).tap();
  });
});
