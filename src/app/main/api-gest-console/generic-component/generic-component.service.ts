import { Injectable, Inject } from '@angular/core';
import { EventService } from 'aig-common/event-manager/event.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { DOCUMENT } from '@angular/common';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Injectable()
export class AigGenericComponentService {
    constructor(
        public fuseTranslationLoaderService: FuseTranslationLoaderService,
        public fuseSidebarService: FuseSidebarService,
        public eventService: EventService,
        public fuseSplashScreenService: FuseSplashScreenService,
        @Inject(DOCUMENT) public _document: any,
    ) {}
}