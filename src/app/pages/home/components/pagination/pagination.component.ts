import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  @Input() currentPage = 1;
@Input() total = 0;
@Input() limit = 0;
pages: number[] = [];
@Output() changePage = new EventEmitter<number>()


  ngOnInit(): void {
    this.updatePages()
  }

  range(start: number, end: number): number[] {
    return [...Array(end - start + 1).keys()].map((el) => el + start);
  }

  private updatePages() {
    const pagesCount = Math.ceil(this.total / this.limit);
    const sideCount = 3; // Количество элементов с обеих сторон текущей страницы
    const start = Math.max(1, this.currentPage - sideCount);
    const end = Math.min(pagesCount, this.currentPage + sideCount);
    
    this.pages = this.range(start, end);
  }
  onChangePage(page : number){
    this.currentPage = page;
    this.updatePages();
    this.changePage.emit(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
