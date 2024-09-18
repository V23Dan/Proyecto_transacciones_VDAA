import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import LoginComponent from '../login/login.component';
import swal from 'sweetalert';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterService } from '../services/registerService/register.service';
import * as CryptoJS from 'crypto-js';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styles: ``,
})
export default class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  formGroup = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    documento: ['', [Validators.required, Validators.maxLength(30)]],
    edad: [
      null,
      [Validators.required, Validators.min(18), Validators.max(100)],
    ],
    sexo: ['', [Validators.required]],
    direccion: ['', [Validators.required, Validators.maxLength(60)]],
    correo: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
    pass: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private registerService: RegisterService, private router: Router) {}

  clickRegister(): void {
    if (!this.formGroup.valid) {
      swal('Error', 'Formulario invalido', 'error');
    } else {
      const password = this.formGroup.value.pass || '';
      const encryptedPass = CryptoJS.SHA256(password).toString();

      const formData = { ...this.formGroup.value, pass: encryptedPass };
      this.registerService.registerUser(formData).then((response) => {
        if (!response) {
          swal('Error', 'Error de registro', 'error');
        } else {
          swal('¡Registrado!', 'Sera redirigido al login', 'success');
          this.router.navigate(['/auth/login']);
        }
      });
    }
  }
}
