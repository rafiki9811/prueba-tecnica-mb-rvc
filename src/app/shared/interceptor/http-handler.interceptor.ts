import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { EmitterService } from "../service/emitter.service";

@Injectable()

export class HttpErrorHandlerInterceptor{

    constructor(
        private toastr: ToastrService
    ){}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) =>{
                const title = error?.statusText;
                const message = error?.error?.message || 'Something was wrong!';

                if(error.status >= 400 && error.status <= 418)
                    this.toastr.warning(message, title || 'Warning')
                else if(error.status >= 500 && error.status <= 511)
                    this.toastr.error(message, title || 'Danger')

                if(error.status === 401)
                    EmitterService.get<Boolean>(EmitterService.logOutAction).emit(true)

                return throwError(message)
            })
        );
    }

}

