import {
  addTodoItem,
  addTodoProject,
  getTodoItem,
  deleteTodoItem,
} from './todoHandler';
import { createItemCard, createNavItem, createProjectOption } from './todoUI';
import { format } from 'date-fns';

// Add todo item

function handleClickNewItem() {
  const form = document.querySelector('#new-item-form');
  const dialog = document.querySelector('#new-item-dialog');
  const overlay = document.querySelector('.overlay');

  form.reset();
  dialog.toggleAttribute('open');
  overlay.classList.toggle('hidden');
}
const newItemButton = document.querySelector('#new-item-btn');
newItemButton.addEventListener('click', handleClickNewItem);

function handleClickAddItem() {
  const title = document.querySelector('input[name=title]').value;
  const description = document.querySelector('input[name=description]').value;
  const dueDate = document.querySelector('input[name=due-date]').value;
  const priority = document.querySelector('select[name=priority]').value;
  const project = document.querySelector('select[name=project]').value;

  if (title) {
    const id = crypto.randomUUID();
    const overlay = document.querySelector('.overlay');

    addTodoItem(title, description, dueDate, project, priority, false, id);
    createItemCard(title, description, dueDate, project, priority, false, id);
    overlay.classList.toggle('hidden');
  }
}
const addItemButton = document.querySelector('#add-item-btn');
addItemButton.addEventListener('click', handleClickAddItem);

// Add project

function handleClickNewProject() {
  const form = document.querySelector('#new-project-form');
  const dialog = document.querySelector('#new-project-dialog');
  const overlay = document.querySelector('.overlay');

  form.reset();
  dialog.toggleAttribute('open');
  overlay.classList.toggle('hidden');
}
const newProjectButton = document.querySelector('#new-project-btn');
newProjectButton.addEventListener('click', handleClickNewProject);

function handleClickAddProject() {
  const name = document.querySelector('input[name=project-name]').value;

  if (name) {
    const overlay = document.querySelector('.overlay');

    addTodoProject(name);
    createNavItem(name);
    createProjectOption(name);
    overlay.classList.toggle('hidden');
  }
}
const addProjectButton = document.querySelector('#add-project-btn');
addProjectButton.addEventListener('click', handleClickAddProject);

// Toggle is done

export function handleClickIsDone(e) {
  const isDoneButton = e.target;
  const card = e.target.parentElement;
  const cardID = card.getAttribute('data-id');
  const cardProject = card.getAttribute('data-project');
  const todoItem = getTodoItem(cardProject, cardID);

  todoItem.toggleIsDone();
  isDoneButton.setAttribute('data-is-done', todoItem.isDone);
}

// Change priority

export function handleClickPriority(e) {
  const priorityButton = e.target;
  const card = e.target.parentElement;
  const cardID = card.getAttribute('data-id');
  const cardProject = card.getAttribute('data-project');
  const todoItem = getTodoItem(cardProject, cardID);

  todoItem.changePriority();
  priorityButton.textContent = todoItem.priority;
  priorityButton.setAttribute('data-priority', todoItem.priority);
}

// Change project view

export function handleClickProjectView(e) {
  const projectViewName = e.target.textContent;
  const heading = document.querySelector('h1');
  const cards = document.querySelectorAll('article');

  heading.textContent = projectViewName;

  for (let i = 0; i < cards.length; i++) {
    const cardProjectName = cards[i].getAttribute('data-project');
    if (
      projectViewName.toLowerCase() === cardProjectName ||
      projectViewName.toLowerCase() === 'all'
    ) {
      cards[i].classList.remove('hidden');
    } else {
      cards[i].classList.add('hidden');
    }
  }
}
const projectViews = document.querySelectorAll('.project-view');
projectViews.forEach((view) => {
  view.addEventListener('click', handleClickProjectView);
});

// Toggle todo item accordion

