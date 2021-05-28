import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { locale as italian } from '../i18n/it';
import { locale as english } from '../i18n/en';

export class AigIppCommonGenericComponent {
    constructor(
        _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        _fuseTranslationLoaderService.loadTranslations(italian, english);
    }
}