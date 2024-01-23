import { Component, EventEmitter, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [ MatCardModule, MatMenuModule, MatBadgeModule,    MatIconModule, MatToolbarModule, MatButtonModule ],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css'
})
export class ProductsHeaderComponent {
sort='desc';
@Output() columsCountChange = new EventEmitter<number>();
@Output() itemsCountChange = new EventEmitter<number>();
@Output() sortChange = new EventEmitter<string>();
itemsShowCount=12;

onSortUpdated(newSort:string):void{
this.sort = newSort;
this.sortChange.emit(this.sort)
}
onItemsUpdated(count:number):void{
this.itemsShowCount = count;
this.itemsCountChange.emit(this.itemsShowCount);
  }
  onColumnsUpdated(colsNum: number) : void{
    this.columsCountChange.emit(colsNum)
  }
}
