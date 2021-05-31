import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GleCommonService } from './services/common.service';

@NgModule({
    imports: [ 
        CommonModule,
        TranslateModule,
    ],
    providers: [
        GleCommonService,
    ],
    declarations: [

    ],
    exports: [

    ],
})
export class GleToolsModule {}