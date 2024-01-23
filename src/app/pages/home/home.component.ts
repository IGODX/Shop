import { ApplicationModule, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductsHeaderComponent } from "./components/products-header/products-header.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductBoxComponent } from "./components/product-box/product-box.component";
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const ROW_HEIGHT : { [id: number] : number} = {1 :400, 3:335, 4:350}

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MatSidenavModule, 
        ProductsHeaderComponent, 
        FiltersComponent, 
        MatGridListModule, 
        ProductBoxComponent, 
        CommonModule,
         PaginationComponent,
         MatProgressSpinnerModule
        ]
})
export class HomeComponent implements OnInit, OnDestroy {
    cols = 3;
    isLoaded = false;
    rowHeight = ROW_HEIGHT[this.cols];
    category: string | undefined;
    products : Array<Product> | undefined;
    page = 1;
    sort = 'desc';
    count = '12';
    productSubscription : Subscription | undefined;

onColumnsCountChange(colsNum : number) : void{
this.cols = colsNum;
this.rowHeight = ROW_HEIGHT[this.cols];
}
onItemsCountChange(newCount : number) : void{
    this.count = newCount.toString();
    this.getProducts();
}
onSortChange(newSort : string) : void{
    this.sort = newSort;
    this.getProducts();
}
constructor(private _cartService : CartService, private _storeService : StoreService){}
    ngOnDestroy(): void {
        if(this.productSubscription)
        this.productSubscription?.unsubscribe();
    }
    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() : void {
        this.isLoaded =false;
       this.productSubscription = this._storeService
       .getAllProducts(this.count, this.sort, this.category)
       .subscribe((_products)=> {
        this.products = _products
        this.isLoaded = true;
    })
    }
onShowCategory(categoryName : string) : void{
    this.changePage(1);
    this.category = categoryName;
    this.getProducts();
}
onAddToCart(product : Product) : void{
    this._cartService.addToCart({
        product : product.image,
        name: product.title,
        price : product.price,
        quantity : 1,
        id : product.id
    })
}
changePage(newPage : number){
    this.page = newPage;
}
}
