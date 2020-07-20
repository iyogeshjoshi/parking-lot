const Car = require('./Car')

class ParkingLot {
  constructor(N) {
    this.MAX_SLOTS = 0
    this.slots = new Array()
    this.parked = new Map()
    this.log = []

    if (N) {
      this.createParkingLot(N)
    }
  }
}

/**
 * creates new parking lot
 * @param {int} N no. of parking lots to be created
 */
ParkingLot.prototype.createParkingLot = function(N) {
  this.MAX_SLOTS = parseInt(N)

  if (this.MAX_SLOTS <= 0) {
    throw new Error('Parking lot needs to have atleast one parking lot')
  }

  for (let i = 1; i <= this.MAX_SLOTS; i++) {
    this.slots.push(i)
  }

  console.log(`parking lot created with ${this.MAX_SLOTS} slots`)
  return
}

ParkingLot.prototype.park = function(registration, color) {
  console.log(registration, color)
  if (!registration || !color) {
    throw new Error('Please provide registration number and color to park')
  }

  if (this.slots.length > 0) {
    let car = new Car(registration, color)

    car.setSlot(this.slots.shift())
    this.parked.set(car.getSlot(), car)

    console.log(`Slot - ${car.getSlot()} allocated to car ${car.getRegistration()}`)
  } else {
    throw new Error('Sorry, parking Lot is full')
  }

  return
}

ParkingLot.prototype.leave = function (N) {
  if (this.slots.includes(N)) {
    throw new Error('Slot is already available')
  }

  if (this.parked.has(N)) {
    this.parked.delete(N)
    this.slots.push(N)
    this.slots = this.slots.sort()

    console.log(`Slot ${N} is now available`)
  }

  return
}

ParkingLot.prototype.getCarsByColor = function (color) {
  let cars = []

  for (let [slot, car] of this.parked) {
    if (car.getColor() == color) {
      cars.push(car.getRegistration())
    }
  }

  if(cars.length > 0) {
    return cars.join(', ')
  }

  throw new Error('No car found with that color')
}

ParkingLot.prototype.parkingSlotByColor = function(color) {
  let slots = []

  for(let [slot, car] of this.parked) {
    if (car.getColor() == color) {
      slots.push(slot)
    }
  }
  if (slots.length > 0) {
    return slots
  }
  throw new Error('No car found with that color')
}

ParkingLot.prototype.parkingSlotByRegistration = function(registration) {
  for(let [slot, car] of this.parked) {
    if (car.getRegistration() === registration) {
      return slot
    }
  }

  throw new Error('No car found with that registration number')
}

ParkingLot.prototype.availableSlots = function() {
  return this.slots.join(', ')
}

ParkingLot.prototype.createLog = function(car, action) {
  let logEntry = `${car.getRegistration()} - ${action}`

  this.log.push(logEntry)

  return
}

ParkingLot.prototype.getLogs = function() {
  return this.log.join(', \n')
}

module.exports = ParkingLot