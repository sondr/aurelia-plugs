declare const regularInputs: readonly ["text", "number", "email", "tel", "checkbox", "password", "color"];
type InputType = typeof regularInputs[number];
export declare class AuMatrixComponent {
    inputClass: string;
    editable: boolean;
    private model;
    modelChanged(model: IMAtrixModel): void;
    private colTitles;
    private matrix;
    private unsavedActions;
    toggleEdit(row: MatrixField): void;
    buildMatrix(): void;
    get canBuildModel(): number;
    changesPrompt(): boolean;
}
interface IMAtrixField {
    colId: string;
    rowId: string;
    type: InputType;
    value: any;
    readonly: boolean;
}
declare class MatrixField implements IMAtrixField {
    readonly type: InputType;
    readonly colId: string;
    readonly rowId: string;
    private initValue;
    value: any;
    readonly: boolean;
    constructor(args: IMAtrixField);
    hasChanged(): boolean;
    revert(): void;
}
export interface IRow {
    id: string;
    name: string;
    data: Object;
}
export interface IColumn {
    id: string;
    type: InputType;
    name: string;
    key: string;
}
export interface IMAtrixModel {
    columnTitle: string;
    columns: IColumn[];
    rowTitle: string;
    rows: IRow[];
}
export {};
//# sourceMappingURL=au-matrix.d.ts.map