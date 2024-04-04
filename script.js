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
            insert(value,nodeCurrent.left,nodeCurrent),true;
        }else{
            insert(value,nodeCurrent.right,nodeCurrent,false);
        }
    }
    function deleteItem(value,nodeCurrent=root,parentNode=null,isLeft=false){
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
    return{
        prettyPrint,
        insert,
        deleteItem
    }
}

const testArray=[5,11];

const BST=createBST(testArray);
BST.prettyPrint();
//BST.insert(25);
BST.prettyPrint();
BST.deleteItem(5);
BST.prettyPrint();
BST.insert(5);
BST.prettyPrint();