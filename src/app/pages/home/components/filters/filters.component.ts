import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatExpansionModule, MatListModule, CommonModule, MatButtonModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.categorySubscription = this._storeService.getAllCategories().subscribe((resp)=> this.categories = resp);
  }
  @Output() showCategory = new EventEmitter<string>()
  categories: Array<string> | undefined;

  categorySubscription : Subscription | undefined;
  onShowCategory(category: string) : void{
    this.showCategory.emit(category);
  }
  constructor(private _storeService : StoreService){

  }
  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }
}

