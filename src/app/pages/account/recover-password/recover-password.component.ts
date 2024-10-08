import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LayoutService} from "../../../layout/service";
import {Router} from "@angular/router";
import {SharedModule} from "@shared";

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent implements OnInit{

    formRecoverPassword: FormGroup;

    loader: boolean = false;

    okRecoverPassword: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
    }

    /**
     * Implementación del de OnInit.
     * Inicializa la construcción del formulario.
     */
    ngOnInit() {
        this.buildForm();
    }

    /**
     * Método que construye el formularios con los campos se seran utilizado para recolectar la informacion.
     * Se realiza asiga algunas validaciones y requisitos con los que el campo debe cumplir.
     */
    buildForm(): void {
        this.formRecoverPassword = this.formBuilder.group({
            correo: ["", Validators.compose([Validators.email, Validators.required, Validators.maxLength(120)])]
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
            this.formRecoverPassword.get(nombreAtributo)?.invalid &&
            (this.formRecoverPassword.get(nombreAtributo)?.dirty ||
                this.formRecoverPassword.get(nombreAtributo)?.touched)
        );
    }

    /**
     * Devuelve totos los controles del formulario `formChangePassword`
     */
    controls(field: string): any {
        return this.formRecoverPassword.controls[field].errors?.['required'];
    }

    /**
     * Devuelve un valor booleano para validar si campo `correo` del formulario es valido.
     */
    get correoNoValido() {
        return this.isValido('correo');
    }

    /**
     * Este método se ejecuta cuando se envía un formulario de cambio de contraseña.
     * El método primero verifica si el formulario es válido utilizando la propiedad invalid del formulario.
     * Si el formulario no es válido, se marca como tocado y se detiene la ejecución del método.
     */
    onSubmit() {
        if (this.formRecoverPassword.invalid) {
            this.formRecoverPassword.markAllAsTouched();
            return;
        } else {
            this.loader = true;
            //this.authenticationService.recoverPassword(this.formRecoverPassword.value).subscribe({
            //    next: (r) => {
            //        let detail = 'Ver más detalles en el correo enviado.';
            //        this.toastService.showInfo(r.message, detail);
            //        setTimeout(() => {
            //            this.loader = false;
            //            this.okRecoverPassword = true;
            //        }, 1000)
            //    },
            //    error: () => {
            //        this.loader = false;
            //    }
            //})
        }
    }

    /**
     * Redirecciona a la paguina login.
     */
    login() {
        this.router.navigate(['account/auth/login']).then();
    }

}
