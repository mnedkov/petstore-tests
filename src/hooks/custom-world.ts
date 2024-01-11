import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber'
import { APIRequestContext } from '@playwright/test'
import { PetAPI } from '../api/PetAPI';

export interface ICustomWorld extends World {
	context?: APIRequestContext;
    petAPI?: PetAPI;
}

export class CustomWorld extends World implements ICustomWorld {
	constructor(options: IWorldOptions) {
		super(options)
	}
}

setWorldConstructor(CustomWorld)