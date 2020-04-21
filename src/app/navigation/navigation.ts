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
                url      : '/g5c/eopoo',
                permission: ['g5c.eopoo.get'],
            },
            {
                id       : 'eopoo-type-list-page',
                title    : 'Eopoo Type',
                type     : 'item',
                icon     : 'how_to_reg',
                url      : '/g5c/eopoo-type',
                permission: ['g5c.eopoo-type.post'],
            },
            {
                id       : 'procurement-list-page',
                title    : 'Procurement',
                type     : 'item',
                icon     : 'build',
                url      : '/ipp/procurement',
                permission: ['ipp.p9t.get'],
            },
        ]
    },
    {
        id       : 'solidarity',
        title    : 'Solidarity',
        type     : 'group',
        children : [
            {
                id       : 'solidarity-dashboard',
                title    : 'Dashboard',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/solidarity/dashboard',
                permission: ['s8y.request.get'],
            },
            {
                id       : 'solidarity-request-list-page',
                title    : 'Requests',
                type     : 'item',
                icon     : 'child_care',
                url      : '/solidarity/request',
                permission: ['s8y.request.get'],
            },
        ]
    },
    {
        id       : 'commerce',
        title    : 'Commerce',
        type     : 'group',
        children : [
            {
                id       : 'commerce-seller-manager',
                title    : 'Gestore Vendite',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/commerce/seller-manager',
                permission: ['c6e.buy.get.asSeller'],
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
                url      : '/s6d/city',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Social',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/social',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Social Action',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/social-action',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Cpv',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/cpv',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Ipp Modality',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-modality',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Ipp Procedure',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-procedure',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Ipp Sector',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-sector',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Ipp Lot Type',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-lot-type',
                permission: ['e4y.account.get'],
            },
            {
                id       : '',
                title    : 'Ipp Lot Category',
                type     : 'item',
                icon     : 'arrow_right',
                url      : '/s6d/ipp-lot-category',
                permission: ['e4y.account.get'],
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
                url      : '/m8t/role',
                permission: ['e4y.role.get'],
            },
            {
                id       : 'permission-list',
                title    : 'Permessi',
                type     : 'item',
                icon     : 'star_half',
                url      : '/m8t/permission',
                permission: ['e4y.role.get'],
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
