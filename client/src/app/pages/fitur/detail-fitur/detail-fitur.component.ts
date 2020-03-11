import { VoteService } from './../../../services/vote.service';
import { Fitur } from 'src/app/services/fitur';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FiturService } from './../../../services/fitur.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-fitur',
  templateUrl: './detail-fitur.component.html',
  styleUrls: ['./detail-fitur.component.scss']
})
export class DetailFiturComponent implements OnInit {
  dataSource: Fitur;

  constructor(
    private fb: FormBuilder,
    private fiturService: FiturService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      waktuPengerjaan: ['', Validators.required],
      estimasiHarga: ['', Validators.required]
    });
   }

  private subs = new Subject();
  id: string;
  form: FormGroup;
  subject = new Subject();

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.subs)).subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      this.getData();
    });
  }
  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }
  getData() {
    this.fiturService.getById(this.id)
      .pipe(takeUntil(this.subs))
      .subscribe((fitur) => {
        this.dataSource = fitur;
        console.log(this.dataSource);
      });
  }
  onSubmit() {
    this.voteService.insert(this.form.value).pipe(takeUntil(this.subject)).subscribe(results => {
      console.log(this.form.value);
      this.form.reset();
      const route = '/fitur';
      this.router.navigate([route]);
    });
  }
}
