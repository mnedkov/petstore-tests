
import { Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { ICustomWorld } from "./custom-world";
import { PetAPI } from '../api/PetAPI';

Before(async function(this: ICustomWorld) {
    this.context = await request.newContext({
        baseURL: "https://petstore.swagger.io",
        extraHTTPHeaders: {
          'Accept': 'application/json',
        },
      });
      this.petAPI = new PetAPI(this.context);
});
  
After(async function (this: ICustomWorld) {
    await this.context?.dispose();
});
