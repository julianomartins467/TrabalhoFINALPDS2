import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosModule } from './projetos/projetos.module';
import { ParticipantesModule } from './participantes/participante.module';
import { CadastroProjetosComponent } from './projetos/cadastro-projeto/cadastro-projetos.component';
import { ListagemProjetosComponent } from './projetos/listagem-projetos/listagem-projetos.component';
import { VisualizarProjetosComponent } from './projetos/visualizar-projetos/visualizar-projetos.component';
import { AuthGuard } from './guards/guard';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login/login.component';
import { CadastroLoginComponent } from './login/cadastro-login/cadastro-login.component';
import { ListagemParticipanteComponent } from './participantes/listagem-participantes/listagem-participante.component';
import { CadastroParticipanteComponent } from './participantes/cadastro-participante/cadastro-participante.component';

const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'lista',
        children: [
          {
            path: '',
            component: ListagemProjetosComponent
          },
          {
            path: 'cadastrar',
            children: [
              {
                path: '',
                component: CadastroProjetosComponent
              },
              {
                path: ':id',
                component: CadastroProjetosComponent
              },
            ]
          },
          {
            path: 'visualizar',
            children: [
              {
                path: ':id',
                component: VisualizarProjetosComponent
              }
            ]
          },
        ]
      },
      {
        path: 'participante',
        children: [
          {
            path: '',
            component: ListagemParticipanteComponent
          },
          {
            path: 'cadastrar',
            children: [
              {
                path: '',
                component: CadastroParticipanteComponent
              },
              {
                path: ':id',
                component: CadastroParticipanteComponent
              },
            ]
          },          
        ]
      },


    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastrar',
    component: CadastroLoginComponent,
  },
  { path: '**', redirectTo: '/projetos' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProjetosModule, ParticipantesModule, LoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
