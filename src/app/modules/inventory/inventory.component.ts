import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AllSuppliers, BillService, NewItemService, SupplierService} from '../../services/inventory.service';
import {MatSnackBar} from '@angular/material/snack-bar';

// This interface defines a category to which an item belongs to
interface Category {
  catID: number;
  category_name: string;
}

// This interface defines a supplier
export interface Supplier {
  supplier_name: string;
  mobile: number;
  email?: string;
  website?: string;
  address?: string;
}

// This interface is used to fetch the items stored in inventory
export interface Item {
  itemid: number;
  item_name: string;
  category: string;
  total_quantity: number;
  unit: string;
  price?: number;
}

// This interface is used when adding a new type of item to the inventory
export interface NewItem {
  item_name: string;
  category: string;
  unit: string;
  total_quantity: number;
}

// This array stores the items which will be added to the new bill
let itemList: Item[] = [];

export interface Bill {
  sup: number;
  total_amount: number;
  items: Item[];
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private supplierService: SupplierService, private newItemService: NewItemService, private billService: BillService, private sbar: MatSnackBar) {
  }

  values: string[] = ['kg', 'g', 'L', 'piece'];
  Categories: Category[] = [
    {catID: 1, category_name: 'Raw Material'},
    {catID: 2, category_name: 'Cleaning Supplies'},
    {catID: 3, category_name: 'Kitchen Equipments'},
    {catID: 4, category_name: 'Daily Essentials'}
  ];

  allItems: Item[];
  allSuppliers: AllSuppliers[];

  newSupplier: Supplier = {
    supplier_name: null,
    mobile: null,
    email: null,
    website: null,
    address: null
  };

  newItem: Item = {
    itemid: null,
    item_name: null,
    category: null,
    total_quantity: null,
    unit: null,
    price: null
  };

  item: NewItem = {
    item_name: null,
    category: null,
    unit: null,
    total_quantity: 0
  };

  upItem: Item = {
    itemid: null,
    item_name: null,
    category: null,
    total_quantity: null,
    unit: null,
    price: null
  };

  selectedSupplier: AllSuppliers = {
    sup_id: null,
    supplier_name: null,
    mobile: null
  };

  nullSelectedSupplier: AllSuppliers = {
    sup_id: null,
    supplier_name: null,
    mobile: null
  };

  displayedColumns = ['name', 'quantity', 'price'];
  dataSource = new MatTableDataSource<Item>(itemList);
  sum: number;
  totalAmount = () => {
    this.sum = 0;
    this.dataSource.data.forEach(item => this.sum += item.price);
    return this.sum;
  }

  ngOnInit(): void {
    this.newItemService.getItems().subscribe((items) => {
      this.allItems = items;
    });
    this.supplierService.getSuppliers().subscribe((sups) => {
      this.allSuppliers = sups;
    });
  }

  addItemToList(): void {
    const newItemInList: Item = {
      itemid: this.newItem.itemid,
      item_name: this.newItem.item_name,
      category: this.newItem.category,
      total_quantity: this.newItem.total_quantity ? this.newItem.total_quantity : 1,
      unit: this.newItem.unit,
      price: this.newItem.price
    };
    this.dataSource.data.push(newItemInList);
    this.table.renderRows();
    this.newItem = {
      itemid: null,
      item_name: null,
      category: null,
      total_quantity: null,
      unit: null,
      price: null
    };
  }

  addSupplier(): void {
    console.log(this.newSupplier);
    if (this.newSupplier.supplier_name === null || this.newSupplier.mobile === null || this.newSupplier.address === null) {
      this.openSnackBar('Supplier Information Incomplete!');
    } else {
      this.supplierService.putSupplier(this.newSupplier).subscribe((newSupplier) => console.log(newSupplier));
      this.newSupplier = {
        supplier_name: null,
        mobile: null,
        email: null,
        website: null,
        address: null
      };
      this.openSnackBar('Supplier Added Successfully!');
    }
  }

  addItem(): void {
    console.log(this.item);
    if (this.item.item_name === null || this.item.unit === null || this.item.category === null) {
      this.openSnackBar('Item Information Incomplete!');
    } else {
      this.newItemService.putNewItem(this.item).subscribe((item) => console.log(item));
      this.item = {
        item_name: null,
        category: null,
        unit: null,
        total_quantity: 0
      };
      this.openSnackBar('Item Added Successfully!');
    }
  }

  addNewBill(): void {
    if (this.selectedSupplier.sup_id === null) {
      this.openSnackBar('Select a Supplier!');
    } else if (itemList.length === 0) {
      this.openSnackBar('No items added to bill!');
    } else {
      const bill: Bill = {
        total_amount: this.sum,
        items: itemList,
        sup: this.selectedSupplier.sup_id
      };
      this.billService.putBill(bill).subscribe();
      // console.log(bill);
      this.openSnackBar('Bill added successfully!');
      this.dataSource.data = [];
      this.table.renderRows();
      this.selectedSupplier = this.nullSelectedSupplier;
    }
  }

  openSnackBar(message: string): void {
    this.sbar.open(message, 'Dismiss', {
      duration: 3000
    });
  }

  updateItem(): void {
    if (this.upItem.itemid === null) {
      this.openSnackBar('No item selected!');
    } else {
      this.newItemService.updateItem(this.upItem).subscribe();
      this.openSnackBar('Item Updated!');
      this.upItem = {
        itemid: null,
        item_name: null,
        category: null,
        total_quantity: null,
        unit: null,
        price: null
      };
    }
  }
}
