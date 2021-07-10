import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { CustomerService, OrderService } from '../../services/customer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {createComponent} from '@angular/compiler/src/core';
import {OrderdiagComponent} from '../../shared/widgets/orderdiag/orderdiag.component';
import {throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { saveAs } from 'file-saver';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';



export interface FoodItem {
  food_id: number;
  name: string;
  price: number;
  description?: string;
}

export interface OrderItem {
  food_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  order_id: number;
  name: string;
  phone: string;
  amount: number;
  payment_status: string;
}

export interface SubmitOrder {
  name: string;
  phone: string;
  order: OrderItem[];
  payment_status: string;
  payment_mode: string;
  amount: number;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private sBar: MatSnackBar,
    public dialog: MatDialog,
    private http: HttpClient)
  { }
  displayedColumns = ['name', 'price', 'quantity', 'totalPrice', 'delete'];
  dataSource = new MatTableDataSource<OrderItem>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  formData1 = new FormGroup({
    cname: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    cphone: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10)]),
    pmode: new FormControl(),
    pstatus: new FormControl()
  });

  orderForm = new FormGroup({
    itemname: new FormControl(),
    oquant: new FormControl(1)
  });

  orderid = 0;
  foodMenu: FoodItem[];

  allOrders: Order[];

  sum: number;

  totalAmount = () => {
    this.sum = 0;
    this.dataSource.data.forEach(item => this.sum += item.price * item.quantity);
    return this.sum;
  }

  ngOnInit(): void {
    this.customerService.getMenu().subscribe((menu) => {
      this.foodMenu = menu;
    });
    this.fetchOrders();
  }

  toggleID(value: any): void {
    this.orderid = value.food_id;
  }

  addItemToOrder(data: FormGroup, directive: FormGroupDirective): void {
    console.log(this.orderForm.value);
    const newOrder: OrderItem = {
      food_id: data.value.itemname.food_id,
      name: data.value.itemname.name,
      quantity: data.value.oquant,
      price: data.value.itemname.price
    };
    data.reset({oquant: 1});
    directive.resetForm({oquant: 1});
    this.orderid = 0;
    this.dataSource.data.push(newOrder);
    this.table.renderRows();
  }

  removeItemFromOrder(order: OrderItem): void {
    // console.log(order);
    this.dataSource.data.splice(this.dataSource.data.indexOf(order), 1);
    this.table.renderRows();
  }

  submitOrder(data: FormGroup, directive: FormGroupDirective): void {
    if (data.invalid) {
      this.openSnackBar('Form Incomplete');
    } else if (this.dataSource.data.length === 0) {
      this.openSnackBar('No items added!');
    } else {
      const newOrder: SubmitOrder = {
        order: this.dataSource.data,
        phone: data.value.cphone,
        name: data.value.cname,
        payment_mode: data.value.pmode,
        payment_status: data.value.pstatus,
        amount: this.sum
      };
      this.orderService.putOrder(newOrder).subscribe(() => this.fetchOrders());
      this.openSnackBar('Order Placed');
      this.dataSource = new MatTableDataSource<OrderItem>();
      data.reset();
      directive.reset();
      // this.fetchOrders();
    }
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.allOrders = orders;
      this.allOrders.sort((a, b) => a.order_id > b.order_id ? -1 : a.order_id < b.order_id ? 1 : 0);
      // console.log(this.allOrders);
    });
  }

  markOrderAsPaid(order: Order): void {
    // order.payment_status = 'paid';
    this.orderService.markOrder(order).subscribe(() => this.fetchOrders());
    // this.fetchOrders();
  }

  openSnackBar(message: string): void {
    this.sBar.open(message, 'Dismiss', {
      duration: 3000
    });
  }

  getPdf(id: number): void {
    window.open('http://localhost:8000/api/getpdf/' + id.toString());
  }
}
