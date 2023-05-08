var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, customAttribute, bindable, bindingMode } from 'aurelia-framework';
import { ModelObserver } from "../observers/model-observer";
import Chart from "chart.js";
let ChartAttribute = class ChartAttribute {
    constructor(element, modelObserver) {
        this.element = element;
        this.modelObserver = modelObserver;
        this.nativeOptions = {};
        this.isSetup = false;
        this.propertyChanged = (propertyName, newValue, oldValue) => {
            if (this.isSetup && this.isObserving) {
                this.refreshChart();
                this.modelObserver.unsubscribe();
                this.subscribeToChanges();
            }
        };
        this.refreshChart = () => {
            this.chartData.data = this.clonedData;
            this.activeChart.update();
            this.activeChart.resize();
        };
    }
    attached() {
        this.createChart();
        this.isSetup = true;
        if (this.isObserving) {
            this.subscribeToChanges();
        }
    }
    detached() {
        if (this.shouldUpdate == true) {
            this.modelObserver.unsubscribe();
        }
        this.activeChart.destroy();
        this.isSetup = false;
    }
    get isObserving() {
        return String(this.shouldUpdate).toLowerCase() == String(true);
    }
    get clonedData() {
        return JSON.parse(JSON.stringify(this.data));
    }
    createChart() {
        this.chartData = {
            type: this.type,
            data: this.clonedData,
            options: this.nativeOptions
        };
        this.activeChart = new Chart(this.element, this.chartData);
        this.nativeOptions = this.activeChart.options;
        this.refreshChart();
    }
    ;
    subscribeToChanges() {
        this.modelObserver.throttle = this.throttle || 100;
        this.modelObserver.observe(this.data, this.refreshChart);
    }
    ;
};
__decorate([
    bindable,
    __metadata("design:type", Object)
], ChartAttribute.prototype, "type", void 0);
__decorate([
    bindable,
    __metadata("design:type", Object)
], ChartAttribute.prototype, "data", void 0);
__decorate([
    bindable,
    __metadata("design:type", Boolean)
], ChartAttribute.prototype, "shouldUpdate", void 0);
__decorate([
    bindable,
    __metadata("design:type", Number)
], ChartAttribute.prototype, "throttle", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], ChartAttribute.prototype, "nativeOptions", void 0);
ChartAttribute = __decorate([
    customAttribute('chart'),
    inject(Element, ModelObserver),
    __metadata("design:paramtypes", [HTMLCanvasElement,
        ModelObserver])
], ChartAttribute);
export { ChartAttribute };
//# sourceMappingURL=chart-attribute.js.map