import { todoProjects } from './todoHandler';
import {
  handleClickProjectView,
  handleClickItemTitle,
  handleClickPriority,
  handleClickIsDone,
  handleClickEdit,
} from './clickHandler';

export function createNavItem(name) {
  const navList = document.querySelector('nav ul');
  const navItem = document.createElement('li');
  const navItemAnchor = document.createElement('a');

  navItemAnchor.classList.add('project-view');
  navItemAnchor.addEventListener('click', handleClickProjectView);
  navItemAnchor.textContent = name;

  navItem.appendChild(navItemAnchor);
  navList.appendChild(navItem);
}

export function createProjectOption(name) {
  const projSelect = document.querySelector('#project-select');
  const editProjSelect = document.querySelector('#edit-project-select');
  const projOption = document.createElement('option');

  projOption.textContent = name;
  projOption.value = name;

  projSelect.appendChild(projOption);
  editProjSelect.appendChild(projOption.cloneNode(true));
}

export function createItemCard(title, desc, dueDate, proj, prio, isDone, id) {
  const main = document.querySelector('main');
  const itemCard = document.createElement('article');
  const itemTitle = document.createElement('h2');
  const itemProject = document.createElement('p');
  const itemPriority = document.createElement('button');
  const itemIsDone = document.createElement('button');
  const itemEdit = document.createElement('a');

  itemCard.setAttribute('data-id', id);
  itemCard.setAttribute('data-project', proj.toLowerCase());
  itemPriority.setAttribute('data-priority', prio);
  itemIsDone.setAttribute('data-is-done', isDone);

  itemTitle.classList.add('title');
  itemProject.classList.add('project');
  itemProject.classList.add('hidden');
  itemPriority.classList.add('priority-btn');
  itemIsDone.classList.add('is-done-btn');
  itemEdit.classList.add('edit-btn');
  itemEdit.classList.add('hidden');

  itemTitle.addEventListener('click', handleClickItemTitle);
  itemPriority.addEventListener('click', handleClickPriority);
  itemIsDone.addEventListener('click', handleClickIsDone);
  itemEdit.addEventListener('click', handleClickEdit);

  itemTitle.textContent = title;
  itemProject.textContent = proj;
  itemPriority.textContent = prio;
  itemEdit.textContent = 'Edit';

  itemCard.append(itemTitle, itemPriority, itemIsDone);

  if (dueDate) {
    const itemDueDate = document.createElement('p');
    itemDueDate.classList.add('due-date');
    itemDueDate.textContent = dueDate;
    itemCard.appendChild(itemDueDate);
  }

  if (desc) {
    const itemDescription = document.createElement('p');
    itemDescription.classList.add('description');
    itemDescription.classList.add('hidden');
    itemDescription.textContent = desc;
    itemCard.appendChild(itemDescription);
  }

  itemCard.append(itemProject, itemEdit);
  main.appendChild(itemCard);
}

export function todoUI() {
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
}
