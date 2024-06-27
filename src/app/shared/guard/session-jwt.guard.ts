import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,  } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';
import ISession from '../interface/isession.interface';
import { EmitterService } from '../service/emitter.service';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

// export class sessionJwtGuard implements CanActivate  {
//   canActivate(
//     route: ActivatedRouteSnapshot, 
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const session = LocalStorageService.getAsJSON<ISession>(LocalStorageService.session)
//     if(!session || !session.token){
//       EmitterService.get<Boolean>(EmitterService.logOutAction).emit(true);
//       return false;
//     } 
//     return true;          
//   }
//