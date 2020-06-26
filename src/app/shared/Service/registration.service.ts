import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }
  
    registrationService(data): Observable<HttpResponse<Object>>{
      return this.http.post<HttpResponse<Object>>('http://localhost:8080/user/register', data, {observe: 'response'});
    }
}