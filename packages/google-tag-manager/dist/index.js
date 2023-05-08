import { TagManager } from './tag-manager';
export function configure(aurelia, configCallback) {
    let instance = aurelia.container.get(TagManager);
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        configCallback(instance);
    }
    //aurelia.globalResources([]);
}
export { TagManager };
//export { Configure };
//# sourceMappingURL=index.js.map