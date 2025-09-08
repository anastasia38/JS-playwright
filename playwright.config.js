import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config({ path: process.env.ENV_PATH || '.env.local' });

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  },
});
