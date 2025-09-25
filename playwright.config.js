import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'setup',                   
      testMatch: /.*\.setup\.js/,     
    },
    {
      name: 'chromium',
      use: {
        storageState: 'storageState.json',
        baseURL: 'https://guest:welcome2qauto@qauto.forstudy.space/'

      },
    },
  ],
});
