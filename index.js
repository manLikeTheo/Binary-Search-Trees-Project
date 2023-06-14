import Tree from "./tree.js";

//Test Code
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if(node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "     "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if(node.left !== null) {
        prettyPrint(node.left,  `${prefix}${isLeft ? "   " : "|   "}`, true);
    }
}

function randomArray(n) {
    const arr = [];
    for(let i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * 101);
    }
    return arr;
}

function addNumbers(n) {
    const arr = randomArray(n);
    for(let i = 0; i < n; i++) {
        tree.insert(arr[i]);
    }
}

const tree = new Tree(randomArray(7));//BST from an array of 10 random numbers

prettyPrint(tree.root); //print tree;

// // CHECK IF TREE IS BALANCED
console.log(`Check If balanced? ${tree.isBalance()}`); //returns boolean

// //Log elements of Binary Search Tree in Level, pre post and in -- order Traversal
console.log(`Level order Traversal --> ${tree.levelOrderTraversal()}`); 

console.log(`PreOrder Traversal --> ${tree.preOrderTraversal()}`); 

console.log(`inOrder Traversal--> ${tree.inOrderTraversal()}`); 

console.log(`PostOrder Traversal --> ${tree.postOrderTraversal()}`); 


// //ADD A FEW NUMBERS TO BST - to unbalance it
addNumbers(12); //Adds Random numbers from 1 - 100;

prettyPrint(tree.root); //prints the tree

console.log(`Check Balance After Addition: ${tree.isBalance()}`); 

//Rebalance BST
// console.log(`Rebalance Tree`);
tree.reBalance(); //Re-balance BST;

prettyPrint(tree.root);

console.log(`Confirm if tree is balanced: ${tree.isBalance()}`); //returns boolean

console.log(`Level Order Traversal: ${tree.levelOrderTraversal()}`);

console.log(`pre-Order Traversal: ${tree.preOrderTraversal()}`);

console.log(`inOrder Traversal: ${tree.inOrderTraversal()}`);

console.log(`postOrder Traversal elements: ${tree.postOrderTraversal()}`);

