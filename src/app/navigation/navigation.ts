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
				translate: 'NAV.EOPOO',
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
        id       : 'ipp',
        title    : 'Public Procurement',
        type     : 'group',
        children : [
            {
                id       : 'procurement-list-page',
                title    : 'Procurement',
                type     : 'item',
                icon     : 'build',
                url      : '/ipp/procurement',
                permission: ['ipp.p9t.get'],
            },
            {
                id       : 'ipp-lot-list-page',
                title    : 'Procurement Lot',
                type     : 'item',
                icon     : 'child_care',
                url      : '/ipp/lot',
                permission: ['ipp.p9t.get'],
            },
        ]
    },
    {
        id       : 'commerce',
        title    : 'Commerce',
        type     : 'group',
        children : [
            {
                id       : 'seller',
                title    : 'Negozi',
                type     : 'item',
                icon     : 'shopping_basket',
                url      : '/commerce/seller',
                permission: ['c6e.admin'],
            },
			{
                id       : 'buyer',
                title    : 'Clienti',
                type     : 'item',
                icon     : 'person_pin_circle',
                url      : '/commerce/buyer',
                permission: ['c6e.admin'],
            },
        ]
    },
	{
        id       : 'wharehouse',
        title    : 'Magazzino',
        type     : 'group',
        children : [
            {
                id       : 'warehouse',
                title    : 'Magazzino',
                type     : 'item',
                icon     : 'store',
                url      : '/commerce/warehouse',
                permission: ['c6e.admin'],
            },
        ]
    },
	{
        id       : 'inventory',
        title    : 'Inventario',
        type     : 'group',
        children : [
            {
                id       : 'inventory-item-list-page',
                title    : 'Inventario',
                type     : 'item',
                icon     : 'assignment',
                url      : '/commerce/inventory-item',
                permission: ['c6e.admin'],
            },
            {
                id       : 'inventory-category',
                title    : 'Categorie inventario',
                type     : 'item',
                icon     : 'format_list_bulleted',
                url      : '/commerce/inventory-category',
                permission: ['c6e.admin'],
            },
			{
                id       : 'producer',
                title    : 'Produttori',
                type     : 'item',
                icon     : 'business',
                url      : '/commerce/producer',
                permission: ['c6e.admin'],
			},
        ]
    },
];
