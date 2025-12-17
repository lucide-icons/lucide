import { TestBed } from '@angular/core/testing';
import { LUCIDE_ICONS, provideLucideIcons } from './lucide-icons';
import { LucideIconData } from './types';
import { LucideActivity } from './icons/activity';
import { LucideCircle } from './icons/circle';
import { LucideSquareX } from './icons/square-x';

describe('Lucide icons', () => {
  describe('LUCIDE_ICONS', () => {
    it('should default to empty map', () => {
      expect(TestBed.inject(LUCIDE_ICONS)).toEqual({});
    });
  });
  describe('provideLucideIcons', () => {
    const mockIcon: LucideIconData = [['polyline', { points: '1 1 22 22' }]];
    const mockIcon2: LucideIconData = [['circle', { cx: 12, cy: 12, r: 8 }]];
    it('should accept dictionary of icons', () => {
      TestBed.configureTestingModule({
        providers: [
          provideLucideIcons({
            DemoIcon: mockIcon,
            MockIcon: mockIcon2,
            TestIcon: LucideActivity,
          }),
        ],
      });
      expect(TestBed.inject(LUCIDE_ICONS)).toEqual({
        'demo-icon': mockIcon,
        'mock-icon': mockIcon2,
        [LucideActivity.iconName]: LucideActivity.iconData,
      });
    });
    it('should accept list of icon components', () => {
      TestBed.configureTestingModule({
        providers: [provideLucideIcons([LucideActivity, LucideSquareX, LucideCircle])],
      });
      expect(TestBed.inject(LUCIDE_ICONS)).toEqual({
        [LucideActivity.iconName]: LucideActivity.iconData,
        [LucideSquareX.iconName]: LucideSquareX.iconData,
        [LucideCircle.iconName]: LucideCircle.iconData,
      });
    });
  });
});
