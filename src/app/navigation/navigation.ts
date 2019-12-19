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
                url      : '/apollo-document',
                permission: ['e4y2.apollo.get'],
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
                url      : '/iam/user',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'group-list',
                title    : 'Gruppi',
                type     : 'item',
                icon     : 'group',
                url      : '/iam/group',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'role-list',
                title    : 'Ruoli Personalizzati',
                type     : 'item',
                icon     : 'assignment_ind',
                url      : '/iam/role',
                permission: ['e4y.role.get'],
            },
        ]
    },
    {
        id       : 'management',
        title    : 'Management',
        translate: 'NAV.MANAGEMENT',
        type     : 'group',
        children : [
            {
                id       : 'context-list',
                title    : 'Ruoli',
                type     : 'item',
                icon     : 'assignment_ind',
                url      : '/m8t/role'
            },
            {
                id       : 'permission-list',
                title    : 'Permessi',
                type     : 'item',
                icon     : 'star_half',
                url      : '/m8t/permission'
            },
            {
                id       : 'context-list',
                title    : 'Contesti',
                type     : 'item',
                icon     : 'control_camera',
                url      : '/m8t/context'
            },
        ]
    },
];
