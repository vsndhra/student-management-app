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
  assignments: any[] = [];  // Initialize the assignments array
  count: number = 0;
  loader: boolean = true;
  add_success: string ='';
  add_error: string = '';

  constructor(
    private autheticationService: AuthenticationService,
    private userService: UserService,
    ) { }
    
  ngOnInit(): void {
    this.isLoggedIn = this.autheticationService.getIsLoggedIn();
    this.role = this.autheticationService.getRole();
    this.userService.getAssignment().subscribe(response => {
        console.log(response);
        this.assignments = response.assignments; 
        this.count = this.assignments.length;
        this.loader = false;
        console.log(this.assignments)
        },
        error => {
          console.error('Error getting assignment:', error);
        }
    );
  }

  onContentSelected(contentId: string) {
    this.selectedContent = contentId;
  }

  addAssignment(assignmentData: any){

    this.userService.addAssignment(assignmentData)
    .subscribe(
        response => {
          console.log('Assignment added successfully: ', response);
          this.add_success = response.success
          this.selectedContent = "listAssignment";
        },
        error => {
          this.add_error = "Assignment was not added successfully"
          console.error('Error adding assignment:', error);
        }
    );
  }

  // getAssignments(){
  //   this.userService.getAssignment()
  //     .subscribe(
  //         response => {
  //           console.log(response);
  //           this.assignments = response.assignments; 
  //           console.log(this.assignments)
  //         },
  //         error => {
  //           console.error('Error getting assignment:', error);
  //         }
  //     )
  // }
  
  showSubmission(): void{
    this.selectedContent = "showSubmission";
  }

  submitAssignment(submissionData: any) {
    this.userService.submitAssignment(submissionData)
    .subscribe(
        response => {
          console.log('Assignment submitted successfully: ', response);
          this.selectedContent = "showSubmission";
        },
        error => {
          console.error('Error adding assignment:', error);
        }
    );
  }

}
