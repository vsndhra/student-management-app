import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor( private spinner: NgxSpinnerService ) { }

  openSpinner (){
    this.spinner.show();
  } 

  hideSpinner(){
    this.spinner.hide();
  }
}
