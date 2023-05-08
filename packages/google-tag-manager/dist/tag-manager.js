var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as LogManager from 'aurelia-logging';
import { PLATFORM, DOM } from 'aurelia-pal';
import { Configure } from './configure';
let TagManager = class TagManager {
    constructor(eventAggregator, configuration) {
        this._subscriptions = { pageTracker: undefined };
        this._flags = { scriptsAttached: false };
        this._initialized = false;
        this._settings = configuration;
        this._eventAggregator = eventAggregator;
        this._logger = LogManager.getLogger('tag-manager-plugin');
    }
    init(initData) {
        let data = this._settings.options(initData);
        this._options = data;
        this._setup();
    }
    dispatchDataLayerEvent(event) {
        this._ensureDataLayer();
        this._dataLayer.push(event);
    }
    enable() {
        this._options.enabled = true;
        this._setup();
        if (this._options.trackCurrentPageOnEnable)
            this._trackPage(PLATFORM.global.location.pathname, DOM.title);
    }
    disable() {
        this._options.enabled = false;
        if (this._subscriptions.pageTracker)
            this._subscriptions.pageTracker.dispose();
        this._detachScripts();
        if (this._options.logging.enabled)
            this._log('info', 'Tag-Manager disabled');
    }
    isActive() {
        return this._options.enabled === true;
    }
    getKey() {
        return this._options.key;
    }
    _setup() {
        if (!this._checkSettings(this._options))
            return;
        if (!this._flags.scriptsAttached)
            this._attachScriptElements(this._options.key);
        if (this._options.pageTracking.enabled === true)
            this._attachPageTracker();
        this._initialized = true;
        if (this._options.logging.enabled)
            this._log('info', 'Tag-Manager started');
    }
    _checkSettings(opts) {
        let valid = true, logtext = '', level = 'info';
        if (opts.enabled !== true) {
            logtext = 'tag-manager plugin is disabled';
            valid = false;
        }
        else if (!opts.key || typeof opts.key !== 'string') {
            logtext = 'Missing key parameter for tag-manager plugin';
            valid = false;
            level = 'warn';
        }
        if (opts.logging.enabled)
            this._log(level, logtext);
        return valid;
    }
    _attachScriptElements(key) {
        if (!this._scriptElement) {
            const scriptElement = DOM.createElement('script');
            scriptElement.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
                `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
                `})(window,document,'script','dataLayer','${key}');`;
            this._scriptElement = scriptElement;
            DOM.querySelector('head').appendChild(this._scriptElement);
        }
        //DOM.querySelector('body').appendChild(noscriptElement);
        if (!this._noScriptElement) {
            const noscriptElement = DOM.createElement('noscript');
            const iframeElement = DOM.createElement('iframe');
            iframeElement.height = '0';
            iframeElement.width = '0';
            iframeElement.style.display = 'none';
            iframeElement.style.visibility = 'hidden';
            iframeElement.src = `https://www.googletagmanager.com/ns.html?id=${key}`;
            noscriptElement.appendChild(iframeElement);
            this._noScriptElement = noscriptElement;
            const body = DOM.querySelector('body');
            body.insertBefore(this._noScriptElement, body.firstChild);
        }
        this._flags.scriptsAttached = true;
        // PLATFORM.global.dataLayer = PLATFORM.global.dataLayer || [];
        // this.dataLayer = PLATFORM.global.dataLayer;
        this._ensureDataLayer();
    }
    _detachScripts() {
        [this._noScriptElement, this._scriptElement].forEach(el => {
            if (el) {
                const parent = el.parentNode;
                if (parent)
                    parent.removeChild(el);
                el = undefined;
            }
        });
    }
    _attachPageTracker() {
        if (this._settings)
            this._subscriptions.pageTracker = this._eventAggregator.subscribe('router:navigation:success', (data) => {
                if (this._options.resetDatalayerOnPageChange)
                    this._resetDataLayer();
                this._trackPage(data.instruction.fragment, data.instruction.config.title);
            });
    }
    _resetDataLayer() {
        const gtm = PLATFORM.global.google_tag_manager[this._options.key];
        if (gtm && gtm.dataLayer && typeof gtm.dataLayer.reset === 'function')
            gtm.dataLayer.reset();
    }
    _log(level, message) {
        if (!this._options.logging)
            return;
        this._logger[level](message);
    }
    _trackPage(path, title) {
        this._log('debug', `Tracking path = ${path}, title = ${title}`);
        if (!this._initialized) {
            this._log('warn', `Tag manager is not initialized`);
            return;
        }
        this._ensureDataLayer();
        this._dataLayer.push({
            'event': this._options.pageTracking.name,
            'url': path
        });
    }
    _ensureDataLayer() {
        if (!this._dataLayer) {
            PLATFORM.global.dataLayer = PLATFORM.global.dataLayer || [];
            this._dataLayer = PLATFORM.global.dataLayer;
        }
    }
};
TagManager = __decorate([
    inject(EventAggregator, Configure),
    __metadata("design:paramtypes", [EventAggregator, Configure])
], TagManager);
export { TagManager };
//# sourceMappingURL=tag-manager.js.map