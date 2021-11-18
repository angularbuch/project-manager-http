import {Task} from '../../models/model-interfaces';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/tasks';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {
  }

  checkTasks(): Observable<HttpHeaders> {
    return this.http.head('http://localhost:3000/api/tasks', {
      observe: 'response',
      responseType: 'text'
    }).pipe(map(response => response.headers));
  }


  loadAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(BASE_URL);
  }

  loadTasksWithFullResponse(): Observable<HttpResponse<Task[]>> {
    const params = new HttpParams().append('_limit', '100');
    return this.http.get<Task[]>(BASE_URL, {observe: 'response', params: params});
  }

  getTask(id: number | string): Observable<Task> {
    return this.http.get<Task>(`${BASE_URL}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(BASE_URL, task);
  }

  createTaskLong(task: Task): Observable<Task> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.post<Task>(BASE_URL, JSON.stringify(task), {
      headers: headers
    });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${BASE_URL}/${task.id}`, task);
  }


  deleteTask(task: Task): Observable<HttpResponse<any>> {
    return this.http.delete<Task>(`${BASE_URL}/${task.id}`, {
      observe: 'response'
    });
  }

  saveTask(task: Task) {
    const method = task.id ? 'PUT' : 'POST';
    return this.http.request<Task>(method, `${BASE_URL}/${task.id ?? ''}`, {
      body: task
    });
  }

  findTasksByTitle(title: string): Observable<Task[]> {
    let url = BASE_URL;
    if (title) {
      url += '?title=' + title;
    }
    return this.http.get<Task[]>(url);
  }

  findTasks(query: string = '',
            sort: string = 'id',
            order: string = 'ASC'): Observable<Task[]> {
    const searchParams = new HttpParams()
      .append('q', query)
      .append('_sort', sort)
      .append('_limit', '100')
      .append('_order', order);
    return this.http.get<Task[]>(BASE_URL, {params: searchParams});
  }

  updateState(id: number, state: string): Observable<Task> {
    const body = {state: state};
    return this.http.patch<Task>(`${BASE_URL}/${id}`, body);
  }
}
