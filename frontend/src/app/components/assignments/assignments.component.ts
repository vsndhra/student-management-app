import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {
  
  role: string = '';
  isLoggedIn: boolean = false;
  selectedContent: string = 'listAssignment'; // Set default content
  assignments: any[] = []; // Initialize the assignments array

  constructor(
    private autheticationService: AuthenticationService,
    private userService: UserService,
    ) { }
    
  ngOnInit(): void {
    this.isLoggedIn = this.autheticationService.getIsLoggedIn();
    this.role = this.autheticationService.getRole();
    this.getAssignments();
  }

  onContentSelected(contentId: string) {
    this.selectedContent = contentId;
  }

  addAssignment(assignmentData: any){
    this.userService.addAssignment(assignmentData)
    .subscribe(
        response => {
          console.log('Assignment added successfully: ', response);
          this.selectedContent = "listAssignment";
        },
        error => {
          console.error('Error adding assignment:', error);
        }
    );
  }

  getAssignments(){
    this.userService.getAssignment()
      .subscribe(
          response => {
            console.log(response);
            this.assignments = response.assignments; 
          },
          error => {
            console.error('Error getting assignment:', error);
          }
      )
  }
  submitAssignment(): void{
  }

}
