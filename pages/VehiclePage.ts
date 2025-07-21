import {Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class VehiclePage extends BasePage{
  private readonly radioLicensePlate: Locator;
  private readonly licPlateInput: Locator;
  private readonly stateSelector: Locator;
  private readonly howMuchOweInput: Locator;
  private readonly vehiclesMilesInput: Locator;
  private readonly monthlyCarPaymentInput: Locator;
  private readonly continueButton: Locator;
  private readonly carFoundHeading: Locator;
  private readonly errorElement: Locator;

  constructor(page: Page) {
    super(page);
    this.radioLicensePlate = this.page.getByTestId('radio-license-plate');
    this.licPlateInput = this.page.getByTestId('input-license-plate-number');
    this.stateSelector = this.page.getByTestId('select-license-plate-state');
    this.howMuchOweInput = this.page.getByTestId('input-loan-value');
    this.vehiclesMilesInput = this.page.getByTestId('input-estimated-mileage');
    this.monthlyCarPaymentInput = this.page.getByTestId('input-estimated-monthly-payment');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.carFoundHeading = this.page.getByRole('heading', { name: 'We\'ve found your car!' });
    this.errorElement = this.page.locator('div[type="error"]');
  }
    async selectVehicleLicPlateType(): Promise<void> {
        try {
            await this.radioLicensePlate.check();
        } catch (error) {
            console.log('Error selecting vehicle license plate type', error);
            throw error;
        }
    }

    async completeLicensePlate(plate: string): Promise<void> {
        try {
            await this.fillWithRetry(this.licPlateInput, plate);
        } catch (error) {
            console.log('Error completing license plate', error);
        }
    }

    async selectState(state: string): Promise<void> {
        try {
            await this.selectOptionWithRetry(this.stateSelector, state);
        } catch (error) {
            console.log('Error selecting state', error);
        }
    }

    async completeHowMuchOwe(amount: string): Promise<void> {
        try {
            await this.fillWithRetry(this.howMuchOweInput, amount);
        } catch (error) {
            console.log('Error completing how much owe', error);
        }
    }

    async completeVehiclesMiles(miles: string): Promise<void> {
        try {
            await this.fillWithRetry(this.vehiclesMilesInput, miles);
        } catch (error) {
            console.log('Error completing vehicles miles', error);
        }
    }

    async completeMonthlyCarPayment(payment: string): Promise<void> {
        try {
            await this.fillWithRetry(this.monthlyCarPaymentInput, payment);
        } catch (error) {
            console.log('Error completing monthly car payment', error);
        }
    }

    async clickContinueButton(): Promise<void> {
        try {
           await this.continueButton.scrollIntoViewIfNeeded();
            await this.clickWithRetry(this.continueButton);
        } catch (error) {
            console.log('Error clicking continue button', error);
        }
    }

    async isErrorVisible(): Promise<boolean> {
      return await this.isElementVisible(this.errorElement, 3000);
    }


    async isCarFoundHeadingVisible(): Promise<boolean> {
      return await this.isElementVisible(this.carFoundHeading, 3000);
    }

  /**
   * Complete vehicle information with retry 
   * Retries the entire flow if the "We've found your car!" heading is not visible
   */
  async completeVehicleInfoWithRetry(vehicleData: {
    licensePlate: string;
    state: string;
    howMuchOwe: string;
    vehiclesMiles: string;
  }, maxRetries: number = 3): Promise<void> {

    await this.retryStep(async () => {
      // Complete the vehicle information form
      await this.selectVehicleLicPlateType();
      await this.completeLicensePlate(vehicleData.licensePlate);
      await this.selectState(vehicleData.state);
      await this.completeHowMuchOwe(vehicleData.howMuchOwe);
      await this.completeVehiclesMiles(vehicleData.vehiclesMiles);

    }, async () => {
      const errorVisible = await this.isErrorVisible();
      const headingVisible = await this.isCarFoundHeadingVisible();
      return errorVisible || !headingVisible;
    }, 'Complete vehicle information', maxRetries);

    
    await this.retryStep(async () => {
      await this.clickContinueButton();
    }, async () => {
      const errorVisible = await this.isErrorVisible();
      return errorVisible;
    }, 'Click continue button', maxRetries);
  }
}