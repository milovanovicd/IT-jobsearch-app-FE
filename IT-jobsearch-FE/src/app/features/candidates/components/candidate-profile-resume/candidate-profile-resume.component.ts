import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CandidatesService } from '../../candidates.service';

@Component({
  selector: 'app-candidate-profile-resume',
  templateUrl: './candidate-profile-resume.component.html',
  styleUrls: ['./candidate-profile-resume.component.scss']
})
export class CandidateProfileResumeComponent implements OnInit {
  isLoading = false;
  resume: string;

  constructor(private candidateService: CandidatesService, private credentialsService: CredentialsService) { }

  ngOnInit(): void {
    const { id } = this.credentialsService.getCandidate();
    this.candidateService.get(id).pipe(take(1)).subscribe(({ resume }) => this.resume = resume);
  }

  resumeInputChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0]
    this.isLoading = true;
    console.log(file);

    const formData = new FormData();
    formData.set("id", this.credentialsService.getCandidate().id);
    formData.set("file", file);

    this.candidateService.uploadResume(formData).pipe(take(1)).subscribe(({ fileDownloadUri }: any) => {
      console.log(fileDownloadUri);
      this.resume = fileDownloadUri;
      this.isLoading = false;
    })
  }

  candidateHasResume(){
    return !!this.resume;
  }

  removeResume(){
    this.candidateService.removeResume(this.credentialsService.getCandidate().id).pipe(take(1)).subscribe(_ => this.resume = null);
  }

}
