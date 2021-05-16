import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface JobApplicationId {
  jobId: any;
	candidateId: any;
}

@Injectable()
export class JobApplicationsService {
  path = '/application';

  constructor(private _http: HttpClient) {}

  get(jobId: any, candidateId: any) {
    return this._http.get(`${environment.apiURL}${this.path}/${jobId}/${candidateId}`);
  }

  create(jobApplicationId: JobApplicationId) {
    return this._http.post(`${environment.apiURL}${this.path}`, jobApplicationId);
  }

  remove(jobId: any, candidateId: any) {
    return this._http.delete(`${environment.apiURL}${this.path}/${jobId}/${candidateId}`);
  }

  removeByJob(jobId: any) {
    return this._http.delete(`${environment.apiURL}${this.path}/${jobId}`);
  }
}
