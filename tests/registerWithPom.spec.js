import { test, expect } from '@playwright/test';
import RegisterPage from '../POM/RegisterPage.js';


function generateEmail(prefix = 'aqa') {
  return `${prefix}${Date.now()}@test.com`;
}

test.describe('Registration form with HTTP auth', () => {

  test('Successful registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.gotoRegisterForm();

    const email = generateEmail();
    await registerPage.registerUser({
      firstName: 'Anastasiia',
      lastName: 'Berezova',
      email,
      password: 'Pass1199!',
      confirmPassword: 'Pass1199!'
    });

    await expect(registerPage.successGarageHeading).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*panel\/garage/);
  });

  test('Empty Last Name', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.gotoRegisterForm();

    const email = generateEmail();
    await registerPage.fillForm({
      firstName: 'Anastasiia',
      lastName: '', 
      email,
      password: 'Qwerty123!',
      confirmPassword: 'Qwerty123!'
    });

    await registerPage.triggerValidation('lastName');
    await expect(registerPage.getError('signupLastName')).toHaveText(/Last name required/i);
  });

  test('Invalid Email format', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.gotoRegisterForm();

    await registerPage.fillForm({
      firstName: 'Anastasiia',
      lastName: 'Test',
      email: `invalid-email${Date.now()}`, 
      password: 'Qwerty123!',
      confirmPassword: 'Qwerty123!'
    });

    await registerPage.triggerValidation('email');
    await expect(registerPage.getError('signupEmail')).toHaveText(/email/i);
  });

  test('Password mismatch', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.gotoRegisterForm();

    const email = generateEmail();
    await registerPage.fillForm({
      firstName: 'Anastasiia',
      lastName: 'Test',
      email,
      password: 'Pass1199!',
      confirmPassword: 'Pass1189!'
    });

    await registerPage.triggerValidation('confirmPassword');
    await expect(registerPage.getError('signupRepeatPassword')).toHaveText(/Passwords do not match/i);
  });

  test('Password too short', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.gotoRegisterForm();

    const email = generateEmail();
    await registerPage.fillForm({
      firstName: 'Anastasia',
      lastName: 'Test',
      email,
      password: '123',
      confirmPassword: '123'
    });

    await registerPage.triggerValidation('password');
    await expect(registerPage.getError('signupPassword')).toHaveText(/Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/i);
  });

  test('User already exists', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.gotoRegisterForm();

    await registerPage.fillForm({
      firstName: 'Anastasiia',
      lastName: 'Berezova',
      email: 'naste38+1@gmail.com', // существующий
      password: 'Pass112233!',
      confirmPassword: 'Pass112233!'
    });

    await registerPage.submit();
    await expect(registerPage.errorAlert).toHaveText(/User already exists/i);
  });

});
