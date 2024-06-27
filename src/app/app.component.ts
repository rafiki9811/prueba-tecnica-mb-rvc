import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmitterService } from './shared/service/emitter.service';
import { LocalStorageService } from './shared/service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  title = 'prueba-tecnica-mb-rvc';
  constructor(
    public router: Router,
  ){}

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  ngOnInit(): void {
    this.registerGlobalEvents();
  }

  private registerGlobalEvents(){
    EmitterService.get<boolean>(EmitterService.logOutAction).pipe(takeUntil(this.destroy$))
      .subscribe((resp)=>{
        if(resp){
          LocalStorageService.clear();
          this.router.navigate(['/login']);
        }
      });
  }

  isLoginPage(): boolean{
    return this.router.url == '/login' ? true : false;
  }
}
