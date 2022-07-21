import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { GroceryModule } from '../models/grocery/grocery.module';


@Component({
  selector: 'app-productdetailview',
  templateUrl: './productdetailview.component.html',
  styleUrls: ['./productdetailview.component.css']
})
export class ProductdetailviewComponent implements OnInit {
  @Input() groceryItems?: GroceryModule;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentItem: GroceryModule = {
    key: '',
    itemName: '',
    itemQuantity: '',
  };
  close;
  message = '';
  constructor(private groceryService: GroceryService) { }
  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.currentItem = { ...this.groceryItems };
  }

  updateItem(): void {
    const data = {
      itemName: this.currentItem.itemName,
      itemQuantity: this.currentItem.itemQuantity
    };
    if (this.currentItem.key) {
      this.groceryService.update(this.currentItem.key, data)           //updating item
        .then(() => {
          this.message = 'The item was updated successfully!'
        })
        .catch(err => console.log(err));
    }
  }
  deleteItem(): void {
    if (this.currentItem.key) {                                       //deleting item
      this.groceryService.delete(this.currentItem.key)
        .then(() => {

          this.message = 'The item was deleted successfully!';
        })
        .catch(err => console.log(err));
    }
  }

  onclose(): void {
    if (this.currentItem.key) {                                      //closing the component
      this.refreshList.emit()
    }

  }
}



