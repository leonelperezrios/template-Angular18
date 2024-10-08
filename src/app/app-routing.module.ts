import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: 'account', loadChildren: () => import("./pages/account/account.module").then(m => m.AccountModule)},
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import("./pages/dashboard/dashboard.module").then(m => m.DashboardModule)
                    }
                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
