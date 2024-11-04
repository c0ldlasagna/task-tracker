import { input, confirm, select } from '@inquirer/prompts';
import fs from 'fs';

const TASKS_FILE = './tasks.json';

let loadTasks = () => {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return []; // Return an empty array if file does not exist
    }
};

let saveTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

let tasks = loadTasks();
class Task {
    constructor(name, deadline, status) {
        this.name = name;
        this.deadline = deadline;
        this.status = status;
    }
}

console.log("Task Scheduler v1.0");

let makeTasks = async () => {
    let addMore = true;
    
    while (addMore) {
        let name = await input({ message: "Insert task name:" });
        let deadline = await input({ message: "Insert task deadline:" });
        let status = await input({message:"Insert task status:"});
        tasks.push(new Task(name, deadline,status));
        saveTasks(tasks);
        
        addMore = await confirm({ message: "Do you want to add another task?" });
    }
    
    console.log("\nAll tasks:");
    printTasks();
}

let printTasks = () => {
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.name} - Due: ${task.deadline} - Status: ${task.status}`);
    });
}

let removeTask = async () => {
    if (tasks.length === 0) {
        console.log("No tasks to remove.");
        return;
    }

    const taskToRemove = await select({
        message: 'Select a task to remove:',
        choices: tasks.map((task, index) => ({
            name: `${index + 1}. ${task.name} - Due: ${task.deadline} - Status: ${task.status}`,
            value: index
        }))
    });

    tasks.splice(taskToRemove, 1);
    saveTasks(tasks)
    console.log("Task removed.");
}

let changeStatus = async () =>{
    if (tasks.length === 0) {
        console.log("No tasks to change status.");
        return;
    }
    const taskToEdit = await select({
        message: 'Select a task to edit:',
        choices: tasks.map((task, index) => ({
            name: `${index + 1}. ${task.name} - Due: ${task.deadline} - Status: ${task.status}`,
            value: index
        }))
    });
    const newStatus = await input({message:"Input new status: "})
    tasks[taskToEdit].status = newStatus
    saveTasks(tasks)
}

function quit() {
    exit = true;
    console.log("Exiting Task Scheduler. Goodbye!");
}

let exit = false;

let program = async () => {
    console.log("Welcome to the Task Scheduler");

    while (!exit) {
        const option = await select({
            message: 'What would you like to do?',
            choices: [
                { name: "Create a task", value: "new" },
                { name: "View Tasks", value: 'view' },
                { name: 'Remove a task', value: 'remove' },
                {name:"Edit a task's status",value:'status'},
                { name: 'Quit', value: 'quit' }
            ]
        });

        switch (option) {
            case "new":
                await makeTasks();
                break;
            case "view":
                printTasks();
                break;
            case 'remove':
                await removeTask();
                break;
            case 'status':
                await changeStatus();
                break;
            case 'quit':
                quit();
                break;
        }
    }
}

program();
