import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { GroceryModule } from '../models/grocery/grocery.module'
@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private databasePath = '/groceryItems';
  groceryReference: AngularFireList<GroceryModule>;
  constructor(private database: AngularFireDatabase) {
    this.groceryReference = database.list(this.databasePath)
  }
  addItem(grocery: GroceryModule): any {
    return this.groceryReference.push(grocery);       //add item
  }
  getItem(): AngularFireList<GroceryModule> {          //get item
    return this.groceryReference;
  }
  update(key: string, value: any): Promise<void> {    //update item
    return this.groceryReference.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.groceryReference.remove(key);         //delete each item
  }
  deleteAll(): Promise<void> {
    return this.groceryReference.remove();            //delete all item
  }
}
