import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  @Output() contentSelected = new EventEmitter<string>();

  showContent(contentId: string) {
    this.contentSelected.emit(contentId);
  }
}
