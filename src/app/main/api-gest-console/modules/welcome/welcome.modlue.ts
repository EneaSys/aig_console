import { NgModule } from '@angular/core';

import { MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';

import { AigCommonManagementModule } from 'aig-common/modules/management/common-management.module';

import { AigHomePageComponent } from './components/home-page/home-page.component';
import { AigSelectContextDialogComponent } from './components/select-context-dialog/select-context-dialog.component';
import { AigWelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';
import { welcomeRoute } from './components/welcome.route';
import { AigSelectAuthDialogComponent } from './components/select-auth-dialog/select-auth-dialog.component';

@NgModule({
	declarations: [
		AigWelcomePageComponent,
		AigHomePageComponent,
		AigSelectContextDialogComponent,
		AigSelectAuthDialogComponent,

	],
	entryComponents: [
		AigSelectContextDialogComponent,
		AigSelectAuthDialogComponent,
		
	],
    imports: [
		RouterModule.forChild(welcomeRoute),
		
		FuseSharedModule,
		FuseWidgetModule,
		
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
		MatTableModule,
		
		AigCommonManagementModule,
	],
	exports: [],
	providers: [],
})
export class AigWelcomeModule {}