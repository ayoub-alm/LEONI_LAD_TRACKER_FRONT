import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {}

  // Set data in local storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get data from local storage
  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Remove data from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all data from local storage
  clear(): void {
    localStorage.clear();
  }
}
