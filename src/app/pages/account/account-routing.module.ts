import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {RecoverPasswordComponent} from "./recover-password/recover-password.component";

const routes: Routes = [
    {
        path: '', children: [
            {path: 'login', component: LoginComponent},
            {path: 'changePassword', component: ChangePasswordComponent},
            {path: 'recoverPassword', component: RecoverPasswordComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
