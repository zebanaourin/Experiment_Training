import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ChangeDetectorRef } from '@angular/core';
import { ActionCellComponent } from '../action-cell/action-cell.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule, ActionCellComponent],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})


export class GridComponent implements OnInit, OnChanges {
  
  
  @Input() searchTerm: string = '';
  rowData: any[] = [];
  allData: any[] = [];

  selectedFileNumber: number | null = null;
  showConfirmPopup: boolean = false;
  editClicked: string = 'edit';

  

  columnDefs = [
    { field: 'fileNumber' },
    { field: 'firstName' },
    { field: 'middleName' },
    { field: 'country1' },
    { field: 'city1' },
    {
      field: 'country2',
      headerName: 'Country 2',
      valueFormatter: (params: any) => params.value ?? 'null'
    },
    {
      field: 'city2',
      headerName: 'City 2',
      valueFormatter: (params: any) => params.value ?? 'null'
    },
    {
      headerName: 'Actions',
      cellRenderer: ActionCellComponent,
      cellRendererParams: {
        onEdit: (params: any) => this.onRowClicked(params),
        onDelete: (params: any) => this.onDeleteClicked(params)
      }
    },
    

  ];

  // gridOptions = {
  //   context: { componentParent: this }
  // };

  
  
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  constructor(private router: Router, 
    private dataService: DataService,
    private cdRef : ChangeDetectorRef
    ) {}

    ngOnInit() {
      this.loadData(); 
    }
    

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] && this.allData) {
      const searchStr = this.searchTerm?.toString() || '';
      this.rowData = this.allData.filter((item) =>
        item.fileNumber.toString().startsWith(searchStr)
      );
    }
  }

  loadData() {
    this.dataService.getAllData().subscribe((data) => {
      this.allData = data;
      this.rowData = data;
    });
  }

  onRowClicked(params: any) {
    console.log("Edit clicked");
    this.selectedFileNumber = params?.data?.fileNumber;
    this.editClicked = 'Edit';
    this.showConfirmPopup = true;
    this.cdRef.detectChanges();
  }

  onDeleteClicked(params: any) {
    console.log("Dlete clicked");
    this.selectedFileNumber = params?.data?.fileNumber;
    this.editClicked = 'Delete';
    this.showConfirmPopup = true;
    this.cdRef.detectChanges();
  }

  confirmEdit(): void {
    if (this.editClicked === 'Edit') {
      this.router.navigate(['/edit', this.selectedFileNumber]);
    } else if (this.editClicked === 'Delete') {
      this.dataService.deleteRecord(this.selectedFileNumber).subscribe(() => {
        this.rowData = this.rowData.filter(
          (record) => record.fileNumber !== this.selectedFileNumber
        );
        this.showConfirmPopup = false;
        this.cdRef.detectChanges();
      });
    }
  }

  cancelPopup(): void {
    this.showConfirmPopup = false;
    this.cdRef.detectChanges();
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  
}
