
import java.util.Set;
import java.util.HashSet;

//to run the code on leetcode.com, change the class name from 'StreamCheckerWithCircularArray' to 'StreamChecker'.
public class StreamCheckerWithCircularArray {

    Trie dictionary;
    CircularArray reversedStream;

    public StreamChecker(String[] words) {
        dictionary = new Trie();
        dictionary.createDictionary(words);
        reversedStream = new CircularArray(dictionary.size_longestWordInDictionary);
    }

    public boolean query(char letter) {

        reversedStream.addToEnd(letter);
        dictionary.searchNode = dictionary.root;
        int current = reversedStream.end + reversedStream.maxCapacity;

        while (true) {
            char ch = reversedStream.circularArray[current % reversedStream.maxCapacity];
            if (dictionary.searchNode.branches[ch - 'a'] == null) {
                return false;
            }
            dictionary.searchNode = dictionary.searchNode.branches[ch - 'a'];
            if (dictionary.searchNode.isWord) {
                break;
            }

            if (current % reversedStream.maxCapacity == reversedStream.front) {
                break;
            }
            current--;
        }

        return dictionary.searchNode.isWord;
    }
}

class Trie {

    TrieNode root;
    TrieNode searchNode;
    int size_longestWordInDictionary;

    public Trie() {
        root = new TrieNode();
        searchNode = root;
    }

    public void createDictionary(String[] words) {
        /*
        There are test cases where the number of input words is nearly four times
        the number of unique input words. Thus, the HashSet 'uniqueWords' is applied
        in order to streamline the code.
         */
        Set<String> uniqueWords = new HashSet<>();
        int size = words.length;
        for (int i = 0; i < size; i++) {
            if (uniqueWords.add(words[i])) {
                insertWordInReversedOrder(words[i]);
            }
        }
    }

    /*
    Since we have to search for a word match by starting from the last character in the stream,
    putting the words in reversed order in the Trie significantly streamlines the search.
     */
    public void insertWordInReversedOrder(String word) {

        searchNode = root;
        char[] arrayWord = word.toCharArray();
        int size = arrayWord.length;
        size_longestWordInDictionary = Math.max(size_longestWordInDictionary, size);

        for (int i = size - 1; i >= 0; i--) {
            char ch = arrayWord[i];
            if (searchNode.branches[ch - 'a'] == null) {
                searchNode.branches[ch - 'a'] = new TrieNode();
            }
            searchNode = searchNode.branches[ch - 'a'];
        }
        searchNode.isWord = true;
    }
}

class TrieNode {

    final int ALPHABET = 26;
    TrieNode[] branches;
    boolean isWord;

    public TrieNode() {
        branches = new TrieNode[ALPHABET];
    }
}

/*
An abridged version of a circular array, specifically tailored to the requirements 
of the current problem. Once the full capacity is reached, the earliest added element 
is overwritten by the newly added element. The circular array is iterated 
from the most recently added element towards the earliest added element.
 */
class CircularArray {

    int maxCapacity;
    int front;
    int end;

    char[] circularArray;

    public CircularArray(int maxCapacity) {
        this.maxCapacity = maxCapacity;
        circularArray = new char[maxCapacity];
        end = -1;
    }

    void addToEnd(char letter) {

        if (end != -1 && (end + 1) % maxCapacity == front) {
            front = (++front % maxCapacity);
        }

        end = (++end % maxCapacity);
        circularArray[end] = letter;
    }
}
