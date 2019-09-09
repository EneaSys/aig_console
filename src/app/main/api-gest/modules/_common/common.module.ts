import { NgModule } from '@angular/core';
import { EopooNamePipe } from './pipe/eopoo-name.pipe';
import { CityResolver } from './services/city.resolver';
import { EopooService } from './services/eopoo.service';
import { EopooTypeService } from './services/eopoo-type.service';
import { EopooTypeResolver } from './services/eopoo-type.resolver';
import { PersonService } from './services/person.service';
import { CityService } from './services/city.service';
import { ApiModule } from './services/test';
import { ApolloDocumentService } from './services/document.service';

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
    ],
})
export class AigCommonModule {}