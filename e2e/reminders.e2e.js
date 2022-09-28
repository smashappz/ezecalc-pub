describe('reminders', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('no reminders', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('reminders')).tap();

    await expect(
      element(
        by.text(
          'Tap on the plus icon at the bottom of the screen to add a new entry',
        ),
      ),
    ).toBeVisible();
    await expect(element(by.id('nodata-pic'))).toBeVisible();
  });

  it('new reminder', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('reminders')).tap();
    await element(by.id('new-post')).tap();

    await element(by.id('title')).typeText('This is a reminder');

    await element(by.id('date-picker')).tap();
    await element(by.text('OK')).tap();

    await element(by.id('time-picker')).tap();
    await element(by.text('OK')).tap();

    await element(by.id('recur-picker')).tap();
    await element(by.id('recur-On')).multiTap(2);

    await element(by.id('freq-picker')).tap();
    await element(by.id('freq-Weekly')).multiTap(2);

    await element(by.id('interval')).replaceText('2');
    await element(by.id('interval')).tapReturnKey();

    await element(by.id('enddate-picker')).tap();
    await element(by.text('Cancel')).tap();

    await element(by.id('kind-picker')).tap();
    await element(by.id('kind-Appointment')).multiTap(2);

    await element(by.id('description')).typeText('This is a description');
    // await element(by.id("location")).typeText("London");

    await element(by.id('save')).tap();
  });

  // it("check reminder", async () => {
  //   await element(by.id("diary-tab")).tap();
  //   await element(by.id("reminders")).tap();

  //   await element(by.id("reminder-expand-0")).tap();

  //   await expect(element(by.text("This is a reminder"))).toBeVisible();
  //   await expect(element(by.text("On"))).toBeVisible();
  //   await expect(element(by.text("Weekly"))).toBeVisible();
  //   await expect(element(by.text("2"))).toBeVisible();
  //   await expect(element(by.text("Appointment"))).toBeVisible();
  //   await expect(element(by.text("This is a description"))).toBeVisible();
  // });

  it('reminder buttons', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('reminders')).tap();

    await element(by.id('reminder-expand-0')).tap();

    await element(by.id('reminder-speak-0')).tap();
    // await element(by.id("post-share-0")).tap();

    await element(by.id('reminder-less-0')).tap();
  });

  it('edit reminder', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('reminders')).tap();

    await element(by.id('reminder-edit-0')).tap();
    await element(by.id('title')).replaceText('This is an updated reminder');

    await element(by.id('date-picker')).tap();
    await element(by.text('OK')).tap();

    await element(by.id('time-picker')).tap();
    await element(by.text('OK')).tap();

    await element(by.id('kind-picker')).tap();
    await element(by.id('kind-Medication')).multiTap(2);

    await element(by.id('scroll-reminder')).scrollTo('bottom');
    await element(by.id('location')).typeText('London');

    await element(by.id('save')).tap();
  });

  it('del reminder', async () => {
    await element(by.id('diary-tab')).tap();
    await element(by.id('reminders')).tap();

    await element(by.id('reminder-edit-0')).swipe('left');

    await element(by.id('reminder-del-0')).tap();
    await element(by.id('del-ok')).tap();
  });
});
