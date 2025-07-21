import { BasePage } from "../pages/BasePage";

import { Page } from "@playwright/test";

export class SettingsPage extends BasePage{

    protected readonly page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    async navigateTo(url: string){
      try {
        await super.navigateTo(url);
        await this.page.waitForLoadState();
      } catch (error) {
        console.log('Error navigating to URL', error);
        throw error;
      }
    }

    async addCookies(cookies: any[]){
      try {
        await this.page.context().addCookies(cookies);
           /*  {
              name: 'tcmConsent',
              value: '{"purposes":{"Functional":"Auto","Analytics":"Auto","Advertising":"Auto","SaleOfInfo":"Auto"},"timestamp":"2025-07-20T01:51:23.099Z","confirmed":true,"prompted":false,"updated":true}',
              domain: '.caribou-qa.com',
              path: '/',
              expires: 1721424000,
              httpOnly: false,
              secure: false,
              sameSite: 'Lax'
            },
            {
              "name": "tcm",
              "value": "{\"purposes\":{\"Functional\":\"Auto\",\"Analytics\":\"Auto\",\"Advertising\":\"Auto\",\"SaleOfInfo\":\"Auto\"},\"timestamp\":\"2025-07-20T01:51:23.099Z\",\"confirmed\":true,\"prompted\":false,\"updated\":true}",
              "domain": ".caribou-qa.com",
              "path": "/",
              "expires": 1721424000,
              "httpOnly": false,
              "secure": false,
              "sameSite": "Lax"
            },
            {
              name: "tcmQuarantine",
              value: "{\"requests\":[],\"cookies\":[]}",
              domain: ".caribou-qa.com",
              path: "/",
              expires: 1721424000,
              httpOnly: false,
              "secure": false,
              "sameSite": "Lax"
            },
            {
              name: "_hp2_id.2113597499",
              value: "%7B%22userId%22%3A%227798938544758053%22%2C%22pageviewId%22%3A%221721712692978156%22%2C%22sessionId%22%3A%227406564802218796%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D",
              domain: ".caribou-qa.com",
              path: "/",
              expires: 1721424000,
              httpOnly: false,
              "secure": true,
              "sameSite": "None"
            },
            {
              name: "_hp2_ses_props.2113597499",
              value: "%7B%22ts%22%3A1752976665618%2C%22d%22%3A%22new.apply.caribou-qa.com%22%2C%22h%22%3A%22%2Fpersonal-info%22%7D",
              domain: ".caribou-qa.com",
              path: "/",
              expires: 1721424000,
              httpOnly: false,
              "secure": true,
              "sameSite": "None"
            },
            {
              name: "ajs_anonymous_id",
              value: "6b33b24b-d5b9-4909-9124-673abebf10cb",
              domain: ".caribou-qa.com",
              path: "/",
              expires: 1721424000,
              httpOnly: false,
              "secure": false,
              "sameSite": "Lax"
            },
            {
              name: "ajs_user_id",
              value: "105057",
              domain: ".caribou-qa.com",
              path: "/",
              expires: 1721424000,
              httpOnly: false,
              "secure": false,
              "sameSite": "Lax"
            },
            {
              name: "mr_utm_params",
              value: "%7B%7D",
              domain: ".caribou-qa.com",
              path: "/",
              expires: 0,
              httpOnly: false,
              "secure": false,
              "sameSite": "Lax"
      
            }
      
          ]); */
      } catch (error) {
        console.log('Error adding cookies', error);
        throw error;
      }
    }

    async setLocalStorage(items: Record<string, string>) {
      try {
        await this.page.evaluate((items) => {
          Object.entries(items).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
        }, items);
      } catch (error) {
        console.log('Error setting localStorage items', error);
        throw error;
      }
    }

    async removeCookieElement(){
      try {
        await this.page.addStyleTag({
            content: `
              #transcend-consent-manager {
                display: none !important;
              }
            `
          });
      } catch (error) {
        console.log('Error removing cookies elements', error);
        throw error;
      }
    }

    async closePage(){
      try {
        await this.page.close();
      } catch (error) {
        console.log('Error closing page', error);
        throw error;
      }
    }

}