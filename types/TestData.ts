export interface TestData {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      confirmEmail: string;
      birthday: string;
      residenceStatus: string;
      phone: string;
      currentLoan: string;
    };
    vehicleInfo: {
      vehicleType: string;
      licensePlate: string;
      state: string;
      howMuchOwe: string;
      vehiclesMiles: string;
      monthlyCarPayment: string;
    };
    detailsInfo: {
      streetAddress: string;
      city: string;
      state: string;
      zipCode: string;
      employmentStatus: string;
      annualIncome: string;
      howLongLivedThereInYears: string;
      howLongLivedThereInMonths: string;
      rentOrOwn: string;
      monthlyRentMortgage: string;
      yearlyIncome: string;
    };
    housingDetailsInfo: {
      yearsLivedThere: string;
      monthsLivedThere: string;
      rentOrOwn: string;
      monthlyRentMortgage: string;
      employmentStatus: string;
      annualIncome: string;
    };
    expectedTexts: {
      featureTitle: string;
      featureDescription: string;
    };
  }
  