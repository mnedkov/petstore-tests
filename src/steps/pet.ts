import { expect } from '@playwright/test';
import { Given, Then, When} from '@cucumber/cucumber';
import { ICustomWorld } from '../hooks/custom-world';

let id: number;
let createdId: number;
let createdPet: any;

When('I create a pet with id {int}, name {string}, and category {string}', async function (this: ICustomWorld, petId: number, petName: string, petCategory: string) {
  id = petId;
  createdId = await this.petAPI!.createPet(id, petName, petCategory); 
});

Then('the pet will be created successfully', async function () {
  if (id > 0) {
    expect(createdId).toBe(id);
  } else {
    // We assume that if pet id < 1 is provided, 
    // then the system should automatically provide a unque pet id > 0.
    console.log(`The system assigned id= ${createdId} to a new pet with provided id = 0`);
    expect(createdId).toBeGreaterThan(0);    
  }
});

When('I retrieve the pet by its id', async function (this: ICustomWorld) {
  createdPet = await this.petAPI!.getPet(createdId);  
});

Then('its name will match {string}', async function (this: ICustomWorld, name: string) {
  if (!createdPet.name) {
    throw new Error(`Error retrieving pet with id= ${createdId}: ` + JSON.stringify(createdPet));
  }
  expect(createdPet.name).toBe(name);
});

Then('its category will match {string}', async function (this: ICustomWorld, category: string) {
  expect(createdPet.category.name).toBe(category);
});

Given('a pet with id {int}, and name {string}', async function (this: ICustomWorld, petId: number, petName: string) {
  id = petId;
  createdId = await this.petAPI!.createPet(id, petName);  
});

When('I update its name to {string}', async function (this: ICustomWorld, petName: string) {
  await this.petAPI!.updatePet(id, petName);  
});

When('I delete the pet', async function (this: ICustomWorld) {
  await this.petAPI!.deletePet(id);  
});

Then('I will get an error {string}', async function (this: ICustomWorld, errorMsg: string) {
  expect(createdPet.message).toBe(errorMsg);
});





