import Node from "./node";

export default class Tree {
    constructor(arr) {
        this.arr = arr;

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

}