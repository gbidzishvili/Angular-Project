import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

@NgModule({
    declarations:[PageNotFoundComponent],
    imports:[    SharedModule,
        HttpClientModule
    ],exports:[PageNotFoundComponent]
})
export class CoreModule {}