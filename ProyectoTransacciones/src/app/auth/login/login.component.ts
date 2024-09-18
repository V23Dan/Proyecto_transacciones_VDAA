import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import swal from 'sweetalert';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import LoginService from '../services/loginService/login.service';
import * as CryptoJS from 'crypto-js';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export default class LoginComponent {
  private readonly fb = inject(FormBuilder);

  formGroupLogin = this.fb.nonNullable.group({
    documento: ['', [Validators.required, Validators.maxLength(30)]],
    pass: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private loginService: LoginService, private router: Router) {}

  clickLogin(): void {
    if (!this.formGroupLogin.valid) {
      swal('Error', 'Formulario invalido', 'error');
    } else {
      const password = this.formGroupLogin.value.pass || '';
      const encryptedPass = CryptoJS.SHA256(password).toString();

      const formDataLogin = {
        ...this.formGroupLogin.value,
        pass: encryptedPass,
      };
      this.loginService.loginUser(formDataLogin).then(
        (response) => {
          if(!response){
            swal('Error', 'Error al iniciar sesion', 'error');
          }else{
            this.router.navigate(['/dashboard']);
          }
        }
      );
    }
  }
}
