import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { locale as commonIppItalian } from 'aig-common/modules/ipp/i18n/it';
import { locale as commonIppEnglish } from 'aig-common/modules/ipp/i18n/en';
import { locale as italian } from '../i18n/it';
import { locale as english } from '../i18n/en';

export class AigIppGenericComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) {
        super(aigGenericComponentService);
        aigGenericComponentService.fuseTranslationLoaderService.loadTranslations(commonIppEnglish, commonIppItalian, english, italian);
    }
}