//* Nominal vs Structural
// Nominal: it's all about names, so we can't assign a Truck to a Car variable (even if it has the same properties/structure)
// Structural: it's all about structure, so we can assign a Truck to a Car variable (even if it has a different name) since it has the same properties/structure
class Car {
  make: string
  model: string
  year: number
  isElectric: boolean
}

class Truck {
  make: string
  model: string
  year: number
  towingCapacity: number
}

const vehicle = {
  make: 'Honda',
  model: 'Accord',
  year: 2017,
}

function printCar(car: {
  make: string
  model: string
  year: number
}) {
  console.log(`${car.make} ${car.model} (${car.year})`)
}

printCar(new Car()) //✔️ Fine
printCar(new Truck()) //✔️ Fine
printCar(vehicle) //✔️ Fine

export default {}
