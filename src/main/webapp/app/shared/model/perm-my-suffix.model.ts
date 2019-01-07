import { IRoleMySuffix } from 'app/shared/model//role-my-suffix.model';

export interface IPermMySuffix {
    id?: number;
    name?: string;
    roles?: IRoleMySuffix[];
}

export class PermMySuffix implements IPermMySuffix {
    constructor(public id?: number, public name?: string, public roles?: IRoleMySuffix[]) {}
}
