function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            console.log(this);
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return newDescriptor
}

interface ValidatorConfig {
    [property: string]: {
        [property: string]: string[]
    }
}

const vConfig: ValidatorConfig = {}

function Required(target: any, propName: string) {
   vConfig[target.constructor.name] = {
       ...vConfig[target.constructor.name],
       [propName]: [...(vConfig[target.constructor.name]?.[propName] ?? []), 'required']
   }
}

function validate(obj: any): boolean {
    const validators = vConfig[obj.constructor.name]
    if (!validators) return true
    let isValid = true
    for (const prop in validators) {
        for (const validator of validators[prop]) {
            switch(validator) {
                case 'required':
                    isValid = isValid && !!obj[prop].value
                    break
            }
        }
    }
    return isValid
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateFormEl: HTMLTemplateElement
    hostElement: T
    element: U

    constructor(private templateId: string, private hostId: string, private insertAtStart: boolean, private newElementId?: string) {
        this.templateFormEl = document.getElementById(this.templateId)! as HTMLTemplateElement
        this.hostElement = document.getElementById(this.hostId)! as T

        const importedNode = document.importNode(this.templateFormEl.content, true)
        this.element = importedNode.firstElementChild as U
        if (this.newElementId) {
            this.element.id = this.newElementId
        }

        this.attach(this.insertAtStart)
    }

    private attach(insertAtBeginning: boolean) {
        const position = insertAtBeginning ? 'afterbegin' : 'beforeend' 
        this.hostElement.insertAdjacentElement(position, this.element)
    }

    abstract configure(): void
    abstract renderContent(): void
}

class ProjectList extends Component<HTMLElement, HTMLElement> {

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`)

        this.renderContent()
    }

    renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = `${this.type} PROJECTS`.toUpperCase()
    }

    configure() {}
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    @Required
    titleInput: HTMLInputElement

    @Required
    descriptionTextArea: HTMLTextAreaElement

    @Required
    numberInput: HTMLInputElement


    constructor() {
        super('project-input', 'app', false, 'user-input')

        this.titleInput = this.element.querySelector('#title')!
        this.descriptionTextArea = this.element.querySelector('#description')!
        this.numberInput = this.element.querySelector('#people')!

        this.configure()
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    renderContent() {}

    private fetchUserInput(): [string, string, number] | undefined {
        const title = this.titleInput.value
        const desc = this.descriptionTextArea.value
        const people = this.numberInput.value
        if (!validate(this)) {
            alert('Invalid input, please try again!');
            return
        }
        return [title, desc, +people];
    }
    
    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.fetchUserInput()
        if (!Array.isArray(userInput)) return
        const [title, description, people] = userInput
        console.log(title, description, people);
        this.element.reset()
    }
}

const pInput = new ProjectInput()
const activeProList = new ProjectList('active')
const finishedProList = new ProjectList('finished')