import { test, expect } from './fixtures/userGaragePage.js';

test('user is redirected to garage after login', async ({ userGaragePage }) => {
  await expect(userGaragePage).toHaveURL('https://qauto.forstudy.space/panel/garage');

  const addCarBtn = userGaragePage.locator('text=Add car');
  const addCarExists = await addCarBtn.count();
  expect(addCarExists).toBeGreaterThan(0);
});