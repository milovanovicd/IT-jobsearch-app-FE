import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MetadataService {
  path = '/metadata';

  constructor(private _http: HttpClient) {}

  getAll(): Observable<any> {
    return this._http.get(`${environment.apiURL}${this.path}`);
  }
}
