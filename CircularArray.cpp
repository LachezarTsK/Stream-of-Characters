
/*
An abridged version of a circular array, specifically tailored to the requirements 
of the current problem. Once the full capacity is reached, the earliest added element 
is overwritten by the newly added element. The circular array is iterated 
from the most recently added element towards the earliest added element.
 */

#include <iostream>
using namespace std;

class CircularArray {
public:
    int maxCapacity;
    int front;
    int end;
    char* circularArray;

    CircularArray(int capacity) {
        maxCapacity = capacity;
        circularArray = new char[maxCapacity];
        fill_n(circularArray, maxCapacity, '\u0000');
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

    void printEndToFront() {

        cout << "Printing from end to front, i.e. starting from the most recently added element:" << endl;
        int current = end + maxCapacity;
        while (true) {
            cout << circularArray[current % maxCapacity] << " ";
            if (current % maxCapacity == front) {
                break;
            }
            current--;
        }
        cout << endl;
        cout << "-------------------------" << endl;
    }

    void printArrayAsItIs() {
        for (int i = 0; i < maxCapacity; i++) {
            cout << circularArray[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    CircularArray ca(9);
    char ch = 'a';
    for (int i = 0; i < ca.maxCapacity; i++) {
        ca.addToEnd(ch++);
    }

    cout << "current array: ";
    ca.printArrayAsItIs();
    cout << "front: " << ca.front << ", end: " << ca.end << endl;
    ca.printEndToFront();

    for (int i = 0; i < 3; i++) {
        ca.addToEnd(ch++);
        cout << "current array: ";
        ca.printArrayAsItIs();
        cout << "front: " << ca.front << ", end: " << ca.end << endl;
        ca.printEndToFront();
    }

    return 0;
}
