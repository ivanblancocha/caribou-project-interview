import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DetailsPage extends BasePage {

  private readonly streetAddressInput: Locator;
  private readonly apartmentNumberInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateSelector: Locator;
  private readonly zipCodeInput: Locator;
  private readonly employmentStatusSelector: Locator;
  private readonly streetAddressOptions: Locator;
  private readonly continueButton: Locator;
  private readonly howLongLivedThereInYearsInput: Locator;
  private readonly howLongLivedThereInMonthsInput: Locator;
  private readonly rentOrOwnSelector: Locator;
  private readonly monthlyRentMortgageInput: Locator;
  private readonly yearlyIncomeInput: Locator;

  constructor(page: Page) {
    super(page);
    this.streetAddressInput = this.page.locator('//input[@name="address"]');
    this.apartmentNumberInput = this.page.getByRole('textbox', { name: 'Suite #' });
    this.cityInput = this.page.locator('//input[@name="city"]');
    this.stateSelector = this.page.locator('select[name="state"]');
    this.zipCodeInput = this.page.getByRole('textbox', { name: 'digit zip code' });
    this.streetAddressOptions = this.page.locator('.pac-container div.pac-item');
    this.howLongLivedThereInYearsInput = this.page.locator('select[name="livedInAddress.years"]');
    this.howLongLivedThereInMonthsInput = this.page.locator('select[name="livedInAddress.months"]');
    this.rentOrOwnSelector = this.page.locator('select[name="rentOrOwn"]');
    this.monthlyRentMortgageInput = this.page.locator('input[name="monthlyPayment"]');
    this.employmentStatusSelector = this.page.locator('select[name="employmentStatus"]');
    this.yearlyIncomeInput = this.page.locator('input[name="yearlyIncome"]');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async completeStreetAddress(address: string): Promise<void> {
    try {
          await this.clickWithRetry(this.streetAddressInput);
          await this.streetAddressInput.fill(address);
          if(await this.streetAddressOptions.nth(0).isVisible()){
            await this.clickWithRetry(this.streetAddressOptions.nth(0));
          }
      } catch (error) {
        console.log('Error completing street address', error);
      }
  }
    

  async completeApartmentNumber(apartmentNumber: string): Promise<void> {
    try {
      await this.fillWithRetry(this.apartmentNumberInput, apartmentNumber);
    } catch (error) {
      console.log('Error completing apartment number', error);
    }
  }

  async completeCity(city: string): Promise<void> {
    try {
      if(await this.cityInput.textContent() === ''){
        await this.fillWithRetry(this.cityInput, city);
      }
    } catch (error) {
      console.log('Error completing city', error);
    }
  }

  async selectState(state: string): Promise<void> {
    try {
      if(await this.stateSelector.inputValue() === ''){
        await this.selectOptionWithRetry(this.stateSelector, state);
      }
    } catch (error) {
      console.log('Error selecting state', error);
    }
    
  }

  async completeZipCode(zipCode: string): Promise<void> {
    try {
      if(await this.zipCodeInput.textContent() === ''){
        await this.fillWithRetry(this.zipCodeInput, zipCode);
      }
    } catch (error) {
      console.log('Error completing zip code', error);
    }
    
  }

  async selectYearsLivedThere(years: string): Promise<void> {
    try {
      await this.selectOptionWithRetry(this.howLongLivedThereInYearsInput, years);
      
    } catch (error) {
      console.log('Error selecting years lived there', error);
    }
  }

  async selectMonthsLivedThere(months: string): Promise<void> {
    try {
      await this.selectOptionWithRetry(this.howLongLivedThereInMonthsInput, months);
    } catch (error) {
      console.log('Error selecting months lived there', error);
    }
  }

  async selectRentOrOwn(rentOrOwn: string): Promise<void> {
    try {
      await this.selectOptionWithRetry(this.rentOrOwnSelector, rentOrOwn);
    } catch (error) {
      console.log('Error selecting rent or own', error);
    }
  }

  async completeMonthlyRentMortgage(monthlyRentMortgage: string): Promise<void> {
    try {
      await this.fillWithRetry(this.monthlyRentMortgageInput, monthlyRentMortgage);
    } catch (error) {
      console.log('Error completing monthly rent mortgage', error);
    }
  }

  async selectEmploymentStatus(status: string): Promise<void> {
    try {
      await this.selectOptionWithRetry(this.employmentStatusSelector, status);
    } catch (error) {
      console.log('Error selecting employment status', error);
    }
  }

  async completeAnnualIncome(income: string): Promise<void> {
    try {
      await this.fillWithRetry(this.yearlyIncomeInput, income);  
    } catch (error) {
      console.log('Error completing annual income', error);
    }
  }

  async clickContinueButton(): Promise<void> {
    try {
      await this.clickWithRetry(this.continueButton);
    } catch (error) {
      console.log('Error clicking continue button', error);
    }
  }

  async completeDetailsForm(
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string
  ): Promise<void> {
    try {
      await this.completeStreetAddress(streetAddress);
      await this.completeCity(city);
      await this.selectState(state);
      await this.completeZipCode(zipCode);
    } catch (error) {
      console.log('Error completing details form', error);
      throw error;
    }
  }

  async completeHowLongLivedThere(
    howLongLivedThereInYears: any,
    howLongLivedThereInMonths: any, 
    rentOrOwn: any, 
    monthlyRentMortgage: any, 
    employmentStatus: string, 
    yearlyIncome: any) {
    try {
      await this.selectYearsLivedThere(howLongLivedThereInYears);
      await this.selectMonthsLivedThere(howLongLivedThereInMonths);
      await this.selectRentOrOwn(rentOrOwn);
      await this.completeMonthlyRentMortgage(monthlyRentMortgage);
      await this.selectEmploymentStatus(employmentStatus);
      await this.completeAnnualIncome(yearlyIncome);
    } catch (error) {
      console.log('Error completing how long lived there', error);
      throw error;
    }
  }
} 