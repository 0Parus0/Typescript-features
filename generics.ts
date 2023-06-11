// When writing programs, one of the most important aspects is to build reusable components. This ensures that the program is flexible as well as scalable in the long-term.

// Generics offer a way to create reusable components. Generics provide a way to make components work with any data type and not restrict to one data type. So, components can be called or used with a variety of data types. Generics in TypeScript is almost similar to C# generics.

// Let's see why we need Generics using the following example.


class ArrayOfNumbers {
    constructor(public collection: number[]) {
        
    }

    get(index: number): number {
        return this.collection[index];
    }


}

class ArrayOfStrings {
    constructor(public collection: string[]){}

    get(index: number): string {
        return this.collection[index];
    }
}

class ArrayOfAnything<T> {
    constructor(public collection: T[]) {}

    get(index: number): T {
        return this.collection[index];
    }
}

const strings = new ArrayOfAnything<string>(['a', 'b', 'c', 'd'])
const nums = new ArrayOfAnything<number>([1, 2, 3, 4, 5])


/**************************************** */
// Example of generics with function
/**************************************** */

function printString(arr: string[]): void {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

function printNumbers(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}


function printAnything<T>(arr: T[]): void {
    for(let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }

}

printAnything<string>(['a', 'b', 'c']);
printAnything<number>([1, 2, 3, 4]);


/**************************************** */
// Generics Constraints
/**************************************** */

class Car {
    print() {
        console.log('I am a car');
    }
}

class House {
    print() {
        console.log('I am a House');
    }
}


interface PrintAble {
    print(): void;
}

function printHousesOrCars<T extends PrintAble>(arr: T[]): void {
    for(let i = 0; i < arr.length; i++) {
        arr[i].print();
    }
}

printHousesOrCars<House>([new House(), new House()]);
printHousesOrCars<Car>([new Car(), new Car()]);


// function getArray(items : any[] ) : any[] {
//     return new Array().concat(items);
// }

// let myNumArr = getArray([100, 200, 300]);
// let myStrArr = getArray(["Hello", "World"]);

// myNumArr.push(400); // OK
// myStrArr.push("Hello TypeScript"); // OK

// myNumArr.push("Hi"); // OK
// myStrArr.push(500); // OK

// console.log(myNumArr); // [100, 200, 300, 400, "Hi"]
// console.log(myStrArr); // ["Hello", "World", "Hello TypeScript", 500]
// In the above example, the getArray() function accepts an array of type any. It creates a new array of type any, concats items to it and returns the new array. Since we have used type any for our arguments, we can pass any type of array to the function. However, this may not be the desired behavior. We may want to add the numbers to number array or the strings to the string array but not numbers to the string array or vice-versa.

// To solve this, TypeScript introduced generics. Generics uses the type variable <T>, a special kind of variable that denotes types. The type variable remembers the type that the user provides and works with that particular type only. This is called preserving the type information.

// The above function can be rewritten as a generic function as below.

// Example: Generic Function Copy
// function getArray<T>(items : T[] ) : T[] {
//     return new Array<T>().concat(items);
// }

// let myNumArr = getArray<number>([100, 200, 300]);
// let myStrArr = getArray<string>(["Hello", "World"]);

// myNumArr.push(400); // OK
// myStrArr.push("Hello TypeScript"); // OK

// myNumArr.push("Hi"); // Compiler Error
// myStrArr.push(500); // Compiler Error
// In the above example, the type variable T is specified with the function in the angle brackets getArray<T>. The type variable T is also used to specify the type of the arguments and the return value. This means that the data type which will be specified at the time of a function call, will also be the data type of the arguments and of the return value.

// We call generic function getArray() and pass the numbers array and the strings array. For example, calling the function as getArray<number>([100, 200, 300]) will replace T with the number and so, the type of the arguments and the return value will be number array. In the same way, for getArray<string>(["Hello", "World"]), the type of arguments and the return value will be string array. So now, the compiler will show an error if you try to add a string in myNumArr or a number in myStrArr array. Thus, you get the type checking advantage.

// It is not recommended but we can also call a generic function without specifying the type variable. The compiler will use type inference to set the value of T on the function based on the data type of argument values.

// Example: Calling Generic Function without Specifying the Type Copy
// let myNumArr = getArray([100, 200, 300]); // OK
// let myStrArr = getArray(["Hello", "World"]); // OK
// Generics can be applied to the function's argument, a function's return type, and a class fields or methods.

// Multiple Type Variables
// We can specify multiple type variables with different names as shown below.

// Example: Multiple Type Variables Copy
// function displayType<T, U>(id:T, name:U): void { 
//   console.log(typeof(id) + ", " + typeof(name));  
// }

// displayType<number, string>(1, "Steve"); // number, string
// Generic type can also be used with other non-generic types.

// Example: Generic with Non-generic Type Copy
// function displayType<T>(id:T, name:string): void { 
//   console.log(typeof(id) + ", " + typeof(name));  
// }

// displayType<number>(1, "Steve"); // number, string
// Methods and Properties of Generic Type
// When using type variables to create generic components, TypeScript forces us to use only general methods which are available for every type.

// Example: Generic Type Methods and Properties Copy
// function displayType<T, U>(id:T, name:U): void { 
    
//     id.toString(); // OK
//     name.toString(); // OK

//     id.toFixed();  // Compiler Error: 'toFixed' does not exists on type 'T'
//     name.toUpperCase(); // Compiler Error: 'toUpperCase' does not exists on type 'U'

//     console.log(typeof(id) + ", " + typeof(name));  
// }
// In the above example, id.toString() and name.toString() method calls are correct because the toString() method is available for all types. However, type specific methods such as toFixed() for number type or toUpperCase() for string type cannot be called. The compiler will give an error.

// You can use array methods for the generic array.

// Example: Generic Array Methods Copy
// function displayNames<T>(names:T[]): void { 
//     console.log(names.join(", "));  
// }

// displayNames<string>(["Steve", "Bill"]); // Steve, Bill
// So, be careful while using generic types and calling type specific methods or properties.

// Generic Constraints
// As mentioned above, the generic type allows any data type. However, we can restrict it to certain types using constraints. Consider the following example:

// Example: Constraints Copy
// class Person {
//     firstName: string;
//     lastName: string;

//     constructor(fname:string,  lname:string) { 
//         this.firstName = fname;
//         this.lastName = lname;
//     }
// }

// function display<T extends Person>(per: T): void {
//     console.log(`${ per.firstName} ${per.lastName}` );
// }
// var per = new Person("Bill", "Gates");
// display(per); //Output: Bill Gates

// display("Bill Gates");//Compiler Error
// In the above example, the display function is a generic function with constraints. A constraint is specified after the generic type in the angle brackets. The constraint <T extends Person> specifies that the generic type T must extend the class Person. So, the Person class or any other class that extends the Person class can be set as generic type while calling the display function, otherwise the compiler will give an error.