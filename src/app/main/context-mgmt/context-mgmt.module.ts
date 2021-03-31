import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AigMenuContextComponent } from './components/menu/menu.component';
import { FuseNavigationModule } from '@fuse/components';

@NgModule({
	imports: [
		CommonModule,
		FuseNavigationModule,
	],
	declarations: [
		AigMenuContextComponent,

	],
	exports: [
		AigMenuContextComponent,

	],
	providers: [

	],
})
export class ContextMgmtModule {}