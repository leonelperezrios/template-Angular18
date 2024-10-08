import {NgModule} from '@angular/core';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppConfigModule} from './config/config.module';
import {AppSidebarComponent} from "./app.sidebar.component";
import {AppLayoutComponent} from "./app.layout.component";
import {SharedModule} from "@shared";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        AppConfigModule,
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
