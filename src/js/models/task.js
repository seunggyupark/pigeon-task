export default class Tasks {
    constructor() {
        this.allTasks = {};
    }

    // addAssigned(id) {
    //     this.allTasks[id] = []
    // }

    addTask(id, task, assigned, tag, comment) {
        const newTask = { id, task, assigned, tag, comment };
        this.allTasks[id] = newTask;
        console.log(this.allTasks);
        this.persistData();
    }

    deleteTask(id) {
        delete this.allTasks[id];
        this.persistData();
    }

    persistData() {
        const time = new Date().getTime();
        localStorage.setItem('tasks', JSON.stringify(this.allTasks));
        localStorage.setItem('time', time);
    }

    readStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const time = localStorage.getItem('time');
        const timeNow = new Date().getTime();
        // If it has been less than 16 hours since the last change
        if (tasks && (timeNow - time) < (86400000 * 0.667)) {
            this.allTasks = tasks;
        } else {
            localStorage.clear();  
        }
    }
}