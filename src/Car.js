class Car {
  constructor(registration, color) {
    if (!registration || !color) {
      throw new Error('Please provide registration and color to create new car')
    }

    this.registration = registration
    this.color = color
    this.slot = null
  }
}

Car.prototype.setSlot = function(N) {
  this.slot = parseInt(N)
}

Car.prototype.getSlot = function() {
  return this.slot
}

Car.prototype.leaveSlot = function() {
  this.slot = null
}

Car.prototype.setColor = function(color) {
  this.color = color
}

Car.prototype.getColor = function() {
  return this.color
}

Car.prototype.setRegistration = function(registration) {
  this.registration = registration
}

Car.prototype.getRegistration = function() {
  return this.registration
}

module.exports = Car