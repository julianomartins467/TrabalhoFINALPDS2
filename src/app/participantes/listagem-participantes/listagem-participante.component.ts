import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/shared/models/participante';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigPrams } from 'src/app/shared/models/config-prams';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ParticipantesService } from 'src/app/core/participantes.service';

@Component({
  selector: 'app-listagem-participante',
  templateUrl: './listagem-participante.component.html',
  styleUrls: ['./listagem-participante.component.scss']
})

export class ListagemParticipanteComponent implements OnInit {

  config: ConfigPrams = {
    pagina: 0, 
    limite: 4
  };
  participantes: Participante[] = [];
  filtrosListagem: FormGroup;

  constructor(private participantesService: ParticipantesService,
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

  
    this.listarParticipantes();
  }

  onScroll(): void {
    this.listarParticipantes();
  }

  abrir(id: number): void {
    debugger;
    this.router.navigateByUrl('/lista/cadastrar/' + id);
  }

  private listarParticipantes(): void {
    this.config.pagina++;
    this.participantesService.listar()
      .subscribe((participantes: Participante[]) => this.participantes.push(...participantes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.participantes = [];
    this.listarParticipantes();
  }

}
