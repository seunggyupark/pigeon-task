import { elements } from './base';

export const getInputs = () => {
    return {
        task: elements.inputTask.value,
        assigned: elements.inputAssigned.value,
        tag: elements.inputTag.value,
        comment: elements.inputComment.value,
    };
};

export const clearInputs = () => {
    elements.inputTask.value = '';
    elements.inputAssigned.value = '';
    elements.inputTag.value = '';
    elements.inputComment.value = '';
};

export const updateOptions = (assignedArray, tagArray) => {
    let assignedMarkup, tagMarkup;
    assignedArray.forEach(element => {
        assignedMarkup += `<option>${element}</option>`;
    });
    tagArray.forEach(element => {
        tagMarkup += `<option>${element}</option>`;
    });
    elements.assignedOption.innerHTML = assignedMarkup;
    elements.tagOption.innerHTML = tagMarkup;
};

export const renderInfo = () => {
    elements.howtoModal.classList.add('show');
}