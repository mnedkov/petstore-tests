import { APIRequestContext } from "playwright";
import { expect } from '@playwright/test';

export class PetAPI {
    context: APIRequestContext;
    
    constructor(context: APIRequestContext) {
      this.context = context;
    }
    
    async getPet(id: number): Promise<any> {
      const response = await this.context.get(`/v2/pet/${id}`);
      return JSON.parse(await response.text());
    }

    async createPet(id: number, petName: string, petCategory?: string): Promise<number> {
      const response = await this.context.post('/v2/pet', {
        data: {
          "id": id,
          "category": {
            "id": 0,
            "name": petCategory
          },
          "name": petName,
          "status": "available"
        }
      });
      
      expect(response.ok()).toBeTruthy();

      const body = JSON.parse(await response.text());
      return body.id;
    }


    async updatePet(id: number, petName: string) {
      const response = await this.context.put('/v2/pet', {
        data: {
          "id": id,
          "name": petName
        }
      });

      expect(response.ok()).toBeTruthy();      
    }

    async deletePet(id: number) {
      const response = await this.context.delete(`/v2/pet/${id}`);

      expect(response.ok()).toBeTruthy();      
    }
  }