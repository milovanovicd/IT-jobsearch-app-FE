import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { SeniorityTypeLabel } from 'src/app/shared/enums/enums';
import { mapMetadataValues, mapToOptionsArray } from 'src/app/shared/helpers/helper-methods';
import { MetadataService } from 'src/app/shared/services/metadata.service';
import { JobsService } from '../../services/jobs.service';
import * as queryString from 'query-string';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs-search',
  templateUrl: './jobs-search.page.html',
  styleUrls: ['./jobs-search.page.scss'],
})
export class JobsSearchPageComponent implements OnInit, OnDestroy {
  value = '';
  isLoading = false;
  positions = [];
  seniorities = [];
  technologies = [];
  form: FormGroup;
  jobs: any[];
  inititalJobs: any[];
  inputSubscription: Subscription;
  inputObservable$: Observable<any>;

  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(private _metadataService: MetadataService, private _fb: FormBuilder, private _jobsService: JobsService) {}

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }

  ngOnInit() {
    this.fillOptions();
    this.createForm();
    this._jobsService.getAll().pipe(take(1)).subscribe(jobs => {
      this.jobs = jobs;
      this.inititalJobs = jobs;
    });

    this.inputObservable$ = this.form.controls['name'].valueChanges;
    this.inputSubscription = this.inputObservable$.pipe(debounceTime(300)).subscribe(({target}) => {
      this.filter();
    });
  }

  fillOptions(){
    this.isLoading = true;
    this.seniorities = mapToOptionsArray(SeniorityTypeLabel);
    this._metadataService.getAll().pipe(take(1)).subscribe(({positions, technologies}) => {
      this.positions = mapMetadataValues(positions);
      this.technologies = mapMetadataValues(technologies);
      this.isLoading = false;
    });
  }

  createForm() {
    this.form = this._fb.group({
      name: [],
      positions: [],
      seniorities: [],
      technologies: [],
    })
  }

  filter() {
    const qs = '?' + queryString.stringify(this.form.value, { skipEmptyString:true, skipNull:true , arrayFormat: 'comma'});
    console.log(qs);
    this.isLoading = true;
    this._jobsService.getAll(qs).pipe(take(1)).subscribe(((jobs) => {this.jobs = jobs; this.isLoading = false}));
  }
}
