import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../../core/data/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public filterParams: any;
  public heading = 'Все статьи';

  public posts = [];
  public previous: any;
  public next: any;
  public page = 1;

  constructor(private router: Router,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.filterParams = params
      this.getPosts()
      if (params.filter === 'featured') {
        this.heading = 'Лучшие'
      } else if (params.category) {
        let cat = this.dataService.categories.find(item => item.slug === params.category)
        this.heading = cat.title
      } else {
        this.heading = 'Все статьи'
      }
    })
  }

  getPosts(page=null) {
    if (page) {
      this.page = page
    }
    this.dataService.getPosts(this.filterParams, this.page).subscribe((res: any) => {
      window.scroll(0,0)
      this.posts = res.results
      this.previous = res.previous
      this.next = res.next
    })
  }

  readMore(s) {
      this.router.navigate(['/blog/some-text'])
  }

  login() {
    this.dataService.login({username: 'marat', password: 'asd123asd'})
  }

}
