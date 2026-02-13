class binarynode{
    constructor(value){
        this.value=value;
        this.left=null;
        this.right=null;
    }
}
class binarytree{
    constructor(){
        this.root=null
    }

insert(value){
    const node=new binarynode(value);
    if(!this.root){
        this.root=node;
        return;
    }
    let current=this.root;
    while(current){
        if(value < current.value){
            if(current.left ==null){
                current.left=node;
                break;
            }
            current=current.left;
        }else{
            if(current.right ===null){
                current.right=node;
                break;
            }
            current=current.right;
        }

    }
}
Show(){
        const tree=[]
        let current=this.root;
        while(tree.length>0|| current){
            while(current){
                tree.push(current);
                current=current.left
            }
            current=tree.pop();
            console.log(current.value);
            current=current.right
        }
    }

}
const tree = new binarytree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

tree.Show();  
