import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeletePermMySuffixModule } from './perm-my-suffix/perm-my-suffix.module';
import { DeleteRoleMySuffixModule } from './role-my-suffix/role-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DeletePermMySuffixModule,
        DeleteRoleMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeleteEntityModule {}
