class ProjectInput {
    templateFormEl: HTMLTemplateElement
    appContainer: HTMLDivElement
    formElement: HTMLFormElement
    titleInput: HTMLInputElement
    descriptionTextArea: HTMLTextAreaElement
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

    private submitHandler(event: Event) {
        event.preventDefault()
        console.log(this.titleInput.value);
        
    }

    private attach() {
        console.log(this.formElement);
        this.appContainer.insertAdjacentElement('afterbegin', this.formElement)
    }
}

const pInput = new ProjectInput()