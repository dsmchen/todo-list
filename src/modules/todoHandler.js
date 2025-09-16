export let todoProjects = [];

class TodoProject {
  constructor(name, todoItems = [], id = crypto.randomUUID()) {
    this.name = name;
    this.todoItems = todoItems;
    this.id = id;
  }
}

function addTodoProject(name) {
  let todoProject = new TodoProject(name);
  todoProjects.push(todoProject);
}

addTodoProject('Personal');
addTodoProject('Work');

class TodoItem {
  constructor(
    title,
    description,
    dueDate,
    project,
    priority = 4,
    isDone = false,
    id = crypto.randomUUID()
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
    this.isDone = isDone;
    this.id = id;
  }

  changePriority(prio) {
    this.priority = prio;
  }

  toggleIsDone() {
    this.isDone = !this.isDone;
  }
}

export function addTodoItem(title, description, dueDate, project, priority) {
  let todoItem = new TodoItem(title, description, dueDate, project, priority);
  for (const proj of todoProjects) {
    if (proj.name === project) {
      proj.todoItems.push(todoItem);
      break;
    }
  }
}

addTodoItem('Do 30 minutes of yoga', 'YouTube', 'Today', 'Personal');
addTodoItem('Dentist appointment', 'Address', 'Tomorrow', 'Personal', 2);
addTodoItem(
  'Prepare presentation',
  'Keep the talk and slides simple',
  'Tomorrow',
  'Work',
  1
);
