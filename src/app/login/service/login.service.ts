import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, timeout } from 'rxjs';
import IAPIResponse from 'src/app/shared/interface/iapi-response.interface';
import BaseApiService from 'src/app/shared/service/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService  extends BaseApiService{
  loginEndPoint = 'https://prueba.sandboxmb.com/api/auth/';
  constructor(
    private http: HttpClient
  ) {
    super('');
  }

  Login(username: string, password: string): Observable<IAPIResponse | null>{
    return this.http.post<IAPIResponse>(this.loginEndPoint,{username,password},{headers: this.getBasicHttpRequestHeaders(), responseType: 'json'})
    .pipe(
      timeout(this.time_out),
      delay(500),
      catchError(async(error)=>(error))
    )
  }
}
