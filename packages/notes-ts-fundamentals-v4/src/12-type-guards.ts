//* Built-in type guards
let value:
  | Date
  | null
  | undefined
  | 'pineapple'
  | [number]
  | { dateRange: [Date, Date] }

// instanceof
if (value instanceof Date) {
  value
  // ^?
}
// typeof
else if (typeof value === 'string') {
  value
  // ^?
}
// Specific value check
else if (value === null) {
  value
  // ^?
}
// Truthy/falsy check
else if (!value) {
  value
  // ^?
}
// Some built-in functions
else if (Array.isArray(value)) {
  value
  // ^?
}
// Property presence check
else if ('dateRange' in value) {
  value
  // ^?
} else {
  value
  // ^?
}
//* User-defined type guards

interface CarLike {
    make: string
    model: string
    year: number
}

let maybeCar: any

// the guard
if (
    maybeCar &&
    typeof maybeCar === "object" &&
    "make" in maybeCar &&
    typeof maybeCar["make"] === "string" &&
    "model" in maybeCar &&
    typeof maybeCar["model"] === "string" &&
    "year" in maybeCar &&
    typeof maybeCar["year"] === "number"
) {
    maybeCar
    // ^?
}

// the guard
// is: what the boolean means
// if it's true then the value is a CarLike
// otherwise it is not
function isCarLike(valueToTest: any): valueToTest is CarLike {
    return (
        valueToTest &&
        typeof valueToTest === "object" &&
        "make" in valueToTest &&
        typeof valueToTest["make"] === "string" &&
        "model" in valueToTest &&
        typeof valueToTest["model"] === "string" &&
        "year" in valueToTest &&
        typeof valueToTest["year"] === "number"
    )
}

// using the guard
if (isCarLike(maybeCar)) {
    maybeCar
    // ^?
}

//* value is foo

// function isCarLike(valueToTest: any): valueToTest is CarLike {

//* asserts value is foo
// asserts keyword is used to tell TypeScript that if the function
//  returns without throwing an error, then the value is of the 
// specified type. This is useful for functions that perform runtime
//  checks and throw errors if the checks fail.
function assertsIsCarLike(
    valueToTest: any
): asserts valueToTest is CarLike {
    if (
        !(
            valueToTest &&
            typeof valueToTest === "object" &&
            "make" in valueToTest &&
            typeof valueToTest["make"] === "string" &&
            "model" in valueToTest &&
            typeof valueToTest["model"] === "string" &&
            "year" in valueToTest &&
            typeof valueToTest["year"] === "number"
        )
    )
        throw new Error(
            `Value does not appear to be a CarLike${valueToTest}`
        )
}
assertsIsCarLike(maybeCar)
maybeCar

//* Use with private #field presence checks


class Car {
    static #nextSerialNumber: number = 100
    static #generateSerialNumber() { return this.#nextSerialNumber++ }

    #serialNumber = Car.#generateSerialNumber()

    static isCar(other: any): other is Car {
        if (other && // is it truthy
            typeof other === "object" && // and an object
            #serialNumber in other) { // and we can find a private field that we can access from here
            // then it *must* be a car
            other
            // ^?
            return true
        }
        return false
    }
}

let val: any

if (Car.isCar(val)) {
    val
    // ^?
}

//* Narrowing with switch(true)

class Fish {
    swim(): void { }
}
class Bird {
    fly(): void { }
}

// each case clause is compared to true
switch (true) {
    case val instanceof Bird:
        val.fly()
        break
    case val instanceof Fish:
        val.swim()
        break
}

//* Writing high-quality type guards

//! EXAMPLE OF A BAD TYPE GUARD
function isNull(val: any): val is null {
    return !val //! Lies!
}
const empty = ""
const zero = 0
if (isNull(zero)) {
    console.log(zero) //? is it really impossible to get here?
}
if (isNull(empty)) {
    console.log(empty) //? is it really impossible to get here?
}

/**/
export default {}
