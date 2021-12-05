
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
        this.reversedStream = [];

    }

    /** 
     * @param {character} letter
     * @return {boolean}
     */
    query(letter) {

        this.reversedStream.unshift(letter);
        if (this.reversedStream.length > this.dictionary.size_longestWordInDictionary) {
            this.reversedStream.length = this.dictionary.size_longestWordInDictionary;
        }
        this.dictionary.searchNode = this.dictionary.root;

        for (let ch of this.reversedStream) {
            if (!this.dictionary.searchNode.branches[ch.codePointAt(0) - this.dictionary.ascii_smallCase_a]) {
                return false;
            }
            this.dictionary.searchNode = this.dictionary.searchNode.branches[ch.codePointAt(0) - this.dictionary.ascii_smallCase_a];
            if (this.dictionary.searchNode.isWord) {
                break;
            }
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
