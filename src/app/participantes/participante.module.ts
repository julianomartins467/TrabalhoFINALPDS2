import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroParticipanteComponent } from './cadastro-participante/cadastro-participante.component';
import { MaterialModule } from '../shared/material/material.module';
import { CamposModule } from '../shared/components/campos/campos.module';
import { ListagemParticipanteComponent } from './listagem-participantes/listagem-participante.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroParticipanteComponent, ListagemParticipanteComponent]
})
export class ParticipantesModule { }
