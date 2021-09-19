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

class ProjectList {
    templateFormEl: HTMLTemplateElement
    appContainer: HTMLElement
    sectionElement: HTMLElement

    constructor(private type: 'active' | 'finished') {
        this.templateFormEl = document.getElementById('project-list')! as HTMLTemplateElement
        this.appContainer = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(this.templateFormEl.content, true)
        this.sectionElement = importedNode.firstElementChild as HTMLElement
        this.sectionElement.id = `${this.type}-projects`

        this.renderContent()
        this.attach()
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`
        this.sectionElement.querySelector('ul')!.id = listId
        this.sectionElement.querySelector('h2')!.textContent = `${this.type} PROJECTS`.toUpperCase()
    }

    private attach() {
        this.appContainer.insertAdjacentElement('beforeend', this.sectionElement)
    }
}

class ProjectInput {
    templateFormEl: HTMLTemplateElement
    appContainer: HTMLDivElement
    formElement: HTMLFormElement

    @Required
    titleInput: HTMLInputElement

    @Required
    descriptionTextArea: HTMLTextAreaElement

    @Required
    numberInput: HTMLInputElement


    constructor() {
        this.templateFormEl = document.getElementById('project-input')! as HTMLTemplateElement
        this.appContainer = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(this.templateFormEl.content, true)
        this.formElement = importedNode.firstElementChild as HTMLFormElement 
        this.formElement.id = 'user-input'

        this.titleInput = this.formElement.querySelector('#title')!
        this.descriptionTextArea = this.formElement.querySelector('#description')!
        this.numberInput = this.formElement.querySelector('#people')!


        this.configure()
        this.attach()
    }

    private configure() {
        this.formElement.addEventListener('submit', this.submitHandler)
    }

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
        this.formElement.reset()
    }

    private attach() {
        console.log(this.formElement);
        this.appContainer.insertAdjacentElement('afterbegin', this.formElement)
    }
}

const pInput = new ProjectInput()
const activeProList = new ProjectList('active')
const finishedProList = new ProjectList('finished')