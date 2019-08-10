import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'eopoo-list',
                title    : 'Anagrafiche',
                type     : 'item',
                icon     : 'list',
                url      : '/api-gest'
            }
        ]
    }
];
