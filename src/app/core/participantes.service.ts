import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participante } from '../shared/models/participante';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  constructor(private http: HttpClient,
    private configService: ConfigParamsService) { }

  getToken(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  salvar(participante: Participante): Observable<Participante> {
    const headers = this.getToken();
    return this.http.post<Participante>(`${environment.apiUrl}/v1/participantes`, participante, { headers: headers });    
  }

  editar(participante: Participante) {
    const headers = this.getToken();
    return this.http.put<void>(`${environment.apiUrl}/v1/participantes/${participante.id}`, participante, { headers: headers });
  }

  listar(): Observable<Participante[]> {   
    debugger;
    const headers = this.getToken();
    return this.http.get<Participante[]>(`${environment.apiUrl}/v1/participantes`, { headers: headers });  
  }

  visualizar(id: number): Observable<Participante> {
    const headers = this.getToken();
    return this.http.get<Participante>(`${environment.apiUrl}/v1/participantes/${id}`, { headers: headers });
  }

  excluir(id: number): Observable<void> {
    const headers = this.getToken();
    return this.http.delete<void>(`${environment.apiUrl}/v1/participantes/${id}`, { headers: headers});
  }
}
