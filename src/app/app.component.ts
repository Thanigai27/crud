import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeesService } from './services/employees.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crudapp';

  displayedColumns: string[] = ['id','firstname', 'lastname', 'email','dob','gender','mobile','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private _dialog:MatDialog,private _empService:EmployeesService){}
  ngOnInit(): void {
      this.getEmployeeList();
  }

  openAddEditEmpForm()
  {
  const dialogRef = this._dialog.open(EmpAddEditComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if (val){
        this.getEmployeeList();
      }
    },

  });
  }
  getEmployeeList()
  {
    this._empService.getEmployeeList().subscribe(
      {
        next :(res)=>
          {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
          },
          error: console.log,
  
      }
    )
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 deleteEmploye(id: number){
  this._empService.deleteEmployee(id).subscribe({
    next: (res) =>{
      alert('Employee deleted');
      this.getEmployeeList();
    },
    error: console.log,
  })
 }
 openEditForm(data:any)
 {
  const dialogRef=this._dialog.open(EmpAddEditComponent,{
    data,
  });
  dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if (val){
        this.getEmployeeList();
      }
    },

  });
 }
}