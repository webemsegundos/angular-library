import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {WeSRedactor} from './redactor.component';

@NgModule({
  declarations: [
    WeSRedactor,
  ],
  imports: [],
  exports: [
    WeSRedactor,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeSRedactorModule { }
