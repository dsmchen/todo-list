import { storageAvailable } from './storageHandler';

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

  if (storageAvailable('localStorage')) {
    localStorage.setItem('todoProjects', JSON.stringify(todoProjects));
  } else {
    throw Error('Storage unavailable.');
  }

  const currentTodoProjects = localStorage.getItem('todoProjects');
  console.log('currentTodoProjects', JSON.parse(currentTodoProjects));
}

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

export function getTodoItem(itemProject, itemID) {
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject.toLowerCase()
  );
  const todoItem = todoProject.todoItems.find(
    (element) => element.id === itemID
  );
  return todoItem;
}

export function deleteTodoItem(itemProject, itemID) {
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject.toLowerCase()
  );
  todoProject.todoItems = todoProject.todoItems.filter(
    (element) => element.id !== itemID
  );
}

addTodoProject('Personal');
addTodoProject('Work');

addTodoItem(
  'Yoga class',
  'Remember to bring yoga mat and towel',
  new Date(),
  'Personal'
);
addTodoItem(
  'Dentist appointment',
  '8/F, Lucky Tower, 88 Main Street, Central',
  new Date(2025, 9, 30),
  'Personal',
  2
);
addTodoItem(
  'Prepare presentation',
  'Keep the talk and slides simple',
  new Date(2025, 9, 30),
  'Work',
  1
);
addTodoItem(
  'Call Eddie',
  'Discuss team selection',
  new Date(2025, 10, 1),
  'Work',
  3
);
addTodoItem('Call Charli', 'Discuss forwards', new Date(2025, 10, 1), 'Work');
addTodoItem('Todo item 1');
addTodoItem('Todo item 2');
