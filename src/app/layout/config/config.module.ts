import {NgModule} from '@angular/core';
import {AppConfigComponent} from './app.config.component';
import {SharedModule} from "@shared";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AppConfigComponent
    ],
    exports: [
        AppConfigComponent
    ]
})
export class AppConfigModule { }
