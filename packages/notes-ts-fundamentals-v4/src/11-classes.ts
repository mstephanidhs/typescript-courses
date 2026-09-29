//* Classes

//? Field types
class Car {
  // variable with the static keyword is a class variable, not an instance variable
  // static nextSerialNumber: number
  // this keyword in the static context refers to the class itself, not an instance of the class
  // this is a static method, which is a method that belongs to the class itself, not an instance of the class
  // it can be called on the class directly, without creating an instance
  // for example: Car.generateSerialNumber()
  // static generateSerialNumber() { return this.nextSerialNumber++ }
  // this code runs after the class is defined, but before any instances are created
  // and not before every time a new instance is created, which is what happens in the constructor
  static {
    // `this` is the static scope
    fetch("https://api.example.com/vin_number_data")
      .then(response => response.json())
      .then(data => {
        this.nextSerialNumber = data.mostRecentInvoiceId + 1;
      })
  }
  private static nextSerialNumber: number
  private static generateSerialNumber() { return this.nextSerialNumber++ }
  make: string
  model: string
  year: number
  // this is a class field initializer, which is a shorthand for defining a constructor that initializes the field
  // serialNumber = Car.generateSerialNumber()
  // private fields are only accessible within the class they are defined in, and not in subclasses or instances
  private _serialNumber = Car.generateSerialNumber()
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`;
  }

  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }

  // it's that all instances of CAR can see private data on all other instances
  equals(other: unknown) {
    if (other &&
      typeof other === 'object' &&
      #serialNumber in other) {
      other
      //       ^?
      return other.#serialNumber = this.#serialNumber
    }
    return false
  }

  // protected methods are only accessible within the class they are defined in, and in subclasses, but not in instances
  protected get serialNumber() {
    return this._serialNumber
  }
}

let sedan = new Car('Honda', 'Accord', 2017)
sedan.activateTurnSignal("left") //! not safe!
new Car(2017, "Honda", "Accord") //! not safe!


//? method types
const c = new Car("Honda", "Accord", 2017);
c.honk(5); // "hooooonk"


//? static member fields
console.log(new Car("Honda", "Accord", 2017))
// // > "Honda Accord 2017 - #100
console.log(new Car("Toyota", "Camry", 2022))
// // > "Toyota Camry 2022 - #101


//? static blocks
// serialNumber = Car.generateSerialNumber()

//* Access modifier keywords

//? on member fields
// const s = new Sedan("Nissan", "Altima", 2020)
// s.serialNumber


//? on static fields
Car.generateSerialNumber()

//* JS private #fields

//? member fields
// JS private fields are only accessible within the class they are defined in, and not in subclasses or instances
// It's the equivalent of a private field in typescript, but with a different syntax.
// c.#serialNumber


//? static fields
// static #nextSerialNumber: number
// static #generateSerialNumber() { return this.#nextSerialNumber++ }
// #serialNumber = Car.#generateSerialNumber()

//* Private field presence checks
// const c2 = c1
// c2.equals(c1)

//* readonly
// it's set when it's initialized, and can't be changed after that
// readonly #serialNumber = Car.#generateSerialNumber()
// changeSerialNumber(num: number) {
//     this.#serialNumber = num
// }

//* Parameter properties

// constructor(
//     public make: string,
//     public model: string,
//     public year: number
//   ) {}

class Base { }

class Car2 extends Base {
  foo = console.log("class field initializer")
  // TS Parameter Property shorthand: automatically declares the field and assigns `this.make = make`
  constructor(public make: string, public model: string, public year: number) {
    // executes the contrsuctor of the base class, which is required before 
    // accessing `this` in the derived class
    super()
    console.log("custom constructor stuff")
  }
}

//* Overrides

class Truck extends Car {
  // Override is it is you expressing the intent,that this should override a base class
  // method andthus a base class method must exist of the same name.
    override honk() { // OOPS!
        console.log("BEEP")
    }
}

const t = new Truck("Ford", "F-150", 2020);
t.honk(); // "beep"

//? override keyword
// override hoonk() { // OOPS!

//? noImplicitOverride
// "noImplicitOverride": true

/**/
export default {}
