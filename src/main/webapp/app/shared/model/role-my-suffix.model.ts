import { IPermMySuffix } from 'app/shared/model//perm-my-suffix.model';

export interface IRoleMySuffix {
    id?: number;
    name?: string;
    perms?: IPermMySuffix[];
}

export class RoleMySuffix implements IRoleMySuffix {
    constructor(public id?: number, public name?: string, public perms?: IPermMySuffix[]) {}
}
