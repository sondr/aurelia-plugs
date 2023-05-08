import { ModelObserver } from "../observers/model-observer";
import { ChartOptions } from "chart.js";
export declare class ChartAttribute {
    private element;
    private readonly modelObserver;
    type: any;
    data: any;
    shouldUpdate: boolean;
    throttle: number;
    nativeOptions: ChartOptions;
    private activeChart;
    private isSetup;
    private chartData;
    constructor(element: HTMLCanvasElement, modelObserver: ModelObserver);
    attached(): void;
    detached(): void;
    propertyChanged: (propertyName: any, newValue: any, oldValue: any) => void;
    private get isObserving();
    get clonedData(): any;
    createChart(): void;
    refreshChart: () => void;
    subscribeToChanges(): void;
}
//# sourceMappingURL=chart-attribute.d.ts.map