let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 60000);
});

describe("Github page tests - 2", () => {
    beforeEach(async () => {
      await page.goto("https://github.com/");
    });

    test("Team page header content'", async () => {
      const link = await page.$(".HeaderMenu a.HeaderMenu-link");
      await link.click();
      await page.waitForSelector("h1");
      const title = await page.title();
      expect(title).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
    }, 60000);

    test("Enterprise page header content'", async () => {
        const linkArr = await page.$$(".HeaderMenu a.HeaderMenu-link");
        const link = linkArr[1];
        await link.click();
        await page.waitForSelector("h1");
        const title = await page.title();
        expect(title).toEqual("Enterprise · A smarter way to work together · GitHub");
      }, 60000);

      test("Marketplace page header content'", async () => {
        const linkArr = await page.$$(".HeaderMenu a.HeaderMenu-link");
        const link = linkArr[2];
        await link.click();
        await page.waitForSelector("h1");
        const title = await page.title();
        expect(title).toEqual("GitHub Marketplace · to improve your workflow · GitHub");
      }, 60000);
  });

describe("Netology page tests", () => {
  beforeEach(async () => {
    await page.goto("https://netology.ru/programs/qa-middle#/");
  }, 60000);

    test("The title should be correct", async () => {
      const title = await page.title();
      expect(title).toEqual("Тестировщик – обучение QA-инженеров на курсе в Нетологии");
    }, 60000);

    test("The page should contain 'Job Hunt' button", async () => {
      const btnSelector = "[name='jobHuntButtonText']";
      await page.waitForSelector(btnSelector, {
        visible: true,
      });
      const actual = await page.$eval(btnSelector, (link) => link.textContent);
      expect(actual).toContain("Включает программу трудоустройства");
    }, 60000);

  test("Should go back to main page from footer", async () => {
    const netologyFooterArr = await page.$$("[id='app'] div>div>div>div>div>a");
    const link = netologyFooterArr[4];
    await link.click();
    await page.waitForSelector("h1", {
        visible: true,
        timeout: 100000,
    });
    const title = await page.title();
    await expect(title).toEqual("Нетология - курсы и обучение интернет-профессиям онлайн");
  }, 60000);
});
