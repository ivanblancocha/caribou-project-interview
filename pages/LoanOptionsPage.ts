import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoanOptionsPage extends BasePage {
  private readonly loanOptions: Locator;
  private readonly hsbcOption: Locator;
  private readonly selectHSBCOption: Locator;

  constructor(page: Page) {
    super(page);
    this.loanOptions = this.page.locator('div.css-gg4vpm', { hasText: 'Hsbc Auto' });
    this.selectHSBCOption = this.loanOptions.filter({ hasText: 'Hsbc Auto' }).getByRole('button', { name: 'Select' });
  }

  async waitForLoanOptionsToLoad(): Promise<void> {
    await this.isElementVisible(this.loanOptions.getByRole('button', { name: 'Select' }), 20000);
  }

  async selectHSBCButton(): Promise<void> {
    await this.waitForLoanOptionsToLoad();
    await this.clickWithRetry(this.selectHSBCOption);
  }

  async selectHSBCLoan(): Promise<void> {
    await this.selectHSBCButton();
  }


} 