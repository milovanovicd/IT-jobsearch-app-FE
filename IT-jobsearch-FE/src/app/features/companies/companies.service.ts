import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCompanyDto } from 'src/app/shared/dto/createCompany.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  path = '/companies';

  constructor(private _http: HttpClient) {}

  get(id: any): Observable<any> {
    return this._http.get(`${environment.apiURL}${this.path}/${id}`);
  }

  getAll(queryString = ''): Observable<any> {
    if(queryString !== ''){
      queryString = '?' + queryString;
    }
    return this._http.get(`${environment.apiURL}${this.path}${queryString}`);
  }

  create(data: CreateCompanyDto): Observable<any> {
    return this._http.post(`${environment.apiURL}${this.path}`, data);
  }

  update(id: any, data: CreateCompanyDto): Observable<any> {
    return this._http.put(`${environment.apiURL}${this.path}/${id}`, data);
  }

  remove(id: any) {
    return this._http.delete(`${environment.apiURL}${this.path}/${id}`);
  }
}
