
/*
 An abridged version of a circular array, specifically tailored to the requirements 
 of the current problem. Once the full capacity is reached, the earliest added element 
 is overwritten by the newly added element. The circular array is iterated 
 from the most recently added element towards the earliest added element.
 */

class CircularArray {

    constructor(maxCapacity) {
        this.maxCapacity = maxCapacity;
        this.circularArray = [];
        this.front = 0;
        this.end = -1;
    }

    addToEnd(letter) {

        if (this.end !== -1 && (this.end + 1) % this.maxCapacity === this.front) {
            this.front = (++this.front % this.maxCapacity);
        }

        this.end = (++this.end % this.maxCapacity);
        this.circularArray[this.end] = letter;
    }

    printEndToFront() {

        console.log("Printing from end to front, i.e. starting from the most recently added element:");
        let current = this.end + this.maxCapacity;
        let temp = "";

        while (true) {
            temp += this.circularArray[current % this.maxCapacity] + " ";
            if (current % this.maxCapacity === this.front) {
                break;
            }
            current--;
        }
        console.log(temp);
        console.log("\n-------------------------");
    }
}


const array = new CircularArray(9);
let ch = 'abcdefghijklmnopkrstuvwxyz';
let index = 0;
for (let i = 0; i < array.maxCapacity; i++) {
    array.addToEnd(ch.charAt(index++));
}
console.log("current array: " + array.circularArray);
console.log("front: " + array.front + ", end: " + array.end);
array.printEndToFront();

array.addToEnd(ch.charAt(index++));
console.log("current array: " + array.circularArray);
console.log("front: " + array.front + ", end: " + array.end);
array.printEndToFront();

array.addToEnd(ch.charAt(index++));
console.log("current array: " + array.circularArray);
console.log("front: " + array.front + ", end: " + array.end);
array.printEndToFront();

array.addToEnd(ch.charAt(index++));
console.log("current array: " + array.circularArray);
console.log("front: " + array.front + ", end: " + array.end);
array.printEndToFront();
