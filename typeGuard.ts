// A type guard is a TypeScript technique used to get information about the type of a variable, usually within a conditional block. Type guards are regular functions that return a boolean, taking a type and telling TypeScript if it can be narrowed down to something more specific. Type guards have the unique property of assuring that the value tested is of a set type depending on the returned boolean.

// TypeScript uses some built-in JavaScript operators like typeof, instanceof, and the in operator, which is used to determine if an object contains a property. Type guards enable you to instruct the TypeScript compiler to infer a specific type for a variable in a particular context, ensuring that the type of an argument is what you say it is.

// Type guards are typically used for narrowing a type and are quite similar to feature detection, allowing you to detect the correct methods, prototypes, and properties of a value. Therefore, you can easily figure out how to handle that value.

// There are five major ways to use a type guard:

// The instanceof keyword
// The typeof keyword
// The in keyword
// Equality narrowing type guard
// Custom type guard with predicate
// In this article, we’ll explore the four methods listed above. Let’s get started!

// The instanceof type guard
// instanceof is a built-in type guard that can be used to check if a value is an instance of a given constructor function or class. With this type guard, we can test if an object or value is derived from a class, which is useful for determining the type of an instance type.

// The basic syntax for the instanceof type guard is below:

// objectVariable instanceof ClassName;
// In the example below, we see an example of the instanceof type guard:

// interface Accessory {
//     brand: string;
//   }
//   class Necklace implements Accessory{
//     kind: string;
//     brand: string;
//     constructor(brand: string, kind: string) {    
//       this.brand = brand;
//       this.kind = kind;
//     }
//   }
//   class bracelet implements Accessory{
//     brand: string;
//     year: number;
//     constructor(brand: string, year: number) {    
//       this.brand = brand;
//       this.year = year;
//     }
//   }
//   const getRandomAccessory = () =>{
//     return Math.random() < 0.5 ?
//       new bracelet('cartier', 2021) :
//       new Necklace('choker', 'TASAKI');
//   }
//   let Accessory = getRandomAccessory();
//   if (Accessory instanceof bracelet) {
//     console.log(Accessory.year);
//   }
//   if (Accessory instanceof Necklace) {
//     console.log(Accessory.brand);    
//   }
// The getRandomAccessory function above returns either a Necklace or bracelet object, since they both implement the Accessory interface. The constructor signatures for both Necklace and bracelet are different, and the instanceof type guard compares both constructor signatures to effectively determine the type.

// The typeof type guard
// The typeof type guard is used to determine the type of a variable. The typeof type guard is said to be very limited and shallow. It can only determine the following types recognized by JavaScript:

// boolean
// string
// bigint
// symbol
// undefined
// function
// number
// For anything outside of this list, the typeof type guard simply returns object.

// The typeof type guard can be written in the following two ways:

// typeof v !== "typename"
// #or 
// typeof v === "typename"
// typename can be a string, number, symbol, or boolean.

// In the example below, StudentId has a string | number type union parameter entry. We see that if the variable is a string, Student is printed, and if it is a number, Id is printed. The typeof type guard helps us to extract the type from x:

function StudentId(x: string | number) {
    if (typeof x == 'string') {
        console.log('Student');
    }
    if (typeof x === 'number') {
        console.log('Id');
    }
}
StudentId(`446`); //prints Student
StudentId(446); //prints Id

// The in type guard
// The in type guard checks if an object has a particular property, using that to differentiate between different types. It usually returns a boolean, which indicates if the property exists in that object. It is used for its narrowing features, as well as to check for browser support.

// The basic syntax for the in type guard is below:

// propertyName in objectName
// In the example below, the in type guard checks if the property house exists. In cases where it does exist, the boolean true is returned, and where it does not exist, false is returned.

"house" in { name: "test", house: { parts: "door" } }; // => true
"house" in { name: "test", house: { parts: "windows" } }; // => true
"house" in { name: "test", house: { parts: "roof" } }; // => true
"house" in { name: "test" }; // => false
"house" in { name: "test", house: undefined }; // => true

// Another similar example of how the in type guard works is shown below:

interface Pupil {
    ID: string;
  }
  interface Adult {
    SSN: number;
  }
  interface Person {
    name: string;
    age: number;
  }
//   let person: Pupil | Adult | Person = {
//     name: 'Britney',
//     age: 6
//   };
  const getIdentifier = (person: Pupil | Adult | Person) => {
    if ('name' in person) {
      return person.name;
    }
    else if ('ID' in person) {
      return person.ID
    }
    return person.SSN;
  }
// Equality narrowing type guard
// Equality narrowing checks for the value of an expression. For two variables to be equal, both variables must be of the same type. If the type of a variable is not known, but it is equal to another variable with a precise type, then Typescript will narrow the type of the first variable with the information the well known variable provides:

function getValues(a: number | string, b: string) {
    if(a === b) {
        // this is where the narrowing takes place. narrowed to string
        console.log(typeof a) // string
    } else {
        // if there is no narrowing, type remains unknown
        console.log(typeof a) // number or string
    }
}
// If variable a is equal to variable b, then both have to have the same type. In this case, Typescript narrows it down to string. Without narrowing, the type of a is still unclear because it could either be a number or a string.

// Custom type guard with predicate
// Creating a custom type guard is typically the post powerful option for using type guards. When you create a custom type guard by writing it yourself, there are no limits to what you can check. However, if the custom type guard is written incorrectly, it can bring about a lot of errors. Therefore, precision is key.
// 
// An example of a custom type guard is shown below:

interface Necklace{
    kind: string;
    brand: string;
}
interface bracelet{
    brand: string;
    year: number;
}
type Accessory = Necklace | bracelet;

const isNecklace = (b: Accessory): b is Necklace => {
    return (b as Necklace).kind !== undefined
}
const Necklace: Accessory = {kind: "Choker", brand: "TASAKI"};
const bracelet: Accessory = {brand: "Cartier", year: 2021};
console.log(isNecklace(bracelet)) //Logs false
console.log(isNecklace(Necklace)) //Logs true
// In the code above, the type predicate b is Necklace will make TypeScript reduce the type to Necklace instead of returning just a boolean value.

