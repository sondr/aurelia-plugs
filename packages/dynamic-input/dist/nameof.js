export function nameof(selector, deep = true) {
    let s = '' + selector;
    let m = s.match(/return\s+([A-Z0-9$_.]+)/i)
        || s.match(/.*?(?:=>|function.*?{(?!\s*return))\s*([A-Z0-9$_.]+)/i);
    let name = m && m[1] || "";
    let splitted = name.split('.');
    splitted.shift();
    return deep ? splitted.join('.') : splitted.pop();
}
//# sourceMappingURL=nameof.js.map