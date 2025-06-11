import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-cell',
  standalone: true,
  imports: [],
  templateUrl: './action-cell.component.html',
  styleUrl: './action-cell.component.css'
})
export class ActionCellComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEdit() {
    this.params.context.componentParent.onRowClicked(this.params);
  }

  onDelete() {
    this.params.context.componentParent.onDeleteClicked(this.params);
  }



}
