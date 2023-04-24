import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthFlow } from 'src/app/shared/enums/auth-flow.enum';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  changePage() {
    this.authService.authFlow$.next(AuthFlow.SignUp)
  }

  onSubmit() {
    const loginSub = this.authService.login(this.loginForm.value).subscribe((data) => {
      if (data.success) {
        this.loginForm.reset()
        if (data.user.role === 'admin') {

          this.router.navigate(['/admin/products'])
        }
        if (data.user.role === 'user') {
          this.router.navigate(['/user/products'])
        }
      }
    })
    this.subscriptions.push(loginSub);

  }
}
