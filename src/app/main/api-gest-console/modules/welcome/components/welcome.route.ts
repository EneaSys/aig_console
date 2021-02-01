import { Routes } from "@angular/router";
import { AuthGuardService } from "auth/auth-guard.service";
import { AigHomePageComponent } from "./home-page/home-page.component";
import { AigWelcomePageComponent } from "./welcome-page/welcome-page.component";

export const welcomeRoute: Routes = [
	{
        path     : 'welcome-page',
        component: AigWelcomePageComponent,
    },
	{
        path     : 'home-page',
		component: AigHomePageComponent,
		canActivate: [ AuthGuardService ],
	},
];