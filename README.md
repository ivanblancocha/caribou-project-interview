# Caribou Loan Application - Playwright Test Framework

A robust, scalable, and maintainable Playwright + TypeScript test framework for the Caribou loan application, following Page Object Model (POM) best practices.

## 🚀 Features

- **Page Object Model (POM)**: Clean separation of test logic and UI interactions
- **TypeScript**: Strong typing for better maintainability and IDE support
- **Data-Driven Testing**: External test data management using JSON files
- **Comprehensive Coverage**: Complete E2E flow testing with validation scenarios
- **Robust Error Handling**: Retry logic and proper wait strategies
- **Extensible Architecture**: Base classes and utility functions for reusability
- **Modern Playwright Features**: Latest best practices and configurations

## 📁 Project Structure

```
caribou/
├── pages/                    # Page Object classes
│   ├── BasePage.ts          # Base class with common functionality
│   ├── StartPage.ts         # Personal information form
│   ├── VehiclePage.ts       # Vehicle information form
│   ├── DetailsPage.ts       # Additional details form
│   ├── ReviewPage.ts        # Information review page
│   ├── LoanOptionsPage.ts   # Loan selection page
│   └── SpecialFeaturesPage.ts # Final validation page
├── tests/                   # Test specifications
│   └── caribou-loan-application.spec.ts # E2E test
├── data/                    # Test data files
│   └── testData.json       # Test data for forms
├── utils/                   # Utility functions
│   ├── randomDataGenerator.ts     # Generate random data using Faker library.
│   └── testHelpers.ts      # Common test utilities
├── fixtures/                # Custom Playwright fixtures and settings
│   ├── SettingsPage.ts     # Base utilites for browser/page settings
│   └── Fixture.ts          # Custom fixture test and page object injection
├── auth/                # auth data
│   └── cookie.json     # Cookies taken from realwebsite
├── types/                # Test Data Interfaces 
│   └── TestData.js
├── playwright.config.ts   # Playwright configuration
└── package.json          # Dependencies and scripts
```

## 🧩 How This Project Works

### Custom Playwright Fixtures & Page Object Injection

This project uses a custom Playwright fixture (`fixtures/fixture.ts`) to automatically inject all page objects and test data into your tests. This means you do **not** need to manually instantiate page objects in each test file.

**Injected Page Objects:**
- `settingsPage`
- `startPage`
- `vehiclePage`
- `detailsPage`
- `reviewPage`
- `loanOptionsPage`
- `specialFeaturesPage`

**Injected Test Data:**
- `testData` (array of test data objects loaded from `data/testData.json`)

**How it works:**
- The fixture loads test data and provides it as `testData`.
- Each page object is constructed and injected as a test parameter.
- The `settingsPage` fixture handles navigation, cookie setup, and page preparation before each test.

### Data-Driven Test Structure

Tests are generated for each entry in `testData.json`. Each test receives the relevant data and all page objects as parameters:

```typescript
import { RandomDataGenerator } from '../utils/randomDataGenerator';
import { test, expect, testData } from '../fixtures/fixture';

test.describe('Caribou Loan Application - Complete Flow', () => {
  testData.forEach((data, index) => {
    test(`Complete loan application flow - Happy Path (Data Set ${index + 1})`, async ({ settingsPage, startPage, vehiclePage, detailsPage, reviewPage, loanOptionsPage, specialFeaturesPage }) => {
      await test.step('Step 1: Complete Personal Information Form with Retry', async () => {
        await startPage.completeFormWithRetry(
          () => RandomDataGenerator.generateRandomePersonalInfo(),
          data.personalInfo.residenceStatus,
          data.personalInfo.currentLoan
        );
      });
      // ... more steps ...
    });
  });
});
```

