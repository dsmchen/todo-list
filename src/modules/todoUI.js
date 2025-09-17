import { todoProjects, addTodoItem, addTodoProject } from './todoHandler';

export function todoUI() {
  const navList = document.querySelector('nav ul');
  const projSelect = document.querySelector('#project-select');
  const main = document.querySelector('main');
  const newItemButton = document.querySelector('#new-item-btn');
  const newItemDialog = document.querySelector('#new-item-dialog');
  const addItemButton = document.querySelector('#add-item-btn');
  const newProjectButton = document.querySelector('#new-project-btn');
  const newProjectDialog = document.querySelector('#new-project-dialog');
  const addProjectButton = document.querySelector('#add-project-btn');

  function createNavItem(name) {
    const navItem = document.createElement('li');
    navItem.textContent = name;
    navList.appendChild(navItem);
  }

  function createProjectOption(name) {
    const projOption = document.createElement('option');
    projOption.textContent = name;
    projOption.value = name;
    projSelect.appendChild(projOption);
  }

  function createItemCard(title, desc, dueDate, proj, prio, isDone, id) {
    const itemCard = document.createElement('article');
    const itemTitle = document.createElement('h2');
    const itemDescription = document.createElement('p');
    const itemDueDate = document.createElement('p');
    const itemProject = document.createElement('p');
    const itemPriority = document.createElement('p');
    const itemIsDone = document.createElement('button');

    itemCard.setAttribute('data-id', id);
    itemCard.setAttribute('data-project', proj.toLowerCase());
    itemIsDone.classList.add('is-done-btn');
    itemIsDone.addEventListener('click', handleClickIsDone);

    itemTitle.textContent = title;
    itemDescription.textContent = desc;
    itemDueDate.textContent = dueDate;
    itemProject.textContent = proj;
    itemPriority.textContent = prio;
    itemIsDone.textContent = isDone;

    itemCard.append(
      itemTitle,
      itemDescription,
      itemDueDate,
      itemProject,
      itemPriority,
      itemIsDone
    );
    main.appendChild(itemCard);
  }

  for (const proj of todoProjects) {
    createNavItem(proj.name);
    createProjectOption(proj.name);

    for (const item of proj.todoItems) {
      createItemCard(
        item.title,
        item.description,
        item.dueDate,
        item.project,
        item.priority,
        item.isDone,
        item.id
      );
    }
  }

  // Add todo item

  function handleClickNewItem() {
    const form = document.querySelector('#new-item-form');
    form.reset();
    newItemDialog.setAttribute('open', 'open');
  }
  newItemButton.addEventListener('click', handleClickNewItem);

  function handleClickAddItem() {
    const title = document.querySelector('input[name=title]').value;
    const description = document.querySelector('input[name=description]').value;
    const dueDate = document.querySelector('input[name=due-date]').value;
    const priority = document.querySelector('select[name=priority]').value;
    const project = document.querySelector('select[name=project]').value;

    if (title) {
      addTodoItem(title, description, dueDate, project, priority);
      createItemCard(title, description, dueDate, project, priority, false);
    }
  }
  addItemButton.addEventListener('click', handleClickAddItem);

  // Add project

  function handleClickNewProject() {
    const form = document.querySelector('#new-project-form');
    form.reset();
    newProjectDialog.setAttribute('open', 'open');
  }
  newProjectButton.addEventListener('click', handleClickNewProject);

  function handleClickAddProject() {
    const name = document.querySelector('input[name=project-name]').value;

    if (name) {
      addTodoProject(name);
      createNavItem(name);
      createProjectOption(name);
    }
  }
  addProjectButton.addEventListener('click', handleClickAddProject);

  // Toggle is done

  function handleClickIsDone(event) {
    const card = event.target.parentElement;
    const cardID = card.getAttribute('data-id');
    const cardProject = card.getAttribute('data-project');
    const isDoneButton = card.querySelector('.is-done-btn');

    const todoProject = todoProjects.find(
      (element) => element.name.toLowerCase() === cardProject
    );
    const todoItem = todoProject.todoItems.find(
      (element) => element.id === cardID
    );
    todoItem.toggleIsDone();
    isDoneButton.textContent = `${todoItem.isDone ? true : false}`;
  }
}
