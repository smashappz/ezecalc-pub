describe('posts', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('no posts', async () => {
    await element(by.id('diary-tab')).tap();
    await expect(
      element(
        by.text(
          'Tap on the plus icon at the bottom of the screen to add a new entry',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.id('nodata-pic'))).toBeVisible();
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

  it('check post', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('post-expand-0')).tap();

    await expect(element(by.text('120 / 80'))).toBeVisible();
    await expect(element(by.text('Left wrist'))).toBeVisible();
    await expect(element(by.text('Sitting'))).toBeVisible();
    await expect(element(by.text('Relaxing at home'))).toBeVisible();
  });

  it('post buttons', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('post-expand-0')).tap();

    await element(by.id('post-speak-0')).tap();
    // await element(by.id("post-share-0")).tap();

    await element(by.id('post-less-0')).tap();
  });

  it('post filter', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('filter-picker')).tap();

    await element(by.id('filter-leftwrist')).multiTap(2);
    await expect(element(by.id('post-edit-0'))).toBeVisible();

    await element(by.id('refresh')).tap();
  });

  it('post search phrase', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('search')).tap();

    await element(by.id('phrase')).typeText('Relax');
    await expect(element(by.id('post-edit-0'))).toBeVisible();
    await element(by.id('refresh')).tap();
  });

  it('post search calendar', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('search')).tap();

    await element(by.id('calendar')).tap();
    await element(by.text('OK')).tap();

    await expect(element(by.id('post-edit-0'))).toBeVisible();
    await element(by.id('refresh')).tap();
  });

  it('edit post', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('post-edit-0')).tap();

    await element(by.id('systolic')).replaceText('121');
    await element(by.id('diastolic')).replaceText('81');
    await element(by.id('pulse')).replaceText('76');

    await element(by.id('body-picker')).tap();
    await element(by.id('body-rightwrist')).multiTap(2);

    await element(by.id('posture-picker')).tap();
    await element(by.id('posture-standing')).multiTap(2);

    await element(by.id('notes')).typeText(', watching tv');
    await element(by.id('save')).tap();
  });

  it('del post', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('post-edit-0')).swipe('left');

    await element(by.id('post-del-0')).tap();
    await element(by.id('del-ok')).tap();
  });
});
