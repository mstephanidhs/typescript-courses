//* Callables
// A call signature defines the type of a function by specifying 
// its parameter types and return type, using parentheses instead 
// of square brackets, and omitting the function name and the 
// 'function' keyword.

interface TwoNumberCalculation {
  (x: number, y: number): number
}

type TwoNumberCalc = (x: number, y: number) => number

const add: TwoNumberCalculation = (a, b) => a + b
const subtract: TwoNumberCalc = (x, y) => x - y

//* `void`
// The `void` type is used to indicate that a function does not return 
// a value. It is often used for functions that perform side effects, 
// such as logging or modifying state, rather than producing a result.
// functions return undefined by default, so you can use `void` to 
// indicate that a function does not return a value.
function printFormattedJSON(obj: string[]) {
  console.log(JSON.stringify(obj, null, "  "))
}

const x = printFormattedJSON(["hello", "world"])


function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000)
}
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000)
}

// Here void means that the function shoud not return a value
// Only undefined can be returned from a function with a void 
// return type, but it is not required to return undefined. 
// A function with a void return type can also return nothing at all.
function foo(): void {
  return undefined
}

const values: number[] = []
// push method returns the new length of the array, which is a number.
invokeInFourSeconds(() => values.push(4)) //! Error: Type 'undefined' is not assignable to type 'number'.
// void means practically I don't care about the return value, so I can use it to ignore the return value of the push method.
invokeInFiveSeconds(() => values.push(4))

//* Constructables

interface DateConstructor {
  new(value: number): Date
}

let MyDateConstructor: DateConstructor = Date
const d = new MyDateConstructor(1697923072611)

//* Function overloads

// FormData is a built-in type in TypeScript that represents the 
// data submitted by a form. It provides methods for appending 
// and retrieving form data, as well as for iterating over the data.
type FormSubmitHandler = (data: FormData) => void
// MessageEvent is a built-in type in TypeScript that represents 
// an event that is sent to a window or worker when a message is 
// received. It contains information about the message, such as 
// the data being sent and the origin of the message.
type MessageHandler = (evt: MessageEvent) => void

// these are called function overloads, which allow you to 
// define multiple function signatures for a single function 
// implementation. The TypeScript compiler will use the 
// appropriate signature based on the arguments passed to the function.
function handleMainEvent(
  elem: HTMLFormElement,
  handler: FormSubmitHandler
): void
function handleMainEvent(
  elem: HTMLIFrameElement,
  handler: MessageHandler
): void

// HTMLFormElement and HTMLIFrameElement are built-in types in 
// TypeScript that represent HTML form and iframe elements, respectively. They provide properties and methods for interacting with these elements in a type-safe manner.
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler
) { }

const myFrame = document.getElementsByTagName("iframe")[0]
handleMainEvent(myFrame, (val) => {
})

// //? Form handler has a specific type now!
const myForm = document.getElementsByTagName("form")[0]
handleMainEvent(myForm, (val) => {
})

//* `this` types

function myClickHandler(this: HTMLButtonElement, event: Event) {
  this.disabled = true
}
myClickHandler(new Event("click")) // maybe ok?


const myButton = document.getElementsByTagName("button")[0]
// bind method returns a new function with the `this` value set 
// to the provided value, in this case, `myButton`. This allows 
// you to call the function with the correct `this` context.
const boundHandler = myClickHandler.bind(myButton)
boundHandler(new Event("click")) // bound version: ok
// call method allows you to call a function with a specific 
// `this` value and arguments. In this case, it calls `myClickHandler` 
// with `myButton` as the `this` value and a new `Event("click")` 
// as the argument.
myClickHandler.call(myButton, new Event("click")) // also ok

//* Function best practices

//? Explicit function return types
type JSONPrimitive = string | number | boolean | null
type JSONObject = { [k: string]: JSONValue }
type JSONArray = JSONValue[]
type JSONValue = JSONArray | JSONObject | JSONPrimitive

export async function getData(url: string): Promise<{ properties: string[] }> {
  const resp = await fetch(url)
  const data = (await resp.json()) as {
    properties: string[]
  }
  return data
}

function loadData() {
  getData("https://example.com").then((result) => {
    console.log(result.properties.join(", "))
    //           ^?
  })
}

export default {}
