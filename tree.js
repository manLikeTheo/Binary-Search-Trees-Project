import Node from "./node.js";

export default class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(arr);
        this.levelOrder = [];
        this.inOrder = [];
        this.preOrder = [];
        this.postOrder = [];
    }

    buildTree(arr) {
        const sortedData = this.sortDataAndRemoveDuplicate(arr);
        const n = sortedData.length;
        const rootNode = this.sortedDataToBST(sortedData, 0, n - 1);
        return rootNode;
    }

    sortDataAndRemoveDuplicate(arr) {
        const sortedData = [...new Set(arr)].sort((a, b) => a - b);
        return sortedData;
    }

    sortedDataToBST(arr, start, end) {
        if(start > end) {
            return null;
        }
        const mid = parseInt((start + end) / 2, 10);
        const node = new Node(arr[mid]);
        node.left = this.sortedDataToBST(arr, start, mid - 1);
        node.right = this.sortedDataToBST(arr, mid + 1, end);
        return node;
    }

    insert(value, node = this.root){
        if(node == null) {
            node = new Node(value); 
            return node;
        }

        if(value < node.value) node.left = this.insert(value, node.left);
         else if (value > node.value) node.right = this.insert(value, node.right);
        return node;
            
    } 

    delete(value, node = this.root) {
        if(node == null) return node;

        if(value < node.value) {
            node.left = this.delete(node.left);
        } else if(value > node.value) {
            node.right = this.delete(value, node.right)
        } else {
            //node empty or node with single child
            if(node.left == null) return node.right;
            if(node.right == null) return node.left;

            //with 2 children data value
            node.value = this.minValue(node.right);
            node.right = this.delete(node.value, node.right);
        }
        return node;
    }

    minValue(node) {
        let minV = node.value;
        while(node.left != null) {
            minV = node.left.value;
            node = node.left;
        }
        return minV;
    }

    find(value, node = this.root) {
        if(node.value === value) return node;

        if(value > node.value) return this.find(value, node.right);

        if(value < node.value) return this.find(value, node.left);
    }

    levelOrderTraversal(util = this.bstToArray) {
        this.levelOrder = [];
        if(this.root === null) return; //do nothing;
        const queue = [];
        queue.push(this.root);
        while(queue.length > 0) {
            const node = queue[0];
            util(this.levelOrder, node.value);

            if(node.left != null) queue.push(node.left);

            if(node.right != null) queue.push(node.right);
            queue.shift()
        }
        return this.levelOrder;
    }

    bstToArray(arr, value) {
        arr.push(value);
    }

    //inOrder Travresal
    inOrderRecursive(util = this.bstToArray, node = this.root) {
        if(node === null) return; //do nothing
        //Traverse left subtree
        this.inOrderRecursive(util, node.left);
        //root node
        util(this.inOrder, node.value);
        //Traverse the right subtree
        this.inOrderRecursive(util, node.right);
        return this.inOrder;
    }

    inOrderTraversal() {
        this.inOrder = [];
        return this.inOrderRecursive();
    }

    //Pre Order Traversal
    preOrderRecursive(util = this.bstToArray, node = this.root) {
        if(node === null) return;
        //visit the root node and log it
        util(this.preOrder, node.value);
        //Traverse the left subtree
        this.preOrderRecursive(util, node.left);
        //Traverse the right subtree
        this.preOrderRecursive(util, node.right);
        return this.preOrder;
    }

    preOrderTraversal() {
        this.preOrder = [];
        return this.preOrderRecursive();
    }

    //Post Order Traversal
    postOrderRecursive(util = this.bstToArray, node = this.root) {
        //base case : tree empty
        if(node === null) return;
        this.postOrderRecursive(util, node.left);
        this.postOrderRecursive(util, node.right);
        util(this.postOrder, node.value);
        return this.postOrder;
    }

    postOrderTraversal() {
        this.postOrder = [];
        return this.postOrderRecursive();
    }

    getHeight(node) {
        if(node === null) return 0;
        const heightLeft = this.getHeight(node.left);
        const heightRight = this.getHeight(node.right);
        return Math.max(heightLeft, heightRight) + 1;
    }

    getDepth(value, node = this.root) {
        if(node.value === value.value) return 0;
        if(value.value < node.value) return this.getDepth(value, node.left) + 1;
        if(value.value > node.value) return this.getDepth(value, node.right) + 1;
    }

    isBalanced() {
        const totalNodes = this.inOrderTraversal();
        for(let i = 0; i < totalNodes; i++) {
            const node = this.find(totalNodes[i]);
            const leftSubtree = this.getHeight(node.left);
            const rightSubtree = this.getHeight(node.right);
            //get the absolute value
            if (Math.abs(leftSubtree - rightSubtree) < 1) return false;
        }
        return true;
    } 

    reBalance() {
        const activeTreeArray = this.inOrderTraversal();
        this.root = this.buildTree(activeTreeArray);
    }
}