import { BasePage } from './basePage.js';

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page, '/');   
    this.page = page;

    this.signUpButton = this.page.getByRole('button', { name: 'Sign up' });
    this.nameInput = this.page.locator('#signupName');
    this.lastNameInput = this.page.locator('#signupLastName');
    this.emailInput = this.page.locator('#signupEmail');
    this.passwordInput = this.page.locator('#signupPassword');
    this.repeatPasswordInput = this.page.locator('#signupRepeatPassword');
    this.registerButton = this.page.getByRole('button', { name: 'Register' });
    this.successGarageHeading = this.page.getByRole('heading', { name: 'Garage', exact: true });
    this.errorAlert = this.page.locator('.alert.alert-danger');

    this.firstNameError = this.page.locator('#signupName + .invalid-feedback');
    this.lastNameError = this.page.locator('#signupLastName + .invalid-feedback');
    this.emailError = this.page.locator('#signupEmail + .invalid-feedback');
    this.passwordError = this.page.locator('#signupPassword + .invalid-feedback');
    this.repeatPasswordError = this.page.locator('#signupRepeatPassword + .invalid-feedback');
  }


  async gotoRegisterForm() {
    await this.goto(); 
    await this.signUpButton.click();
  }

  async fillForm({ firstName, lastName, email, password, confirmPassword }) {
    if (firstName !== undefined) await this.nameInput.fill(firstName);
    if (lastName !== undefined) await this.lastNameInput.fill(lastName);
    if (email !== undefined) await this.emailInput.fill(email);
    if (password !== undefined) await this.passwordInput.fill(password);
    if (confirmPassword !== undefined) await this.repeatPasswordInput.fill(confirmPassword);
  }

  async submit() {
    await this.registerButton.click();
  }

  async triggerValidation(field) {
    const map = {
      firstName: this.nameInput,
      lastName: this.lastNameInput,
      email: this.emailInput,
      password: this.passwordInput,
      confirmPassword: this.repeatPasswordInput,
    };
    const el = map[field];
    await el.focus();
    await el.evaluate(e => e.blur());
  }

  async registerUser({ firstName, lastName, email, password, confirmPassword }) {
    await this.fillForm({ firstName, lastName, email, password, confirmPassword });
    await this.submit();
  }

  getError(errorKey) {
    const map = {
      signupName: this.firstNameError,
      signupLastName: this.lastNameError,
      signupEmail: this.emailError,
      signupPassword: this.passwordError,
      signupRepeatPassword: this.repeatPasswordError,
    };
    return map[errorKey];
  }
}

export default RegisterPage;
