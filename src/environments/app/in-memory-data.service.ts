import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Document } from './document';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const documents = [
      { id: 11, name: 'Gently On My Mind' },
      { id: 12, name: 'Seven Years' },

    ];
    return {documents};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the documents array is empty,
  // the method below returns the initial number (11).
  // if the documents array is not empty, the method below returns the highest
  // hero id + 1.
  genId(documents: Document[]): number {
    return documents.length > 0 ? Math.max(...documents.map(hero => hero.id)) + 1 : 11;
  }
}
