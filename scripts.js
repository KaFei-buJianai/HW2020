
let tasks = [];

function renderEditor() {
    let inputEl = document.querySelector("#default-plan-panel .plan-editor > input");

    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }
        console.log("add click");
        let newTask = {
            title: inputEl.value,
            done: false,
        };

        inputEl.value = "";

        tasks.push(newTask);

        console.log("tasks: ", tasks);

        renderTaskItems();
    };

    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }

    };

    let addEl = document.querySelector("#default-plan-panel .plan-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };
}

function renderTaskItems() {
    console.log("render itms");
    let itemsEl = document.querySelector("#default-plan-panel .plan-items");

    itemsEl.querySelectorAll("div").forEach((node) => node.remove());

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEL = document.createElement("input");
        doneEL.type = "checkbox";
        doneEL.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        } else {
            itemEl.classList.remove("done");
        }

        doneEL.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done");
            }
        }
        itemEl.append(doneEL);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let ctrlbarEl = document.createElement("div");
        ctrlbarEl.className = "ctrlbar";

        let cancelEl = document.createElement("button");
        cancelEl.innerText = "X";
        cancelEl.onclick = () => {
            tasks.splice(i, 1);
            renderTaskItems();
        };

        ctrlbarEl.append(cancelEl)

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);

    }
}

renderEditor();
renderTaskItems();


