import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-modify',
  standalone: true,
  imports: [CommonModule, AgGridModule, FormsModule],
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {
  @Input() searchTerm: string = '';
  rowData: any[] = [];
  allData: any[] = [];
  selectedFileNumber: number | null = null;
  showConfirmPopup: boolean = false;
  isModifyMode = false;
  formData: any = {};
  editingField: string = '';
  tempValue: string = '';
  fileNumber: number = 0;

  editableFields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'country1', label: 'Country' },
    { key: 'city1', label: 'City' },
    { key: 'country2', label: 'Country 2' },
    { key: 'city2', label: 'City 2' },
    { key: 'gender', label: 'Gender' },
  ];
  

  
columnDefs = [
  { field: 'fileNumber', headerName: 'File Number' },
  { field: 'firstName', headerName: 'First Name' },
  { field: 'middleName', headerName: 'Middle Name' },
  { field: 'country1', headerName: 'Country' },
  { field: 'city1', headerName: 'City' },
  { field: 'city2', headerName: 'City 2' },
  { field: 'country2', headerName: 'Country 2' },
  { field: 'gender', headerName: 'Gender' },
  {
    headerName: 'Actions',
    cellRenderer: (params: any) => {
      const button = document.createElement('button');
      button.innerText = 'Modify';
      button.classList.add('btn-modify');
      button.addEventListener('click', () => {
        const fileNumber = params.data.fileNumber;
        this.router.navigate(['/edit', fileNumber], { state: { modifyMode: true } });
      });
      return button;
    }
  }
];


  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  constructor(
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fileNumber = Number(this.route.snapshot.paramMap.get('fileNumber'));
    this.isModifyMode = history.state.modifyMode || false;

    if (this.fileNumber) {
      this.dataService.getByFileNumber(this.fileNumber).subscribe({
        next: (record) => {
          this.formData = record;

          // Ensure optional fields are initialized if missing
          if (!this.formData.country2) this.formData.country2 = null;
          if (!this.formData.city2) this.formData.city2 = null;
        },
        error: () => {
          console.error('Invalid file number. Redirecting...');
          this.router.navigate(['/modify'], { state: { modifyMode: true } });
        }
      });
    } else {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] && this.allData) {
      const searchStr = this.searchTerm?.toString() || '';
      this.rowData = this.allData.filter((item) =>
        item.fileNumber.toString().startsWith(searchStr)
      );
    }
  }

  loadData() {
    this.dataService.getAllData().subscribe({
      next: (data) => {
        this.allData = data;
        this.rowData = data;
      },
      error: (err) => {
        console.error('Failed to fetch data:', err);
      }
    });
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();

    // Modify button logic
    params.api.addEventListener('cellClicked', (event: any) => {
      if (
        event.colDef.headerName === 'Actions' &&
        event.event.target.classList.contains('btn-modify')
      ) {
        const fileNumber = event.data.fileNumber;
        this.router.navigate(['/edit', fileNumber], { state: { modifyMode: true } });
      }
    });
  }

  goBack() {
    this.router.navigate(['/modify'], { state: { refresh: true } });
  }

  onSubmit() {
    this.dataService.updateRecord(this.formData).subscribe(() => {
      alert('Record updated successfully!');
      this.isModifyMode = false;
      if (this.isModifyMode) {
        this.router.navigate(['/modify'], { state: { refresh: true } });
      } else {
        this.router.navigate(['/'], { state: { refresh: true } });
      }
    });
  }

  startEdit(field: string) {
    this.editingField = field;
    this.tempValue = this.formData[field];
  }

  saveField(field: string) {
    this.formData[field] = this.tempValue;
    this.editingField = '';
  }

  cancelEdit() {
    this.editingField = '';
  }

  onSearch() {
    const searchStr = this.searchTerm.toLowerCase();
    this.rowData = this.allData.filter((item) =>
      item.fileNumber.toString().toLowerCase().startsWith(searchStr)
    );
  }
}


