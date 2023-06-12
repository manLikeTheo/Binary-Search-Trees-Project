import Node from "./node";

export default class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        const sortedData = this.sortDataAndRemoveDuplicate(arr);
        const n = sortedData.length;
        const rootNode = this.sortedDataToBST(sortedData, 0, n - 1);
        return rootNode;
    }

    sortDataAndRemoveDuplicate(arr) {
        const sortedData = [...new Set[arr]].sort((a, b) => a - b);
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
        if(node == null) return node;

        if(value < node.value) { node.left = this.insert(value, node.left);
            } else if (value > node.value) { node.right = this.insert(value, node.right);
            } else {
            return node;
            }
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
}