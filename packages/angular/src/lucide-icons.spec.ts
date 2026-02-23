import { TestBed } from '@angular/core/testing';
import {
  LUCIDE_ICONS,
  lucideLegacyIcon,
  lucideLegacyIconMap,
  provideLucideIcons,
} from './lucide-icons';
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
    const mockIcon: LucideIconData = {
      name: 'mock-icon',
      node: [['polyline', { points: '1 1 22 22' }]],
    };
    const mockIcon2: LucideIconData = {
      name: 'mock-icon-circle',
      node: [['circle', { cx: 12, cy: 12, r: 8 }]],
      aliases: ['mock-icon-2'],
    };
    const legacyIconNode: LucideIconData['node'] = [['circle', { cx: 12, cy: 12, r: 8 }]];
    const legacyAlias = 'legacy-old-name';
    const OtherLegacyIcon = legacyIconNode;
    it('should accept list of icon object, icon components or legacy icons', () => {
      TestBed.configureTestingModule({
        providers: [
          provideLucideIcons(
            mockIcon,
            mockIcon2,
            LucideCircle,
            lucideLegacyIcon('legacy-icon', legacyIconNode, [legacyAlias]),
            ...lucideLegacyIconMap({ OtherLegacyIcon }),
          ),
        ],
      });
      const legacyIconData = {
        name: 'legacy-icon',
        node: legacyIconNode,
        aliases: [legacyAlias],
      };
      const otherLegacyIconData = {
        name: 'other-legacy-icon',
        node: legacyIconNode,
        aliases: ['OtherLegacyIcon'],
      };
      expect(TestBed.inject(LUCIDE_ICONS)).toEqual({
        'mock-icon': mockIcon,
        'mock-icon-circle': mockIcon2,
        'mock-icon-2': mockIcon2,
        'legacy-icon': legacyIconData,
        'legacy-old-name': legacyIconData,
        'other-legacy-icon': otherLegacyIconData,
        OtherLegacyIcon: otherLegacyIconData,
        ['circle']: LucideCircle.icon,
      });
    });
  });
});
