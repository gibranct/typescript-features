type Admin = {
    name: string
    privileges: string[]
}

type Employee = {
    name: string
    startDate: Date
}

type ElevatedEmplyee = Admin & Employee

const e1: ElevatedEmplyee = {
    name: 'Gibran',
    startDate: new Date(),
    privileges: []
}

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric

const a: Universal = 1

function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b
}

const r = add('Gibran', ' Tavares')
r.split(' ')