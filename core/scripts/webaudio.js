window.AudioContext = function () {
    this.native = new navigator.holojs.nativeInterface.webaudio.createContext();

    let destination = new AudioDestinationNode(this);
    let listener = new AudioListener(this);
    BaseAudioContext.call(this, listener, destination);

    Object.defineProperty(this, 'baseLatency', { get: function () { throw 'not implemented'; } });
    Object.defineProperty(this, 'outputLatency', { get: function () { throw 'not implemented'; } });
    this.getOutputTimestamp = function () { throw 'not implemented'; };
    this.suspend = function () { throw 'not implemented'; };
    this.close = function () { throw 'not implemented'; };
    this.createMediaElementSource = function () { throw 'not implemented'; };
    this.createMediaStreamSource = function () { throw 'not implemented'; };
    this.createMediaStreamTrackSource = function () { throw 'not implemented'; };
    this.createMediaStreamDestination = function () { throw 'not implemented'; };
};

function BaseAudioContext(listener, destination) {
    this.createGain = function () {
        return new GainNode(this);
    };

    this.createPanner = function () {
        return new PannerNode(this);
    };

    this.createBufferSource = function () {
        return new AudioBufferSourceNode(this);
    };

    this.decodeAudioData = function (data, success, error) {
        navigator.holojs.nativeInterface.webaudioContext.decodeAudioData(
            this.native,
            data,
            function (nativeSoundBuffer) {
                if (success) success(new AudioBuffer(nativeSoundBuffer));
            },
            error);
    };

    Object.defineProperty(this, 'onstatechange', { get: function () { throw 'not implemented'; }, set: function (value) { throw 'not implemented'; } });

    Object.defineProperty(this, 'listener', { get: function () { return listener; } });
    Object.defineProperty(this, 'destination', { get: function () { return destination; } });
    
    Object.defineProperty(this, 'sampleRate',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioContext.getSampleRate(this.native); }
        });

    Object.defineProperty(this, 'currentTime',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioContext.getCurrentTime(this.native); }
        });

    Object.defineProperty(this, 'state', { get: function () { return "running"; } });

    Object.defineProperty(this, 'audioWorklet', { get: function () { throw 'not implemented'; } });

    this.createAnalyser = function () { throw 'not implemented'; };
    this.createBiquadFilter = function () { throw 'not implemented'; };
    this.createBuffer = function () { throw 'not implemented'; };
    
    this.createChannelMerger = function () { throw 'not implemented'; };
    this.createChannelSplitter = function () { throw 'not implemented'; };
    this.createConstantSource = function () { throw 'not implemented'; };
    this.createConvolver = function () { throw 'not implemented'; };
    this.createDelay = function () { throw 'not implemented'; };
    this.createDynamicsCompressor = function () { throw 'not implemented'; };

    this.createIIRFilter = function () { throw 'not implemented'; };
    this.createOscillator = function () { throw 'not implemented'; };
    
    this.createPeriodicWave = function () { throw 'not implemented'; };
    this.createScriptProcessor = function () { throw 'not implemented'; };
    this.createStereoPanner = function () { throw 'not implemented'; };
    this.createWaveShaper = function () { throw 'not implemented'; };
    
    this.resume = function () { throw 'not implemented'; };
}

function AudioBuffer(nativeAudioBuffer) {
    this.native = nativeAudioBuffer;

    Object.defineProperty(this, 'sampleRate', { get: function () { throw 'not implemented'; } });
    Object.defineProperty(this, 'length', { get: function () { throw 'not implemented'; } });
    Object.defineProperty(this, 'duration', { get: function () { throw 'not implemented'; } });
    Object.defineProperty(this, 'numberOfChannels', { get: function () { throw 'not implemented'; } });
    this.getChannelData = function () { throw 'not implemented'; };
    this.copyFromChannel = function () { throw 'not implemented'; };
    this.copyToChannel = function () { throw 'not implemented'; };
}

function AudioNode(audioContext) {
    this.connect = function (destination, outputIndex, inputIndex) {
        navigator.holojs.nativeInterface.webaudio.audioNodeConnect(this.native, destination.native, outputIndex, inputIndex);
    };

    this.disconnect = function (destination, output, input) {
        navigator.holojs.nativeInterface.webaudio.audioNodeDisconnect(this.native, destination, output, input);
    };

    Object.defineProperty(this, 'context', { get: function () { return audioContext; } });

    Object.defineProperty(this, 'numberOfInputs', { get: function () { throw 'not implemented'; } });
    Object.defineProperty(this, 'numberOfOutputs', { get: function () { throw 'not implemented'; } });
    Object.defineProperty(this, 'channelCount', { get: function () { throw 'not implemented'; }, set: function (value) { throw 'not implemented'; } });
    Object.defineProperty(this, 'channelCountMode', { get: function () { throw 'not implemented'; }, set: function (value) { throw 'not implemented'; } });
    Object.defineProperty(this, 'channelInterpretation', { get: function () { throw 'not implemented'; }, set: function (value) { throw 'not implemented'; } });

    this.context = audioContext;
}

