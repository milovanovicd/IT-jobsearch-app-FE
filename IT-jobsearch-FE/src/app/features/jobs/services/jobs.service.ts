import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateJobDto } from 'src/app/shared/dto/createJob.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  path = '/jobs';

  constructor(private _http: HttpClient) {}

  get(id: any) {
    return this._http.get(`${environment.apiURL}${this.path}/${id}`);
  }

  getAll(queryString = ''): Observable<any> {
    if(queryString !== ''){
      queryString = '?' + queryString;
    }
    return this._http.get(`${environment.apiURL}${this.path}${queryString}`);
  }

  create(data: CreateJobDto) {
    return this._http.post(`${environment.apiURL}${this.path}`, data);
  }

  update(id: any, data: CreateJobDto) {
    return this._http.put(`${environment.apiURL}${this.path}/${id}`, data);
  }

  remove(id: any) {
    return this._http.delete(`${environment.apiURL}${this.path}/${id}`);
  }

  checkExpired(){
    return this._http.put(`${environment.apiURL}${this.path}/checkExpired`, null);
  }
}
