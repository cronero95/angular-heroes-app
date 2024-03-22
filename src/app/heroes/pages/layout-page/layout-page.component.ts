import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    {
      label: 'Heroes List',
      icon: 'label',
      url: './list'
    },
    {
      label: 'Add hero',
      icon: 'add_circle',
      url: './new-hero'
    },
    {
      label: 'Search Hero',
      icon: 'search',
      url: './search'
    }
  ]

}
