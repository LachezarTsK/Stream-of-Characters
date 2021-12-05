
import java.util.ArrayDeque;
import java.util.Set;
import java.util.HashSet;

public class StreamChecker {

    Trie dictionary;
    ArrayDeque<Character> reversedStream;

    public StreamChecker(String[] words) {
        dictionary = new Trie();
        dictionary.createDictionary(words);
        reversedStream = new ArrayDeque(dictionary.size_longestWordInDictionary + 1);

    }

    public boolean query(char letter) {
        if (reversedStream.size() == dictionary.size_longestWordInDictionary) {
            reversedStream.removeLast();
        }
        reversedStream.addFirst(letter);
        dictionary.searchNode = dictionary.root;
        for (char ch : reversedStream) {
            if (dictionary.searchNode.branches[ch - 'a'] == null) {
                return false;
            }
            dictionary.searchNode = dictionary.searchNode.branches[ch - 'a'];
            if (dictionary.searchNode.isWord) {
                break;
            }
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
