import { todoProjects, addTodoItem } from './todoHandler';

export function todoUI() {
  const navList = document.querySelector('nav ul');
  const projSelect = document.querySelector('#project');
  const main = document.querySelector('main');
  const newButton = document.querySelector('.new-todo-item');
  const dialog = document.querySelector('dialog');
  const addButton = document.querySelector('.add-todo-item');

  function createItemCard(title, desc, dueDate, proj, prio, isDone) {
    const itemCard = document.createElement('article');
    const itemTitle = document.createElement('h2');
    const itemDescription = document.createElement('p');
    const itemDueDate = document.createElement('p');
    const itemProject = document.createElement('p');
    const itemPriority = document.createElement('p');
    const itemIsDone = document.createElement('p');

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
    const navItem = document.createElement('li');
    navItem.textContent = proj.name;
    navList.appendChild(navItem);

    const projOption = document.createElement('option');
    projOption.textContent = proj.name;
    projOption.value = proj.name;
    projSelect.appendChild(projOption);

    for (const item of proj.todoItems) {
      createItemCard(
        item.title,
        item.description,
        item.dueDate,
        item.project,
        item.priority,
        item.isDone
      );
    }
  }

  function handleClickNew() {
    const form = document.querySelector('form');
    form.reset();
    dialog.setAttribute('open', 'open');
  }
  newButton.addEventListener('click', handleClickNew);

  function handleClickAdd() {
    const title = document.querySelector('input[name=title]').value;
    const description = document.querySelector('input[name=description]').value;
    const dueDate = document.querySelector('input[name=due-date]').value;
    const priority = document.querySelector('select[name=priority]').value;
    const project = document.querySelector('select[name=project]').value;

    addTodoItem(title, description, dueDate, project, priority);
    createItemCard(title, description, dueDate, project, priority, false);
  }
  addButton.addEventListener('click', handleClickAdd);
}
