import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { aigGenericRoute } from './aig-generic.route';
import { AigGenericHeaderComponent } from './components/generic-header/generic-header.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { AigEopooListPageComponent } from './components/eopoo-list-page/eopoo-list-page.component';
import { FuseSidebarModule } from '@fuse/components';
import { CommonGenericModule } from 'aig-common/modules/generic/common-generic.module';
import { AigEopooNewModalComponent } from './components/eopoo-new-modal/eopoo-new-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
    declarations: [
        AigGenericHeaderComponent,

        AigEopooListPageComponent,

        AigEopooNewModalComponent,
    ],
    entryComponents: [
        AigEopooNewModalComponent,
    ],
    imports: [
        RouterModule.forChild(aigGenericRoute),

        CommonGenericModule,
        // inserire dipendenza da modulo delle api

        FuseSharedModule,
        FuseSidebarModule,

        MatIconModule,
        MatButtonModule,
        MatToolbarModule,

        
    ],
    exports: [],
    providers: [],
})
export class AigGenericModule {}