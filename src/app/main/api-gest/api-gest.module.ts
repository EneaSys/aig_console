import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { apiGestRoute } from './api-gest.route';
import { EopooListComponent } from './components/eopoo/eopoo-list/eopoo-list.component';
import { EopooHeaderComponent } from './components/eopoo/eopoo-header.component';
import { EopooListTableComponent } from './components/eopoo/eopoo-list/eopoo-list-table.component';
import { EopooService } from './services/eopoo.service';
import { EopooNewComponent } from './components/eopoo/eopoo-new/eopoo-new.component';
import { EopooTypeResolver } from './services/eopoo-type.resolver';
import { CityResolver } from './services/city.resolver';
import { EopooTypeService } from './services/eopoo-type.service';
import { CityService } from './services/city.service';
import { ApiModule } from './services/test';
import { EopooDetailComponent } from './components/eopoo/eopoo-detail/eopoo-detail.component';
import { PersonService } from './services/person.service';
import { EopooNamePipe } from './pipe/eopoo-name.pipe';


@NgModule({
    declarations: [
        EopooListComponent,
        EopooHeaderComponent,
        EopooListTableComponent,
        EopooNewComponent,
        EopooDetailComponent,
        EopooNamePipe,
    ],
    imports: [
        RouterModule.forChild(apiGestRoute),

        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatAutocompleteModule,

        FuseSharedModule,
        FuseSidebarModule,

        ApiModule
    ],
    exports: [
        EopooHeaderComponent,
        EopooListTableComponent
    ],
    providers: [
        EopooService,
        EopooTypeService,
        EopooTypeResolver,
        PersonService,
        CityService,
        CityResolver
    ],
})
export class ApiGestModule { }