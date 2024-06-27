import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from './service/login.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../shared/service/local-storage.service';
import ISession from '../shared/interface/isession.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  loginPayload = {
    username: '',
    password: ''
  }

  isFocusedUserInput: boolean = false
  isFocusedPassInput: boolean = false

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    const session = LocalStorageService.getAsJSON<ISession>(LocalStorageService.session)
    if (session)
      console.log("Logged")
      await this.router.navigate(['/home-page']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public Login(): void {
    alert("click")
    this.loginService.Login(this.loginPayload.username, this.loginPayload.password).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (resp) => {
          console.log(resp)
          // if(resp?.data){
          if (resp) {
            LocalStorageService.set('id', 1)
            LocalStorageService.set(LocalStorageService.session, resp)
            LocalStorageService.set(LocalStorageService.lastUser, this.loginPayload.username)
          }
          console.log('Logueado')
          console.log(LocalStorageService.session)
          return;
          //}
          this.toastr.error(resp?.message, 'Login Error')
        },
        error: async (error) => { this.toastr.error(error, 'Error') }
      });
  }

  goRegisterPage(){
     this.router.navigate(['/register-page']);
  }

}
