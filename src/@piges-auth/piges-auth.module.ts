import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PigesAuthService } from './piges-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PigesAuthCallbackComponent } from './piges-auth-callback.component';
import { PigesAuthGuard } from './piges-auth-guard.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,

	],
	providers: [
		PigesAuthService,
		PigesAuthGuard,

	],
	declarations: [
		PigesAuthCallbackComponent,

	],
	exports: [
		PigesAuthCallbackComponent,

	],
})
export class PigesAuthModule {}