import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/data/data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public categories = []

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.dataService.getCategories().subscribe((res: any) => {
      this.categories = res
      this.dataService.categories = res
    })
  }

  logout() {
    localStorage.removeItem('userData')
  }

  userLoggedIn() {
    return localStorage.getItem('userData')
  }

}
