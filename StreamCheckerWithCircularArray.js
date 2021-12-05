
/**
 * @param {string[]} words
 */
var StreamChecker = function (words) {
    this.streamCheckerTools = new StreamCheckerTools(words);
};

/** 
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
    return this.streamCheckerTools.query(letter);
};

class StreamCheckerTools {

    /** 
     * @param {string[]} words
     */
    constructor(words) {
        this.dictionary = new Trie();
        this.dictionary.createDictionary(words);
        this.reversedStream = new CircularArray(this.dictionary.size_longestWordInDictionary);
    }

    /** 
     * @param {character} letter
     * @return {boolean}
     */
    query(letter) {

        this.reversedStream.addToEnd(letter);
        this.dictionary.searchNode = this.dictionary.root;
        let current = this.reversedStream.end + this.reversedStream.maxCapacity;

        while (true) {
            let ch = this.reversedStream.circularArray[current % this.reversedStream.maxCapacity];

            if (!this.dictionary.searchNode.branches[ch.codePointAt(0) - this.dictionary.ascii_smallCase_a]) {
                return false;
            }

            this.dictionary.searchNode = this.dictionary.searchNode.branches[ch.codePointAt(0) - this.dictionary.ascii_smallCase_a];
            if (this.dictionary.searchNode.isWord) {
                break;
            }

            if (current % this.reversedStream.maxCapacity === this.reversedStream.front) {
                break;
            }
            current--;
        }

        return this.dictionary.searchNode.isWord;
    }
}

class Trie {

    constructor() {
        this.root = new TrieNode();
        this.searchNode = this.root;
        this.size_longestWordInDictionary = 0;
        this.ascii_smallCase_a = 97;

    }

    /** 
     * @param {string[]} words
     */
    createDictionary(words) {
        /*
         There are test cases where the number of input words is nearly four times
         the number of unique input words. Thus, the HashSet 'uniqueWords' is applied
         in order to streamline the code.
         */
        const uniqueWords = new Set([...words]);
        for (let word of uniqueWords) {
            this.insertWordInReversedOrder(word);
        }
    }

    /*
     Since we have to search for a word match by starting from the last character in the stream,
     putting the words in reversed order in the Trie significantly streamlines the search.
     */
    /** 
     * @param {string} word
     */
    insertWordInReversedOrder(word) {

        this.searchNode = this.root;
        let size = word.length;
        this.size_longestWordInDictionary = Math.max(this.size_longestWordInDictionary, size);

        for (let i = size - 1; i >= 0; i--) {
            let ascii_ch = word.codePointAt(i);
            if (!this.searchNode.branches[ascii_ch - this.ascii_smallCase_a]) {
                this.searchNode.branches[ascii_ch - this.ascii_smallCase_a] = new TrieNode();
            }
            this.searchNode = this.searchNode.branches[ascii_ch - this.ascii_smallCase_a];
        }
        this.searchNode.isWord = true;
    }
}

class TrieNode {
    constructor() {
        this.branches = [];
        this.isWord = false;
    }
}

/*
 An abridged version of a circular array, specifically tailored to the requirements 
 of the current problem. Once the full capacity is reached, the earliest added element 
 is overwritten by the newly added element. The circular array is iterated 
 from the most recently added element towards the earliest added element.
 */
class CircularArray {

    /** 
     * @param {number} maxCapacity
     */
    constructor(maxCapacity) {
        this.maxCapacity = maxCapacity;
        this.circularArray = [];
        this.front = 0;
        this.end = -1;
    }

    /** 
     * @param {character} letter
     */
    addToEnd(letter) {

        if (this.end !== -1 && (this.end + 1) % this.maxCapacity === this.front) {
            this.front = (++this.front % this.maxCapacity);
        }

        this.end = (++this.end % this.maxCapacity);
        this.circularArray[this.end] = letter;
    }
}
