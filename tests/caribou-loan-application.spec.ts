import { RandomDataGenerator } from '../utils/randomDataGenerator';
import { test, expect, testData } from '../fixtures/fixture';

test.describe('Caribou Loan Application - Complete Flow', () => {

  testData.forEach((data, index) => {

    test(`Complete loan application flow - Happy Path (Data Set ${index + 1})`, async ({ settingsPage, startPage, vehiclePage, detailsPage, reviewPage, loanOptionsPage, specialFeaturesPage }) => {
      
      await test.step('Step 1: Complete Personal Information Form with Retry', async () => {

        await startPage.completeFormWithRetry(
          () =>RandomDataGenerator.generateRandomePersonalInfo(),
          data.personalInfo.residenceStatus,
          data.personalInfo.currentLoan
        );
      });
  
      await test.step(`Step 2: Complete Vehicle Information with Retry`, async () => {
        await vehiclePage.completeVehicleInfoWithRetry({
          licensePlate: data.vehicleInfo.licensePlate,
          state: data.vehicleInfo.state,
          howMuchOwe: data.vehicleInfo.howMuchOwe,
          vehiclesMiles: data.vehicleInfo.vehiclesMiles
        });
      });
  
     await test.step(`Step 3: Complete Additional Details (Data Set ${index + 1})`, async () => {
        await detailsPage.completeDetailsForm(
          data.detailsInfo.streetAddress,
          data.detailsInfo.city,
          data.detailsInfo.state,
          data.detailsInfo.zipCode
        );
      
      });
  
     await test.step(`Step 4: Complete How long have you lived there? form (Data Set ${index + 1})`, async () => {
        await detailsPage.completeHowLongLivedThere(
          data.housingDetailsInfo.yearsLivedThere,
          data.housingDetailsInfo.monthsLivedThere,
          data.housingDetailsInfo.rentOrOwn,
          data.housingDetailsInfo.monthlyRentMortgage,
          data.housingDetailsInfo.employmentStatus,
          data.housingDetailsInfo.annualIncome
        );
  
        await detailsPage.clickContinueButton();
        
      });
  
    await test.step(`Step 5: Review Information`, async () => {
        await reviewPage.checkAgreementCreditReportCheckbox();
        await reviewPage.clickContinueButton();
      });
  
      await test.step(`Step 6: Select HSBC Loan Option`, async () => {
        await loanOptionsPage.selectHSBCLoan();
        await reviewPage.clickContinueButton();
      });
  
      await test.step(`Step 7: Validate Special Features Page`, async () => {
        const featureTitle = await specialFeaturesPage.getFeatureTitleText();
        expect(featureTitle).toContain(data.expectedTexts.featureTitle);
      });
    });
  });
}); 