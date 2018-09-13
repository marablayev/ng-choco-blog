import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../../../core/data/data.service';

@Component({
  selector: 'app-create-wizard',
  templateUrl: './create-wizard.component.html',
  styleUrls: ['./create-wizard.component.scss']
})
export class CreateWizardComponent implements OnInit {

  public postForm: FormGroup;

  constructor(public dataService: DataService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.postForm = this.fb.group({
        'title': [null, Validators.required],
        'text': [null, Validators.required],
        'category': [null, Validators.required],
    });
  }

  publishPost() {
    this.dataService.publishPost(this.postForm.value).subscribe((res: any) => {
      this.router.navigate(['/blog'])
    })
  }

}
