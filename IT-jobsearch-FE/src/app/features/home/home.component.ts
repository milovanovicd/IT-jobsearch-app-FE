import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CandidatesService } from '../candidates/candidates.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private credentialsService: CredentialsService, private candidatesService: CandidatesService) { }

  ngOnInit(): void {
    // Remeber candidate applied jobs IDs in local storage
    if(this.credentialsService.isCandidate){
      const { id } = this.credentialsService.getCandidate();
      this.candidatesService.updateAppliedJobs(id).pipe(take(1)).subscribe();
    }
  }

}
