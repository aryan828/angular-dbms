import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { OrderdiagComponent } from './widgets/orderdiag/orderdiag.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    OrderdiagComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    ChartsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    OrderdiagComponent
  ]
})
export class SharedModule { }
