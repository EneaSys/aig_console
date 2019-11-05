export interface IContext {
    contextName?: string;
    contextCode?: string;
}

export class Context implements IContext {
    constructor(public contextName?: string, public contextCode?: string) {}
}
