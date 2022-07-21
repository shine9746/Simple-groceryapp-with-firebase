import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { GroceryModule } from '../models/grocery/grocery.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  grocery: GroceryModule = new GroceryModule();
  constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
  }
  onAddItem(): void {
    this.groceryService.addItem(this.grocery).then(() => {   //adding item
    })
  }
}
