import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto } from '../shared/models/projeto';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { environment } from 'src/environments/environment';

const url = 'https://localhost:44371/v1/projetos';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  constructor(private http: HttpClient,
    private configService: ConfigParamsService) { }

  getToken(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  salvar(projeto: Projeto): Observable<Projeto> {
    const headers = this.getToken();
    return this.http.post<Projeto>(`${environment.apiUrl}/v1/projetos`, projeto, { headers: headers });    
  }

  editar(projeto: Projeto) {
    const headers = this.getToken();
    return this.http.put<void>(`${environment.apiUrl}/v1/projetos/${projeto.id}`, projeto, { headers: headers });
  }

  listar(): Observable<Projeto[]> {   
    const headers = this.getToken();
    return this.http.get<Projeto[]>(`${environment.apiUrl}/v1/projetos`, { headers: headers });  
  }

  visualizar(id: number): Observable<Projeto> {
    const headers = this.getToken();
    return this.http.get<Projeto>(`${environment.apiUrl}/v1/projetos/${id}`, { headers: headers });
  }

  excluir(id: number): Observable<void> {
    const headers = this.getToken();
    return this.http.delete<void>(`${environment.apiUrl}/v1/projetos/${id}`, { headers: headers});
  }
}
