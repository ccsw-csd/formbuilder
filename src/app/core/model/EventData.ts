export class EventData {

    private senderId: string;
    private targetId: string;
    private data: any;

    constructor(data: any, senderId: string, targetId?: string) {
        this.senderId = senderId;
        this.targetId = targetId;
        this.data = data;
    }

    public isForMe(componentId: string) : boolean {
        if (this.senderId == componentId) return false;
        
        if (this.targetId == null) return true;
        if (this.targetId == componentId) return true;

        return false;
    }

    public getData() : any {
        return this.data;
    }

    public getSenderId() : string {
        return this.senderId;
    }

}