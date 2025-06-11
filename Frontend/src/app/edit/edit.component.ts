import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RouterModule} from '@angular/router';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  fileNumber: number = 0;
  formData: any = {
    fileNumber: 0,
    firstName: '',
    middleName: '',
    country: '',
    city: '',
    dateOfBirth: '',
    gender: '',
    
  };

  feildName = ['firstName', 'middleName', 'country1',  'city1', 'city2', 'country2', 'dateOfBirth', 'gender'];
labelName = ['First Name', 'Middle Name', 'Country2',  'City1', 'City 2', 'Country 2','Date Of Birth', 'Gender'];

  editingField: string | null = null; 
  tempValue: any = '';  
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.fileNumber = Number(this.route.snapshot.paramMap.get('fileNumber'));
    this.dataService.getByFileNumber(this.fileNumber).subscribe(record => {
    this.formData = record;
  });
  }

  startEdit(field: string) {
    this.editingField = field;
    this.tempValue = this.formData[field];
  }

  saveField(field: string) {
    this.formData[field] = this.tempValue;
    this.editingField = null;
    
    this.dataService.updateRecord(this.formData).subscribe(
      response => {
        console.log('Update success:', response);
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  cancelEdit() {
    this.editingField = null;
    this.tempValue = '';
  }

  goBack() {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  onSubmit() {
    this.dataService.updateRecord(this.formData).subscribe(() => {
      alert('Record updated successfully!');
      this.isEditMode = false;
      this.router.navigate(['/'], { state: { refresh: true } });
    });
  } 
}
