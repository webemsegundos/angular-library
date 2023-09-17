# wes-redactor

return RedactorX for Angular

# Work at
- Node: 10.7.0
- npm 6.4.0
- Angular CLI: 15+

# install

```sh
npm install wes-redactor --save -E
```

# Usage

```javascript
import {WeSRedactor, WeSRedactorModule} from "redactor";

@Component({
	...
	imports: [CommonModule, WeSRedactorModule, ReactiveFormsModule, FormsModule],
  	providers: [WeSRedactor],
  	...
})

...

protected editor: WeSRedactor = inject(WeSRedactor);

ngAfterViewInit(): void {
    this.editor.init('id_of_textarea_element', {
      editor: {
        minHeight: '350px',
        maxHeight: '450px',
      },
      content: this.fieldTexto,
    }).change$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (value: any) => {
        // console.log('conteudo editor alterado', value);
        this.fieldTexto = value;
      }
    });
  }
```

### HTML

```html
<textarea id="meueditor"></textarea>
```

### DOCUMENTATION

* init('id_of_element', {original object for RedactorX config})

* change$ - Subscriptor to access each change in content


# Changelog

### 0.1.18
- Updated to accept Angular 15+
