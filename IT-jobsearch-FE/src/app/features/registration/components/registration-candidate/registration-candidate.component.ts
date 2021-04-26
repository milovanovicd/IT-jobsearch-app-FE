import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { CandidatesService } from 'src/app/features/candidates/candidates.service';
import { CreateCandidateDto } from 'src/app/shared/dto/createCandidate.dto';
import { UserDto } from 'src/app/shared/dto/user.dto';

@Component({
  selector: 'app-registration-candidate',
  templateUrl: './registration-candidate.component.html',
  styleUrls: ['./registration-candidate.component.scss']
})
export class RegistrationCandidateComponent implements OnInit {
  @Input() user: UserDto;
  @Input() submittingObject: {isLoading: boolean, isSuccess: boolean};
  @Output() registerSuccesful: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private _fb: FormBuilder, private _candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      fullName: ['', Validators.required],
      email: [{value: this.user.username, disabled: true}],
      address: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    console.log(this.user.candidate);
    console.log(this.form.getRawValue());
    const candidate = this.prepareFieldsForCreate(this.form.value);
    this.submittingObject.isLoading = true;
    this._candidatesService.update(this.user.candidate.id, candidate).pipe(take(1)).subscribe((response) => {
      console.log(response);
      this.submittingObject.isLoading = false;
      this.submittingObject.isSuccess = true;
    });

  }

  prepareFieldsForCreate(form: any): CreateCandidateDto {
    return {
      id: this.user.candidate.id,
      fullName: form.fullName,
      address: form.address,
      age: form.age
    };
  }

}
