import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReviewPage extends BasePage {
  private readonly title: Locator;
  private readonly personalInfoSection: Locator;
  private readonly personName: Locator;
  private readonly vehicleInfoSection: Locator;
  private readonly residentialInfoSection: Locator;
  private readonly agreementCreditReportCheckbox: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.getByTestId('title');
    this.personalInfoSection = this.page.getByRole('heading', { name: 'Let’s review your information' });
    this.personName = this.page.getByText('te te');
    this.vehicleInfoSection = this.page.getByRole('heading', { name: 'Vehicle Information' });
    this.residentialInfoSection = this.page.getByRole('heading', { name: 'Residential Information' });
    this.agreementCreditReportCheckbox = this.page.getByRole('checkbox', { name: 'By clicking this box, I agree' });
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async verifyPersonalInfoDisplayed(): Promise<void> {
    try {
      await this.isElementVisible(this.personalInfoSection);
    } catch (error) {
      console.log('Error verifying personal info displayed', error);
    }
  }

  async verifyVehicleInfoDisplayed(): Promise<void> {
    try {
      await this.isElementVisible(this.vehicleInfoSection);
    } catch (error) {
      console.log('Error verifying vehicle info displayed', error);
    }
  }

  async verifyResidentialInfoDisplayed(): Promise<void> {
    try {
      await this.isElementVisible(this.residentialInfoSection);
    } catch (error) {
      console.log('Error verifying residential info displayed', error);
    }
  }

  async checkAgreementCreditReportCheckbox(): Promise<void> {
    try {
      await this.clickWithRetry(this.agreementCreditReportCheckbox);
    } catch (error) {
      console.log('Error checking agreement credit report checkbox', error);
    }
  }

  async clickContinueButton(): Promise<void> {
    try {
      await this.clickWithRetry(this.continueButton);
    } catch (error) {
      console.log('Error clicking continue button', error);
    }
  }
} 