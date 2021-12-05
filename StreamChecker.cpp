
#include <set>
#include <deque>
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

class StreamChecker {
public:
    Trie* dictionary;
    deque<char> reversedStream;

    StreamChecker(vector<string>& words) {
        dictionary = new Trie();
        dictionary->createDictionary(words);


    }

    bool query(char letter) {
        if (reversedStream.size() == dictionary->size_longestWordInDictionary) {
            reversedStream.pop_back();
        }
        reversedStream.push_front(letter);
        dictionary->searchNode = dictionary->root;
        int size = reversedStream.size();
        for (int i = 0; i < size; i++) {

            if (dictionary->searchNode->branches[reversedStream[i] - 'a'] == nullptr) {
                return false;
            }
            dictionary->searchNode = dictionary->searchNode->branches[reversedStream[i] - 'a'];
            if (dictionary->searchNode->isWord) {
                break;
            }
        }


        return dictionary->searchNode->isWord;
    }
};
