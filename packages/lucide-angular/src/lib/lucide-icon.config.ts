import { Injectable } from '@angular/core';
import defaultAttributes from '../icons/constants/default-attributes';

/**
 * A configuration service for Lucide icon components.
 *
 * You can inject this service, typically in AppComponent, and customize its property values in
 * order to provide default values for all the icons used in the application.
 */
@Injectable({ providedIn: 'root' })
export class LucideIconConfig {
  color: string = defaultAttributes.stroke;
  size: number = defaultAttributes.width;
  strokeWidth: number = defaultAttributes['stroke-width'];
  absoluteStrokeWidth = false;
}