export function handleClickItemTitle(e) {
  const card = e.target.parentElement;
  const dueDate = card.querySelector('.due-date');
  const description = card.querySelector('.description');
  const project = card.querySelector('.project');
  const editButton = card.querySelector('.edit-btn');
  const deleteButton = card.querySelector('.delete-btn');

  e.target.classList.toggle('open');

  if (dueDate.textContent) {
    dueDate.classList.remove('hidden');
  } else {
    dueDate.classList.add('hidden');
  }

  if (description.textContent) {
    description.classList.toggle('hidden');
  }

  project.classList.toggle('hidden');
  editButton.classList.toggle('hidden');
  deleteButton.classList.toggle('hidden');
}
const itemTitles = document.querySelectorAll('.title');
itemTitles.forEach((title) => {
  view.addEventListener('click', handleClickItemTitle);
});

// Close dialog

function handleClickCancel(e) {
  e.preventDefault();

  const dialog = e.target.closest('dialog');
  const overlay = document.querySelector('.overlay');

  dialog.toggleAttribute('open');
  overlay.classList.toggle('hidden');
}
const cancelButtons = document.querySelectorAll('.cancel-btn');
cancelButtons.forEach((btn) =>
  btn.addEventListener('click', handleClickCancel)
);

// Edit todo item

export function handleClickEdit(e) {
  const dialog = document.querySelector('#edit-item-dialog');
  const overlay = document.querySelector('.overlay');

  const editTitle = document.querySelector('#edit-title');
  const editDescription = document.querySelector('#edit-description');
  const editDueDate = document.querySelector('#edit-due-date');
  const editPriority = document.querySelector('#edit-priority');
  const editProjectSelect = document.querySelector('#edit-project-select');
  const itemID = document.querySelector('#itemID');
  const itemProject = document.querySelector('#itemProject');

  const card = e.target.parentElement;
  const cardID = card.getAttribute('data-id');
  const cardProject = card.getAttribute('data-project');
  const todoItem = getTodoItem(cardProject, cardID);

  dialog.toggleAttribute('open');
  overlay.classList.toggle('hidden');

  editTitle.value = todoItem.title;
  editDescription.value = todoItem.description;
  editPriority.value = todoItem.priority;
  editProjectSelect.value = todoItem.project;
  itemID.value = todoItem.id;
  itemProject.value = todoItem.project;

  if (todoItem.dueDate) {
    editDueDate.value = format(todoItem.dueDate, 'yyyy-MM-dd');
  } else {
    editDueDate.value = '';
  }
}
const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach((btn) => btn.addEventListener('click', handleClickEdit));

function handleClickEditItem() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.toggle('hidden');

  const editTitle = document.querySelector('#edit-title').value;
  const editDescription = document.querySelector('#edit-description').value;
  const editDueDate = document.querySelector('#edit-due-date').value;
  const editPriority = document.querySelector('#edit-priority').value;
  const editProjectSelect = document.querySelector(
    '#edit-project-select'
  ).value;
  const itemID = document.querySelector('#itemID').value;
  const itemProject = document.querySelector('#itemProject').value;

  const todoItem = getTodoItem(itemProject, itemID);
  todoItem.title = editTitle;
  todoItem.description = editDescription;
  todoItem.dueDate = editDueDate;
  todoItem.priority = editPriority;
  todoItem.project = editProjectSelect;

  const card = document.querySelector(`article[data-id='${todoItem.id}']`);
  const cardTitle = card.querySelector('.title');
  const cardDueDate = card.querySelector('.due-date');
  const cardDescription = card.querySelector('.description');
  const cardProject = card.querySelector('.project');
  const cardPriority = card.querySelector('.priority-btn');

  cardTitle.textContent = todoItem.title;
  cardProject.textContent = todoItem.project;
  cardPriority.textContent = todoItem.priority;
  cardPriority.setAttribute('data-priority', todoItem.priority);

  if (todoItem.dueDate) {
    cardDueDate.textContent = format(todoItem.dueDate, 'dd MMM yyyy');
    cardDueDate.classList.remove('hidden');
  }

  if (todoItem.description) {
    cardDescription.textContent = todoItem.description;
    cardDescription.classList.remove('hidden');
  }
}
const editItemButton = document.querySelector('#edit-item-btn');
editItemButton.addEventListener('click', handleClickEditItem);

// Delete todo item

export function handleClickDelete(e) {
  const card = e.target.parentElement;
  const cardID = card.getAttribute('data-id');
  const cardProject = card.getAttribute('data-project');
  deleteTodoItem(cardProject, cardID);
  card.remove();
}
