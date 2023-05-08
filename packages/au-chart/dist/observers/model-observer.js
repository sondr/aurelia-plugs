var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BindingEngine, inject, PLATFORM } from 'aurelia-framework';
let ModelObserver = class ModelObserver {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
        this.throttle = 100;
        this.throttleTimeout = 0;
        this.activeSubscriptions = [];
        this.observe = (model, onChange) => {
            let subscriptions = [];
            this.getAllSubscriptions(model, subscriptions);
            const throttledHandler = (args) => {
                if (this.throttle <= 0) {
                    return onChange();
                }
                if (!this.throttleTimeout) {
                    this.throttleTimeout = PLATFORM.global.setTimeout(() => {
                        this.throttleTimeout = null;
                        onChange();
                    }, this.throttle);
                }
            };
            for (let i = 0; i < subscriptions.length; i++) {
                let outstandingSubscription = subscriptions[i](throttledHandler);
                this.activeSubscriptions.push(outstandingSubscription);
            }
        };
        this.unsubscribe = () => {
            for (let i = 0; i < this.activeSubscriptions.length; i++) {
                this.activeSubscriptions[i].dispose();
            }
            this.activeSubscriptions = [];
        };
    }
    getObjectType(obj) {
        if ((obj) && (typeof (obj) === "object") && (obj.constructor == (new Date).constructor))
            return "date";
        return typeof obj;
    }
    //private getAllSubscriptions(model, subscriptions: (callback:(changeRecords: ICollectionObserverSplice<any,any>) => void))[]) {
    getAllSubscriptions(model, subscriptions) {
        if (Array.isArray(model)) {
            let subscription = this.bindingEngine.collectionObserver(model).subscribe;
            subscriptions.push(subscription);
        }
        for (let property in model) {
            let typeOfData = this.getObjectType(model[property]);
            switch (typeOfData) {
                case "object":
                    {
                        this.getAllSubscriptions(model[property], subscriptions);
                    }
                    break;
                case "array":
                    {
                        let underlyingArray = model[property]();
                        underlyingArray.forEach((entry, index) => { this.getAllSubscriptions(underlyingArray[index], subscriptions); });
                        let arraySubscription = this.bindingEngine.propertyObserver(model, property).subscribe;
                        if (arraySubscription) {
                            subscriptions.push(arraySubscription);
                        }
                    }
                    break;
                default:
                    {
                        let subscription = this.bindingEngine.propertyObserver(model, property).subscribe;
                        if (subscription) {
                            subscriptions.push(subscription);
                        }
                    }
                    break;
            }
        }
    }
};
ModelObserver = __decorate([
    inject(BindingEngine),
    __metadata("design:paramtypes", [BindingEngine])
], ModelObserver);
export { ModelObserver };
//# sourceMappingURL=model-observer.js.map