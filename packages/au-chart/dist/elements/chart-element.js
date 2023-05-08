var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, customElement, useView, bindable, bindingMode } from 'aurelia-framework';
import { ModelObserver } from "../observers/model-observer";
import Chart from "chart.js";
let ChartElement = class ChartElement {
    constructor(_modelObserver) {
        this._modelObserver = _modelObserver;
        this.nativeOptions = {};
        //_modelObserver;
        this._isSetup = false;
        this.propertyChanged = (propertyName, newValue, oldValue) => {
            if (this._isSetup && this._isObserving) {
                this.refreshChart();
                this._modelObserver.unsubscribe();
                this.subscribeToChanges();
            }
        };
        this.refreshChart = () => {
            this._chartData.data = this._clonedData;
            this._activeChart.update();
            this._activeChart.resize();
        };
        //this._modelObserver = _modelObserver;
    }
    attached() {
        this.createChart();
        this._isSetup = true;
        if (this._isObserving) {
            this.subscribeToChanges();
        }
    }
    detached() {
        if (this._isObserving) {
            this._modelObserver.unsubscribe();
        }
        this._activeChart.destroy();
        this._isSetup = false;
    }
    get _isObserving() {
        return this.shouldUpdate == true || this.shouldUpdate == "true";
    }
    get _clonedData() {
        return JSON.parse(JSON.stringify(this.data));
    }
    createChart() {
        this._chartData = {
            type: this.type,
            data: this._clonedData,
            options: this.nativeOptions
        };
        this._activeChart = new Chart(this.canvasElement, this._chartData);
        this.nativeOptions = this._activeChart.options;
        this.refreshChart();
    }
    ;
    subscribeToChanges() {
        this._modelObserver.throttle = this.throttle || 100;
        this._modelObserver.observe(this.data.datasets, this.refreshChart);
    }
    ;
};
__decorate([
    bindable,
    __metadata("design:type", Object)
], ChartElement.prototype, "type", void 0);
__decorate([
    bindable,
    __metadata("design:type", Object)
], ChartElement.prototype, "data", void 0);
__decorate([
    bindable,
    __metadata("design:type", Object)
], ChartElement.prototype, "shouldUpdate", void 0);
__decorate([
    bindable,
    __metadata("design:type", Object)
], ChartElement.prototype, "throttle", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], ChartElement.prototype, "nativeOptions", void 0);
__decorate([
    bindable,
    __metadata("design:type", HTMLCanvasElement)
], ChartElement.prototype, "canvasElement", void 0);
ChartElement = __decorate([
    customElement('chart'),
    inject(ModelObserver),
    useView("./chart-element.html"),
    __metadata("design:paramtypes", [Object])
], ChartElement);
export { ChartElement };
//# sourceMappingURL=chart-element.js.map