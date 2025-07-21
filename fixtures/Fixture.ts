import { test as base } from '@playwright/test';
import { TestHelpers } from '../utils/testHelpers';
import { TestData } from '../types/TestData';
import { SettingsPage } from './SettingsPage';
import { StartPage } from '../pages/StartPage';
import { VehiclePage } from '../pages/VehiclePage';
import { DetailsPage } from '../pages/DetailsPage';
import { ReviewPage } from '../pages/ReviewPage';
import { LoanOptionsPage } from '../pages/LoanOptionsPage';
import { SpecialFeaturesPage } from '../pages/SpecialFeaturesPage';

// Declare the types of your fixtures.
type MyFixtures = {
  startPage: StartPage;
  vehiclePage: VehiclePage;
  detailsPage: DetailsPage;
  reviewPage: ReviewPage;
  loanOptionsPage: LoanOptionsPage;
  specialFeaturesPage: SpecialFeaturesPage;
  settingsPage: SettingsPage;
};


export const test = base.extend<MyFixtures>({
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    //Adding cookies to the page to emulate acceptance of cookies
    const cookiesData: TestData[] = TestHelpers.loadTestData('../auth/cookie.json');
    const cookies = cookiesData.flatMap(data => (data as any).cookies ?? []);
    const localStorage = TestHelpers.cookiesArrayToLocalStorageObject(cookies);
    //Navigating to the page
    await settingsPage.navigateTo(`${process.env.BASE_URL}`); 
    
    //Load cookies from the settings page
    await settingsPage.setLocalStorage(localStorage); 
    await settingsPage.addCookies(cookies);
    await settingsPage.removeCookieElement();

    await use(settingsPage);

    await settingsPage.closePage();
  },
  startPage: async({page},use)=>{
    await use(new StartPage(page));
  },
  vehiclePage: async({page}, use)=>{
    await use(new VehiclePage(page));
  },
  detailsPage: async({page}, use)=>{
    await use(new DetailsPage(page));
  },
  reviewPage: async({page}, use)=>{
    await use(new ReviewPage(page));
  },
  loanOptionsPage: async({page}, use)=>{
    await use(new LoanOptionsPage(page));
  },
  specialFeaturesPage: async({page}, use)=>{
    await use(new SpecialFeaturesPage(page));
  }
});

export const testData: TestData[] = TestHelpers.loadTestData();
export { expect } from '@playwright/test';