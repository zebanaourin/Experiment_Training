import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/records';

  constructor(private http: HttpClient) {}

  getAllData(){
    return this.http.get<any[]>(this.apiUrl);
  }

  getByFileNumber(fileNumber: number){
    return this.http.get(`${this.apiUrl}/${fileNumber}`);
  }

  updateRecord(record:any){
    console.log(`${this.apiUrl}/${record.fileNumber}`);
    return this.http.put(`${this.apiUrl}/${record.fileNumber}`, record);
  }

  deleteRecord(fileNumber : any){
    return this.http.delete(`${this.apiUrl}/${fileNumber}`);
  }


}

