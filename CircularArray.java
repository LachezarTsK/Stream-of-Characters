
import java.util.Arrays;

/*
An abridged version of a circular array, specifically tailored to the requirements 
of the current problem. Once the full capacity is reached, the earliest added element 
is overwritten by the newly added element. The circular array is iterated 
from the most recently added element towards the earliest added element.
 */
public class CircularArray {

    public static void main(String[] args) {
        CircularArray array = new CircularArray(9);
        char ch = 'a';
        for (int i = 0; i < array.maxCapacity; i++) {
            array.addToEnd(ch++);
        }
        System.out.println("current array: " + Arrays.toString(array.circularArray));
        System.out.println("front: " + array.front + ", end: " + array.end);
        array.printEndToFront();

        for (int i = 0; i < 3; i++) {
            array.addToEnd(ch++);
            System.out.println("current array: " + Arrays.toString(array.circularArray));
            System.out.println("front: " + array.front + ", end: " + array.end);
            array.printEndToFront();
        }

    }

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

    void printEndToFront() {

        System.out.println("Printing from end to front, i.e. starting from the most recently added element:");
        int current = this.end + maxCapacity;
        while (true) {
            System.out.print(circularArray[current % maxCapacity] + " ");
            if (current % maxCapacity == front) {
                break;
            }
            current--;
        }
        System.out.println("\n-------------------------");
    }
}
