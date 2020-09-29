import { elements } from './base';

export const preview = taskObj => {
    // Place each task object into their respective tag array within tabObj
    if (Object.keys(taskObj).length === 0) return '<br>There are no tasks entered yet!'

    const tagObj = {};
    for (const key in taskObj) {
        const task = taskObj[key];
        if (!tagObj[task.tag]) tagObj[task.tag] = [];
        tagObj[task.tag].push(task);
    }
    let email = '';
    for (const key in tagObj) {
        const nameObj = {};
        email += `<br>------------${key}------------<br><br>`;
        tagObj[key].forEach(element => {
            if (!nameObj[element.assigned]) nameObj[element.assigned] = [];
            if (element.comment) {
                nameObj[element.assigned].push(`&nbsp;&nbsp;&nbsp;${element.task} (${element.comment})<br>`);
            } else {
                nameObj[element.assigned].push(`&nbsp;&nbsp;&nbsp;${element.task}<br>`);
            }
        });
        for (const key in nameObj) {
            email += `<strong>${key}</strong><br>`;
            nameObj[key].forEach(element => email += element);
        };
    };
    return email;
}

export const renderPreview = preview => {
    elements.previewContent.innerHTML = `
        <span class="close">&times;</span>
            <p class="preview-header">Email Preview</p> 
            <p>${preview}</p>
        `;
    elements.previewModal.classList.add('show');
}

export const closeModal = event => {
    if (event.target.matches('.close, .close *')) {
        elements.previewModal.classList.remove('show');
        elements.howtoModal.classList.remove('show');
    }
}

export const closeModalClick = event => {
    if (event.target === elements.previewModal || event.target === elements.howtoModal) {
        elements.previewModal.classList.remove('show');
        elements.howtoModal.classList.remove('show');
    }
}

export const getEmail = () => {
    return elements.email.value;
};