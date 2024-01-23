import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatButtonModule, RouterModule, MatTableModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

displayedColumns : Array<string> = [
  'product',
  'name',
  'price',
  'quantity',
  'total',
  'action'
]
cart : Cart = {items: [
{ 
  product: "https://via.placeholder.com/150",
  name: 'snickers',
  id: 1,
  price : 150,
  quantity : 1
},{ 
  product: "https://via.placeholder.com/150",
  name: 'snickers',
  id: 2,
  price : 150,
  quantity : 1
}
]}
dataSource :Array<CartItem> = [];

constructor(private _cartService : CartService) {}
ngOnInit(): void {
  this.dataSource = this.cart.items
  this._cartService.cart.subscribe((cart)=>{
    this.cart = cart;
    this.dataSource = this.cart.items
  })
}
getTotal(items: Array<CartItem>) : number{
return this._cartService.getTotal(items);
}
  onClearCart() : void{
    this._cartService.clearCart()
  }
  onRemoveFromCart(item : CartItem) : void{
    this._cartService.removeFromCart(item)
  }

  onAddQuantity(item : CartItem) : void{
    this._cartService.addToCart(item);
  }

  onRemoveQuantity(item : CartItem) : void{
    this._cartService.removeQuantity(item);
  }
}
