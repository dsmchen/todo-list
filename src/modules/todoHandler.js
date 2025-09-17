export let todoProjects = [];

class TodoProject {
  constructor(name, todoItems = [], id = crypto.randomUUID()) {
    this.name = name;
    this.todoItems = todoItems;
    this.id = id;
  }
}

export function addTodoProject(name) {
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

  changePriority() {
    if (this.priority < 4) {
      this.priority++;
    } else {
      this.priority = 1;
    }
  }

  toggleIsDone() {
    this.isDone = !this.isDone;
  }
}

export function addTodoItem(
  title,
  description,
  dueDate,
  project,
  priority,
  isDone,
  id
) {
  let todoItem = new TodoItem(
    title,
    description,
    dueDate,
    project,
    priority,
    isDone,
    id
  );
  for (const proj of todoProjects) {
    if (proj.name === project) {
      proj.todoItems.push(todoItem);
      break;
    }
  }
}

addTodoItem(
  'Yoga class',
  'Remember to bring yoga mat and towel',
  'Today',
  'Personal'
);
addTodoItem(
  'Dentist appointment',
  '8/F, Lucky Tower, 88 Main Street, Central',
  'Tomorrow',
  'Personal',
  2
);
addTodoItem(
  'Prepare presentation',
  'Keep the talk and slides simple',
  'Tomorrow',
  'Work',
  1
);
addTodoItem('Call Eddie', 'Discuss team selection', 'Tomorrow', 'Work', 3);
addTodoItem('Call Charli', 'Discuss forwards', 'Tomorrow', 'Work');
