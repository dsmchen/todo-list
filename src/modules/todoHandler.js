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
  description = '',
  dueDate = '',
  project = 'Personal',
  priority = 4,
  isDone = false,
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
  '2025-09-30',
  'Personal'
);
addTodoItem(
  'Dentist appointment',
  '8/F, Lucky Tower, 88 Main Street, Central',
  '2025-09-30',
  'Personal',
  2
);
addTodoItem(
  'Prepare presentation',
  'Keep the talk and slides simple',
  '2025-10-01',
  'Work',
  1
);
addTodoItem('Call Eddie', 'Discuss team selection', '2025-10-01', 'Work', 3);
addTodoItem('Call Charli', 'Discuss forwards', '2025-10-01', 'Work');
addTodoItem('Todo item 1');
addTodoItem('Todo item 2');

export function getTodoItem(itemProject, itemID) {
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject
  );
  const todoItem = todoProject.todoItems.find(
    (element) => element.id === itemID
  );
  return todoItem;
}
