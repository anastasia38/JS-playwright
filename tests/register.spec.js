import { test, expect } from '@playwright/test';

function generateEmail(prefix = 'aqa') {
  return `${prefix}${Date.now()}@test.com`;
}

test.describe('Registration form with HTTP auth', () => {

  test.beforeEach(async ({ page }) => {
    // HTTP Basic Auth
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });


  test('Successful registration', async ({ page }) => {
    const randomEmail = generateEmail();

    await page.fill('#signupName', 'Anastasiia');
    await page.fill('#signupLastName', 'Berezova');
    await page.fill('#signupEmail', randomEmail);
    await page.fill('#signupPassword', 'Pass1199!');
    await page.fill('#signupRepeatPassword', 'Pass1199!');

    await Promise.all([
      page.waitForURL(/.*panel\/garage/),
      page.getByRole('button', { name: 'Register' }).click()
    ]);

    const garageHeading = page.getByRole('heading', { name: 'Garage', exact: true });
    await expect(garageHeading).toBeVisible({ timeout: 10000 });
  });


  test('Registration with empty Last Name', async ({ page }) => {
  const randomEmail = generateEmail();
  await page.fill('#signupName', 'Anastasiia');
  await page.fill('#signupEmail', randomEmail);
  await page.fill('#signupPassword', 'Pass1199!');
  await page.fill('#signupRepeatPassword', 'Pass1199!');

  const lastNameField = page.locator('#signupLastName');
  await lastNameField.focus();
  await lastNameField.evaluate(el => el.blur());

  const lastNameError = page.locator('#signupLastName + .invalid-feedback');
  await expect(lastNameError).toHaveText(/Last name required/i);
});


  test('Invalid email format', async ({ page }) => {
    await page.fill('#signupName', 'User');
    await page.fill('#signupLastName', 'Test');
    await page.fill('#signupEmail', 'naste38+1gmail.com');
    await page.fill('#signupPassword', 'Qwerty123!');
    await page.fill('#signupRepeatPassword', 'Qwerty123!');
    await expect(page.locator('#signupEmail + .invalid-feedback')).toHaveText(/Email is incorrect/i);
  });

  test('Password mismatch', async ({ page }) => {
    await page.fill('#signupName', 'Anastasiia');
    await page.fill('#signupLastName', 'Test');
    await page.fill('#signupEmail', generateEmail());
    await page.fill('#signupPassword', 'Pass1199!');
    await page.fill('#signupRepeatPassword', 'Pass1189!');
    const repeatPasswordInput = page.locator('#signupRepeatPassword');
    await repeatPasswordInput.focus();
    await repeatPasswordInput.evaluate(el => el.blur());
    await expect(page.locator('#signupRepeatPassword + .invalid-feedback')).toHaveText(/Passwords do not match/i);
  });

  test('Password too short', async ({ page }) => {
    await page.fill('#signupName', 'Anastasiia');
    await page.fill('#signupLastName', 'Test');
    await page.fill('#signupEmail', generateEmail());
    await page.fill('#signupPassword', '123');
    await page.fill('#signupRepeatPassword', '123');
    await expect(page.locator('#signupPassword + .invalid-feedback')).toHaveText(/Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/i);
  });

  test('User already exists', async ({ page }) => {
  await page.fill('#signupName', 'Anastasiia');
  await page.fill('#signupLastName', 'Berezova');
  await page.fill('#signupEmail', 'naste38+1@gmail.com'); 
  await page.fill('#signupPassword', 'Pass112233!');
  await page.fill('#signupRepeatPassword', 'Pass112233!');
  await page.getByRole('button', { name: 'Register' }).click();
  const alert = page.locator('.alert.alert-danger');
  await expect(alert).toHaveText(/User already exists/i);
  });

});


