import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = [];

  setData(data: any[]) {
    this.data = data;
  }

  getData(): any[] {
    return this.data;
  }

  getByFileNumber(fileNumber: number) {
    return this.data.find(d => d.fileNumber === fileNumber);
  }

  updateRecord(updated: any) {
    const index = this.data.findIndex(d => d.fileNumber === updated.fileNumber);
    if (index !== -1) {
      this.data[index] = updated;
    }
  }
}

