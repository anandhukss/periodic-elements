import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DISPLAYED_COLUMNS } from './shared/constants/data';
import { ElementDataService } from './shared/services/element.service';
import { PeriodicElement } from './shared/types/elements.types';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditElementsDialogComponent } from './components/edit-elements-dialog/edit-elements-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { createDebounce } from './shared/utils/debounce';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public dataSource = new MatTableDataSource<PeriodicElement>();
  public displayedCoulmns = DISPLAYED_COLUMNS;
  private _elementDataService = inject(ElementDataService);
  public loading = false;
  private _dialog = inject(MatDialog);
  private _customDebounce = createDebounce(2000);
  public searchTerm = '';

  constructor() {
    this._elementDataService.fetchData();

    effect(() => {
      this.loading = this._elementDataService.loading$();
      this.dataSource.data = this._elementDataService.data$();
    });
  }

  public editElement(data: PeriodicElement, index: number) {
    const dialogRef = this._dialog.open(EditElementsDialogComponent, {
      width: '500px',
      height: '500px',
      data: { ...data },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this._elementDataService.updateData(res, index);
      },
    });
  }

  public filterChange(value: string) {
    this._customDebounce(() => {
      this._elementDataService.filterData(value);
    });
  }
}
