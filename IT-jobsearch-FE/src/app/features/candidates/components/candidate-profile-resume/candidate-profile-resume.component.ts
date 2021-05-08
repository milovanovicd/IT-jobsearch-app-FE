import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CandidatesService } from '../../candidates.service';

@Component({
  selector: 'app-candidate-profile-resume',
  templateUrl: './candidate-profile-resume.component.html',
  styleUrls: ['./candidate-profile-resume.component.scss'],
})
export class CandidateProfileResumeComponent implements OnInit {
  isLoading = false;
  resume: string;

  constructor(
    private candidateService: CandidatesService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    const { id } = this.credentialsService.getCandidate();
    this.candidateService
      .get(id)
      .pipe(take(1))
      .subscribe(({ resume }) => (this.resume = resume));
  }

  onLoadingChange(value) {
    this.isLoading = value;
  }

  onResumeValueChanged(value) {
    this.resume = value;
  }
}
