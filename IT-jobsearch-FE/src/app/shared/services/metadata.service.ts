import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Industry } from '../models/industry.model';
import { Position } from '../models/position.model';
import { Technology } from '../models/technology.model';

export interface Metadata {
  industries: Industry[],
  positions: Position[],
  technologies: Technology[],
}
@Injectable()
export class MetadataService {
  path = '/metadata';

  constructor(private _http: HttpClient) {}

  getAll(): Observable<Metadata> {
    return this._http.get<Metadata>(`${environment.apiURL}${this.path}`);
  }
}
