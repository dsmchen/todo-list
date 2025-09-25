import { storageAvailable } from './storageHandler';
import { toggleCtaButtons } from './todoUI';

if (storageAvailable('localStorage')) {
  if (!localStorage.getItem('todoProjects')) {
    localStorage.setItem('todoProjects', '[]');
  }
} else {
  throw new Error('Storage unavailable.');
}

class TodoProject {
  constructor(name, todoItems = [], id = crypto.randomUUID()) {
    this.name = name;
    this.todoItems = todoItems;
    this.id = id;
  }
}

export function addTodoProject(name) {
  const todoProjects = JSON.parse(localStorage.getItem('todoProjects'));
  if (todoProjects.length === 0) {
    toggleCtaButtons();
  }
  const todoProject = new TodoProject(name);
  todoProjects.push(todoProject);
  localStorage.setItem('todoProjects', JSON.stringify(todoProjects));
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
  const todoProjects = JSON.parse(localStorage.getItem('todoProjects'));
  const todoItem = new TodoItem(
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
  localStorage.setItem('todoProjects', JSON.stringify(todoProjects));
}

export function getTodoItem(itemProject, itemID) {
  const todoProjects = JSON.parse(localStorage.getItem('todoProjects'));
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject.toLowerCase()
  );
  const todoItem = todoProject.todoItems.find(
    (element) => element.id === itemID
  );
  return todoItem;
}

export function toggleTodoItemIsDone(itemProject, itemID) {
  const todoProjects = JSON.parse(localStorage.getItem('todoProjects'));
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject.toLowerCase()
  );
  const todoItem = todoProject.todoItems.find(
    (element) => element.id === itemID
  );

  todoItem.isDone = !todoItem.isDone;
  localStorage.setItem('todoProjects', JSON.stringify(todoProjects));

  return todoItem;
}

export function changeTodoItemPriority(itemProject, itemID) {
  const todoProjects = JSON.parse(localStorage.getItem('todoProjects'));
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject.toLowerCase()
  );
  const todoItem = todoProject.todoItems.find(
    (element) => element.id === itemID
  );

  if (todoItem.priority < 4) {
    todoItem.priority++;
  } else {
    todoItem.priority = 1;
  }
  localStorage.setItem('todoProjects', JSON.stringify(todoProjects));

  return todoItem;
}

export function editTodoItem(
  itemProject,
  itemID,
  title,
  desc,
  dueDate,
  prio,
  proj
) {
  const todoProjects = JSON.parse(localStorage.getItem('todoProjects'));
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject.toLowerCase()
  );
  const todoItem = todoProject.todoItems.find(
    (element) => element.id === itemID
  );

  todoItem.title = title;
  todoItem.description = desc;
  todoItem.dueDate = dueDate;
  todoItem.priority = prio;
  todoItem.project = proj;

  if (itemProject.toLowerCase() !== proj.toLowerCase()) {
    // Remove todo item from old project
    todoProject.todoItems = todoProject.todoItems.filter(
      (element) => element.id !== itemID
    );

    // Add todo item to new project
    const newTodoProject = todoProjects.find(
      (element) => element.name.toLowerCase() === proj.toLowerCase()
    );
    newTodoProject.todoItems.push(todoItem);
  }

  localStorage.setItem('todoProjects', JSON.stringify(todoProjects));

  return todoItem;
}

export function deleteTodoItem(itemProject, itemID) {
  const todoProjects = JSON.parse(localStorage.getItem('todoProjects'));
  const todoProject = todoProjects.find(
    (element) => element.name.toLowerCase() === itemProject.toLowerCase()
  );
  todoProject.todoItems = todoProject.todoItems.filter(
    (element) => element.id !== itemID
  );
  localStorage.setItem('todoProjects', JSON.stringify(todoProjects));
}
