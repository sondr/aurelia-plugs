var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, bindable, bindingMode, inlineView, customElement, DOM, TemplatingEngine } from 'aurelia-framework';
import { nameof } from '../../../shared-functions/src/nameof';
const triggerBehaviors = {
    blur: " & updateTrigger:'blur'"
};
const regularInputs = [
    'text', 'number', 'email', 'tel', 'checkbox', 'password',
    'color' //'date' // probable migration to own custom-elements
];
let CustomInput = class CustomInput {
    // LIFECYCLE
    constructor(parentElement, te) {
        this.parentElement = parentElement;
        this.te = te;
        this.trigger = triggerBehaviors.blur;
    }
    bind() {
        if (this.inputModel && this.overrideClass) {
            this.inputModel.class = this.overrideClass;
        }
        this.buildHtml();
        this._view?.bind(this);
    }
    attached() {
        if (this.containerElement) {
            this.parentElement.appendChild(this.containerElement);
        }
        this._view?.attached();
    }
    unbind() {
        this._view?.unbind();
    }
    detached() {
        if (this.containerElement) {
            this.parentElement.removeChild(this.containerElement);
        }
        this._view?.detached();
    }
    // LIFECYCLE END
    buildHtml() {
        const type = this.inputModel?.type;
        if (!type) {
            return;
        }
        this.containerElement = this.createEl('div'); // DOM.createTemplateElement();
        // regular
        if (this.isRegular) {
            this.attachInputElement();
        }
        else {
            // individuals
            switch (this.inputModel.type) {
                //case 'divider':
                //  this.attachDividerElement();
                //  break;
                case 'textarea':
                    this.attachTextareaElement();
                    break;
                case 'select':
                    this.attachSelectElement();
                    break;
            }
        }
        this._view = this.te.enhance({ element: this.containerElement, bindingContext: this });
        this._view?.created();
    }
    get isRegular() { return regularInputs.some(e => e == this.inputModel.type); }
    valueBindString() {
        let triggerBehavior = this.trigger ?? '';
        //let vstring = this.inputModel.propertyId.split('.').reduce((current, next) => { return `${current}['${next}']` },
        //  nameof<CustomInput>(e => e.model)
        //);
        let vstring = this.inputModel.propertyId.split('.').reduce((current, next) => { return `${current}.${next}`; }, nameof(e => e.model));
        if (this.inputModel.validation?.required) {
            vstring = vstring + ' & validate';
        }
        return vstring + triggerBehavior;
    }
    attachInputElement() {
        const el = this.createEl('input');
        el.setAttribute('id.bind', nameof(e => e.inputModel.id));
        el.setAttribute('type.bind', nameof(e => e.inputModel.type));
        el.setAttribute('placeholder.bind', nameof(e => e.inputModel.placeholder));
        el.setAttribute('class.bind', nameof(e => e.inputModel.class));
        //el.setAttribute('readonly.bind', nameof<CustomInput>(e => e.inputModel.readonly));
        el.setAttribute('disabled.bind', nameof(e => e.inputModel.disabled));
        el.setAttribute('value.bind', this.valueBindString());
        //if (this.inputModel.elementAttributes) {
        //  Object.keys()
        //}
        this.containerElement.appendChild(el);
    }
    attachTextareaElement() {
        const el = this.createEl('textarea');
        //el.setAttribute('type.bind', nameof<CustomInput>(e => e.model.type));
        el.setAttribute('id.bind', nameof(e => e.inputModel.id));
        el.setAttribute('placeholder.bind', nameof(e => e.inputModel.placeholder));
        el.setAttribute('class.bind', nameof(e => e.inputModel.class));
        //el.setAttribute('readonly.bind', nameof<CustomInput>(e => e.inputModel.readonly));
        el.setAttribute('disabled.bind', nameof(e => e.inputModel.disabled));
        el.setAttribute('rows.bind', nameof(e => e.inputModel.rows));
        el.setAttribute('value.bind', this.valueBindString());
        this.containerElement.appendChild(el);
    }
    attachSelectElement() {
        const el = this.createEl('select');
        el.setAttribute('id.bind', nameof(e => e.inputModel.id));
        el.setAttribute('class.bind', nameof(e => e.inputModel.class));
        el.setAttribute('value.bind', this.valueBindString());
        // placeholder option
        const placeholderOption = this.createEl('option');
        placeholderOption.setAttribute('if.bind', nameof(e => e.inputModel.placeholder));
        placeholderOption.innerHTML = interpolateSyntax(nameof(e => e.inputModel.placeholder));
        el.appendChild(placeholderOption);
        // options
        const options = this.createEl('option');
        options.setAttribute('repeat.for', `o of ${nameof(e => e.inputModel.options)}`);
        options.setAttribute('model.bind', `o.${nameof(e => e.id)}`);
        options.innerHTML = interpolateSyntax(`o.${nameof(e => e.title)}`);
        el.appendChild(options);
        this.containerElement.appendChild(el);
    }
    //attachDividerElement() {
    //  const el = this.createEl('div');
    //  el.setAttribute('class.bind', nameof<CustomInput>(e => e.inputModel.class));
    //  el.innerHTML = interpolateSyntax(nameof<CustomInput>(e => e.inputModel.name));
    //  this.containerElement.appendChild(el);
    //}
    createEl(tag) {
        return DOM.createElement(tag);
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime }),
    __metadata("design:type", Object)
], CustomInput.prototype, "inputModel", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], CustomInput.prototype, "model", void 0);
__decorate([
    bindable,
    __metadata("design:type", String)
], CustomInput.prototype, "overrideClass", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime }),
    __metadata("design:type", String)
], CustomInput.prototype, "trigger", void 0);
CustomInput = __decorate([
    inlineView('<template></template>'),
    customElement('dynamic-input')
    //@containerless()
    ,
    inject(DOM.Element, TemplatingEngine),
    __metadata("design:paramtypes", [HTMLTemplateElement,
        TemplatingEngine])
], CustomInput);
export { CustomInput };
function interpolateSyntax(txt) {
    return '${' + txt + '}';
}
//# sourceMappingURL=dynamic-input.js.map