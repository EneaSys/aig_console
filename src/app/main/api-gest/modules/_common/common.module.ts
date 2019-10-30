import { NgModule } from '@angular/core';
import { EopooNamePipe } from './pipe/eopoo-name.pipe';
import { CityResolver } from './services/city.resolver';
import { EopooService } from './services/eopoo.service';
import { EopooTypeService } from './services/eopoo-type.service';
import { EopooTypeResolver } from './services/eopoo-type.resolver';
import { PersonService } from './services/person.service';
import { CityService } from './services/city.service';
import { ApiModule } from './services/test';
import { ApolloDocumentService } from './services/apollo-document.service';
import { ApolloDocumentResolver } from './services/apollo-document.resolver';
import { ApolloDocumentLineService } from './services/apollo-document-line.service';
import { ApolloDocumentLineResolver } from './services/apollo-document-line.resolver';
import { AigUserService } from './services/context-user.service';
import { AigGroupService } from './services/group.service';
import { AigRoleAssignationService } from './services/role-assignation.service';
import { RoleSystemResolver } from './resolver/role-system.resolver';
import { RoleCustomResolver } from './resolver/role-custom.resolver';
import { PermissionsRoleCustomResolver } from './resolver/permission-role-custom.resolver';

@NgModule({
    declarations: [
        EopooNamePipe,
    ],
    imports: [
        ApiModule
    ],
    exports: [
        EopooNamePipe,
        
    ],
    providers: [
        EopooService,

        EopooTypeService,
        EopooTypeResolver,

        PersonService,
        
        CityService,
        CityResolver,
        
        ApolloDocumentService,
        ApolloDocumentResolver,
        
        ApolloDocumentLineService,
        ApolloDocumentLineResolver,

        AigUserService,
        AigGroupService,
        AigRoleAssignationService,


        RoleSystemResolver,
        RoleCustomResolver,
        PermissionsRoleCustomResolver,
    ],
})
export class AigCommonModule {}