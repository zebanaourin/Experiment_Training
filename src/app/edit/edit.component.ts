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
  styleUrl: './edit.component.scss'
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
    gender: ''
  };

  feildName = ['firstName', 'middleName', 'country', 'city', 'dateOfBirth', 'gender']
  labelName = ['First Name', 'Middle Name', 'Country', 'City', 'Date Of Birth', 'Gender']
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
    const record = this.dataService.getByFileNumber(this.fileNumber);
    if (record) {
      this.formData = { ...record };
    }
  }
  
  startEdit(field: string) {
    this.editingField = field;
    this.tempValue = this.formData[field];
  }

  saveField(field: string) {
    this.formData[field] = this.tempValue;
    this.editingField = null;
    this.dataService.updateRecord(this.formData);
  }

  cancelEdit() {
    this.editingField = null;
    this.tempValue = '';
  }

  goBack() {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  onSubmit() {
    this.dataService.updateRecord(this.formData);
    alert('Record updated successfully!');
    this.isEditMode = false;
    this.router.navigate(['/'], { state: { refresh: true } }); // <-- pass refresh flag
  }
  
}
