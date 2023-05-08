import { TemplatingEngine } from 'aurelia-framework';
declare const regularInputs: readonly ["text", "number", "email", "tel", "checkbox", "password", "color"];
export declare class CustomInput {
    protected readonly parentElement: HTMLTemplateElement;
    protected readonly te: TemplatingEngine;
    private containerElement;
    private _view;
    inputModel: IDynamicInputModel<any>;
    model: {};
    overrideClass: '';
    trigger?: string;
    constructor(parentElement: HTMLTemplateElement, te: TemplatingEngine);
    bind(): void;
    attached(): void;
    unbind(): void;
    detached(): void;
    buildHtml(): void;
    get isRegular(): boolean;
    valueBindString(): string;
    attachInputElement(): void;
    attachTextareaElement(): void;
    attachSelectElement(): void;
    createEl(tag: DynamicInputType | 'div' | 'option' | 'input'): HTMLElement;
}
export type RegularInputs = typeof regularInputs[number];
export type DynamicInputType = RegularInputs | // regular inputs
'textarea' | 'select' | // regular select
'select-control' | // custom select
'date';
export interface IDynamicInputModel<T> {
    type: DynamicInputType;
    propertyId?: string;
    id?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    options?: ISelectOption[];
    class?: string;
    rows?: string;
    validation?: IValidateOptions;
    data?: T;
}
export interface ISelectOption {
    id: string | number;
    title: string;
}
export interface IValidateOptions {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}
export interface ISelectOptionsProp {
    id: any;
    name: string;
}
export {};
//# sourceMappingURL=dynamic-input.d.ts.map