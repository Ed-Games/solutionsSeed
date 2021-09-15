import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ITractor } from "../interfaces/ITractor"

@Injectable({
  providedIn: 'root'
})

export class ApiService{
  private apiUrl= 'http://10.0.0.105:3333'

  private httpOptions= {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  }

  constructor(private httpClient: HttpClient){

  }

  public getTractors(): Observable<ITractor[]>{
    return this.httpClient.get<ITractor[]>(`${this.apiUrl}/tractors`)
  }

  public createTractor(data: ITractor): Observable<ITractor>{
    console.log('form data: ', data)
    return this.httpClient.post<ITractor>(`${this.apiUrl}/create/tractor`, data, this.httpOptions)
  }

  public updateTractor(data: ITractor): Observable<void>{
    return this.httpClient.put<void>(`${this.apiUrl}/tractors/${data._id}`, data, this.httpOptions)
  }

  public deleteTractor(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/tractors/${id}`)
  }

}
