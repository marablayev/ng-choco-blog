import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../../core/data/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public post: any;
  public comments = [];
  public slug: any;
  public alreadyRate = false;
  public userRate = 0;
  public commentForm: FormGroup;
  public rateForm: FormGroup;

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.commentForm = this.fb.group({
          'text': [null, Validators.required]
      });
      this.rateForm = this.fb.group({
          'rate': [null, Validators.required]
      });
      this.slug = params.slug
      this.getPost()
    })
  }

  getPost() {
    this.dataService.getPost(this.slug).subscribe((res: any) => {
      this.post = res.post
      this.alreadyRate = res.already_rate
      this.userRate = res.rate
      this.getComments()
    })
  }

  getComments() {
    this.dataService.getComments(this.slug).subscribe((res: any) => {
      this.comments = res
    })
  }

  submitRate() {
    for (let c in this.rateForm.controls) {
      this.rateForm.controls[c].markAsTouched();
    }
    if (this.rateForm.valid) {
      let value = this.rateForm.value
      this.dataService.postRate(this.slug, value).subscribe((res: any) => {
        this.alreadyRate = true
        this.userRate = value.rate
        this.post.rating = res.rating
      })
    }
  }

  submitComment() {
    for (let c in this.commentForm.controls) {
      this.commentForm.controls[c].markAsTouched();
    }
    if (this.commentForm.valid) {
      let value = this.commentForm.value
      this.dataService.postComment(this.slug, value).subscribe((res: any) => {
        this.comments = res
      })
    }
  }

  userLoggedIn() {
    return localStorage.getItem('userData')
  }

}
