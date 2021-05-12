export default {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    addCtrlEvent: function(keycode, handler) {
    	var ctrlHandler = function(e) {
			if (e.keyCode === keycode && (e.metaKey || e.ctrlKey)) {
				handler(e);
			}
		}
		this.addHandler(document.body, 'keydown', ctrlHandler);
		return ctrlHandler;
	},
	removeCtrlEvent: function(keycode, handler) {
		if (handler) {
			this.removeHandler(document.body, 'keydown', handler);
		}
	}
};