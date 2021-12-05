
#include <set>
#include <vector>
#include <string>

using namespace std;

class TrieNode {
public:
    const int ALPHABET = 26;
    TrieNode* branches[26];
    bool isWord = false;
};

class Trie {
public:
    TrieNode* root;
    TrieNode* searchNode;
    int size_longestWordInDictionary;

    Trie() {
        root = new TrieNode();
        searchNode = root;
        size_longestWordInDictionary = 0;
    }

    void createDictionary(vector<string>& words) {
        /*
        There are test cases where the number of input words is nearly four times
        the number of unique input words. Thus, the HashSet 'uniqueWords' is applied
        in order to streamline the code.
         */
        set<string> uniqueWords;
        int size = words.size();
        for (int i = 0; i < size; i++) {
            if (find(uniqueWords.begin(), uniqueWords.end(), words[i]) == uniqueWords.end()) {
                uniqueWords.insert(words[i]);
                insertWordInReversedOrder(words[i]);
            }
        }
    }

    /*
    Since we have to search for a word match by starting from the last character in the stream,
    putting the words in reversed order in the Trie significantly streamlines the search.
     */
    void insertWordInReversedOrder(string& word) {

        searchNode = root;
        int size = word.length();
        size_longestWordInDictionary = max(size_longestWordInDictionary, size);

        for (int i = size - 1; i >= 0; i--) {
            char ch = word[i];
            if (searchNode->branches[ch - 'a'] == nullptr) {
                searchNode->branches[ch - 'a'] = new TrieNode();
            }
            searchNode = searchNode->branches[ch - 'a'];
        }
        searchNode->isWord = true;
    }
};

/*
An abridged version of a circular array, specifically tailored to the requirements 
of the current problem. Once the full capacity is reached, the earliest added element 
is overwritten by the newly added element. The circular array is iterated 
from the most recently added element towards the earliest added element.
 */
class CircularArray {
public:
    int maxCapacity;
    int front;
    int end;
    char* circularArray;

    CircularArray(int capacity) {
        maxCapacity = capacity;
        circularArray = new char[maxCapacity];
        front = 0;
        end = -1;
    }

    void addToEnd(char letter) {

        if (end != -1 && (end + 1) % maxCapacity == front) {
            front = (++front % maxCapacity);
        }

        end = (++end % maxCapacity);
        circularArray[end] = letter;
    }
};

class StreamChecker {
public:
    Trie* dictionary;
    CircularArray* reversedStream;

    StreamChecker(vector<string>& words) {
        dictionary = new Trie();
        dictionary->createDictionary(words);
        reversedStream = new CircularArray(dictionary->size_longestWordInDictionary);
    }

    bool query(char letter) {
        reversedStream->addToEnd(letter);
        dictionary->searchNode = dictionary->root;
        int current = reversedStream->end + reversedStream->maxCapacity;
        while (true) {
            char ch = reversedStream->circularArray[current % reversedStream->maxCapacity];
            if (dictionary->searchNode->branches[ch - 'a'] == nullptr) {
                return false;
            }
            dictionary->searchNode = dictionary->searchNode->branches[ch - 'a'];
            if (dictionary->searchNode->isWord) {
                break;
            }
            if (current % reversedStream->maxCapacity == reversedStream->front) {
                break;
            }
            current--;
        }


        return dictionary->searchNode->isWord;
    }
};
