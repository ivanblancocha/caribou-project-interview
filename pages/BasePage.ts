import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to URL
   */
  protected async navigateTo(url: string): Promise<void> {
    try {
      console.log('Navigating to URL', url);
      if(url !== '' && url !== 'undefined' && url !== 'null'){
        await this.page.goto(url);
        await this.waitForPageLoad();
      } else {
        throw new Error('URL is empty or not defined. Please create or check your .env.staging or .env.production file');
      }
    } catch (error) {
      console.log('Error navigating to URL', error);
      throw error;
    }
  }

  /**
   * Wait for page to be fully loaded
   */
  protected async waitForPageLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('load');
    } catch (error) {
      console.log('Error waiting for page load', error);
      throw error;
    }
  }

  /**
   * Wait for element to be visible
   */
  protected async waitForElement(locator: Locator, timeout = 3000): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      console.log('Error waiting for element to be visible', error);
      throw error;
    }
  }

  /**
   * Click element with retry logic
   */
  protected async clickWithRetry(locator: Locator, maxRetries = 3): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await locator.click();
        return;
      } catch (error) {
        if (i === maxRetries) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Fill input with retry logic
   */
  protected async fillWithRetry(locator: Locator, value: string, maxRetries = 3): Promise<void> {
    for (let attempts = 0; attempts < maxRetries; attempts++) {
      try {
        await locator.fill(value);
        return;
      } catch (error) {
        if (attempts === maxRetries) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  protected async selectOptionWithRetry(locator: Locator, value: string, maxRetries = 3): Promise<void> {
    for (let attempts = 0; attempts < maxRetries; attempts++) {
      try {
        await locator.selectOption(value);
        return;
      } catch (error) {
        if (attempts === maxRetries) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Check if element is visible
   */
  protected async isElementVisible(locator: Locator, timeout = 3000): Promise<boolean> {
    try {
      await locator.waitFor({state: 'attached', timeout});
      await locator.scrollIntoViewIfNeeded(); 
      return await locator.isVisible();
    } catch {
      console.log('Element is not visible');
      return false;
      
    }
  }

  // En BasePage.ts

/**
 * Retry wrapper for steps where errors may appear with delay.
 * Automatically reloads the page and retries the callback.
 */
  async retryStep(
    stepCallback: () => Promise<void>,
    isErrorVisibleCallback: () => Promise<boolean>,
    stepName: string,
    maxRetries: number = 3
  ): Promise<void> {
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        console.log('---------------------------------> Entering retryStep', attempts);
        console.log(`🌀 [${stepName}] Attempt ${attempts + 1} of ${maxRetries}`);

        await stepCallback();

        // Espera por posible error tardío
        await this.page.waitForTimeout(5000);

        const hasError = await isErrorVisibleCallback();
        console.log(`🛑 [${stepName}] Error visible: ${hasError}`);

        if (hasError) {
          throw new Error(`[${stepName}] Error element detected`);
        }

        console.log(`✅ [${stepName}] Step completed successfully`);
        return;

      } catch (error) {

        if (attempts >= maxRetries) {
          console.error(`❌ [${stepName}] Max retries reached`);
          throw error;
        }

        console.warn(`🔁 [${stepName}] Retrying after page reload...`);
        await this.page.reload();
        await this.page.waitForLoadState();

      }
      attempts++;
      console.log('attempts ', attempts);
    }
  }

  
} 