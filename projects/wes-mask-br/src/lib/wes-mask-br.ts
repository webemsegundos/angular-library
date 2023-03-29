import { Directive, ElementRef, Host, HostListener, Injectable, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';

export class WeSMaskBRModel {
  form?: AbstractControl|null;
  mask?: string;
  len?: number;
  person?: boolean;
  phone?: boolean;
  phoneNotDDD?: boolean;
  money?: boolean;
  percent?: boolean;
  type?: 'alfa' | 'num' | 'all' = 'all';
  decimal?: number = 2;
  decimalCaracter?: string = `,`;
  thousand?: string;
  userCaracters?: boolean = false;
  numberAndTousand?: boolean = false;
  moneyInitHasInt?: boolean = true;
}

@Directive({
  selector: '[wesmask]'
})

@Injectable()
export class WeSMaskBRDirective implements OnInit {
  @Input() wesmask: WeSMaskBRModel = new WeSMaskBRModel();
  @Input() formControlName: string = '';

  /**
  * Event key up in directive
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @constant {string} value
  */
  @HostListener('keyup', ['$event'])
  inputKeyup(event: any): void {
    const value: string = this.returnValue(event.target.value);
    this.setValueInFormControl(value);
  }
  @HostListener('ngModelChange', ['$event']) onNgModelChange(e: any) {
    const value: string = this.returnValue(e);
    if (value) {
      this.setValueInFormControl(value, false);
    }
  }

  constructor(
    @Optional() @Host() @SkipSelf()
    private controlContainer: FormGroupDirective,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    if (!this.wesmask.type) {
      this.wesmask.type = 'all';
    }

    if (!this.wesmask.decimal) {
      this.wesmask.decimal = 2;
    }
    if (this.wesmask.moneyInitHasInt === undefined) {
      this.wesmask.moneyInitHasInt = true;
    }

    if (!this.wesmask.decimalCaracter) {
      this.wesmask.decimalCaracter = ',';
    }
    if (this.controlContainer) {
      if (this.formControlName) {
        this.wesmask.form = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Can\'t find parent FormGroup directive');
    }
    this.initialValue();
  }

  initialValue(): void {
    const value: string = this.returnValue(this.elementRef.nativeElement.value);
    this.setValueInFormControl(value);
  }

  /**
  * The verification of form
  * @author Antonio Marques <tmowna@gmail.com>
  * @example <caption>this.verifyFormControl()</caption>
  * @returns {boolean} return a boolean value
  */
  verifyFormControl(): boolean {
    if (this.wesmask.form instanceof FormControl) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Set Value em FormControl
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.setValueInFormControl(string)</caption>
  */
  setValueInFormControl(value: string, emitViewToModelChange?: boolean): void {
    if (!this.verifyFormControl()) {
      this.elementRef.nativeElement.value = value;
      return;
    }
    if(this.wesmask.form) {
      this.wesmask.form.setValue(value, { emitViewToModelChange });
      this.wesmask.form.updateValueAndValidity();
    }
  }

  /**
  * For initial value
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.setValueInFormControl(string, model)</caption>
  * @param {string} value
  * @param {WeSMaskBRModel} config
  * @returns {string} mask intial value
  */
  writeCreateValue(value: string, config: WeSMaskBRModel = new WeSMaskBRModel()): string {
    if (value && config.phone) {
      return value.replace(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/gi, '$1 ($2) $3-$4');
    }
    if (value && config.phoneNotDDD) {
      return this.phoneNotDDDMask(value);
    }
    if (value && config.money) {
      return this.writeValueMoney(value, config);
    }
    if (value && config.person) {
      return this.writeValuePerson(value);
    }

    if (value && config.percent) {
      return this.writeValuePercent(value);
    }

    if (this.wesmask.userCaracters) {
      return this.usingSpecialCharacters(value, this.wesmask.mask||'', this.wesmask.len||0);
    }

    if (value && config.mask) {
      this.wesmask.mask = config.mask;
      if (config.len) {
        this.wesmask.len = config.len;
      }
      return this.onInput(value);
    }
    return value;
  }

  /**
  * For initial value percent
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.writeValuePercent(string)</caption>
  * @param {string} value
  * @returns {string} mask intial value
  */

  writeValuePercent(value: string): string {
    value.replace(/\D/gi, '');
    value.replace(/%/gi, '');
    return value.replace(/([0-9]{0})$/gi, '%$1');
  }

  /**
  * For initial value person
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.writeValuePerson(string)</caption>
  * @param {string} value
  * @returns {string} mask intial value
  */
  writeValuePerson(value: string): string {
    if (value.length <= 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, '\$1.\$2.\$3\-\$4');
    } else {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi, '\$1.\$2.\$3\/\$4\-\$5');
    }
  }

  /**
  * For initial value money
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.writeValueMoney(string, model)</caption>
  * @param {string} value
  * @param {WeSMaskBRModel} value
  * @returns {string} mask intial value
  */
  writeValueMoney(value: string, config: WeSMaskBRModel = new WeSMaskBRModel()): string {
    return this.moneyMask(value, config);
  }

  /**
  * Here is one of the main functions
  * responsible for identifying the type of mask
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.returnValue(string)</caption>
  * @param {string} value
  * @returns {string} mask value
  */
  returnValue(value: string): string {
    if (!this.wesmask.mask) { this.wesmask.mask = ''; }
    if (value) {
      let formValue = value;
      if (this.wesmask.type === 'alfa') {
        formValue = formValue.replace(/\d/gi, '');
      }
      if (this.wesmask.type === 'num') {
        formValue = formValue.replace(/\D/gi, '');
      }

      if (this.wesmask.money) {
        return this.moneyMask(this.onInput(formValue), this.wesmask);
      }
      if (this.wesmask.phone) {
        return this.phoneMask(formValue);
      }
      if (this.wesmask.phoneNotDDD) {
        return this.phoneNotDDDMask(formValue);
      }
      if (this.wesmask.person) {
        return this.peapollMask(formValue);
      }
      if (this.wesmask.percent) {
        return this.percentMask(formValue);
      }
      if (this.wesmask.numberAndTousand) {
        return this.thousand(formValue);
      }
      if (this.wesmask.userCaracters) {
        return this.usingSpecialCharacters(formValue, this.wesmask.mask||'', this.wesmask.len||0);
      }
      return this.onInput(formValue);
    } else {
      return '';
    }
  }

  applyCpfMask(formValue: string) {
    formValue = formValue.replace(/\D/gi, '');
    formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
    formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
    formValue = formValue.replace(/(\d{3})(\d{1,2})$/gi, '$1-$2');
    return formValue;
  }

  applyCnpjMask(formValue: string) {
    formValue = formValue.replace(/\D/gi, '');
    formValue = formValue.replace(/(\d{2})(\d)/gi, '$1.$2');
    formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
    formValue = formValue.replace(/(\d{3})(\d)/gi, '$1/$2');
    formValue = formValue.replace(/(\d{4})(\d{1,4})$/gi, '$1-$2');
    formValue = formValue.replace(/(\d{2})(\d{1,2})$/gi, '$1$2');
    return formValue;
  }

  /**
  * Here we have a mask for percentage
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.percentMask(string)</caption>
  * @param {string} value
  * @returns {string} string percentage
  */
  private percentMask(value: any): string {
    let tmp = value;
    tmp = tmp.replace(/\D/gi, '');
    tmp = tmp.replace(/%/gi, '');
    tmp = tmp.replace(/([0-9]{0})$/gi, '%$1');
    return tmp;
  }

  /**
  * Here we have a mask for phone in 8 digits or 9 digits
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.phoneMask(string)</caption>
  * @param {string} value
  * @returns {string} string phone
  */
  private phoneMask(value: any): string {
    let formValue = value;
    if (formValue.length > 14 || formValue.length === 11) {
      this.wesmask.len = 15;
      this.wesmask.mask = '(99) 99999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{2})(\d)/gi, '$1 $2');
      formValue = formValue.replace(/(\d{5})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    } else {
      this.wesmask.len = 14;
      this.wesmask.mask = '(99) 9999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{2})(\d)/gi, '$1 $2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    }
    return this.onInput(formValue);
  }
  /**
  * Here we have a mask for phone in 8 digits or 9 digits not ddd
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.phoneMask(string)</caption>
  * @param {string} value
  * @returns {string} string phone
  */
  private phoneNotDDDMask(value: any): string {
    let formValue = value;
    if (formValue.length > 9) {
      this.wesmask.len = 10;
      this.wesmask.mask = '99999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{5})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    } else {
      this.wesmask.len = 9;
      this.wesmask.mask = '9999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    }
    return this.onInput(formValue);
  }

  /**
  * Here we have a mask for peapoll ID
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.peapollMask(string)</caption>
  * @param {string} value
  * @returns {string} string ID
  */
  private peapollMask(value: any): string {

    let formValue = value;
    if (formValue.length >= 14) {
      if (formValue.length === 14 && formValue.indexOf('-') > 0) {
        this.wesmask.len = 14;
        this.wesmask.mask = '999.999.999-99';
        formValue = this.applyCpfMask(formValue);
      } else {
        this.wesmask.len = 18;
        this.wesmask.mask = '99.999.999/9999-99';
        formValue = this.applyCnpjMask(formValue);
      }
    } else {
      this.wesmask.len = 14;
      this.wesmask.mask = '999.999.999-99';
      formValue = this.applyCpfMask(formValue);
    }
    return this.onInput(formValue);
  }

  /**
  * Here we have a mask for money mask
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.moneyMask(string)</caption>
  * @param {string} value
  * @param {WeSMaskBRModel} config
  * @returns {string} string money
  */
  private moneyMask(value: any, config: WeSMaskBRModel): string {
    const decimal = config.decimal || this.wesmask.decimal || 0;

    value = value
      .replace(/\D/gi, '')
      .replace(new RegExp('([0-9]{' + decimal + '})$', 'g'), config.decimalCaracter + '$1');
    if (value.length === 1 && !this.wesmask.moneyInitHasInt) {
      const dec = Array(decimal - 1).fill(0);
      return `0${config.decimalCaracter}${dec.join('')}${value}`;
    }
    if (value.length === decimal + 1) {
      return '0' + value;
    } else if (value.length > decimal + 2 && value.charAt(0) === '0') {
      return value.substr(1);
    }
    if (config.thousand && value.length > (Number(4) + Number(config.decimal))) {
      const valueOne = `([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`;
      value = value.replace(new RegExp(`${valueOne}`, `g`), `${config.thousand}$1${config.decimalCaracter}$2`);
    }
    if (config.thousand && value.length > (Number(8) + Number(config.decimal))) {
      const valueTwo = `([0-9]{3})${config.thousand}([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`;
      value = value.replace(new RegExp(`${valueTwo}`, `g`), `${config.thousand}$1${config.thousand}$2${config.decimalCaracter}$3`);
    }

    return value;
  }

  /**
  * Responsible for returning the empty mask
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.onInput(string)</caption>
  * @param {string} value
  * @returns {string} value
  */
  private onInput(value: any): string {
    return this.formatField(value, this.wesmask.mask||'', this.wesmask.len||0);
  }

  /**
  * Responsible for special characters
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.usingSpecialCharacters(string)</caption>
  * @param {string} field
  * @param {string} mask
  * @param {number} size
  * @returns {string} value
  */
  private usingSpecialCharacters(field: string, mask: string, size: number): string {
    if (!size) { size = 99999999999; }
    let boleanoMascara;
    const exp = /\-|\.|\,| /gi;
    const campoSoNumeros = field.toString().replace(exp, '');
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let sizeMascara = campoSoNumeros.length;
    for (let i = 0; i < sizeMascara; i++) {
      if (i < size) {
        boleanoMascara = ((mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === ','));
        if (boleanoMascara) {
          NovoValorCampo += mask.charAt(i);
          sizeMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }

  /**
  * Responsible formating number
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.thousand(string)</caption>
  * @param {string} value
  */
  private thousand(value: string): string {
    let val = value.replace(/\D/gi, '');
    const reverse = val.toString().split('').reverse().join('');
    const thousands = reverse.match(/\d{1,3}/g);
    if (thousands) {
      return thousands.join(`${this.wesmask.thousand || '.'}`).split('').reverse().join('');
    } else {
      return '';
    }
  }

  /**
  * Responsible for removing special characters
  * @author Antonio Marques <tmowna@gmail.com>
  * @upgrade Marcelo Gomes <marcelo@webemsegundos.com.br>
  * @example <caption>this.formatField(string)</caption>
  * @param {string} field
  * @param {string} mask
  * @param {number} size
  * @returns {string} value
  */
  private formatField(field: string, mask: string, size: number): any {
    if (!size) { size = 99999999999; }
    let boleanoMascara;
    const exp = /\_|\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%|\:| /gi;
    const campoSoNumeros = field.toString().replace(exp, '');
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < size) {
        boleanoMascara = (mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === '/');
        boleanoMascara = boleanoMascara || mask.charAt(i) === '_';
        boleanoMascara = boleanoMascara || ((mask.charAt(i) === '(') || (mask.charAt(i) === ')') || (mask.charAt(i) === ' '));
        boleanoMascara = boleanoMascara || ((mask.charAt(i) === ',') || (mask.charAt(i) === '*') || (mask.charAt(i) === '+'));
        boleanoMascara = boleanoMascara || ((mask.charAt(i) === '@') || (mask.charAt(i) === '#') || (mask.charAt(i) === ':'));
        boleanoMascara = boleanoMascara || ((mask.charAt(i) === '$') || (mask.charAt(i) === '&') || (mask.charAt(i) === '%'));
        if (boleanoMascara) {
          NovoValorCampo += mask.charAt(i);
          TamanhoMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }
}
