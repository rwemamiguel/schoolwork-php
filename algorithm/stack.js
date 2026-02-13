class Stack{
    constructor(){
        this.items=[];
    }
    push(element){
        this.items.push(element);
    }
    pop(){
        if(this.isEmpty()){
            console.log("Underflow");
        return null;
        }
        return this.items.pop();
    }
    peek(){
        if(this.isEmpty()){
            console.log("No elements in Stack");
            return null;
        }
        return this.items[this.items.length-1];
    }
    isEmpty(){
        return this.items.length===0;
    }
    size(){
        return this.items.length;
    }
    print(){
        console.log(this.items.join(" "));
    }
}
const stack=new Stack();
stack.pop(10);
stack.push(20);
stack.push(30);
stack.push(40);
stack.print();

    size() 
stack.print();
