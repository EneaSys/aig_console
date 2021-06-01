import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GleCommonService } from './services/common.service';
import { DropdownModule } from 'primeng/dropdown';
import { GlePaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,

        DropdownModule,
    ],
    providers: [
        GleCommonService,
    ],
    declarations: [
        GlePaginatorComponent,
    ],
    exports: [
        GlePaginatorComponent,
    ],
})
export class GleToolsModule {}