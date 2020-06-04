import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ProjetosService } from 'src/app/core/projetos.service';
import { Projeto } from 'src/app/shared/models/projeto';
import { ConfigPrams } from 'src/app/shared/models/config-prams';

@Component({
  selector: 'dio-listagem-projetos',
  templateUrl: './listagem-projetos.component.html',
  styleUrls: ['./listagem-projetos.component.scss']
})
export class ListagemProjetosComponent implements OnInit {
 
  config: ConfigPrams = {
    pagina: 0, 
    limite: 4
  };
  projetos: Projeto[] = [];
  filtrosListagem: FormGroup;

  constructor(private projetosService: ProjetosService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

  
    this.listarProjetos();
  }

  onScroll(): void {
    this.listarProjetos();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/projetos/' + id);
  }

  private listarProjetos(): void {
    this.config.pagina++;
    this.projetosService.listar(this.config)
      .subscribe((projetos: Projeto[]) => this.projetos.push(...projetos));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.projetos = [];
    this.listarProjetos();
  }
}
