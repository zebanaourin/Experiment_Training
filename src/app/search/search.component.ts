import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { DataService } from '../services/data.service';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { GridComponent } from '../grid/grid.component';
ModuleRegistry.registerModules([ AllCommunityModule ]);
    

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule, GridComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFilenumber: string = '';
  rowData: any[] = [];
  allData: any[] = [];
  selectedFileNumber: number | null = null;
  showConfirmPopup: boolean = false;
  editClicked: string = "edit";

  columnDefs = [
    { field: 'fileNumber' },
    { field: 'firstName' },
    { field: 'middleName' },
    { field: 'country' },
    { field: 'city' },
    { field: 'gender' },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        container.className = "Buttons_Container"
        
        const editButton = document.createElement('button');
        editButton.innerText = '✏️'
        editButton.style.width = '100%';
        editButton.className = 'btn-edit';
        editButton.addEventListener('click', () => {
          params.context.componentParent.onRowClicked(params);
        });
      
        const deleteButton = document.createElement('button');
        deleteButton.innerText = '🗑️';
        deleteButton.className = 'btn-delete';
        deleteButton.style.width = '100%';
        deleteButton.addEventListener('click', () => {
          params.context.componentParent.onDeleteClicked(params);
        });
      
        container.appendChild(editButton);
        container.appendChild(deleteButton);
      
        return container;
      },      
    }
      
  ];
  

  constructor(private http: HttpClient, 
    private router: Router, 
    private dataService: DataService,
    private cd: ChangeDetectorRef) {}

  // ngOnInit() {
  //   this.http.get<any[]>('assets/project-data.json').subscribe((data) => {
  //     this.allData = data;
  //     this.dataService.setData(data); 
  //   });
  // }

  ngOnInit() {
    this.dataService.getAllData().subscribe(data=> {
      this.allData = data;
      this.rowData = data;
    })
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
  
onRowClicked(event: any) {
  this.selectedFileNumber = event.data.fileNumber;
  this.showConfirmPopup = true;
}

onDeleteClicked(event: any) {
  this.selectedFileNumber = event.data.fileNumber;
  this.showConfirmPopup = true;
  this.editClicked = "delete";
}


confirmEdit() {
  if (this.selectedFileNumber !== null && this.editClicked == "edit") {
    this.router.navigate(['/edit', this.selectedFileNumber]);
  }
  else if(this.selectedFileNumber !== null){
    this.dataService.deleteRecord(this.selectedFileNumber).subscribe(
      response => {
        console.log('Delete success:', response);
        this.ngOnInit()
      },
      error => {
        console.error('Delete failed:', error);
      }
    );
  }

  this.cancelPopup();
}

cancelPopup() {
  this.showConfirmPopup = false;
  this.selectedFileNumber = null;
  this.editClicked = "edit"
}


//ag grid related
defaultColDef = {
  flex: 1,              // Makes each column share space
  minWidth: 100,        // Prevents too narrow columns
  resizable: true,      // Optional: Allow column resizing
};

onGridReady(params: any) {
  params.api.sizeColumnsToFit(); // Makes sure columns fill grid width
}




  
}
