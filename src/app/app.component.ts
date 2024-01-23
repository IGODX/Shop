import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        MatToolbarModule, 
        CommonModule,
        RouterOutlet,
        MatSidenavModule,
        MatGridListModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatListModule,
        MatTableModule,
        MatBadgeModule,
        MatSnackBarModule,
        HeaderComponent
    ]
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this._cartService.cart.subscribe((cart)=>{
      this._cart = cart;
    })
  }
  constructor(private _cartService : CartService){}
  title = 'Site';
  _cart : Cart= {items : []};
}
