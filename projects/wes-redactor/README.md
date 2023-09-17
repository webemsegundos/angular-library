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

### ANGULAR.JSON

Place your licensed RedactorX script and styles in /src/libs/redactorx

```
{
  ...  
  "styles": [
      ...
      "src/libs/redactorx/redactorx.min.css",
      "src/libs/redactorx/redactorplugins.scss",
      "src/styles.scss"
  ],
  "scripts": [
      {
        "input": "src/libs/redactorx/redactorx.min.js",
        "inject": true,
        "bundleName": "RedactorX"
      }
  ]
  ...
}
```

### Component

```javascript
import {WeSRedactor, WeSRedactorModule} from "wes-redactor";

@Component({
  ...
  standalone: true,
  imports: [CommonModule, WeSRedactorModule, FormsModule],
  ...
})

...

protected editorOne: WeSRedactor = new WeSRedactor;
protected editorTwo: WeSRedactor = new WeSRedactor;

protected fieldTextOne: string = '';
protected fieldTextTwo: string = '';

protected destroyed$: Subject<unknown> = new Subject();

ngAfterViewInit(): void {
    
    // First Element
    this.editorOne.init('id_of_first_textarea_element', {
      editor: {
        minHeight: '350px',
        maxHeight: '450px',
      },
      content: this.fieldTextOne,
    }).change$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (value: any) => {
        // console.log('new content', value);
        this.fieldTextOne = value; // update your field/model/control
      }
    });


    // Second Element
    this.editorTwo.init('id_of_second_textarea_element', {
      editor: {
        minHeight: '300px',
        maxHeight: '400px',
      },
      content: this.fieldTextTwo,
    }).change$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (value: any) => {
        // console.log('new content', value);
        this.fieldTextTwo = value; // update your field/model/control
      }
    });


}

ngOnDestroy(): void {
  this.destroyed$.next(true);
}

```

### HTML

```html
<textarea id="id_of_first_textarea_element"></textarea>
...
<textarea id="id_of_second_textarea_element"></textarea>

```

### DOCUMENTATION

* init('id_of_element', {original object for RedactorX config})

* change$ - Subscriptor to access each change in content

If you are using RedactorX plugins, you will need to load them in your Component before to add on Config.



# Changelog

### 0.1.23
- Updated documentation to multiple Redactor instances

### 0.1.21
- Updated to accept Angular 15+
