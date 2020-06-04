import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Projeto } from 'src/app/shared/models/projeto';
import { ProjetosService } from 'src/app/core/projetos.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-cadastro-projetos',
  templateUrl: './cadastro-projetos.component.html',
  styleUrls: ['./cadastro-projetos.component.scss']
})
export class CadastroProjetosComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private projetoService: ProjetosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.projetoService.visualizar(this.id)
        .subscribe((projeto: Projeto) => this.criarFormulario(projeto));
    } else {
      this.criarFormulario(this.criarProjetoEmBranco());
    }    
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const projeto = this.cadastro.getRawValue() as Projeto;
    if (this.id) {
      projeto.id = this.id;
      this.editar(projeto);
    } else {
      this.salvar(projeto);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(projeto: Projeto): void {
    this.cadastro = this.fb.group({
      nome: [projeto.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],     
      descricao: [projeto.descricao, [Validators.required]]  
    });
  }

  private criarProjetoEmBranco(): Projeto {
    return {
      id: null,
      nome: null,
      descricao: null      
    } as Projeto;
  }

  private salvar(projeto: Projeto): void {
    this.projetoService.salvar(projeto).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo Projeto',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('projetos');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(projeto: Projeto): void {
    this.projetoService.editar(projeto).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('projetos'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
