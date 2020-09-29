import { elements } from './base';

export const updateInvalid = element => element.classList.add('invalid');

export const clearInvalid = () => {
    elements.inputTask.classList.remove('invalid');
    elements.inputAssigned.classList.remove('invalid');
};

const limitString = (string, limit = 35) => {
    const newString = [];
    if (string.length > limit) {
        const split = string.split(' ');
        if (split.length === 1) {
            return `${split[0].substring(0, 6)}...`;
        }

        split.reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newString.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newString.join(' ')}...`;
    }
    return string;
}

export const renderTask = (id, assigned, task, tag, classID) => {
    //const fixedAssigned = assigned.replaceAll(' ', '-').replaceAll('.', '_');
    const DOMelement = document.querySelector(`.assignment-${classID}`);
    // Check if a tasklist exists for this person
    if (!DOMelement) {
        //Insert markup into the task-container
        const markup = `
        <div class="assignment assignment-${classID}">
            <h3>${assigned}</h3>
            <ul class="tasks-${classID}">
            </ul>
        </div>`;
        elements.taskContainer.insertAdjacentHTML('beforeend', markup);
    }

    // Add the task to the unordered list
    const listElement = document.querySelector(`.tasks-${classID}`);

    const markup = `
        <li class="list-element" href="${id}">
            <div class="task">
                <button class="task__delete">&times;</button>
                <p class="task__description">
                    ${limitString(task)}
                </p>
            </div>
            <p class="tag">
                ${limitString(tag, 6)}
            </p>
        </li>
    `;
    listElement.insertAdjacentHTML('beforeend', markup);
}

export const removeTask = id => {
    const task = document.querySelector(`.list-element[href="${id}"]`);
    const tasklist = task.parentElement;
    const assignmentContainer = tasklist.parentElement;
    task.parentElement.removeChild(task);
    if (tasklist.childElementCount === 0) assignmentContainer.parentElement.removeChild(assignmentContainer);
}
