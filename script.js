const createNode= function(value,left=null,right=null){
    return{
        value,
        left,
        right
    }
}


const createBST=function(unsortedArray){
    const sortedArr=sortAndUnique(unsortedArray);
    let root=buildTree(sortedArr);
    
    function buildTree(array=sortedArr,start=0,end=sortedArr.length-1){
        if(start>end){
            return null;
        }

        const mid=parseInt((start+end)/2);
        const node=createNode(array[mid]);

        node.left= buildTree(array,start,mid-1);
        node.right=buildTree(array,mid+1,end);
        return node;
    }
    const prettyPrint = (node=root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
    function sortAndUnique(array){
        array.sort(function(a,b){
            return a-b;
        });
        return [... new Set(array)];
    }
    function insert(value,nodeCurrent=root,nodePrevious=null,isLeft=false){
        if(root===null){
            root=createNode(value);
            return;
        }
        if(nodeCurrent===null)
        {
            nodeCurrent=createNode(value);
            if(isLeft){
                nodePrevious.left=nodeCurrent;
            }else{
                nodePrevious.right=nodeCurrent;
            }
            return
        }
        if(nodeCurrent.value>value){
            insert(value,nodeCurrent.left,nodeCurrent,true);
        }else{
            insert(value,nodeCurrent.right,nodeCurrent,false);
        }
    }
    function deleteItem(value,nodeCurrent=root,parentNode=null,isLeft=false){
        if(nodeCurrent===null){
            return;
        }
        if(nodeCurrent.value==value){
            if(nodeCurrent.left===null&&nodeCurrent.right===null){
                adjustNode(parentNode,nodeCurrent,isLeft,true);
                return;
            }
            else if(nodeCurrent.left===null){
                nodeCurrent=nodeCurrent.right;
                adjustNode(parentNode,nodeCurrent,isLeft);
                return;
            }else if(nodeCurrent.right===null){
                nodeCurrent=nodeCurrent.left;
                adjustNode(parentNode,nodeCurrent,isLeft);
            }else{
                const node=inOrderSuccesor(nodeCurrent.right);
                deleteItem(node.value)
                nodeCurrent.value=node.value;
                return;
            }
        }
        if(nodeCurrent.value>value){
            deleteItem(value,nodeCurrent.left,nodeCurrent,true);
        }else{
            deleteItem(value,nodeCurrent.right,nodeCurrent,false);
        }
        

        
    }
    function inOrderSuccesor(node){
        if(node.left===null)
            return node
        return inOrderSuccesor(node.left);
    }
    function adjustNode(parentNode,nodeCurrent,isLeft,bothNull=false){
        if(bothNull){
            if(parentNode===null){
                root=null;
                return;
            }
            if(isLeft){
                parentNode.left=null;
                return;
            }else{
                parentNode.right=null;
                return;
            }
        }else{
            if(parentNode===null){
                root=nodeCurrent;
                return;
            }
            if(isLeft){      
                parentNode.left=nodeCurrent;
                return;
            }
            else
            {
                parentNode.right=nodeCurrent;
                return;
            }
        }
        
            
        
    }
    function find(value,node=root){
        if(node===null){
            return null;
        }
        if(node.value===value){
            return node;
        }
        if(node.value>value){
            return find(value,node.left);
            
        }else{
           return find(value,node.right);
        }
    }
    function leverOrder(callback=undefined,node=root){
        let Q=[];
        Q.push(node);
        let returnArray=[];
        while(Q.length>0){
            const item=Q.shift();
            traversallProcess(callback,returnArray,item);
            if(item.left!=null){
                Q.push(item.left);
            }
            if(item.right!=null){
                Q.push(item.right);
            }
        }
        return returnArray;
    }
    function leverOrderRec(callback=undefined,returnArray=[],Q=[root]){
        if(Q.length==0){
            return returnArray;
        }
        const item=Q.shift();
        traversallProcess(callback,returnArray,item);
        if(item.left!==null)
            Q.push(item.left);
        if(item.right!==null)
            Q.push(item.right);
        return leverOrderRec(callback,returnArray,Q);
        
    }
    function inOrder(node=root,callback=undefined,returnArray=[]){
        if(node===null){
            return returnArray;
        }
        inOrder(node.left,callback,returnArray);
        traversallProcess(callback,returnArray,node);
        inOrder(node.right,callback,returnArray);
        return returnArray;

    }
    function preOrder(node=root,callback=undefined,returnArray=[]){
        if(node===null){
            return returnArray;
        }
        traversallProcess(callback,returnArray,node);
        preOrder(node.left,callback,returnArray);
        preOrder(node.right,callback,returnArray);
        return returnArray;

    }
    function postOrder(node=root,callback=undefined,returnArray=[]){
        if(node===null){
            return returnArray;
        }
        postOrder(node.left,callback,returnArray);
        postOrder(node.right,callback,returnArray);
        traversallProcess(callback,returnArray,node);
        return returnArray;

    }
    function traversallProcess(callback,returnArray,item){
        if(callback!==undefined){
            callback(node);
        }else{
            returnArray.push(item.value);
        }
    }
    function height(node=root) {
        if (node === null) {
            return -1;
        } else {
            let leftHeight = height(node.left);
            let rightHeight = height(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }
    function depth(node,nodeCurrent=root,count=0){
        if(node===null){
            return -1;
        }
        if(nodeCurrent===null){
            return -1;
        }
        if(node.value===nodeCurrent.value){
            return count;
        }
        if(node.value>nodeCurrent.value){
            return depth(node,nodeCurrent.right,count+1);
        }
        else{
            return depth(node,nodeCurrent.left,count+1);
        }
    }
    function isBalanced(node=root){
        if(node===null)
            return true;

        const leftHeight=height(node.left);
        const rightHeight=height(node.right);

        if(Math.abs(leftHeight-rightHeight)>1){
            return false;
        }
        isBalanced(node.left);
        isBalanced(node.right);
        return true;
    }
    function rebalance(node=root){
        const treeArr=inOrder(node);
        const sortedArr=sortAndUnique(treeArr)
        const newTree=buildTree(sortedArr,0,sortedArr.length-1);
        root=newTree;
    }
    
    return{
        prettyPrint,
        insert,
        deleteItem,
        find,
        leverOrder,
        leverOrderRec,
        inOrder,
        postOrder,
        preOrder,
        height,
        depth,
        isBalanced,
        rebalance
    }
}

const testArray=returnRandomArray();

const BST=createBST(testArray);

console.log(BST.isBalanced());
printAllOrders(BST);

const size=parseInt(Math.random()*100);
for(let i=0;i<size;i++){
    BST.insert(parseInt(Math.random()*1000));
}

console.log(BST.isBalanced());
BST.rebalance();
printAllOrders(BST);



function returnRandomArray(){
    const size=parseInt(Math.random()*100);
    const randomArr=[];
    for(let i=0;i<size;i++){
        randomArr.push(parseInt(Math.random()*1000));
    }
    return randomArr;
}

function printAllOrders(tree){
    console.log("Inorder: "+tree.inOrder());
    console.log("Post order: "+tree.postOrder());
    console.log("PreOrder: "+tree.preOrder());
    console.log("Inorder: "+tree.leverOrderRec());

}