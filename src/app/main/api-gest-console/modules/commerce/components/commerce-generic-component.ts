import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { locale as commonCommerceItalian } from 'aig-common/modules/commerce/i18n/it';
import { locale as commonCommerceEnglish } from 'aig-common/modules/commerce/i18n/en';
import { locale as italian } from '../i18n/it';
import { locale as english } from '../i18n/en';

export class AigCommerceGenericComponent extends GenericComponent {
    constructor(
        aigGenericComponentService: AigGenericComponentService,
    ) {
        super(aigGenericComponentService);
        aigGenericComponentService.fuseTranslationLoaderService.loadTranslations(commonCommerceEnglish, commonCommerceItalian, english, italian);
    }
}