import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { DataService } from '../services/data.service';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
    
ModuleRegistry.registerModules([ AllCommunityModule ]);
    

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchFilenumber: number = 0;
  rowData: any[] = [];
  allData: any[] = [];
  selectedFileNumber: number | null = null;
  showConfirmPopup: boolean = false;

  columnDefs = [
    { field: 'fileNumber' },
    { field: 'firstName' },
    { field: 'middleName' },
    { field: 'country' },
    { field: 'city' },
    { field: 'gender' }
  ];
  

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {}

  // ngOnInit() {
  //   this.http.get<any[]>('assets/project-data.json').subscribe((data) => {
  //     this.allData = data;
  //     this.dataService.setData(data); 
  //   });
  // }

  ngOnInit() {
    const existingData = this.dataService.getData();
    if (existingData.length > 0) {
      // Use updated data from DataService
      this.allData = existingData;
      this.rowData = existingData;
    } else {
      // Load initial data from JSON
      this.http.get<any[]>('assets/project-data.json').subscribe((data) => {
        this.allData = data;
        this.rowData = data;
        this.dataService.setData(data);
      });
    }
  }
  
  
  onSearch() {
    if (this.searchFilenumber == null || this.searchFilenumber === undefined) {
      this.rowData = this.allData;  
      return;
    }

    const searchStr = this.searchFilenumber.toString();
    this.rowData = this.allData.filter((item) =>
      item.fileNumber.toString().startsWith(searchStr)
    );
  }
  
  

  // onRowClicked(event: any) {
  //   const fileNumber = event.data.fileNumber;
  //   console.log("printing")
  //   this.router.navigate(['/edit', fileNumber]);
  // }

  

onRowClicked(event: any) {
  this.selectedFileNumber = event.data.fileNumber;
  this.showConfirmPopup = true;
}

confirmEdit() {
  if (this.selectedFileNumber !== null) {
    this.router.navigate(['/edit', this.selectedFileNumber]);
  }
  this.cancelPopup();
}

cancelPopup() {
  this.showConfirmPopup = false;
  this.selectedFileNumber = null;
}

defaultColDef = {
  flex: 1,              // Makes each column share space
  minWidth: 100,        // Prevents too narrow columns
  resizable: true,      // Optional: Allow column resizing
};

onGridReady(params: any) {
  params.api.sizeColumnsToFit(); // Makes sure columns fill grid width
}




  
}
