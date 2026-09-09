export class Book {
  deweyDecimalNumber(): number {
    return 42
  }
}

// Module Augmentation is an advanced TypeScript feature that allows you 
// to extend, patch, or add new declarations to an existing module 
// (either a third-party library or your own internal module) without 
// modifying its original source code.
declare module '../lib/registry' {
  export interface DataTypeRegistry {
    book: Book
  }
}
