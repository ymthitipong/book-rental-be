import { BookCode } from "./book-code";

export class BookCopyCode {
  static verify(code: string): { result: false } | { result: true, bookCode: string, copyNo: number } {
    const parts = code.split('-');
    if (parts.length !== 2) {
      return { result: false };
    }

    const bookCodeValid = BookCode.pattern.test(parts[0]);
    const copyNoValid = /^\d+$/.test(parts[1]);
    
    if (bookCodeValid && copyNoValid) {
      return { 
        bookCode: parts[0],
        copyNo: parseInt(parts[1]), 
        result: true 
      };
    }
    
    return { result: false };
  }
}
