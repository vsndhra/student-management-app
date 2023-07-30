import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileCreationComponent } from './components/profile-creation/profile-creation.component';
import { MarkEntryComponent } from './components/mark-entry/mark-entry.component';
import { MarkDisplayComponent } from './components/mark-display/mark-display.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Redirect to the login page if the URL is empty
  { path: 'login', title: 'Login',component: LoginComponent },
  { path: 'registration', title: 'Registeration',component: RegistrationComponent },
  { path: 'dashboard', title: 'Dashboard',component: DashboardComponent },
  { path: 'profile', title: 'Profile',component: ProfileCreationComponent },
  { path: 'mark-entry', title: 'Marks',component: MarkEntryComponent },
  { path: 'mark-display', title: 'Marks',component: MarkDisplayComponent },
  // Add more routes here as needed

  // For example, you can define a wildcard route for handling unknown URLs
  { path: '**', redirectTo: '/' }, // Redirect to the login page for any unknown URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
