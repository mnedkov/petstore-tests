import { expect } from '@playwright/test';
import { Given, Then, When} from '@cucumber/cucumber';
import { ICustomWorld } from '../hooks/custom-world';

const id: number = 123123;
let createdId: string;
let createdPet: any;



When('I create a pet with name {string} and category {string}', async function (this: ICustomWorld, petName: string, petCategory: string) {
  const petAPI = this.petAPI!;
  createdId = await petAPI.createPet(id, petName, petCategory);  
});

Then('the pet will be created successfully', async function () {
  expect(createdId).toBe(id);
});

When('I retrieve the pet by its id', async function (this: ICustomWorld) {
  const petAPI = this.petAPI!;
  createdPet = await petAPI.getPet(id);  
});

Then('its name will match {string}', async function (this: ICustomWorld, name: string) {
  expect(createdPet.name).toBe(name);
});

Then('its category will match {string}', async function (this: ICustomWorld, category: string) {
  expect(createdPet.category.name).toBe(category);
});

Given('a pet with name {string}', async function (this: ICustomWorld, petName: string) {
  const petAPI = this.petAPI!;
  createdId = await petAPI.createPet(id, petName);  
});

When('I update its name to {string}', async function (this: ICustomWorld, petName: string) {
  const petAPI = this.petAPI!;
  await petAPI.updatePet(id, petName);  
});

When('I delete the pet', async function (this: ICustomWorld) {
  const petAPI = this.petAPI!;
  await petAPI.deletePet(id);  
});

Then('I will get an error {string}', async function (this: ICustomWorld, errorMsg: string) {
  expect(createdPet.message).toBe(errorMsg);
});





