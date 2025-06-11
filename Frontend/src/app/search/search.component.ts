import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DataService } from '../services/data.service';
import { GridComponent } from '../edit-grid/grid.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule, GridComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFilenumber: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  onSearch() {
    // Just handle input binding - actual filtering is done in GridComponent
  }
}
