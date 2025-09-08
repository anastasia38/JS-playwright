export class BasePage {
  constructor(page, path = '/') {  
    this.page = page;
    this.path = path;
  }

  async goto() {
    await this.page.goto(`https://guest:welcome2qauto@qauto.forstudy.space${this.path}`);
  }
}
