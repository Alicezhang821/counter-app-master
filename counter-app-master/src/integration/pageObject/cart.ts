import type { Page } from "playwright";
export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async open() {
    await this.page.goto("http://localhost:3000/");
  }

  addItemsByName = async (name: string, times: number) => {
    const elements = this.page.locator(
      `//span[normalize-space()='${name}']/ancestor::div[@class='row']/descendant::i[@class='fa fa-plus-circle']`
    );
    for (const el of await elements.elementHandles()) {
      for (let i = 0; i < times; i++) {
        await el.click();
      }
    }
  };

  addItemWithNumber = async (name: string, number: number) => {
    await this.page
      .locator(`(//:nth-match(:text("${name}"),${number}])`)
      .click();
  };

  refresh = async () => {
    await this.page.evaluate(() => {
      location.reload(true);
    });
  };

  deleteItem = async (number: number) => {
    await this.page
      .locator(`(//button[@class="btn btn-danger"])[${number}]`)
      .click();
  };

  removeItem = async (number: number) => {
    await this.page
      .locator(`(//i[@class="fa fa-minus-circle"])[${number}]`)
      .click();
  };

  verifyItemsNumbersInCart = async (expected: number, message?: string) => {
    // This is what we normally do rather than throw an exception
    // expect(await this.page.locator(".badge-pill").innerText()).toEqual(
    //   `${expected}`
    // );
    if (
      Number(await this.page.locator(".badge-pill").innerText()) === expected
    ) {
      message && console.log(message);
    } else {
      throw "wrong number";
    }
  };
}
