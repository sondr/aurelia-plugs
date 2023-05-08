import { BindingEngine } from 'aurelia-framework';
export declare class ModelObserver {
    private bindingEngine;
    throttle: number;
    private throttleTimeout;
    private activeSubscriptions;
    constructor(bindingEngine: BindingEngine);
    observe: (model: any, onChange: any) => void;
    unsubscribe: () => void;
    private getObjectType;
    private getAllSubscriptions;
}
//# sourceMappingURL=model-observer.d.ts.map