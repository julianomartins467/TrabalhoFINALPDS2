import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { LoginService } from 'src/app/core/login.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService) {

    this.form = fb.group({
      nome: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
      senha: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ],
      ],
    });

  }

  
  reiniciarForm(): void {
    this.form.reset();
  }

  ngOnInit() {
  }

  submit() {
    //this.loaderService.show();
    this.loginService.login(this.form.value)
      .subscribe(
        (data: any) => {          
          sessionStorage.setItem('token', data.token);
          //this.loaderService.hide();
          this.router.navigate(['/']);
        },
        (error) => {
          //this.loaderService.hide();
          //this.snackBar.open('Usuário ou senha inválidos','', { duration: 2000 });       
        }
      );
  }

}
