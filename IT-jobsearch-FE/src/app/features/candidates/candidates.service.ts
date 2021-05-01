import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCandidateDto } from 'src/app/shared/dto/createCandidate.dto';
import { environment } from 'src/environments/environment';

@Injectable()
export class CandidatesService {
  path = '/candidates';

  constructor(private _http: HttpClient) {}

  get(id: any): Observable<any> {
    return this._http.get(`${environment.apiURL}${this.path}/${id}`);
  }

  update(id: any, data: CreateCandidateDto): Observable<any> {
    return this._http.put(`${environment.apiURL}${this.path}/${id}`, data);
  }

  remove(id: any) {
    return this._http.delete(`${environment.apiURL}${this.path}/${id}`);
  }

  uploadResume(formData: FormData) {
    return this._http.post(`${environment.apiURL}/resume/upload`, formData);
  }

  removeResume(id: any) {
    return this._http.put(`${environment.apiURL}/resume/remove/${id}`, null);
  }
}
