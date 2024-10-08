import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, AppLayoutModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
