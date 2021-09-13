import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ITractor } from "../interfaces/ITractor"

@Injectable({
  providedIn: 'root'
})

export class ApiService{
  apiUrl= 'http://10.0.0.105:3333'

  httpOptions= {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient){

  }

  public getTractors(): Observable<ITractor[]>{
    return this.httpClient.get<ITractor[]>(`${this.apiUrl}/tractors`)
  }

  public createTractor(data: ITractor): Observable<ITractor>{
    return this.httpClient.post<ITractor>(`${this.apiUrl}/create/tractor`, data)
  }

  public updateTractor(data: ITractor): Observable<void>{
    return this.httpClient.put<void>(`${this.apiUrl}/tractors/${data._id}`, data)
  }

  public deleteTractor(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/tractors/${id}`)
  }

}
