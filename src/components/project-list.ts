import { Component } from './base-component'
import { Project } from '../models/project'
import { DragTarget } from '../models/drag-drop'
import { autobind } from '../decorators/autobind'
import { projectState } from '../state/project'
import { ProjectStatus } from '../models/project'
import { ProjectItem } from './project-item'

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer?.types[0] !== 'text/plain') return
    event.preventDefault()
    event.dataTransfer!.dropEffect = 'move'
    const unList = this.element.querySelector('ul')
    unList?.classList.add('droppable')
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const prodjectId = event.dataTransfer?.getData('text/plain')
    if (prodjectId) {
      projectState.moveProject(prodjectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }
  }

  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const unList = this.element.querySelector('ul')
    unList?.classList.remove('droppable')
    console.log('leave');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('drop', this.dropHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }
}