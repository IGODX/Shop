import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Cart, CartItem } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,     MatBadgeModule,    MatIconModule,  MatMenuModule, CommonModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
private _cart : Cart = {items : []};
itemsQuantity = 0;

@Input()
get cart() : Cart{
  return this._cart;
}

set cart(cart : Cart){
  this._cart = cart;

  this.itemsQuantity = cart.items
  .map((item)=> item.quantity)
  .reduce((prev, curr)=> prev+ curr, 0)
}

constructor(private _cartService :CartService){}

getTotal(items: Array<CartItem>) : number{
  return this._cartService.getTotal(items);
  }
  onClearCart(){
    this._cartService.clearCart();
  }
}
