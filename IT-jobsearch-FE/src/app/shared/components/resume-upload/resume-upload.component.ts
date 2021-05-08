import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CandidatesService } from 'src/app/features/candidates/candidates.service';

@Component({
  selector: 'app-resume-upload',
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.scss']
})
export class ResumeUploadComponent implements OnInit {
  @Input() resume = null;
  @Input() showDownloadButton = true;
  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  @Output() resumeValueChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(private candidateService:CandidatesService, private credentialsService:CredentialsService) { }

  ngOnInit(): void {
  }

  resumeInputChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0]
    // this.isLoading = true;
    this.loading.emit(true);
    console.log(file);

    const formData = new FormData();
    formData.set("id", this.credentialsService.getCandidate().id);
    formData.set("file", file);

    this.candidateService.uploadResume(formData).pipe(take(1)).subscribe(({ fileDownloadUri }: any) => {
      console.log(fileDownloadUri);
      // this.resume = fileDownloadUri;
      this.resumeValueChanged.emit(fileDownloadUri);
      // this.isLoading = false;
      this.loading.emit(false);
    })
  }

  candidateHasResume(){
    return !!this.resume;
  }

  removeResume(){
    this.candidateService.removeResume(this.credentialsService.getCandidate().id).pipe(take(1)).subscribe(_ => this.resumeValueChanged.emit(null));
  }

}
