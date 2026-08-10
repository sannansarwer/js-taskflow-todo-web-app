// ======================================================
// ID SELECTION ELEMENTS
// ======================================================


// SETTINGS ELEMENTS

const darkMode = document.getElementById("darkMode");
const importTaskBtn = document.getElementById("importTaskBtn");
const exportTaskBtn = document.getElementById("exportTaskBtn");
const clearAllBtn = document.getElementById("clearAllBtn");


// STATS CARD ELEMENTS

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");


// TASK FORM ELEMENTS

const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");

const high = document.getElementById("high");
const low = document.getElementById("low");
const urgent = document.getElementById("urgent");

const addedDate = document.getElementById("addedDate");
const dueDate = document.getElementById("dueDate");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskModal = document.getElementById("addTaskForm");


// TABLE ELEMENTS

const taskList = document.getElementById("taskList");


// FILTER ELEMENTS

const allFilterBtn = document.getElementById("allFilterBtn");
const pendingFilterBtn = document.getElementById("pendingFilterBtn");
const completedFilterBtn = document.getElementById("completedFilterBtn");


// SORT ELEMENTS

const sortDateBtn = document.getElementById("sortDateBtn");
const sortPriorityBtn = document.getElementById("sortPriorityBtn");
const sortDuedateBtn = document.getElementById("sortDuedateBtn");
const sortAlphaBtn = document.getElementById("sortAlphaBtn");


// ======================================================
// DATA STORAGE
// ======================================================

let tasks = [];

let editTaskId = null;

let currentFilter = "all";

let currentSort = "date";


// ======================================================
// LOCAL STORAGE
// ======================================================

const saveTasks = () => {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

};


const loadTasks = () => {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        try {

            tasks = JSON.parse(savedTasks);

        } catch (error) {

            console.error(
                "Unable to load saved tasks:",
                error
            );

            tasks = [];

        }

    }

};


// ======================================================
// PRIORITY BADGE
// ======================================================

const getPriorityBadge = (priority) => {

    if (priority === "high") {
        return "text-bg-success";
    }

    if (priority === "low") {
        return "text-bg-secondary";
    }

    if (priority === "urgent") {
        return "text-bg-danger";
    }

    return "text-bg-secondary";

};


// ======================================================
// GET FILTERED TASKS
// ======================================================

const getFilteredTasks = () => {

    if (currentFilter === "pending") {

        return tasks.filter(
            task => !task.completed
        );

    }

    if (currentFilter === "completed") {

        return tasks.filter(
            task => task.completed
        );

    }

    return [...tasks];

};


// ======================================================
// SORT TASKS
// ======================================================

const sortTasks = (taskArray) => {

    const sortedTasks = [...taskArray];


    // --------------------------------------
    // Date Added
    // --------------------------------------

    if (currentSort === "date") {

        sortedTasks.sort(
            (a, b) =>
                new Date(a.addedDate) -
                new Date(b.addedDate)
        );

    }


    // --------------------------------------
    // Priority
    // --------------------------------------

    else if (currentSort === "priority") {

        const priorityOrder = {
            urgent: 1,
            high: 2,
            low: 3
        };

        sortedTasks.sort(
            (a, b) =>
                priorityOrder[a.priority] -
                priorityOrder[b.priority]
        );

    }


    // --------------------------------------
    // Due Date
    // --------------------------------------

    else if (currentSort === "dueDate") {

        sortedTasks.sort(
            (a, b) =>
                new Date(a.dueDate) -
                new Date(b.dueDate)
        );

    }


    // --------------------------------------
    // Alphabetically
    // --------------------------------------

    else if (currentSort === "alphabetical") {

        sortedTasks.sort(
            (a, b) =>
                a.title.localeCompare(
                    b.title
                )
        );

    }


    return sortedTasks;

};


// ======================================================
// RENDER TASKS
// ======================================================

