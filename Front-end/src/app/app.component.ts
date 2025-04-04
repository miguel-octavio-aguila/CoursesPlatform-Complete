import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryService } from './services/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CategoryService]
})
export class AppComponent implements OnInit {
  title = 'Front-end';

  public identity:any;
  public token:any;
  public url:any;
  public url_front:any;

  public categories: any = [];

  public audio = new Audio('sonidos/carton.mp3');

  constructor(
    private categoryService: CategoryService,
    public userService: UserService
  ) {
    this.url = GLOBAL.url;
    this.url_front = GLOBAL.url_front;
    this.loadUser();
  }

  ngOnInit(): void {
    this.getCategories();
    this.identity = this.userService.getIdentity();
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    if (Object.keys(this.identity).length === 0 || typeof this.identity === undefined) {
      this.identity = false;
    }
  }

  play_audio() {
    this.audio.play();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => {
        if (res.status == 'success') {
          this.categories = res.categories
          console.log(this.categories);
        }
      },
      err => console.error(err)
    );
  }
}