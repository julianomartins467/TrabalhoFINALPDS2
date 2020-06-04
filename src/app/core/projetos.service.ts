import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto } from '../shared/models/projeto';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/projetos/';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(url, projeto);
  }

  editar(projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(url + projeto.id, projeto);
  }

  listar(config: ConfigPrams): Observable<Projeto[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Projeto[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
