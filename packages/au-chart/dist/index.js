import { PLATFORM } from 'aurelia-pal';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./elements/chart-element'),
        PLATFORM.moduleName('./attributes/chart-attribute')
    ]);
}
//# sourceMappingURL=index.js.map