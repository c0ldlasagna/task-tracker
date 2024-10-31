import { input, confirm } from '@inquirer/prompts';

class Task {
    constructor(name, deadline) {
        this.name = name;
        this.deadline = deadline;
    }
}

let tasks = [];
console.log("Task Scheduler v1.0");

let makeTasks = async()=>{
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

printTasks=()=>{
    tasks.forEach(task => {
        console.log(`${task.name} Due: ${task.deadline}`);
    });
}
function removeTask(task:Task){

}

let start = async ()=>{
    console.log("")
}