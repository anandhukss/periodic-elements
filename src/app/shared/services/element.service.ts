import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { PeriodicElement } from '../types/elements.types';
import { ELEMENT_DATA } from '../constants/data';

@Injectable({
  providedIn: 'root',
})
export class ElementDataService {
  public state = new RxState<{ data: PeriodicElement[]; loading: boolean }>();
  loading$ = this.state.signal('loading');
  data$ = this.state.signal('data');
  private originalData!: PeriodicElement[];

  constructor() {
    this.state.set({ data: [], loading: false });
  }

  fetchData() {
    this.originalData = ELEMENT_DATA;
    this.state.set({ loading: true });
    setTimeout(() => {
      this.state.set({ data: ELEMENT_DATA, loading: false });
    }, 2000);
  }

  updateData(updatedData: PeriodicElement, index: number) {
    const currentData = this.state.get('data');
    const newData = currentData.map((element, i) =>
      i === index ? { ...element, ...updatedData } : element
    );
    this.originalData = newData;
    this.state.set({ data: newData });
  }

  filterData(searchTerm: string) {
    if (!searchTerm.length) {
      this.state.set({ data: this.originalData });
    }
    const currentData = this.state.get('data');
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const filteredData = currentData.filter((el) => {
      return (
        el.name.toLowerCase().includes(normalizedSearchTerm) ||
        el.position.toString().includes(normalizedSearchTerm) ||
        el.weight.toString().includes(normalizedSearchTerm) ||
        el.symbol.toLowerCase().includes(normalizedSearchTerm)
      );
    });
    this.state.set({ data: filteredData });
  }
}
