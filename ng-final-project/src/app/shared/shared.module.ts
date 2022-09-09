import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// import { loadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    // declarations:[loadingSpinnerComponent],
    imports:[CommonModule,ReactiveFormsModule,],
  exports:[CommonModule,ReactiveFormsModule,]
})
export class SharedModule{}