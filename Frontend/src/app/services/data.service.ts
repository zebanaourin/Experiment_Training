import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/records';

  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchAllData();
  }

  fetchAllData() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.dataSubject.next(data);
    });
  }

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

  // updateRecord(record: any) {
  //   return this.http.put(`${this.apiUrl}/${record.fileNumber}`, record).pipe(
  //     // Refresh data after update
  //     tap(() => this.fetchAllData())
  //   );
  // }

  deleteRecord(fileNumber : any){
    return this.http.delete(`${this.apiUrl}/${fileNumber}`);
  }

  // deleteRecord(fileNumber: number) {
  //   return this.http.delete(`${this.apiUrl}/${fileNumber}`).pipe(
  //     // Refresh data after delete
  //     tap(() => this.fetchAllData())
  //   );
  // }


}
