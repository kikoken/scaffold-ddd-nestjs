import { hashPassword, comparePassword, hashPasswordTE, comparePasswordTE } from './password';
import * as bcrypt from 'bcryptjs';
import * as E from 'fp-ts/Either';

describe('Password Utils', () => {
  describe('hashPassword', () => {
    it('should hash a password successfully', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      // Verify the hash format
      expect(hashedPassword).toMatch(/^\$2[aby]\$\d{1,2}\$[A-Za-z0-9./]{53}$/);
      
      // Verify we can compare it back
      const isMatch = await bcrypt.compare(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should trim the password before hashing', async () => {
      const password = '  password123  ';
      const hashedPassword = await hashPassword(password);
      
      // Should match with trimmed password
      const isMatch = await bcrypt.compare('password123', hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should handle non-string inputs by converting to string', async () => {
      const password = 123456;
      const hashedPassword = await hashPassword(password as unknown as string);
      
      const isMatch = await bcrypt.compare('123456', hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should handle empty string input', async () => {
      const hashedPassword = await hashPassword('');
      expect(hashedPassword).toMatch(/^\$2[aby]\$\d{1,2}\$[A-Za-z0-9./]{53}$/);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await comparePassword(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await comparePassword('wrongPassword', hashedPassword);
      expect(result).toBe(false);
    });

    it('should return false for invalid hash format', async () => {
      const result = await comparePassword('password123', 'invalidhash');
      expect(result).toBe(false);
    });

    it('should handle trimmed passwords correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await comparePassword('  testPassword123  ', hashedPassword);
      expect(result).toBe(true);
    });
  });

  describe('hashPasswordTE', () => {
    it('should return Right with hashed password for valid input', async () => {
      const password = 'testPassword123';
      const result = await hashPasswordTE(password)();
      
      expect(E.isRight(result)).toBe(true);
      if (E.isRight(result)) {
        const hashedPassword = result.right;
        expect(hashedPassword).toMatch(/^\$2[aby]\$\d{1,2}\$[A-Za-z0-9./]{53}$/);
      }
    });

    it('should handle empty string input', async () => {
      const result = await hashPasswordTE('')();
      
      expect(E.isRight(result)).toBe(true);
      if (E.isRight(result)) {
        const hashedPassword = result.right;
        expect(hashedPassword).toMatch(/^\$2[aby]\$\d{1,2}\$[A-Za-z0-9./]{53}$/);
      }
    });
  });

  describe('comparePasswordTE', () => {
    it('should return Right(true) for matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await comparePasswordTE(password, hashedPassword)();
      
      expect(E.isRight(result)).toBe(true);
      if (E.isRight(result)) {
        expect(result.right).toBe(true);
      }
    });

    it('should return Right(false) for non-matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await comparePasswordTE('wrongPassword', hashedPassword)();
      
      expect(E.isRight(result)).toBe(true);
      if (E.isRight(result)) {
        expect(result.right).toBe(false);
      }
    });
  });
});
