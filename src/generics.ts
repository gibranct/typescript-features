
function merge<T extends object, U extends object>(a: T, b: U) {
    return Object.assign(a, b)
}

const mergedObj = merge({ name: 'Gibran' }, { age: 30 })

console.log(mergedObj.name)

interface Lenghty {
    length: number
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element'
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`
    }
    return [element, descriptionText]
}

console.log(countAndDescribe('Gibran'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key]
}

extractAndConvert({ name: 'Gibran' }, 'name')

class DataStorage<T extends string | number | boolean> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        const index = this.data.indexOf(item)
        if (index === -1) return
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItem() {
        return [...this.data]
    }
}

const ds = new DataStorage<string>()

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourse(title: string, description: string, date: Date): CourseGoal {
    const courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date
    return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Gibran', 'Tavares']
