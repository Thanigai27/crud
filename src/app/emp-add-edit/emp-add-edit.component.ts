import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm :FormGroup;
  education : string[]=
  [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'post Graduate',
  ]
  constructor(private  _fb: FormBuilder,private _empservice:EmployeesService,private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.empForm=this._fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z\s]*$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Validate 10 digits
      education: ['', Validators.required],
      company: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]],
      experience: ['', Validators.required],
      package: ['', Validators.required],
    });
    
  }
  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    console.log('Form Submitted', this.empForm.value);
    if (this.empForm.valid) {
      if (this.data) {
        this._empservice.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert("updated");
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      } else {
        this._empservice.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert("added successfully");
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
  
  }