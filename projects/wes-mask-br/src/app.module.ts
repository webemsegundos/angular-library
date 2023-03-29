import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WeSMaskBRDirective } from './lib/wes-mask-br';


@NgModule({
  declarations: [
    WeSMaskBRDirective
  ],
  exports: [
    WeSMaskBRDirective
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class WeSMaskBRModule {}
