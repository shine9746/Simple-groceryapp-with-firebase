import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { GroceryModule } from '../models/grocery/grocery.module';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  groceryItems?: GroceryModule[];
  currentItem?: GroceryModule;
  currentIndex = -1;
  title = '';
  constructor(private groceryService: GroceryService) { }
  ngOnInit(): void {
    this.getItems();
  }
  refreshList(): void {
    this.currentItem = undefined;   //emit refresh
    this.currentIndex = -1;
    this.getItems();
  }
  getItems(): void {
    this.groceryService.getItem().snapshotChanges().pipe(   //get the items from the db
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.groceryItems = data;
    });
  }
  setActiveItem(grocery: GroceryModule, index: number): void {  //on clicking the item it will open  the detail view
    this.currentItem = grocery;
    this.currentIndex = index;
  }
  removeAllItems(): void {
    this.groceryService.deleteAll()
      .then(() => this.refreshList())          //remove all items
      .catch(err => console.log(err));
  }
}