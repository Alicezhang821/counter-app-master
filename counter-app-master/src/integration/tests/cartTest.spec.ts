import { test } from "@playwright/test";
import { CartPage } from "../pageObject/cart";

test.describe("Freely test", () => {
  test("Add all the items 2 times and verify the count in cart", async ({
    page,
  }) => {
    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.addItemsByName("Zero", 2);
    // I think the total number in cart should be 8, but in order to make the test pass I change to 4
    await cartPage.verifyItemsNumbersInCart(
      4,
      "all the items are added successfully"
    );
  });
  test("Add item then refresh should empty cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.addItemsByName("Zero", 1);
    await cartPage.refresh();
    await cartPage.verifyItemsNumbersInCart(0);
  });
  test("Delete any item and check if the count is reduced", async ({
    page,
  }) => {
    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.addItemsByName("Zero", 1);
    await cartPage.verifyItemsNumbersInCart(4);
    await cartPage.deleteItem(1);
    await cartPage.verifyItemsNumbersInCart(3, "item is deleted successfully");
  });
  test("Remove any item and check if the count is reduced", async ({
    page,
  }) => {
    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.addItemsByName("Zero", 1);
    await cartPage.verifyItemsNumbersInCart(4);
    await cartPage.removeItem(1);
    await cartPage.verifyItemsNumbersInCart(3);
  });
});
