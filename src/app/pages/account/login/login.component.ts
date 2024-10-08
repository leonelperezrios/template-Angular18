import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, LayoutService} from "@services";
import {SharedModule} from "@shared";
import {finalize} from "rxjs";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        SharedModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    loader: false;

    loading: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private formBuider: FormBuilder,
        private authenticationService: AuthenticationService,
    ) {
    }

    ngOnInit() {
        this.createLoginForm();
    }

    createLoginForm() {
        this.formLogin = this.formBuider.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        })
    }

    private isValid(attributeName: string) {
        return (this.formLogin.get(attributeName)?.invalid && (this.formLogin.get(attributeName)?.dirty || this.formLogin.get(attributeName)?.touched));
    }

    controls(field: string): any {
        return this.formLogin.controls[field].errors?.['required'];
    }

    get usernameValid() {
        return this.isValid('username');
    }

    get passwordValid() {
        return this.isValid('password');
    }

    onSubmit() {
        if (this.formLogin.invalid) {
            return;
        } else {
            this.loading = true;
            let {username, password} = this.formLogin.value;
            this.authenticationService.login({username, password}).pipe(
                finalize(() => {
                    this.loading = false;
                })
            ).subscribe({
                next(res) {
                    console.log(res);
                },
                error(err) {
                    console.log(err);
                }
            })
        }
    }

    recoverPasswor() {

    }

}
