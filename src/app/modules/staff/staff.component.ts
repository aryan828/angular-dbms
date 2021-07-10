import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {StaffService} from '../../services/staff.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Staff {
  staff_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  no_absent_days: number;
  salary: number;
}

export interface NewStaff {
  first_name: string;
  last_name: string;
  dob: string;
  address: string;
  salary: number;
  phone: string;
  designation: string;
}

const STAFF_DATA: Staff[] = [];

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit{

  constructor(private staffService: StaffService, private sbar: MatSnackBar) {
  }
  displayedColumns: string[] = ['select', 'staff_id', 'name', 'phone', 'absent_days'];
  dataSource = new MatTableDataSource<Staff>(STAFF_DATA);
  selection = new SelectionModel<Staff>(true, []);

  selectedStaff: Staff = {
    staff_id: null,
    first_name: null,
    last_name: null,
    phone: null,
    no_absent_days: null,
    salary: null
  };

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  newStaff: NewStaff = {
    first_name: null,
    last_name: null,
    dob: null,
    address: null,
    salary: null,
    phone: null,
    designation: null
  };

  ngOnInit(): void {
    this.staffService.getStaff().subscribe((list) => {
      this.dataSource.data = list;
      console.log(this.dataSource.data);
    });
    // this.table.renderRows();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Staff): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.staff_id + 1}`;
  }

  addNewStaff(): void {
    // console.log(this.newStaff);
    if (this.newStaff.first_name === null || this.newStaff.last_name === null || this.newStaff.phone === null || this.newStaff.dob === null || this.newStaff.address === null || this.newStaff.salary === null || this.newStaff.designation === null) {
      this.openSnackBar('Staff Data Incomplete!');
    } else {
      this.staffService.putStaff(this.newStaff).subscribe((staff) => console.log(staff));
      this.openSnackBar('Staff Added!');
      this.newStaff = {
        first_name: null,
        last_name: null,
        dob: null,
        address: null,
        salary: null,
        phone: null,
        designation: null
      };
    }
  }

  markAbsent(): void {
    // console.log(this.selection.selected);
    this.staffService.putAbsentees(this.selection.selected).subscribe();
    this.selection.selected.forEach((staff) => staff.no_absent_days++);
  }

  payStaff(): void {
    console.log(this.selectedStaff);
    if (this.selectedStaff.staff_id === null) {
      this.openSnackBar('No Staff Selected!');
    } else {
      this.staffService.payStaff(this.selectedStaff).subscribe();
      this.openSnackBar('Payment Recorded');
      this.selectedStaff = {
        staff_id: null,
        first_name: null,
        last_name: null,
        phone: null,
        no_absent_days: null,
        salary: null
      };
    }
  }

  openSnackBar(message: string): void {
    this.sbar.open(message, 'Dismiss', {
      duration: 3000
    });
  }
}
