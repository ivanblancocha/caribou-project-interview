import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SpecialFeaturesPage extends BasePage {
  private readonly featureTitle: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.featureTitle = this.page.getByText(`Select your car’s special features`);
    this.continueButton = this.page.getByTestId('features-continue');
  }

  async verifyFeatureTitleDisplayed(): Promise<void> {
    try {
      await this.isElementVisible(this.featureTitle);
    } catch (error) {
      console.log('Error verifying feature title displayed', error);
    }
  }

  async verifyContinueButtonDisplayed(): Promise<void> {
    try {
      await this.isElementVisible(this.continueButton);
    } catch (error) {
      console.log('Error verifying continue button displayed', error);
    }
  }

  async getFeatureTitleText(): Promise<string> {
    try {
      await this.isElementVisible(this.featureTitle);
      return await this.featureTitle.textContent() || '';
    } catch (error) {
      console.log('Error getting feature title text', error);
      throw error;
    }
  }
} 