const renderTasks = () => {

    taskList.innerHTML = "";


    // Get filtered tasks

    let visibleTasks = getFilteredTasks();


    // Apply sorting

    visibleTasks = sortTasks(visibleTasks);


    // --------------------------------------
    // No Tasks
    // --------------------------------------

    if (visibleTasks.length === 0) {

        taskList.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="text-center py-5 text-muted"
                >

                    <i class="bi bi-inbox fs-2 d-block mb-2"></i>

                    No tasks found.

                </td>

            </tr>

        `;

        return;

    }


    // --------------------------------------
    // Render Tasks
    // --------------------------------------

    visibleTasks.forEach((task, index) => {

        const row = document.createElement("tr");


        // Completed task class

        if (task.completed) {

            row.classList.add(
                "task-completed"
            );

        }


        row.innerHTML = `

            <td>

                <input
                    class="form-check-input task-checkbox"
                    type="checkbox"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                >

            </td>


            <td>

                ${index + 1}

            </td>


            <td>

                <div class="task-title">

                    ${task.title}

                </div>


                <small>

                    ${task.description || ""}

                </small>

            </td>


            <td>

                <span
                    class="badge rounded-pill ${getPriorityBadge(task.priority)}"
                >

                    ${task.priority.toUpperCase()}

                </span>

            </td>


            <td class="small">

                ${task.addedDate}

            </td>


            <td class="small">

                ${task.dueDate}

            </td>


            <td class="text-center">

                <button
                    type="button"
                    class="icon-btn edit-btn"
                    data-id="${task.id}"
                >

                    <i class="bi bi-pencil"></i>

                </button>


                <button
                    type="button"
                    class="icon-btn delete-btn"
                    data-id="${task.id}"
                >

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        `;


        taskList.appendChild(row);

    });

};


// ======================================================
// UPDATE STATISTICS
// ======================================================

const updateStats = () => {

    const total = tasks.length;


    const completed = tasks.filter(
        task => task.completed
    ).length;


    const pending = tasks.filter(
        task => !task.completed
    ).length;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

};


// ======================================================
// UPDATE FILTER BUTTON COUNTS
// ======================================================

const updateFilterCounts = () => {

    const allCount = tasks.length;


    const pendingCount = tasks.filter(
        task => !task.completed
    ).length;


    const completedCount = tasks.filter(
        task => task.completed
    ).length;


    const allCountSpan =
        allFilterBtn.querySelector("span");


    const pendingCountSpan =
        pendingFilterBtn.querySelector("span");


    const completedCountSpan =
        completedFilterBtn.querySelector("span");


    allCountSpan.textContent = allCount;

    pendingCountSpan.textContent = pendingCount;

    completedCountSpan.textContent =
        completedCount;

};


// ======================================================
// UPDATE ACTIVE FILTER BUTTON
// ======================================================

const updateFilterButtons = () => {

    allFilterBtn.classList.remove("active");

    pendingFilterBtn.classList.remove("active");

    completedFilterBtn.classList.remove("active");


    if (currentFilter === "all") {

        allFilterBtn.classList.add("active");

    }

    else if (currentFilter === "pending") {

        pendingFilterBtn.classList.add("active");

    }

    else if (currentFilter === "completed") {

        completedFilterBtn.classList.add("active");

    }

};


// ======================================================
// ADD / UPDATE TASK
// ======================================================

addTaskBtn.addEventListener("click", () => {


    // --------------------------------------
    // Get Input Values
    // --------------------------------------

    const title =
        taskTitle.value.trim();


    const description =
        taskDescription.value.trim();


    const date =
        addedDate.value;


    const deadline =
        dueDate.value;


    // --------------------------------------
    // Get Priority
    // --------------------------------------

    let priority = "";


    if (high.checked) {

        priority = high.value;

    }

    else if (low.checked) {

        priority = low.value;

    }

    else if (urgent.checked) {

        priority = urgent.value;

    }


    // --------------------------------------
    // Validation
    // --------------------------------------

    if (!title || !date || !deadline) {

        alert(
            "Please fill all required fields."
        );

        return;

    }


    if (!priority) {

        alert(
            "Please select a priority."
        );

        return;

    }


    if (deadline < date) {

        alert(
            "Due date cannot be earlier than the added date."
        );

        return;

    }


    // ==================================================
    // CREATE TASK
    // ==================================================

    if (editTaskId === null) {


        const task = {

            id: Date.now(),

            title: title,

            description: description,

            priority: priority,

            addedDate: date,

            dueDate: deadline,

            completed: false

        };


        tasks.push(task);

    }


    // ==================================================
    // UPDATE TASK
    // ==================================================

    else {


        const task = tasks.find(
            task => task.id === editTaskId
        );


        if (task) {

            task.title = title;

            task.description = description;

            task.priority = priority;

            task.addedDate = date;

            task.dueDate = deadline;

        }

    }


    // Save

    saveTasks();


    // Render

    renderTasks();


    // Statistics

    updateStats();


    // Filter counts

    updateFilterCounts();


    // Reset edit mode

    editTaskId = null;


    // Reset form

    taskForm.reset();


    // Close modal

    const modal =
        bootstrap.Modal.getInstance(
            taskModal
        );


    if (modal) {

        modal.hide();

    }

});


// ======================================================
// DELETE + EDIT
// ======================================================

taskList.addEventListener("click", (event) => {


    // ==================================================
    // DELETE
    // ==================================================

    const deleteBtn =
        event.target.closest(
            ".delete-btn"
        );


    if (deleteBtn) {


        const id =
            Number(
                deleteBtn.dataset.id
            );


        const confirmed =
            confirm(
                "Are you sure you want to delete this task?"
            );


        if (!confirmed) {

            return;

        }


        tasks = tasks.filter(
            task => task.id !== id
        );


        saveTasks();

        renderTasks();

        updateStats();

        updateFilterCounts();


        return;

    }


    // ==================================================
    // EDIT
    // ==================================================

    const editBtn =
        event.target.closest(
            ".edit-btn"
        );


    if (editBtn) {


        const id =
            Number(
                editBtn.dataset.id
            );


        editTask(id);

    }

});


// ======================================================
// COMPLETE / UNCOMPLETE TASK
// ======================================================

taskList.addEventListener(
    "change",
    (event) => {


        if (
            !event.target.classList.contains(
                "task-checkbox"
            )
        ) {

            return;

        }


        const id =
            Number(
                event.target.dataset.id
            );


        const task =
            tasks.find(
                task => task.id === id
            );


        if (!task) {

            return;

        }


        task.completed =
            event.target.checked;


        saveTasks();


        renderTasks();

        updateStats();

        updateFilterCounts();

    }
);


// ======================================================
// EDIT TASK FUNCTION
// ======================================================

const editTask = (id) => {


    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) {

        return;

    }


    editTaskId = id;


    // Fill form

    taskTitle.value =
        task.title;


    taskDescription.value =
        task.description;


    addedDate.value =
        task.addedDate;


    dueDate.value =
        task.dueDate;


    // Priority

    high.checked =
        task.priority === "high";


    low.checked =
        task.priority === "low";


    urgent.checked =
        task.priority === "urgent";


    // Open modal

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            taskModal
        );


    modal.show();

};


// ======================================================
// FILTER - ALL
// ======================================================

allFilterBtn.addEventListener(
    "click",
    () => {

        currentFilter = "all";

        updateFilterButtons();

        renderTasks();

    }
);


// ======================================================
// FILTER - PENDING
// ======================================================

pendingFilterBtn.addEventListener(
    "click",
    () => {

        currentFilter = "pending";

        updateFilterButtons();

        renderTasks();

    }
);


// ======================================================
// FILTER - COMPLETED
// ======================================================

completedFilterBtn.addEventListener(
    "click",
    () => {

        currentFilter = "completed";

        updateFilterButtons();

        renderTasks();

    }
);


// ======================================================
// SORT - DATE ADDED
// ======================================================

sortDateBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        currentSort = "date";

        renderTasks();

    }
);


// ======================================================
// SORT - PRIORITY
// ======================================================

sortPriorityBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        currentSort = "priority";

        renderTasks();

    }
);


// ======================================================
// SORT - DUE DATE
// ======================================================

sortDuedateBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        currentSort = "dueDate";

        renderTasks();

    }
);


// ======================================================
// SORT - ALPHABETICALLY
// ======================================================

sortAlphaBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        currentSort = "alphabetical";

        renderTasks();

    }
);


// ======================================================
// CLEAR ALL DATA
// ======================================================

clearAllBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();


        if (tasks.length === 0) {

            alert(
                "There are no tasks to clear."
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete all tasks?"
            );


        if (!confirmed) {

            return;

        }


        // Clear array

        tasks = [];


        // Clear Local Storage

        localStorage.removeItem(
            "tasks"
        );


        // Reset filter

        currentFilter = "all";


        // Reset sort

        currentSort = "date";


        // Reset edit mode

        editTaskId = null;


        // Update UI

        updateFilterButtons();

        renderTasks();

        updateStats();

        updateFilterCounts();

    }
);


// ======================================================
// EXPORT TASKS
// ======================================================

exportTaskBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();


        if (tasks.length === 0) {

            alert(
                "There are no tasks to export."
            );

            return;

        }


        const data =
            JSON.stringify(
                tasks,
                null,
                2
            );


        const blob =
            new Blob(
                [data],
                {
                    type:
                        "application/json"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href = url;

        link.download =
            "taskflow-tasks.json";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        URL.revokeObjectURL(
            url
        );

    }
);


// ======================================================
// IMPORT TASKS
// ======================================================


// Create hidden file input

const importFileInput =
    document.createElement(
        "input"
    );


importFileInput.type =
    "file";


importFileInput.accept =
    ".json,application/json";


importFileInput.style.display =
    "none";


document.body.appendChild(
    importFileInput
);


// Open file selector

importTaskBtn.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        importFileInput.click();

    }
);


// Handle selected file

importFileInput.addEventListener(
    "change",
    (event) => {


        const file =
            event.target.files[0];


        if (!file) {

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            (event) => {


                try {


                    const importedTasks =
                        JSON.parse(
                            event.target.result
                        );


                    // Validate array

                    if (
                        !Array.isArray(
                            importedTasks
                        )
                    ) {

                        throw new Error(
                            "Invalid task file."
                        );

                    }


                    // Validate task structure

                    const validTasks =
                        importedTasks.every(
                            task =>

                                task.id !== undefined &&
                                typeof task.title === "string" &&
                                typeof task.completed === "boolean"

                        );


                    if (!validTasks) {

                        throw new Error(
                            "Invalid task data."
                        );

                    }


                    // Replace current tasks

                    tasks =
                        importedTasks;


                    // Save

                    saveTasks();


                    // Reset UI state

                    currentFilter =
                        "all";


                    currentSort =
                        "date";


                    // Update UI

                    updateFilterButtons();

                    renderTasks();

                    updateStats();

                    updateFilterCounts();


                    alert(
                        "Tasks imported successfully."
                    );


                }

                catch (error) {

                    alert(
                        "Unable to import tasks. Please select a valid TaskFlow JSON file."
                    );


                    console.error(
                        error
                    );

                }

            };


        reader.readAsText(
            file
        );


        // Allow same file to be selected again

        importFileInput.value = "";

    }
);


// ======================================================
// DARK MODE
// ======================================================

const loadDarkMode = () => {

    const darkModeEnabled =
        localStorage.getItem(
            "darkMode"
        ) === "true";


    if (darkModeEnabled) {

        document.body.classList.add(
            "dark-mode"
        );

    }

};


darkMode.addEventListener(
    "click",
    (event) => {

        event.preventDefault();


        document.body.classList.toggle(
            "dark-mode"
        );


        const enabled =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "darkMode",
            enabled
        );

    }
);


// ======================================================
// RESET FORM WHEN OPENING "ADD NEW TASK"
// ======================================================

const openTaskModalBtn =
    document.getElementById(
        "openTaskModalBtn"
    );


if (openTaskModalBtn) {

    openTaskModalBtn.addEventListener(
        "click",
        () => {

            editTaskId = null;

            taskForm.reset();

        }
    );

}


// ======================================================
// INITIAL PAGE LOAD
// ======================================================

loadTasks();

loadDarkMode();

updateFilterButtons();

renderTasks();

updateStats();

updateFilterCounts();