import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosModule } from './projetos/projetos.module';
import { CadastroProjetosComponent } from './projetos/cadastro-projeto/cadastro-projetos.component';
import { ListagemProjetosComponent } from './projetos/listagem-projetos/listagem-projetos.component';
import { VisualizarProjetosComponent } from './projetos/visualizar-projetos/visualizar-projetos.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'projetos',
      pathMatch: 'full'
  },
  {
    path: 'projetos',
    children: [
      {
        path: '',
        component: ListagemProjetosComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroProjetosComponent
          },
          {
            path: ':id',
            component: CadastroProjetosComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarProjetosComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'projetos' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProjetosModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
