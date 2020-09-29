export default class Inputs {
    constructor() {
        this.assignedOptions = [];
        this.tagOptions = [];
    }

    updateOptionsArray(assigned, tag) {
        if (!this.assignedOptions.includes(assigned)) this.assignedOptions.push(assigned);
        if (!this.tagOptions.includes(tag)) this.tagOptions.push(tag);

        return this.assignedOptions.indexOf(assigned);
    }
}