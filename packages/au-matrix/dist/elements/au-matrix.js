var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindable, customElement } from 'aurelia-framework';
const regularInputs = [
    'text', 'number', 'email', 'tel', 'checkbox', 'password',
    'color' //'date' // probable migration to own custom-elements
];
customElement('au-matrix');
export class AuMatrixComponent {
    constructor() {
        this.inputClass = "";
        this.editable = true;
        this.matrix = [];
        this.unsavedActions = false;
    }
    modelChanged(model) {
        this.buildMatrix();
    }
    toggleEdit(row) {
        if (!this.editable) {
            return;
        }
        row.readonly = !row.readonly;
    }
    buildMatrix() {
        if (this.canBuildModel) {
            return;
        }
        this.colTitles = this.model.columns.map(e => e.name);
        const fields = this.model.rows.map(row => {
            return this.model.columns.map(col => {
                let key = col.key;
                let field = new MatrixField({
                    colId: col.id,
                    rowId: row.id,
                    type: col.type,
                    value: row.data[key],
                    readonly: true
                });
                return field;
            });
        });
        this.matrix = fields;
    }
    get canBuildModel() {
        return this.model?.columns?.length && this.model?.rows?.length;
    }
    // not ready
    changesPrompt() {
        return !this.unsavedActions;
    }
}
__decorate([
    bindable,
    __metadata("design:type", String)
], AuMatrixComponent.prototype, "inputClass", void 0);
__decorate([
    bindable,
    __metadata("design:type", Boolean)
], AuMatrixComponent.prototype, "editable", void 0);
__decorate([
    bindable,
    __metadata("design:type", Object)
], AuMatrixComponent.prototype, "model", void 0);
class MatrixField {
    constructor(args) {
        this.type = args.type;
        this.colId = args.colId;
        this.rowId = args.rowId;
        this.initValue = args.value;
        this.value = args.value;
        this.readonly = args.readonly;
    }
    hasChanged() {
        return this.value == this.initValue;
    }
    revert() {
        this.value = this.initValue;
    }
}
//# sourceMappingURL=au-matrix.js.map