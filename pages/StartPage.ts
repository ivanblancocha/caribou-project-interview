import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class StartPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly confirmEmailInput: Locator;
  private readonly birthdayInput: Locator;
  private readonly residenceStatusSelector: Locator;
  private readonly phoneInput: Locator;
  private readonly currentLoanNo: Locator;
  private readonly currentLoanYes: Locator;
  private readonly continueButton: Locator;
  private readonly errorElement: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.page.getByTestId('firstName');
    this.lastNameInput = this.page.getByTestId('lastName');
    this.emailInput = this.page.getByTestId('emailAddress');
    this.confirmEmailInput = this.page.getByTestId('confirmEmailAddress');
    this.birthdayInput = this.page.getByTestId('birthdate');
    this.residenceStatusSelector = this.page.getByTestId('citizenship');
    this.phoneInput = this.page.getByTestId('cellPhone');
    this.currentLoanNo = this.page.getByTestId('radio-no-one-else');
    this.currentLoanYes = this.page.getByTestId('radio-yes-one-else');
    this.continueButton = this.page.getByTestId('personal-info-submit');
    this.errorElement = this.page.locator('div[type="error"]');
  }

  async completeFirstName(firstName: string): Promise<void> {
    try {
      await this.fillWithRetry(this.firstNameInput, firstName);
    } catch (error) {
      console.log('Error completing first name', error);
      throw error;
    }
  }

  async completeLastName(lastName: string): Promise<void> {
    try {
      await this.fillWithRetry(this.lastNameInput, lastName);
    } catch (error) {
      console.log('Error completing last name', error);
      throw error;
    }
  }

  async completeEmail(email: string): Promise<void> {
    try {
      await this.fillWithRetry(this.emailInput, email);
    } catch (error) {
      console.log('Error completing email', error);
      throw error;
    }
  }

  async completeConfirmEmail(confirmEmail: string): Promise<void> {
    try {
      await this.fillWithRetry(this.confirmEmailInput, confirmEmail);
    } catch (error) {
      console.log('Error completing confirm email', error);
      throw error;
    }
  }

    async completeBirthday(birthday: string): Promise<void> {
      try {
        await this.fillWithRetry(this.birthdayInput, birthday);
      } catch (error) {
        console.log('Error completing birthday', error);
        throw error;
      }
    }

    async selectResidenceStatus(status: string): Promise<void> {
      try {
        await this.selectOptionWithRetry(this.residenceStatusSelector, status);
      } catch (error) {
        console.log('Error selecting residence status', error);
        throw error;
      }
    }

    async completePhone(phone: string): Promise<void> {
      try {
        await this.fillWithRetry(this.phoneInput, phone);
      } catch (error) {
        console.log('Error completing phone', error);
        throw error;
      }
    }

    async completeCurrentLoan(answer: "No" | "Yes" = "No"): Promise<void> {
      try {
        if (answer === "No") {
          await this.clickWithRetry(this.currentLoanNo);
        } else {
          await this.clickWithRetry(this.currentLoanYes);
        }
      } catch (error) {
        console.log("Error completing current loan", error);
        throw error;
      }
     
    }

    async clickContinueButton(): Promise<void> {
      try {
        await this.continueButton.scrollIntoViewIfNeeded();
        await this.clickWithRetry(this.continueButton);
      } catch (error) {
        console.log('Error clicking continue button', error);
        throw error;
      }
    }

    async completeForm(
      firstName: string,
      lastName: string,
      email: string, 
      confirmEmail: string, 
      birthday: string, 
      status: string, 
      phone: string, 
      loanNo: string): Promise<void> {
      try {
        await this.completeFirstName(firstName);
        await this.completeLastName(lastName);
        await this.completeEmail(email);
        await this.completeConfirmEmail(confirmEmail);
        await this.completeBirthday(birthday);
        await this.selectResidenceStatus(status);
        await this.completePhone(phone);
        await this.completeCurrentLoan();
        
      } catch (error) {
        console.log('Error completing form', error);
        throw error;
      }
        
    }

  /**
   * Check if error element is visible
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorElement);
  }

  /**
   * Complete personal information form with retry mechanism
   * Retries the entire flow with page reload if error element is visible
   */
  async completeFormWithRetry(
    personalInfo:() => {
      firstName: string;
      lastName: string;
      email: string;
      birthday: string;
      phone: string;
    },
    status: string,
    loanNo: string,
    maxRetries: number = 5
  ): Promise<void> {

    await this.retryStep(async () => {
      const uniqueEmail = personalInfo().email;
        // Complete the form
        await this.completeForm(
           personalInfo().firstName,
           personalInfo().lastName,
           uniqueEmail, 
           uniqueEmail, 
           personalInfo().birthday, 
           status, 
           personalInfo().phone, 
           loanNo
        );
        await this.clickContinueButton();

    }, async () => {
      const errorVisible = await this.isErrorVisible();
      return errorVisible;
    }, 'Complete personal information form', maxRetries);
    
  }

}