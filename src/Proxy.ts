import { EventProducer } from "./EventProducer";
import { InboxDto, IncomingPacket, MessageDto, OutgoingPacket } from "./chat";

class Proxy extends EventProducer {
    private ws: WebSocket;
    inbox: InboxDto | null = null;

    constructor() {
        super();
        this.ws = new WebSocket("wss://raja.aut.bme.hu/chat/");
        this.ws.addEventListener("open", () => {
            //this.ws.send(JSON.stringify(packet));
            //console.log("opennnn...")
        });
        this.ws.addEventListener('message', e => {
            let p = <IncomingPacket>JSON.parse(e.data);
            switch (p.type) {
                case "error":
                    alert(p.message);
                    break;
                case "login":
                    //console.log("login packet....");
                    this.inbox = p.inbox;
                    this.dispatch( "login" );
                    break;
                case "message":
                    let cid = p.channelId;
                    this.inbox!.conversations.find(x => x.channelId === cid)?.lastMessages.push(p.message);
                    this.dispatch( "message", cid, p.message );
                    break;
                case "conversationAdded":
                    this.inbox!.conversations.push(p.conversation);
                    this.dispatch( "conversation", p.conversation.channelId );
                    break;
            }

        });
    }

    public sendPacket(packet: OutgoingPacket) {
        this.ws.send(JSON.stringify(packet));
    }


    public getWebSocket(): WebSocket {
        return this.ws;
    }
}

export var proxy = new Proxy();