import { ChartOptions, ChartConfiguration, ChartData } from "chart.js";
interface IChartCombined extends ChartConfiguration, ChartData {
}
export declare class ChartElement {
    private readonly _modelObserver;
    type: any;
    data: IChartCombined;
    shouldUpdate: any;
    throttle: any;
    nativeOptions: ChartOptions;
    canvasElement: HTMLCanvasElement;
    _activeChart: any;
    _isSetup: boolean;
    _chartData: any;
    constructor(_modelObserver: any);
    attached(): void;
    detached(): void;
    propertyChanged: (propertyName: any, newValue: any, oldValue: any) => void;
    get _isObserving(): boolean;
    get _clonedData(): any;
    createChart(): void;
    refreshChart: () => void;
    subscribeToChanges(): void;
}
export {};
//# sourceMappingURL=chart-element.d.ts.map