import {Component, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from "rxjs";

declare let RedactorX: any;
@Component({
  selector: 'wes-lib-redactorx',
  template: ``,
  encapsulation: ViewEncapsulation.None,
  styles: []
})
export class WeSRedactor {

  public editor = RedactorX;

  /*
  public config: any = {
    id: 'fi_editor',
    minHeight: '250px',
    maxHeight: '250px',
    editorTextLabeled: false,
    // extra buttons are 'line', 'redo', 'undo', 'ol', 'ul', 'indent', 'outdent'
    editorButtons: ['html', 'format', 'bold', 'italic', 'underline', 'deleted', 'sup', 'sub', 'lists', 'image', 'file', 'link'],
    editorButtonsHide: ['html'],
    editorButtonsHideOnMobile: [],
    // ['alignment', 'beyondgrammar', 'clips', 'counter', 'definedlinks', 'filemanager', 'fontcolor', 'fontfamily', 'fontsize', 'fullscreen', 'handle', 'imagemanager', 'inlinestyle', 'limiter', 'properties', 'specialchars', 'table', 'textdirection', 'textexpander', 'variable', 'video', 'widget']
    editorPlugins: ['alignment', 'beyondgrammar', 'blockcode', 'clips', 'counter', 'definedlinks', 'filelink', 'handle', 'icons', 'imageposition', 'imageresize', 'inlineformat', 'removeformat', 'selector', 'specialchars', 'textdirection', 'underline'],
    //editorPluginsRemove:  ['clips', 'definedlinks', 'filemanager', 'handle', 'imagemanager', 'inlinestyle', 'limiter', 'properties', 'specialchars', 'table', 'textdirection', 'textexpander', 'variable', 'widget'],
    editorPluginsRemove: [],
    editorPluginVariables: [],
    editorPluginClips: [],
    editorPluginDefinedLinks: [], // can be a link to json response with content [{name: '', url: ''}]
    editorLinkValidation: false,
    editorUploadExtraInfo: null,
    editorFileExtraInfo: null,
    editorImageExtraInfo: null,
    editorFileUploadPath: false,
    editorImageUploadPath: false,
    editorImageSelectPath: false,
    editorAuthToken: null,
    language: null,
    inputName: '',
    content: '',
  };
  */

  public change$ = new BehaviorSubject<any>('');

  init(id: string = 'editor', config: any | null = null): WeSRedactor {

    let it = this;

    this.editor('#' + id, {
      ...config,
      subscribe: {
        'editor.change': function (html) {
          it.change$.next(html?.params?.html);
        }
      }
    });

    /*this.editor('#' + this.config.id, {
      //lang: 'pt_br',
      /!*editor: {
        lang: 'pt_br'
      },*!/
      //control: false,
      //context: false,
      //toolbar: true,
      //buttonsTextLabeled: this.config.editorTextLabeled,
      //buttons: this.config.editorButtons,
      //buttonsHide: this.config.editorButtonsHide,
      //buttonsHideOnMobile: this.config.editorButtonsHideOnMobile,
      //linkValidation: this.config.editorLinkValidation,
      //linkTitle: true,
      content: this.config.content,
      editor: {
        //lang: this.config?.language,
        minHeight: this.config.minHeight,
        maxHeight: this.config.maxHeight,
      },
      image: {
        upload: this.config.editorImageUploadPath,
        multiple: false,
        select: this.config.editorImageSelectPath,
        data: {
          authToken: this.config.editorAuthToken,
          fromField: this.config.inputName,
          extraInfo: (typeof this.config.editorImageExtraInfo === 'object') ? JSON.stringify(this.config.editorImageExtraInfo) : this.config.editorImageExtraInfo
        }
      },
      imageManagerJson: this.config.editorImageSelectPath,
      imageResizable: true,
      imagePosition: true,
      plugins: this.config.editorPlugins,
      //clips: this.config.editorPluginClips,
      //definedlinks: this.config.editorPluginDefinedLinks,
      //variables: this.config.editorPluginVariables,
      subscribe: {
        'editor.change': function (html) {
          it.change$.next(html?.params?.html)
          //it.onChange();
          //it.onEventChange(html.params.html);
        },
      },
    });*/
    return this;
  }


}
