import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './layout/default/default.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {CustomerComponent} from './modules/customer/customer.component';
import {InventoryComponent} from './modules/inventory/inventory.component';
import {StaffComponent} from './modules/staff/staff.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: CustomerComponent
  }, {
    path: 'customer',
    component: CustomerComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'inventory',
    component: InventoryComponent
  }, {
    path: 'staff',
    component: StaffComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
