
export class Thread {
    private messageType: any;
    private worker: Worker;
    private callStack: any[] = [];
    constructor(worker: any, messageType: any) {
        this.worker = new worker();
        this.messageType = messageType;
        this.addListener();
    }
    private addListener() {
        this.worker.onmessage = (e: any) => {
            if (e.data.type === this.messageType)
                this.callStack.pop().resolve(e.data.payload);
        }
        this.worker.onerror = (e: any) => {
            if (e.data.type === this.messageType)
                this.callStack.pop().reject({ type: 'error', payload: e.data.payload });
        }
    }
    run(input: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.callStack.push({ resolve, reject });
            this.worker.postMessage({ type: this.messageType, payload: input });
        });

    }
    terminate() {
        console.log('call stack: ', this.callStack.length);
        this.worker.terminate();
        this.worker = undefined;
    }
}