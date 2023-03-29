# wes-mask-br

return custom mask in input for Angular / Ionic

# Work at
- Node: 10.7.0
- npm 6.4.0
- ionic 6
- Angular CLI: 15

# install

```sh
npm install @webemsegundos/wes-mask-br --save -E
```

# Usage

```javascript
import { WeSMaskBRModule } from 'wes-mask-br';

@NgModule({
  imports: [
    WeSMaskBRModule
  ],
})

```

### HTML

```html
 <form [formGroup]="form">
    <ion-item>
      <ion-input required type="text" formControlName="mask"  placeholder="First Name" [wesmask]="{mask:'00-00', len:5, userCaracters: true}"></ion-input>
    </ion-item>
  </form>

```

### Other Examples

```html
<ion-item>
    <ion-input type="text" formControlName="mask"  placeholder="Mask" [wesmask]="{mask: '00:00', type:'num'}"></ion-input>
</ion-item>

<ion-item>
    <ion-input type="text" formControlName="mask"  placeholder="Mask" [wesmask]="{userCaracters: true}"></ion-input>
</ion-item>

```

### Example for CPF/CNPJ 999.999.999-99 / 99.999.999/9999-99

```html
<ion-item>
	<ion-input type="text" name="cpf" formControlName="mask" placeholder="CPF/CNPJ" [wesmask]="{person: true}"></ion-input>
</ion-item>
```

### Example for Real 999,99

```html
<ion-item>
	<ion-input type="text" name="money" formControlName="mask" placeholder="(R$) Real" [wesmask]="{money: true}"></ion-input>
</ion-item>
```

### Example for Money

```html
<ion-item>
	<ion-input type="text" formControlName="mask" name="money" placeholder="Money" [wesmask]="{money: true, thousand: ',',  decimalCaracter: '.', decimal: '3'}"></ion-input> 
</ion-item>
```

### Example for Real 99,999 With Decimal

```html
<ion-item>
	<ion-input type="text" name="money" formControlName="mask" placeholder="(R$) Real" [wesmask]="{money: true, decimal: 3}"></ion-input>
</ion-item>
```

### Example for Real 99,999 With Decimal

```html
<ion-item>
	<ion-input type="text" name="percent" formControlName="mask" placeholder="% Percent" [wesmask]="{percent: true}" value=""></ion-input>
</ion-item>
```

### Example for Phone (99) 9999-9999 / (99) 99999-9999

```html
<ion-item>
	<ion-input type="text" name="phone" formControlName="mask" placeholder="Phone" [wesmask]="{phone: true}"></ion-input>
</ion-item>
```

### Example for Phone not ddd 9999-9999 / 99999-9999

```html
<ion-item>
	<ion-input type="text" name="phone" formControlName="mask" placeholder="Phone" [wesmask]="{phoneNotDDD: true}"></ion-input>
</ion-item>
```

### Example for number thousand

```html
<ion-item>
	<ion-input type="text" formControlName="phone" [value]="form.get('phone').value" name="phone" placeholder="Phone" [wesmask]="{numberAndTousand: true, thousand: ','}"></ion-input>
</ion-item>
```

# Features
```js
import { WeSMaskBRDirective, WeSMaskBRModel } from 'wes-mask-br';

...

constructor(public WeSMaskBR: WeSMaskBRDirective) {}

...

protected createForm(): FormGroup {
  return new FormGroup({
    phone: new FormControl(this.createPhone())
  });
}

private createPhone(): string {
  const config: WeSMaskBRModel = new WeSMaskBRModel();
  config.phone = true;
  return this.WeSMaskBR.writeCreateValue('99999999999', config);
}
```

# Inputs

* wesmask: WeSMaskBRModel

```ts
	WeSMaskBRModel = {
		form: AbstractControl;
		mask: string;
		len: number;
		money: boolean;
		phone: boolean;
		phoneNotDDD: boolean;
		person: boolean;
		percent:boolean;
		type: 'alfa' | 'num' | 'all';
		decimal: number = 2;
		decimalCaracter: string = `,`;
		thousand: string;
		userCaracters = false;
		numberAndTousand: false,
		moneyInitHasInt: true
	}
```


| Name | type | info |
| ------ | ------ | ------ |
| form | FormControl | Obsolete |
| mask | string | Optional |
| len | string | Optional |
| money | boolean | Optional |
| phone | boolean | Optional |
| phoneNotDDD | boolean | Optional |
| person | boolean | Optional |
| percent | boolean | Optional |
| type | string | Optional default 'all' |
| decimalCaracter | string | Optional default ','  |
| decimal | number | Optional default '2' |
| thousand | string | Optional |
| userCaracters | boolean | Optional default `false` |
| numberAndTousand | boolean | Optional default `false` |
| moneyInitHasInt | boolean | Optional default `true` |


`moneyInitHasInt is when you need to use cents in value` 



# Characters

`- . / ( ) , * + @ # $ & % :`



# Build for developer

### Only use if you change the component

### Build

```sh
npm run build
```

### Publish

```sh
npm publish
```

# Changelog

### 0.0.10
- Names changed to WeSMaskBR not conflict with previous package forked

### 0.0.9

- forked from br-mask - amarkes [(https://github.com/amarkes/br-mask)](https://github.com/amarkes/br-mask)
