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
            {
                id       : 'eopoo-list-page',
                title    : 'Eopoo',
                type     : 'item',
                icon     : 'how_to_reg',
                url      : '/g5c/eopoo/list',
            },
            {
                id       : 'eopoo-type-list-page',
                title    : 'Eopoo Type',
                type     : 'item',
                icon     : 'how_to_reg',
                url      : '/g5c/eopoo-type/list',
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
                url      : '/iam/user/list',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'group-list',
                title    : 'Gruppi',
                type     : 'item',
                icon     : 'group',
                url      : '/iam/group/list',
                permission: ['e4y.account.get'],
            },
            {
                id       : 'role-list',
                title    : 'Ruoli Personalizzati',
                type     : 'item',
                icon     : 'assignment_ind',
                url      : '/iam/role/list',
                permission: ['e4y.role.get'],
            },
        ]
    },
    {
        id       : 'aig-standard',
        title    : 'Aig Standard',
        translate: 'NAV.STANDARD',
        type     : 'collapsable',
        children : [
            {
                id       : '',
                title    : 'City',
                type     : 'item',
                icon     : 'location_city',
                url      : '/s6d/city/list'
            },
            {
                id       : '',
                title    : 'Social',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/social/list'
            },
            {
                id       : '',
                title    : 'Social Action',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/social-action/list'
            },
            {
                id       : '',
                title    : 'Cpv',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/cpv/list'
            },
            {
                id       : '',
                title    : 'Ipp Modality',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-modality/list'
            },
            {
                id       : '',
                title    : 'Ipp Procedure',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-procedure/list'
            },
            {
                id       : '',
                title    : 'Ipp Sector',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-sector/list'
            },
            {
                id       : '',
                title    : 'Ipp Lot Type',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-lot-type/list'
            },
            {
                id       : '',
                title    : 'Ipp Lot Category',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-lot-category/list'
            },
        ]
    },
    {
        id       : 'management',
        title    : 'Management',
        translate: 'NAV.MANAGEMENT',
        type     : 'collapsable',
        children : [
            {
                id       : 'context-list',
                title    : 'Ruoli',
                type     : 'item',
                icon     : 'assignment_ind',
                url      : '/m8t/role/list'
            },
            {
                id       : 'permission-list',
                title    : 'Permessi',
                type     : 'item',
                icon     : 'star_half',
                url      : '/m8t/permission/list'
            },
            {
                id       : 'context-list',
                title    : 'Contesti',
                type     : 'item',
                icon     : 'control_camera',
                url      : '/m8t/context/list'
            },
        ]
    },
];
