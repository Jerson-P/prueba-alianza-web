import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../model/cliente.dominio';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ClientesServicio {

  constructor(private http: HttpClient) {}

  getTodosLosClientes(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${environment.API_URL}/todos`);
  }

  getClienteClaveCompartida(clave: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${environment.API_URL}/${clave}`);
  }

  crearCliente(client: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${environment.API_URL}`, client);
  }

  editarCliente(client: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${environment.API_URL}`, client);
  }
}