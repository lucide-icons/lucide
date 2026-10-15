import { TestBed } from '@angular/core/testing';
import { LUCIDE_CONFIG, lucideDefaultConfig, provideLucideConfig } from './lucide-config';

describe('Lucide config', () => {
  describe('LUCIDE_CONFIG', () => {
    it('should use default', () => {
      expect(TestBed.inject(LUCIDE_CONFIG)).toBe(lucideDefaultConfig);
    });
  });
  describe('provideLucideConfig', () => {
    it('should use defaults', () => {
      TestBed.configureTestingModule({
        providers: [
          provideLucideConfig({
            size: 18,
          }),
        ],
      });
      expect(TestBed.inject(LUCIDE_CONFIG)).toEqual({
        ...lucideDefaultConfig,
        size: 18,
      });
    });
  });
});
