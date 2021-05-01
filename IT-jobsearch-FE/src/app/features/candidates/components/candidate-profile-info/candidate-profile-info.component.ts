import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { industries } from 'src/app/shared/mocks/select-arrays';
import { Candidate } from 'src/app/shared/models/candidate.model';
import { CandidatesService } from '../../candidates.service';

@Component({
  selector: 'app-candidate-profile-info',
  templateUrl: './candidate-profile-info.component.html',
  styleUrls: ['./candidate-profile-info.component.scss'],
})
export class CandidateProfileInfoComponent implements OnInit {
  candidateForm: FormGroup;
  candidate: Candidate;
  isEditable = false;
  isLoading = false;
  industriesArray = industries.map((value) => ({ value, label: value }));

  constructor(
    private _formBuilder: FormBuilder,
    private _candidatesService: CandidatesService,
    private _credidentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    const { id } = this._credidentialsService.getCandidate();
    this._candidatesService
      .get(id)
      .pipe(
        take(1),
        // tslint:disable-next-line: no-shadowed-variable
        tap((data) => (this.candidate = data))
      )
      .subscribe(() => this.initForm());
  }

  createForm() {
    this.candidateForm = this._formBuilder.group({
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0)]]
    });
  }

  initForm() {
    this.disableForm();
    this.candidateForm.patchValue(this.candidate);
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    this.isEditable ? this.enableForm() : this.disableForm();
  }

  onUpdate() {
    this.isLoading = true;
    const toUpdate = { ...this.candidate, ...this.candidateForm.value };
    this._candidatesService
      .update(this.candidate.id, toUpdate)
      .pipe(take(1))
      .subscribe((data) => {
        this.candidate = data;
        this.toggleEdit();
        this.initForm();
        this.isLoading = false;
      });
  }

  disableForm() {
    this.candidateForm.disable();
  }

  enableForm() {
    this.candidateForm.enable();
  }

  onCancel(){
    this.toggleEdit();
    this.initForm();
  }
}
