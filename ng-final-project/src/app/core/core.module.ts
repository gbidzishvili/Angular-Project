import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

@NgModule({
    declarations:[PageNotFoundComponent],
    imports:[    SharedModule,
    ],exports:[PageNotFoundComponent]
})
export class CoreModule {}