describe('config', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // it("backup", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("backup-btn")).tap();
  //   await expect(element(by.id("last-backup"))).toBeVisible();
  // });

  // it("export", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("export-btn")).tap();
  // });

  // it("restore", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("restore-btn")).tap();
  // });

  it('data', async () => {
    await element(by.id('config-tab')).tap();

    await element(by.id('incremental')).tap();

    // await element(by.id("gdrive")).tap();
    // await expect(element(by.type("android.widget.Button"))).toBeVisible();
  });

  it('app', async () => {
    await element(by.id('config-tab')).tap();
    await element(by.id('scroll-view')).scroll(250, 'down');

    await element(by.id('darkmode')).tap(); // light
    await element(by.id('darkmode')).tap(); // dark

    await element(by.id('extraResults')).tap();
    await element(by.id('extraResults')).tap();
  });

  it('pin code', async () => {
    await element(by.id('config-tab')).tap();
    await element(by.id('scroll-view')).scroll(250, 'down');

    await element(by.id('pinSet')).tap();

    await expect(element(by.text('1'))).toBeVisible();
    await expect(element(by.text('2'))).toBeVisible();
    await expect(element(by.text('3'))).toBeVisible();
    await expect(element(by.text('4'))).toBeVisible();
    await expect(element(by.text('5'))).toBeVisible();
    await expect(element(by.text('6'))).toBeVisible();
    await expect(element(by.text('7'))).toBeVisible();
    await expect(element(by.text('8'))).toBeVisible();
    await expect(element(by.text('9'))).toBeVisible();

    // // set
    await element(by.text('1')).tap();
    await element(by.text('2')).tap();
    await element(by.text('3')).tap();
    await element(by.text('4')).tap();

    await element(by.text('1')).tap();
    await element(by.text('2')).tap();
    await element(by.text('3')).tap();
    await element(by.text('4')).tap();

    await element(by.id('pinBack')).tap();
    await element(by.id('pinBack')).tap();

    // // change
    await element(by.id('pinSet')).tap();

    await element(by.text('1')).tap();
    await element(by.text('2')).tap();
    await element(by.text('3')).tap();
    await element(by.text('4')).tap();

    await element(by.text('5')).tap();
    await element(by.text('6')).tap();
    await element(by.text('7')).tap();
    await element(by.text('8')).tap();

    await element(by.text('5')).tap();
    await element(by.text('6')).tap();
    await element(by.text('7')).tap();
    await element(by.text('8')).tap();

    // // unset
    await element(by.id('pinDel')).tap();

    await element(by.text('5')).tap();
    await element(by.text('6')).tap();
    await element(by.text('7')).tap();
    await element(by.text('8')).tap();

    await element(by.id('dialog-pin-remove')).tap();
  });

  // it("rating", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("scroll-view")).scrollTo("bottom");

  //   await element(by.id("rating")).tap();
  //   // await expect(element(by.label("ezeBP"))).toBeVisible();
  // });

  // it("privacy", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("scroll-view")).scrollTo("bottom");

  //   await element(by.id("privacy1")).tap();
  //   // await expect(element(by.label("Privacy Policy"))).toBeVisible();
  // });

  // it("recommend", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("scroll-view")).scrollTo("bottom");

  //   await element(by.id("recommend")).tap();
  //   // await expect(element(by.text("Hi, I use ezebp for Android, and would happily recommend it to you!"))).toBeVisible();
  // });

  // it("feedback", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("scroll-view")).scrollTo("bottom");

  //   await element(by.id("feedback")).tap();
  //   // await expect(element(by.text("Feedback on ezebp"))).toBeVisible();
  // });

  it('consent', async () => {
    await element(by.id('config-tab')).tap();
    await element(by.id('scroll-view')).scrollTo('bottom');

    await element(by.id('consent')).tap();
    await element(by.id(Math.random() < 0.5 ? 'yes' : 'no')).tap();
  });

  it('providers', async () => {
    await element(by.id('config-tab')).tap();
    await element(by.id('scroll-view')).scrollTo('bottom');

    await element(by.id('providers')).tap();
    await element(by.id('scroll-view')).scrollTo('bottom');

    await expect(element(by.id('privacy-smash'))).toBeVisible();
  });

  // it("view apps", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("scroll-view")).scrollTo("bottom");

  //   await element(by.id("view-apps")).tap();
  //   // await expect(element(by.label("ezeBP"))).toBeVisible();
  // });

  // it("view ads", async () => {
  //   await element(by.id("config-tab")).tap();
  //   await element(by.id("scroll-view")).scrollTo("bottom");

  //   await element(by.id("view-ads")).tap();
  //   // await expect(element(by.label("ezeBP"))).toBeVisible();
  // });
});
