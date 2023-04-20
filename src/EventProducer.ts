import { MessageDto } from "./chat";

interface ProxyEventMap {
    "login": () => void;
    "message": (channelId: string, message: MessageDto) => void;
    "conversation": (channelId: string) => void;
}


export class EventProducer {
    private listeners: { type: keyof ProxyEventMap, listener, obj?: Object }[] = [];

    addEventListener<K extends keyof ProxyEventMap>( type: K, listener: ProxyEventMap[ K ], obj?: Object ) {
        this.listeners.push({ type, listener, obj });
    }
    removeEventListener(type: string, listener) {
        this.listeners.splice(this.listeners.findIndex(x => x.type === type && x.listener === listener), 1);
    }
    protected dispatch(type: string, ...args) {
        for (let listener of this.listeners.filter(x => x.type === type))
            listener.listener.call(listener.obj, ...args);
    }
    removeAllEventListener(obj: Object) {
        if (!obj)
            throw new Error("Must specify object");
        this.listeners = this.listeners.filter(x => x.obj !== obj);
    }

}