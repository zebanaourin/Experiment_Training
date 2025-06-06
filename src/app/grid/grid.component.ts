
import { Component, OnChanges, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit, OnChanges {
  @Input() 
  searchTerm: string = '';
  rowData: any[] = [];
  allData: any[] = [];
  selectedFileNumber: number | null = null;
  showConfirmPopup: boolean = false;
  editClicked: string = 'edit';

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
        container.className = 'Buttons_Container';

        const editButton = document.createElement('button');
        editButton.innerText = '✏️';
        editButton.className = 'btn-edit';
        editButton.addEventListener('click', () => {
          params.context.componentParent.onRowClicked(params);
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = '🗑️';
        deleteButton.className = 'btn-delete';
        deleteButton.addEventListener('click', () => {
          params.context.componentParent.onDeleteClicked(params);
        });

        container.appendChild(editButton);
        container.appendChild(deleteButton);
        return container;
      },
    },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  constructor(
    private router: Router,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService.getAllData().subscribe((data) => {
      this.allData = data;
      this.rowData = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] && this.allData) {
      const searchStr = this.searchTerm?.toString() || '';
      this.rowData = this.allData.filter((item) =>
        item.fileNumber.toString().startsWith(searchStr)
      );
    }
  }

  onRowClicked(event: any) {
    this.selectedFileNumber = event.data.fileNumber;
    this.showConfirmPopup = true;
    this.editClicked = 'edit';
  }

  onDeleteClicked(event: any) {
    this.selectedFileNumber = event.data.fileNumber;
    this.showConfirmPopup = true;
    this.editClicked = 'delete';
  }

  confirmEdit() {
    if (this.selectedFileNumber !== null && this.editClicked == 'edit') {
      this.router.navigate(['/edit', this.selectedFileNumber]);
    } else if (this.selectedFileNumber !== null) {
      this.dataService.deleteRecord(this.selectedFileNumber).subscribe(
        () => this.ngOnInit(),
        (error) => console.error('Delete failed:', error)
      );
    }

    this.cancelPopup();
  }

  cancelPopup() {
    this.showConfirmPopup = false;
    this.selectedFileNumber = null;
    this.editClicked = 'edit';
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

}
