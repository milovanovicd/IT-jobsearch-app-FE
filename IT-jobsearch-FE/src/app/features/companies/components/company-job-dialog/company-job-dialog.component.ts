import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { SeniorityTypeLabel, SeniorityTypeReverseLabel, StatusType, StatusTypeLabel, StatusTypeReverseLabel } from 'src/app/shared/enums/enums';
import { mapMetadataValues, mapToArray } from 'src/app/shared/helpers/helper-methods';
import { MetadataService } from 'src/app/shared/services/metadata.service';
import * as moment from 'moment';

@Component({
  selector: 'app-company-job-dialog',
  templateUrl: './company-job-dialog.component.html',
  styleUrls: ['./company-job-dialog.component.scss'],
})
export class CompanyJobDialogComponent implements OnInit {
  form: FormGroup;
  companyId: any;
  isLoading = false;
  minDate: any;
  positions = [];
  seniorities = [];
  technologies = [];
  title = "Create Job";

  get isUpdate(){
    return !!this.job;
  }

  get isRenew() {
    return !!this.job && this.job.isRenew;
  }

  get datesValid() {
    return this.form.get('publishedDate').value !== null && this.form.get('deadlineDate').value !== null;
  }

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<CompanyJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public job: any,
    private _credidentialsService: CredentialsService,
    private _metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.companyId = this._credidentialsService.getCompany().id;

    this.createForm();

    if (this.isUpdate) {
      this.prepareForUpdate();
      this.title = "Update Job";
    }

    if (this.isRenew) {
      this.prepareForRenew();
      this.title = "Renew Job"
    }

    this.minDate = this.form.getRawValue().publishedDate;

    this.fillOptions();
  }


  submit(){
    const formData = this.form.getRawValue();

    const job = {
      ...formData,
      publishedDate: moment(formData.publishedDate).format('DD.MM.YYYY'),
      deadlineDate: moment(formData.deadlineDate).format('DD.MM.YYYY')
    };
    console.log(job);
    this.dialogRef.close(job);
  }

  fillOptions(){
    this.isLoading = true;
    this.seniorities = mapToArray(SeniorityTypeLabel);
    this._metadataService.getAll().pipe(take(1)).subscribe(({positions, technologies}) => {
      this.positions = mapMetadataValues(positions);
      this.technologies = mapMetadataValues(technologies);
      this.isLoading = false;
    });
  }

  prepareForUpdate(){
    const updatedJob = {
      ...this.job,
      seniority: SeniorityTypeReverseLabel.get(this.job.seniority),
      status: StatusTypeReverseLabel.get(this.job.status),
      publishedDate: new Date(this.job.publishedDate),
      deadlineDate: new Date(this.job.deadlineDate),
    };
    this.form.patchValue(updatedJob);
  }

  prepareForRenew(){
    const updatedJob = {
      ...this.job,
      seniority: SeniorityTypeReverseLabel.get(this.job.seniority),
      status: StatusType.Active,
      publishedDate: new Date(),
      deadlineDate: null,
    };

    this.form.patchValue(updatedJob);
  }

  createForm() {
    this.form = this._fb.group({
      name: [null, Validators.required],
      description: [null, [Validators.required, Validators.maxLength(250)]],
      publishedDate: [{value: new Date(), disabled: true}, Validators.required],
      deadlineDate: [{value: null, disabled: true}, Validators.required],
      position: [null, Validators.required],
      seniority: [null, Validators.required],
      status: [{value: StatusType.Active, disabled: true}, Validators.required],
      companyId: [this.companyId, Validators.required],
      technologies: [null, Validators.required],
    });
  }

  addTechTag(tag: string){
    return {value: tag, label: tag};
  }
}