function PannerNode(audioContext) {
    this.native = navigator.holojs.nativeInterface.webaudioContext.createPanner(audioContext.native);
    AudioNode.call(this, audioContext);

    this.setPosition = function (x, y, z) {
        navigator.holojs.nativeInterface.webaudioPanner.setPosition(this.native, x, y, z);
    };

    this.setOrientation = function (x, y, z) {
        navigator.holojs.nativeInterface.webaudioPanner.setOrientation(this.native, x, y, z);
    };

    this.setVelocity = function (x, y, z) {
        navigator.holojs.nativeInterface.webaudioPanner.setVelocity(this.native, x, y, z);
    };

    Object.defineProperty(this, 'refDistance',
        {
            get: function () {
                return navigator.holojs.nativeInterface.webaudioPanner.getRefDistance(this.native);
            },
            set: function (value) {
                navigator.holojs.nativeInterface.webaudioPanner.setRefDistance(this.native, value);
            }
        });

    Object.defineProperty(this, 'panningModel',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioPanner.getPanningModel(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioPanner.setPanningModel(this.native, value); }
        });

    this.positionXNative = new AudioParam(navigator.holojs.nativeInterface.webaudioPanner.positionX(this.native));
    this.positionYNative = new AudioParam(navigator.holojs.nativeInterface.webaudioPanner.positionY(this.native));
    this.positionZNative = new AudioParam(navigator.holojs.nativeInterface.webaudioPanner.positionZ(this.native));

    this.orientationXNative = new AudioParam(navigator.holojs.nativeInterface.webaudioPanner.orientationX(this.native));
    this.orientationYNative = new AudioParam(navigator.holojs.nativeInterface.webaudioPanner.orientationY(this.native));
    this.orientationZNative = new AudioParam(navigator.holojs.nativeInterface.webaudioPanner.orientationZ(this.native));

    Object.defineProperty(this, 'positionX', { get: function () { this.positionXNative; } });

    Object.defineProperty(this, 'positionY', { get: function () { this.positionYNative; } });

    Object.defineProperty(this, 'positionZ', { get: function () { this.positionZNative; } });

    Object.defineProperty(this, 'orientationX', { get: function () { return this.orientationXNative; } });

    Object.defineProperty(this, 'orientationY', { get: function () { return this.orientationYNative; } });

    Object.defineProperty(this, 'orientationZ', { get: function () { return this.orientationZNative; } });


    Object.defineProperty(this, 'distanceModel',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioPanner.getDistanceModel(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioPanner.setDistanceModel(this.native, value); }
        });

    Object.defineProperty(this, 'maxDistance',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioPanner.getMaxDistance(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioPanner.setMaxDistance(this.native, value); }
        });

    Object.defineProperty(this, 'rolloffFactor',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioPanner.getRolloffFactor(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioPanner.setRolloffFactor(this.native, value); }
        });

    Object.defineProperty(this, 'coneInnerAngle',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioPanner.getConeInnerAngle(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioPanner.setConeInnerAngle(this.native, value); }
        });

    Object.defineProperty(this, 'coneOuterAngle',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioPanner.getConeOuterAngle(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioPanner.setConeOuterAngle(this.native, value); }
        });

    Object.defineProperty(this, 'coneOuterGain',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioPanner.getConeOuterGaine(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioPanner.setConeOuterGain(this.native, value); }
        });
}

function AudioDestinationNode(audioContext) {
    this.native = navigator.holojs.nativeInterface.webaudioContext.getDestination(audioContext.native);
    AudioNode.call(this, audioContext);

    Object.defineProperty(this, 'maxChannelCount', { get: function () { throw 'not implemented'; } });
}

function GainNode(audioContext) {
    this.native = navigator.holojs.nativeInterface.webaudioContext.createGain(audioContext.native);
    AudioNode.call(this, audioContext);

    Object.defineProperty(this, 'gain', { get: function () { throw 'not implemented'; } });
}

