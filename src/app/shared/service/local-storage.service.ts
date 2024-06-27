import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class LocalStorageService {
  public static readonly lastUser = 'last_user_access';
  public static readonly rememberMe = 'remember_me';
  public static readonly session = 'ss_site';

  constructor() { }

  public static set(key: string, value: any): void {
    if (typeof window.localStorage !== undefined) {
      let val = this.parseToString(value);
      localStorage.setItem(key, val);
    }
  }

  public static get(key: string): string | null {
    if (typeof window.localStorage !== undefined) {
      let val = localStorage.getItem(key);
      if (val)
        return val;
    }
    return null;
  }

  public static getAsJSON<T>(key: string): T | null {
    if (typeof window.localStorage !== undefined) {
      let val = localStorage.getItem(key);
      if (val)
        return JSON.parse(val);
    }
    return null;
  }

  public static getAsBoolean(key: string): boolean {
    if (typeof window.localStorage !== undefined) {
      let val = localStorage.getItem(key)?.toLocaleLowerCase();
      return val === 'true'
    }
    return false;
  }

  public static getAsNumber(key: string): number | null {
    if (typeof window.localStorage !== undefined) {
      let val = localStorage.getItem(key);
      if (val)
        return parseFloat(val);
    }
    return null;
  }

  public static remove(key: string): void {
    if (typeof window.localStorage !== undefined) {
      localStorage.removeItem(key);
    }
  }

  public static clear() {
    if (typeof window.localStorage !== undefined) {
      const rememberMe = this.getAsBoolean(this.rememberMe);
      const lastUser = this.get(this.lastUser);
      localStorage.clear();
      if (rememberMe) {
        this.set(this.rememberMe, rememberMe);
        this.set(this.lastUser, lastUser);
      }
    }
  }

  private static parseToString(value: any): string {
    switch (typeof (value)) {
      case 'object': return JSON.stringify(value);
      case 'boolean': return value.toString();
      case 'number': return value.toString();
      default:
        return value;
    }
  }

}