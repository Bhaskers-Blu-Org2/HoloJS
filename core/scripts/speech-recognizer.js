function SpeechRecognizer() {
    navigator.holojs.nativeInterface.SpeechRecognizer.create(this);

    if (typeof this.native === 'undefined') {
        throw "cannot create speech recognizer";
    }

    this.addEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.addEventListener(this.native, eventType, eventHandler.bind(this));
    };

    this.removeEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.removeEventListener(this.native, eventType, eventHandler.bind(this));
    };

    this.setKeywords = function (keywords) {
        return navigator.holojs.nativeInterface.SpeechRecognizer.setKeywords(this.native, keywords);
    };

    this.enableFreeFormDictation = function (enable) {
        return navigator.holojs.nativeInterface.SpeechRecognizer.enableFreeFormDictation(this.native, enable);
    };

    this.start = function () {
        return navigator.holojs.nativeInterface.SpeechRecognizer.start(this.native);
    };

    this.stop = function () {
        return navigator.holojs.nativeInterface.SpeechRecognizer.stop(this.native);
    };

    Object.defineProperty(this, 'onresult', {
        get: function () {
            return this.onresultEvent;
        },
        set: function (value) {
            if (this.onresultEvent) {
                this.removeEventListener('result', this.onresultEvent);
            }

            if (value) {
                this.addEventListener('result', value);
            }

            this.onresultEvent = value;
        }
    });


    Object.defineProperty(this, 'onstop', {
        get: function () {
            return this.onstopEvent;
        },
        set: function (value) {
            if (this.onstopEvent) {
                this.removeEventListener('stop', this.onstopEvent);
            }

            if (value) {
                this.addEventListener('stop', value);
            }

            this.onstopEvent = value;
        }
    });


    Object.defineProperty(this, 'onerror', {
        get: function () {
            return this.onerrorEvent;
        },
        set: function (value) {
            if (this.onerrorEvent) {
                this.removeEventListener('error', this.onerrorEvent);
            }

            if (value) {
                this.addEventListener('error', value);
            }

            this.onerrorEvent = value;
        }
    });
}

SpeechRecognizer.isAvailable = function () {
    return navigator.holojs.nativeInterface.SpeechRecognizer.isAvailable();    
};