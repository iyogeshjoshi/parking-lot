const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')
const ParkingLot = require('./src/ParkingLot')

// to avoid memory leaks errors, default max listeners = 10
require('events').EventEmitter.defaultMaxListeners = 0

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	// terminal: false
})

// list of available commands
const commands = [
	'create_parking_lot',
	'park',
	'leave',
	'get_registrations_by_color',
	'get_slots_by_color',
	'get_slot_by_registration',
	'get_available_slots',
	'exit'
]
let ParkingSpace = new ParkingLot(10)

rl.setPrompt('input> ')

ask()

function ask() {
	// rl.clearLine()
	console.log('here are the available commands')
	console.log(commands.join(', '))
	rl.question('What do you want to do?\n\r', input => {
		try {
			processUserInput(input.trim().toUpperCase())
		} catch (error) {
			console.log(error)
			ask()
		}
	})
}

function processUserInput(input) {
	switch (input) {
		case 'CREATE_PARKING_LOT':
			rl.question('how many slots you want?\n\r', N => {
				ParkingSpace = new ParkingLot(N)

				ask()
			})
			break
		case 'PARK':
			rl.question('please provide car registration number and color space separated\r\n', input => {
				const [registration, color] = input.split(' ')

				ParkingSpace.park(registration, color)
				ask()
			})
			break
		case 'LEAVE':
			rl.question('Which slot are you leaving?\n\r', N => {
				ParkingSpace.leave(parseInt(N))
				ask()
			})
			break
		case 'GET_REGISTRATIONS_BY_COLOR':
			rl.question('What is the color you are looking for?\n\r', color => {
				const cars = ParkingSpace.getCarsByColor(color)

				if (cars.length === 0) {
					console.log('No car(s) found')
				}

				console.log('Here are all the cars with that color');
				console.log(cars)

				ask()
			})
			break
		case 'GET_SLOTS_BY_COLOR':
			rl.question('What is the color you are looking for?\n\r', color => {
				const slots = ParkingSpace.parkingSlotByColor(color)

				if (slots.length === 0) {
					console.log('No slot(s) found')
				}

				console.log('Here are all the slot with that color car');
				console.log(slots.join('\r\n'))

				ask()
			})
			break
		case 'GET_SLOT_BY_REGISTRATION':
			rl.question('What is your registration number?\r\n', reg => {
				const slot = ParkingSpace.parkingSlotByRegistration(reg)

				slot && console.log(`${reg} is parked at slot ${slot}`)

				ask()
			})
			break
		case 'GET_AVAILABLE_SLOTS':
			console.log('here are all the available slots ', ParkingSpace.availableSlots())
			ask()
			break
		case 'EXIT':
			console.log('Thank you for using parking lot system')
			console.log('Created by Yogesh Joshi')
			process.exit(0)
			break
		default:
			console.log('Invalid selection try again')
			ask()
			break
	}
}