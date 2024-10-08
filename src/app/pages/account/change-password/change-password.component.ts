import {Component, OnInit} from '@angular/core';
import {CryptojsService, LayoutService} from "@services";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedModule} from "@shared";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{
    formChangePassword: FormGroup;

    tokenPassword: number;

    loader = false;

    okChangePassword: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private cryptoService: CryptojsService,
    ) {
    }

    /**
     * Implementación del de OnInit.
     * Obtien el paramatro que llega con la URL.
     * Si el parametro no es nulo, se procede a la construcción del formulario.
     */
    ngOnInit() {
        this.tokenPassword = this.activatedRoute.snapshot.params['id'];
        if (!this.tokenPassword) {
            this.buildForm(this.tokenPassword);
        }
    }

    /**
     * Método que construye el formularios con los campos se seran utilizado para recolectar la informacion.
     * Se marcan algunos campos del formulario como requeridos
     * @param token
     */
    buildForm(token: any): void {
        this.formChangePassword = this.formBuilder.group({
            tokenPassword: token,
            password: ["", Validators.compose([Validators.required])],
            confirmPassword: ["", Validators.compose([Validators.required])]
        })
    }

    /**
     * Método privado que toma un parámetro nombreAtributo que representa el nombre de un atributo en un formulario.
     * Devuelve un valor booleano que indica si el atributo del formulario es inválido y ha sido modificado o tocado por el usuario.
     * @param nombreAtributo cadena de texto con el nombre del campo a verificar.
     * @private
     */
    private isValido(nombreAtributo: string) {
        return (
            this.formChangePassword.get(nombreAtributo)?.invalid &&
            (this.formChangePassword.get(nombreAtributo)?.dirty ||
                this.formChangePassword.get(nombreAtributo)?.touched)
        );
    }

    /**
     * Devuelve totos los controles del formulario `formChangePassword`
     */
    controls(field: string): any {
        return this.formChangePassword.controls[field].errors?.['required'];
    }

    /**
     * Devuelve un valor booleano para validar si campo `password` del formulario es valido.
     */
    get passwordNoValido() {
        return this.isValido('password');
    }

    /**
     * Devuelve un valor booleano para validar si campo `confirmPassword` del formulario es valido.
     */
    get confirmPasswordNoValido() {
        return this.isValido('confirmPassword');
    }

    /**
     * Este método se ejecuta cuando se envía un formulario de cambio de contraseña.
     * El método primero verifica si el formulario es válido utilizando la propiedad invalid del formulario.
     * Si el formulario no es válido, se marca como tocado y se detiene la ejecución del método.
     */
    onSubmit() {
        if (this.formChangePassword.invalid) {
            this.formChangePassword.markAllAsTouched();
            return;
        } else {
            this.loader = true;
            let {tokenPassword, password, confirmPassword} = this.formChangePassword.value;
            password = this.cryptoService.encrypt(password);
            confirmPassword = this.cryptoService.encrypt(confirmPassword);
            const payload = {tokenPassword, password, confirmPassword};
            //this.authenticationService.changePassword(payload).subscribe({
            //    next: (r) => {
            //        let detail = 'La contraseña ha sido actualizada con éxito.';
            //        this.toastService.showSuccess(r.message, detail);
            //        setTimeout(()=>{
            //            this.loader = false;
            //            this.okChangePassword = true;
            //        }, 1000)
            //    },
            //    error: () => {
            //        this.loader = false;
            //    },
            //});
        }
    }

    /**
     * Redirecciona a la paguina login.
     */
    login() {
        this.router.navigate(['account/auth/login']).then();
    }
}
