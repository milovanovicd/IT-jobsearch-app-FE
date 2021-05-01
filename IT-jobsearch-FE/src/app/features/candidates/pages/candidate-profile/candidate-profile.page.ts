import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CredentialsService } from 'src/app/core/auth/credentials.service';
import { CompanyDto } from 'src/app/shared/dto/company.dto';
import { CandidatesService } from '../../candidates.service';

const candidateKey = 'candidate';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.page.html',
  styleUrls: ['./candidate-profile.page.scss'],
})
export class CandidateProfilePageComponent implements OnInit {
  candidate$: Observable<CompanyDto> = null;

  constructor(
    private _candidatesService: CandidatesService,
    private _credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    const savedCandidate =
      sessionStorage.getItem(candidateKey) || localStorage.getItem(candidateKey);

    if (!savedCandidate) {
      console.log(this._credentialsService.getCandidate());
      const { id } = this._credentialsService.getCandidate();
      this.candidate$ = this._candidatesService.get(id).pipe(
        tap((candidate) => {
          this._credentialsService.setCandidate(candidate);
        })
      );
    } else {
      this.candidate$ = of(JSON.parse(savedCandidate));
    }
  }
}
