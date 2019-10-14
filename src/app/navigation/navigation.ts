import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'apollo-document-list',
                title    : 'Documenti Apollo',
                type     : 'item',
                icon     : 'archive',
                url      : '/apollo-document'
            },
        ]
    },
    {
        id       : 'iam',
        title    : 'Identity and Access Management',
        translate: 'NAV.IAM',
        type     : 'group',
        children : [
            {
                id       : 'user-list',
                title    : 'Utenti',
                type     : 'item',
                icon     : 'person',
                url      : '/iam/user'
            },
            {
                id       : 'group-list',
                title    : 'Gruppi',
                type     : 'item',
                icon     : 'group',
                url      : '/iam/group'
            },
            {
                id       : 'role-list',
                title    : 'Ruoli',
                type     : 'item',
                icon     : 'star_half',
                url      : '/iam/role'
            },
        ]
    },
];
