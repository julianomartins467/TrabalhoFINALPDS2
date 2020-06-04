import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroProjetosComponent } from './cadastro-projeto/cadastro-projetos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemProjetosComponent } from './listagem-projetos/listagem-projetos.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarProjetosComponent } from './visualizar-projetos/visualizar-projetos.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroProjetosComponent, ListagemProjetosComponent, VisualizarProjetosComponent]
})
export class ProjetosModule { }