### Example Test Data (`data/testData.json`)
```json
[
  {
    "personalInfo": {
      "firstName": "generated with utils/dataRandomGenerator",
      "lastName": "generated with utils/dataRandomGenerator",
      "email": "generated with utils/dataRandomGenerator",
      "confirmEmail": "generated with utils/dataRandomGenerator",
      "birthday": "generated with utils/dataRandomGenerator",
      "residenceStatus": "US Citizen",
      "phone": "5551234567",
      "currentLoan": "No"
    },
    "vehicleInfo": {
      "vehicleType": "Car",
      "licensePlate": "a",
      "state": "VA",
      "howMuchOwe": "10000",
      "vehiclesMiles": "1000",
      "monthlyCarPayment": "350"
    },
    "detailsInfo": {
      "streetAddress": "123 North Virginia Avenue",
      "city": "Oklahoma City",
      "state": "Oklahoma",
      "zipCode": "90210",
      "employmentStatus": "Employed",
      "annualIncome": "75000"
    },
    "housingDetailsInfo": {
      "yearsLivedThere": "1",
      "monthsLivedThere": "0",
      "rentOrOwn": "Own",
      "monthlyRentMortgage": "1000",
      "employmentStatus": "Employed",
      "annualIncome": "75000"
    },
    "expectedTexts": {
      "featureTitle": "Select your car’s special features",
      "featureDescription": "Your loan includes special features"
    },
    "testResult": "passed"
  }
]
```

### Page Object Model (POM)

All UI interactions are encapsulated in page objects (see `pages/`). Example:
```typescript
// pages/StartPage.ts
export class StartPage extends BasePage {
  // ... locators ...
  async completeFormWithRetry(/* ... */) { /* ... */ }
}
```

### Utility Functions
- **RandomDataGenerator**: Generates random personal info for form filling
- **TestHelpers**: Loads test data and provides common utilities

### SettingsPage & Test Setup
- The `SettingsPage` fixture handles navigation, cookie setup, and hiding consent banners before each test.
- All page objects are constructed with the Playwright `page` instance and injected into each test.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd caribou
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/caribou-loan-application.spec.ts
```

### Run tests in headed mode (with browser UI)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
```

### Run tests with specific data
```bash
npx playwright test --grep "Complete loan application flow"
```

## 📊 Test Reports

### HTML Report
After running tests, view the HTML report:
```bash
npx playwright show-report
```

### Generate Allure Report (if configured)
```bash
npm run report:allure
```

## 🏗️ Architecture & Best Practices

### Page Object Model (POM)
- **Separation of Concerns**: UI interactions are isolated in page objects
- **Reusability**: Page methods can be reused across multiple tests
- **Maintainability**: Changes to UI elements only require updates in page objects

### Test Data Management
- **External Data**: Test data stored in JSON files for easy maintenance
- **Type Safety**: TypeScript interfaces ensure data consistency
- **Scalability**: Easy to add new test scenarios with different data sets

### Error Handling & Reliability
- **Retry Logic**: Built-in retry mechanisms for flaky operations
- **Wait Strategies**: Proper wait conditions for dynamic content
- **Screenshot Capture**: Automatic screenshots on failures for debugging

### Test Organization
- **Test Steps**: Clear step-by-step test execution using `test.step()`
- **Descriptive Names**: Meaningful test and step names for better reporting
- **Grouping**: Logical test grouping using `test.describe()`

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- **Multi-browser Support**: Chrome, Firefox, Safari
- **Parallel Execution**: Tests run in parallel for faster execution
- **Retry Logic**: Automatic retries on CI environments
- **Reporting**: HTML reporter with screenshots and videos
- **Timeout Settings**: Appropriate timeouts for different operations

### Environment Variables
Create a `.env` file for environment-specific (`.env.staging | .env.production`) configurations in the root of the project:
```env
BASE_URL=https://new.apply.caribou-qa.com/
```

## 📈 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🆘 Troubleshooting

### Common Issues

1. **Element not found**: Check if test IDs are correct and elements are loaded
2. **Timeout errors**: Increase timeout values or add proper wait conditions
3. **Flaky tests**: Use retry logic and proper wait strategies
4. **Browser issues**: Ensure browsers are properly installed