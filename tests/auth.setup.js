import { test as base } from '@playwright/test';
import { testUser } from '../test-data/user.js';

base('login and save storage state', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  const page = await context.newPage();
  await page.goto('https://qauto.forstudy.space/');
  await page.waitForSelector('text=Sign In', { state: 'visible', timeout: 30000 });
  await page.click('text=Sign In');
  await page.waitForSelector('#signinEmail', { state: 'visible', timeout: 30000 });
  await page.fill('#signinEmail', testUser.email);
  await page.waitForSelector('#signinPassword', { state: 'visible', timeout: 30000 });
  await page.fill('#signinPassword', testUser.password);
  await page.waitForSelector('text=Login', { state: 'visible', timeout: 30000 });
  await page.click('text=Login');
  await page.waitForSelector('text=Add car', { state: 'visible', timeout: 60000 });
  await context.storageState({ path: 'storageState.json' });

  await context.close();
});
