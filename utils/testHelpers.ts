import * as fs from 'fs';
import * as path from 'path';
import { TestData } from '../types/TestData';

export class TestHelpers {
  /**
   * Load test data from JSON file
   */
  static loadTestData(filePath: string = '../data/testData.json'): TestData[] {
    try {
      const dataPath = path.join(__dirname, filePath);
      const rawData = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      console.log('Error loading test data: ', filePath, error);
      throw error;
    }
  }

 /**
   * Convert cookies array to localStorage object
   * @param cookies 
   * @returns localStorage object
   */
 static cookiesArrayToLocalStorageObject(cookies: { name: string, value: string }[]): Record<string, string> {
  return cookies.reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;
    return acc;
  }, {} as Record<string, string>);
}
} 