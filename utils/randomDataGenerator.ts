import { faker } from '@faker-js/faker';

export class RandomDataGenerator {
  static getFirstName(sex: string = 'male'): string {
    try {
      return faker.person.firstName(sex as 'male' | 'female');
    } catch (error) {
      console.log('Error getting first name', error);
      throw error;
    }
  }

  static getLastname(): string {
    try {
      return faker.person.lastName();
    } catch (error) {
      console.log('Error getting last name', error);
      throw error;
    }
  }

  static getEmail(firstName: string, lastName: string): string {
    try {
      return faker.internet.email({firstName: firstName, lastName: lastName, allowSpecialCharacters: true});
    } catch (error) {
      console.log('Error getting email', error);
      throw error;
    }
  }

  static getBirthday(): string {
    //let year = faker.date.birthdate({ mode: 'age', min: 18, max: 65 }).getFullYear();
    //let month = faker.date.birthdate().getMonth();
    //let day = faker.date.birthdate().getDate();
    
    try {
      return `01011990`;
    } catch (error) {
      console.log('Error getting birthday', error);
      throw error;
    }
  }

  static getResidenceStatus(): string {
    //crear un enum y devolver US Citizen
    try {
      return faker.location.state();
    } catch (error) {
      console.log('Error getting residence status', error);
      throw error;
    }
  }

  static getPhone(): string {
    try {
      return faker.phone.number();
    } catch (error) {
      console.log('Error getting phone', error);
      throw error;
    }
  }

  static generateRandomePersonalInfo(): {
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    phone: string;
  } {
    try {
      return {
      firstName: this.getFirstName(),
      lastName: this.getLastname(),
      email: this.getEmail(this.getFirstName(), this.getLastname()),
      birthday: this.getBirthday(),
      phone: this.getPhone(),
      };
    } catch (error) {
      console.log('Error generating random personal info', error);
      throw error;
    }
  }
  
}