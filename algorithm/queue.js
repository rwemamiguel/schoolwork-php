class Queue {
    constructor() {
        this.rear = 0;
        this.front = 0;
        this.element = [];
    }
     enqueue(data) {
        this.element[this.rear++] = data;
    }
    dequeue() {
        data = this.element[this.front];
        
        this.front++;
        return data;
    }
}