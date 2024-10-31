import { input, confirm, select } from '@inquirer/prompts';

class Task {
    constructor(name, deadline) {
        this.name = name;
        this.deadline = deadline;
    }
}

let tasks = [];
console.log("Task Scheduler v1.0");

let makeTasks = async () => {
    let addMore = true;
    
    while (addMore) {
        let name = await input({ message: "Insert task name:" });
        let deadline = await input({ message: "Insert task deadline:" });
        tasks.push(new Task(name, deadline));
        
        addMore = await confirm({ message: "Do you want to add another task?" });
    }
    
    console.log("\nAll tasks:");
    printTasks();
}

let printTasks = () => {
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.name} - Due: ${task.deadline}`);
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
            name: `${index + 1}. ${task.name} - Due: ${task.deadline}`,
            value: index
        }))
    });

    tasks.splice(taskToRemove, 1);
    console.log("Task removed.");
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
            case 'quit':
                quit();
                break;
        }
    }
}

program();
