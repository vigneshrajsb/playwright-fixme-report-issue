import {expect, test as base} from "@playwright/test";

const test = base.extend<{ setup: boolean }>({
  setup: async ({ page, }, use, testInfo) => {
    const someValue = true;
    // throwing error on the first test run to demonstrate the issue
    if (testInfo.retry == 0 ) throw Error("setup failed")


    await use(someValue);
  },
});

test.describe("test - fixme report with retry", () => {
  test("with fixme", async ({setup}) => {
    // with fixme() as the test execution stops, the test is marked as failed even though no errors in the fixture execution on retry
      test.fixme()
      expect(1).toBe(1)
  } )

  test("without fixme", async ({setup}) => {
    // this test will be marked flaky as expected since 
    expect(1).toBe(1)
} )
})