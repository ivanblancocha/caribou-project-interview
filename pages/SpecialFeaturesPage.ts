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
    await this.isElementVisible(this.featureTitle);
  }

  async verifyContinueButtonDisplayed(): Promise<void> {
    await this.isElementVisible(this.continueButton);
  }

  async getFeatureTitleText(): Promise<string> {
    await this.isElementVisible(this.featureTitle);
    return await this.featureTitle.textContent() || '';
  }
} 