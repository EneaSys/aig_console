import { locale as italian } from '../i18n/it';
import { locale as english } from '../i18n/en';
import { GleMainComponent } from '@aig-ng/tools/main-generic-component';
import { GleCommonService } from '@aig-ng/tools/services/common.service';

export class IppGenericComponent extends GleMainComponent {
    constructor(
        gcs: GleCommonService
    ) {
        super(gcs);
        this.gcs._translateService.setTranslation(english.lang, english.data, true);
        this.gcs._translateService.setTranslation(italian.lang, italian.data, true);
    }
}