import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'generic',
        title    : 'Generic',
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
                permission: ['g5c.ui.eopoo.list'],
            },
            /*{
                id       : 'generic-eopoo-list-page',
                title    : 'Generic Eopoo',
                type     : 'item',
                icon     : 'how_to_reg',
                url      : '/g5c/generic-eopoo',
                permission: ['g5c.eopoo.get'],
            },*/
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
                id       : 'solidarity-dashboard2',
                title    : 'Dashboard2',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/solidarity/dashboard2',
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
                translate: 'NAV.IPP.PROCUREMENT',
                type     : 'item',
                icon     : 'business_center',
                url      : '/ipp/procurement',
                permission: ['il.pp.ui.p8t.list'],
            },
            {
                id       : 'procurement-lot-list-page',
                title    : 'Procurement Lot',
                translate: 'NAV.IPP.PROCUREMENT-LOT',
                type     : 'item',
                icon     : 'next_week',
                url      : '/ipp/procurement-lot',
                permission: ['il.pp.ui.p8tlot.list'],
            },
            {
                id       : 'partecipation-list-page',
                title    : 'Partecipation',
                translate: 'NAV.IPP.PARTECIPATION',
                type     : 'item',
                icon     : 'network_locked',
                url      : '/ipp/partecipation',
                permission: ['il.pp.ui.p11n.list'],
            },
			{
                id       : 'consorzio-manager-page',
                title    : 'Consorzio',
                translate: 'Area consorziato',
                type     : 'item',
                icon     : 'business_center',
                url      : '/ipp/partecipation-company-manager',
                permission: ['il.pp.ui.p11n.manager'],
            },
        ]
    },
	{
        id       : 'wallet',
        title    : 'Wallet system',
        type     : 'group',
        children : [
			{
				id       : 'wallet-list-page',
				title    : 'Wallet',
				type     : 'item',
				icon     : 'wallet',
				url      : '/wallet/wallet',
				//permission: ['wallet.wallet.get'],
			},
			{
				id       : 'pos-list-page',
				title    : 'POS',
				type     : 'item',
				icon     : 'store',
				url      : '/wallet/merchant',
				//permission: ['wallet.pos.get'],
			},
			{
				id       : 'credit-card-list-page',
				title    : 'Carte di credito',
				type     : 'item',
				icon     : 'credit-card',
				url      : '/wallet/credit-card',
				//permission: ['wallet.creditCard.get'],
			},

			{
				id       : 'transaction-list-page',
				title    : 'Transazioni',
				type     : 'item',
				icon     : 'transaction',
				url      : '/wallet/transaction',
				//permission: ['wallet.transaction.get'],
			},
		]
	},



    {
        id       : 'commerce',
        title    : 'Commerce',
        type     : 'group',
        children : [
			{
                id       : 'inventory-item-list-page',
                title    : 'Inventario',
                translate: 'NAV.COMMERCE.INVENTORY',
                type     : 'item',
                icon     : 'assignment',
                url      : '/commerce/inventory-item',
                permission: ['c6e.admin'],
            },
			{
                id       : 'warehouse-manager',
                title    : 'Manager Magazzino',
                translate: 'NAV.COMMERCE.WAREHOUSE_MANAGER',
                type     : 'item',
                icon     : 'store',
                url      : '/commerce/warehouse-manager',
                permission: ['c6e.admin'],
            },
			{
                id       : 'seller-manager',
                title    : 'Manager Venditore',
                translate: 'NAV.COMMERCE.SELLER_MANAGER',
                type     : 'item',
                icon     : 'person_pin_circle',
                url      : '/commerce/seller-manager',
                permission: ['c6e.admin'],
            },
            {
                id       : 'catalog-manager',
                title    : 'Manager Catalogo',
                translate: 'NAV.COMMERCE.CATALOG_MANAGER',
                type     : 'item',
                icon     : 'euro_symbol',
                url      : '/commerce/catalog-manager',
                permission: ['c6e.admin'],
            },
        ]
	}
];


