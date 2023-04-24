import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AuthFlow } from '../shared/enums/auth-flow.enum';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  showLoginPage: boolean = true
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }
  changePage() {
    this.showLoginPage = !this.showLoginPage
  }

}
