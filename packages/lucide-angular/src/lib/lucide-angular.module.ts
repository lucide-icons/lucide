import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { LucideAngularComponent } from './lucide-angular.component';
import { Icons } from './icons.provider';
import { IconData } from '../icons/types';

@NgModule({
  declarations: [LucideAngularComponent],
  imports: [
  ],
  exports: [LucideAngularComponent]
})

export class LucideAngularModule {
    constructor(@Optional() private icons: Icons) {
        if (!this.icons) {
            throw new Error(
                `No icon provided. Make sure to use 'LucideAngularModule.pick({ ... })' when importing the module\n`
            );
        }
    }

    static pick(icons: { [key: string]: IconData }): ModuleWithProviders<LucideAngularModule> {
        return {
            ngModule: LucideAngularModule,
            providers: [
                { provide: Icons, multi: true, useValue: icons }
            ]
        };
    }
}
