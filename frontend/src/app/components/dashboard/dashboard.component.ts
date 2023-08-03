import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedContent: string = 'home'; // Set default content

  onContentSelected(contentId: string) {
    this.selectedContent = contentId;
  }
}
