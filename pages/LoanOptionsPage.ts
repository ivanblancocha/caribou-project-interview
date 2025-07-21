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
    try {
      await this.isElementVisible(this.loanOptions.getByRole('button', { name: 'Select' }), 20000);
    } catch (error) {
      console.log('Error waiting for loan options to load', error);
      throw error;
    }
  }

  async selectHSBCButton(): Promise<void> {
    try {
      await this.waitForLoanOptionsToLoad();
      await this.clickWithRetry(this.selectHSBCOption);
    } catch (error) {
      console.log('Error selecting HSBC loan option', error);
      throw error;
    }
  }

  async selectHSBCLoan(): Promise<void> {
    try {
      await this.selectHSBCButton();
      
    } catch (error) {
      console.log('Error selecting loan option', error);
      throw error;
    }
    
  }


} 