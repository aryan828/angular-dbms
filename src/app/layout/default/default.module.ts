import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { ChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {CustomerComponent} from '../../modules/customer/customer.component';
import {StaffComponent} from '../../modules/staff/staff.component';
import {InventoryComponent} from '../../modules/inventory/inventory.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {OrderdiagComponent} from '../../shared/widgets/orderdiag/orderdiag.component';
import {MouseEnterLeaveDebounceDirective} from '../../modules/dashboard/mouse.directive';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CustomerComponent,
    StaffComponent,
    InventoryComponent,
    DashboardComponent,
    MouseEnterLeaveDebounceDirective
  ],
  entryComponents: [OrderdiagComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    ChartsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class DefaultModule { }
