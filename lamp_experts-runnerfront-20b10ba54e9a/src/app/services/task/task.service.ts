import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    public Tastdata: any;

    constructor(private httpService: HttpService) { }


    onAssignTask(data: any, Tour: any): Observable<any> {
        const url = `${environment.TaskApiendpoint}/task/assign-task/${data}/${Tour}`
        return this.httpService.get(url, this.httpService.headers)
    }
    obtainLocationLiveView(search: any) {
        const url = `${environment.TaskApiendpoint}/task/location_live_view?${search}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    obtainRunnersLiveView(search: any) {
        const url = `${environment.TaskApiendpoint}/task/runner_live_view?${search}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }
    obtainTaskLiveView(search: any) {
        const url = `${environment.TaskApiendpoint}/task/task_live_view?${search}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    addTaskLocation(data: any): Observable<any> {
        const url = `${environment.TaskApiendpoint}/task/add-ondemand-location`
        return this.httpService.post(url, data, this.httpService.headers)
    }
    addTaskOndemand(data: any): Observable<any> {
        const url = `${environment.TaskApiendpoint}/task/add-ondemand`
        return  this.httpService.post(url, data, this.httpService.headers)

    }
    addTask(data: any): Observable<any> {
        console.log("padam1222");
        const url = `${environment.TaskApiendpoint}/task/add`
        return this.httpService.post(url, data, this.httpService.headers)
    }
    deleteTask(data: any): Observable<any> {
        const url = `${environment.TaskApiendpoint}/task/delete/${data}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    updateStatus(id: any, status: any): Observable<any> {
        const url = `${environment.TaskApiendpoint}/task/${id}/${status}`
        return this.httpService.get(url, this.httpService.headers)
    }
    obtainTasks(search: any) {
      const url = `${environment.TaskApiendpoint}/task/list?${search}`;
      return this.httpService.get(url, this.httpService.headers)
          .pipe(
              catchError(this.Errorhandling)
          );
  }
  editTask(data: any, Tour: any): Observable<any> {
    const url = `${environment.TaskApiendpoint}/task/edit/${Tour}`
    return this.httpService.put(url, data, this.httpService.headers)
}
  obtainTask(search: any) {
    const url = `${environment.TaskApiendpoint}/task/detail/${search}`;
    return this.httpService.get(url, this.httpService.headers)
        .pipe(
            catchError(this.Errorhandling)
        );
}
deleteTaskLocaion(id: any) {
    const url = `${environment.TaskApiendpoint}/task/delete_location_bytask/${id}`;
    return this.httpService.delete(url, this.httpService.headers)
        .pipe(
            catchError(this.Errorhandling)
        );
}
makeStartPoint(user: any) {

    const url = `${environment.TaskApiendpoint}/task/make-start-point/${user.id}/${user.task_id}`;
    return this.httpService.get(url, this.httpService.headers)
        .pipe(
            catchError(this.Errorhandling)
        );
}

makeEndPoint(user: any) {
    const url = `${environment.TaskApiendpoint}/task/make-end-point/${user.id}/${user.task_id}`;
    return this.httpService.get(url, this.httpService.headers)
        .pipe(
            catchError(this.Errorhandling)
        );
}
  Errorhandling(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
        console.error(err.error.message);
    } else {
        console.error(`Backend returned code ${err.status}`);
    }
    return throwError('Please try again later.');
}
}

