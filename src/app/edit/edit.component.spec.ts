import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EditComponent } from './edit.component';
import { DataService } from '../services/data.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const mockData = {
  fileNumber : '123456',
  firstName : 'Jane', 
  middlename : 'Doe',
  country : 'India',
  city : 'Hyderabad',
  dateOfBirth : '2002-12-07',
  gender: 'Female'

}

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mouckRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['getFileNumber', 'updateRecord']);
    mouckRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditComponent],
      providers: [
        provideHttpClientTesting(),
        {provide : DataService, useValue: mockDataService},
        {provide: Router, useValue:mouckRouter},
        {
          provide: ActivatedRoute, 
          useValue: {snapshot:{paramMap: new Map([['filename', '123456']])}}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data into formData on init', () => {
    mockDataService.getByFileNumber.and.returnValue(of(mockData));
    component.ngOnInit();
    expect(component.formData.firstName).toBe('Jane');
    expect(component.formData.city).toBe('Hyderabad');
  });

  it('should update field value and call updateRecord()', () => {
    component.formData = {...mockData};
    component.tempValue = 'UpdatedName';
    component.editingField = 'firstName';

    component.saveField('fieldName');

    expect(component.formData.firstName).toBe('UpdatedName');
    expect(mockDataService.updateRecord).toHaveBeenCalledWith(component.formData);
    expect(component.editingField).toBeNull();
  });







});
