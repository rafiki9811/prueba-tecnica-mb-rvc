import { BehaviorSubject, Observable, Subject, forkJoin, takeUntil } from "rxjs";

export default class BaseStateService {
    public static inProgress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private static SetInProgress(value: boolean): void {
        this.inProgress$.next(value);
    }

    public static InProgress(): Observable<boolean> {
        return this.inProgress$.asObservable();
    }

    public static register(observables: Observable<any>[]): void {
        const destroy$: Subject<void> = new Subject<void>();
        setTimeout(() => {
            this.SetInProgress(true);
            forkJoin(observables.filter((o) => o))
                .pipe(
                    takeUntil(destroy$)
                ).subscribe((success) => {
                    
                }, (err) => {
                    
                }, () => {
                    this.SetInProgress(false);
                    destroy$.next();
                    destroy$.complete();
                });
        }, 50);
    }
}