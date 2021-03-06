import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MyEventsWebPart.module.scss';
import * as strings from 'MyEventsWebPartStrings';

import "@webcomponents/custom-elements/src/native-shim";
import "core-js/es7/reflect";

import { AppModule } from "./app/app.module";
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

export interface IMyEventsWebPartProps {
  description: string;
}

export default class MyEventsWebPart extends BaseClientSideWebPart<IMyEventsWebPartProps> {

  public render(): void {

      platformBrowserDynamic().bootstrapModule(AppModule, {ngZone: 'noop'}).then(() => {
          this.domElement.innerHTML =`<my-app message="${this.properties.description}" site-url="${this.context.pageContext.web.absoluteUrl}"></my-app>`
      })
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
