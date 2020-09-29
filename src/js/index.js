const crypto = require('crypto');
const emailjs = require('emailjs-com');
const validator = require('validator');
import * as base from './views/base';
import Tasks from './models/task';
import Inputs from './models/input';
import Email from './models/email';
import * as inputView from './views/inputView';
import * as taskView from './views/taskView';
import * as emailView from './views/emailView';

import{ init } from 'emailjs-com';
init("user_QJn1alsUXBi3ChIoNLO4m");

/** Global state of the app
 * - Entry object (current user input)
 * - Tasks
 */

// Initialization
const state = {};

const ctrlAddItem = () => {
    // Clear the red border and shakes
    taskView.clearInvalid();

    // Grab inputs
    state.entry = inputView.getInputs();

    if (!state.entry.task || !state.entry.assigned) {

        if (!state.entry.task) {
            //Highlight task with red border, shake it
            taskView.updateInvalid(base.elements.inputTask);

        };

        if (!state.entry.assigned) {
            //Highlight assigned with red border, shake it
            taskView.updateInvalid(base.elements.inputAssigned);
        };

    } else {

        if (!state.tasks) state.tasks = new Tasks();
        if (!state.inputs) state.inputs = new Inputs();
        if (state.entry.tag === "") state.entry.tag = 'None';

        // Add the input the the allTask object
        const id = crypto.randomBytes(8).toString('hex');
        state.tasks.addTask(id, state.entry.task, state.entry.assigned, state.entry.tag, state.entry.comment);

        // Store the tag and assigned to an array of names on the drop down menu
        const classID = state.inputs.updateOptionsArray(state.entry.assigned, state.entry.tag);

        // Update the tag and assigned options to the html
        inputView.updateOptions(state.inputs.assignedOptions, state.inputs.tagOptions);

        // Add the input to the UI with a slight transition from top down
        taskView.renderTask(id, state.entry.assigned, state.entry.task, state.entry.tag, classID);

        // Clear out entry
        inputView.clearInputs();
    }
};

const displayPreview = () => {
    // MAY NEED TO CREATE EMAIL OBJECT IF THIS FORMATTING DOES NOT WORK FOR EMAIL
    state.email.preview = emailView.preview(state.tasks.allTasks);
    emailView.renderPreview(state.email.preview);
};

async function sendEmail(parameters) {
    await emailjs.send('service_fsbgdjq', 'template_8dbblkr', parameters);
    alert('Email sent!');
}

// Adding a task
document.addEventListener('keypress', () => {
    if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
});

base.elements.addButton.addEventListener('click', ctrlAddItem);

// Deleting a task
base.elements.taskContainer.addEventListener('click', event => {
    const id = event.target.closest('.list-element').getAttribute('href');
    if (event.target.matches('.task__delete, .task__delete *')) {
        // Remove task from state.tasks
        state.tasks.deleteTask(id);
    
        // Remove UI element
        taskView.removeTask(id);
    }
});

// Displaying Preview Window
base.elements.previewButton.addEventListener('click', displayPreview);

// Displaying the How To Window
base.elements.infoButton.addEventListener('click', inputView.renderInfo);

// Exiting Preview Window
window.addEventListener('click', emailView.closeModalClick);
base.elements.previewModal.addEventListener('click', emailView.closeModal);
base.elements.howtoModal.addEventListener('click', emailView.closeModal);

base.elements.emailButton.addEventListener('click', () => {
    state.email.preview = emailView.preview(state.tasks.allTasks);
    state.email.toEmail = emailView.getEmail();
    console.log(state.email.toEmail);
    if (state.email.preview === '<br>There are no tasks entered yet!') {
        alert('Please enter some tasks!');
    } else if (validator.isEmail(state.email.toEmail)) {
        const parameters = {
            toEmail: state.email.toEmail,
            message: state.email.preview,
        }; 
        sendEmail(parameters);
    } else {
        alert('Please input a valid email.');
    }
});

// Restore tasks if under 16 hours since last change
window.addEventListener('load', () => {
    state.tasks = new Tasks();
    state.inputs = new Inputs();
    state.email = new Email();

    // Restore the tasks if there has been no changes in the last 16 hours
    state.tasks.readStorage();

    // Render the tasks
    const taskArray = Object.values(state.tasks.allTasks);
    taskArray.forEach(task => {
        const classID = state.inputs.updateOptionsArray(task.assigned, task.tag);
        taskView.renderTask(task.id, task.assigned, task.task, task.tag, classID)
    });
    inputView.updateOptions(state.inputs.assignedOptions, state.inputs.tagOptions);
});