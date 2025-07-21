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
    await this.isElementVisible(this.personalInfoSection);
  }

  async verifyVehicleInfoDisplayed(): Promise<void> {
    await this.isElementVisible(this.vehicleInfoSection);
  }

  async verifyResidentialInfoDisplayed(): Promise<void> {
    await this.isElementVisible(this.residentialInfoSection);
  }

  async checkAgreementCreditReportCheckbox(): Promise<void> {
    await this.clickWithRetry(this.agreementCreditReportCheckbox);
  }

  async clickContinueButton(): Promise<void> {
    await this.clickWithRetry(this.continueButton);
  }
} 