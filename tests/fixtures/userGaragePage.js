import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
   await page.goto('/panel/garage');
   await use(page);
  },
});

export { expect };