function AudioListener(audioContext) {
    this.native = navigator.holojs.nativeInterface.webaudioContext.getListener(audioContext.native);
    AudioNode.call(this, audioContext);

    this.setPosition = function (x, y, z) {
        navigator.holojs.nativeInterface.webaudio.listenerSetPosition(this.native, x, y, z);
    };

    this.setOrientation = function (x, y, z, upX, upY, upZ) {
        navigator.holojs.nativeInterface.webaudio.listenerSetOrientation(this.native, x, y, z, upX, upY, upZ);
    };

    this.positionXNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetPositionX(this.native));
    this.positionYNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetPositionY(this.native));
    this.positionZNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetPositionZ(this.native));

    this.forwardXNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetForwardX(this.native));
    this.forwardYNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetForwardY(this.native));
    this.forwardZNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetForwardZ(this.native));

    this.upXNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetUpX(this.native));
    this.upYNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetUpY(this.native));
    this.upZNative = new AudioParam(navigator.holojs.nativeInterface.webaudio.listenerGetUpZ(this.native));


    Object.defineProperty(this, 'positionX', { get: function () { this.positionXNative; } });
    Object.defineProperty(this, 'positionY', { get: function () { this.positionYNative; } });
    Object.defineProperty(this, 'positionZ', { get: function () { this.positionZNative; } });

    Object.defineProperty(this, 'forwardX', { get: function () { return this.forwardXNative; } });
    Object.defineProperty(this, 'forwardY', { get: function () { return this.forwardYNative; } });
    Object.defineProperty(this, 'forwardZ', { get: function () { return this.forwardZNative; } });

    Object.defineProperty(this, 'upX', { get: function () { return this.upXNative; } });
    Object.defineProperty(this, 'upY', { get: function () { return this.upYNative; } });
    Object.defineProperty(this, 'upZ', { get: function () { return this.upZNative;} });
}

function AudioScheduledSourceNode(audioContext) {
    AudioNode.call(this, audioContext);

    Object.defineProperty(this, 'onended', {
        get: function () {
            return this.onendedEvent;
        },
        set: function (value) {
            if (this.onendedEvent) {
                this.removeEventListener('ended', this.onendedEvent);
            }

            if (value) {
                this.addEventListener('ended', value);
            }

            this.onendedEvent = value;
        }
    });

    this.start = function (when) {
        navigator.holojs.nativeInterface.webaudioAudioBuffer.start(this.native, when);
    };

    this.stop = function (when) {
        navigator.holojs.nativeInterface.webaudioAudioBuffer.stop(this.native, when);
    };

}

function AudioBufferSourceNode(audioContext) {
    this.native = navigator.holojs.nativeInterface.webaudioContext.createAudioBufferSource(audioContext.native);

    EventTarget.call(this);
    AudioScheduledSourceNode.call(this, audioContext);

    Object.defineProperty(this, 'buffer', {
        get: function () {
            return this._buffer;
        },
        set: function (value) {
            this._buffer = value;
            navigator.holojs.nativeInterface.webaudioAudioBuffer.setBuffer(this.native, value.native);
        }
    });

    this.playbackRate = new AudioParam(navigator.holojs.nativeInterface.webaudioAudioBuffer.getPlaybackRate(this.native));
    this.detune = new AudioParam(navigator.holojs.nativeInterface.webaudioAudioBuffer.getDetune(this.native));

    Object.defineProperty(this, 'loop',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioAudioBuffer.getLoop(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioAudioBuffer.setLoop(this.native, value); }
        });

    Object.defineProperty(this, 'loopStart',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioAudioBuffer.getLoopStart(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioAudioBuffer.setLoopStart(this.native, value); }
        });

    Object.defineProperty(this, 'loopEnd',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioAudioBuffer.getLoopEnd(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioAudioBuffer.setLoopEnd(this.native, value); }
        });
}

function AudioParam(nativeAudioParam) {
    this.native = nativeAudioParam;

    this.setValueAtTime = function (value, startTime) {
        navigator.holojs.nativeInterface.webaudioAudioParam.setValueAtTime(this.native, value, startTime);
    };

    this.setTargetAtTime = function (target, startTime, timeConstant) {
        navigator.holojs.nativeInterface.webaudioAudioParam.setTargetAtTime(this.native, target, startTime, timeConstant);
    };

    Object.defineProperty(this, 'value',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioAudioParam.getValue(this.native); },
            set: function (value) { navigator.holojs.nativeInterface.webaudioAudioParam.setValue(this.native, value); }
        });

    Object.defineProperty(this, 'automationRate', { get: function () { throw 'not implemented'; }, set: function (value) { throw 'not implemented'; } });

    Object.defineProperty(this, 'defaultValue',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioAudioParam.getDefaultValue(this.native); }
        });

    Object.defineProperty(this, 'minValue',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioAudioParam.getMinValue(this.native); }
        });

    Object.defineProperty(this, 'maxValue',
        {
            get: function () { return navigator.holojs.nativeInterface.webaudioAudioParam.getMaxValue(this.native); }
        });
    
    this.linearRampToValueAtTime = function (value, time) {
        navigator.holojs.nativeInterface.webaudioAudioParam.linearRampToValueAtTime(this.native, value, time);
    };

    this.exponentialRampToValueAtTime = function (value, time) {
        navigator.holojs.nativeInterface.webaudioAudioParam.exponentialRampToValueAtTime(this.native, value, time);
    };
    
    this.setValueCurveAtTime = function (values, time, duration) {
        navigator.holojs.nativeInterface.webaudioAudioParam.setValueCurveAtTime(this.native, values, time, duration);
    };

    this.cancelScheduledValues = function (time) {
        navigator.holojs.nativeInterface.webaudioAudioParam.cancelScheduledValues(this.native, time);
    };

    this.cancelAndHoldAtTime = function () { throw 'not implemented'; };
}

