const lists = {
    currentTasks: [],
    removedTasks: [],
    taskCount: 0,
    trashIsOpen: false,
}

function createCurrentTaskDiv(task) {
    return (`
        <div class="task-block current">
            <p class="task-content-${task.choosen ? 'choosen' : 'default'}">${task.content}</p>
            <input type="checkbox" onchange="chooseTask(${task.id})" id="chb-${task.id}" ${task.choosen && 'checked'}>
        </div>
    `)
}

function createRemovedTaskDiv(task) {
    return (`
    <div class="task-block current">
        <p>${task.content}</p>
        <button onclick="restoreTask(${task.id})">Восстановить</button>
    </div>
`)
}

function displayTasks() {
    displayCurrentTasks()
    displayRemoveTasks()
}

function displayCurrentTasks() {
    const currentTaskListElement = document.getElementById('current')
    const newContentCurrentList = lists.currentTasks.reduce((acum, current) => acum + createCurrentTaskDiv(current), '')
    currentTaskListElement.innerHTML = newContentCurrentList

}

function displayRemoveTasks() {
    if(lists.trashIsOpen) {
        const removedTaskListElement = document.getElementById('removed')
        const newContentRemovedList = lists.removedTasks.reduce((acum, current) => acum + createRemovedTaskDiv(current), '')
        removedTaskListElement.innerHTML = newContentRemovedList
    }
}

function clickTrashBtn() {
    const trashList = document.getElementById('trash-list')
    lists.trashIsOpen = !lists.trashIsOpen
    if(lists.trashIsOpen) {
        trashList.innerHTML = (`                
            <h1>Удалённые задачи</h1>
            <div class="task-list" id="removed"></div>
            <button onclick="clickTrashBtn()">Закрыть корзину</button>`
        )
        displayRemoveTasks()
        return
    }
    trashList.innerHTML = (`                
        <button onclick="clickTrashBtn()">Открыть корзину</button>`
    )
}

function displayRemoveBtn(displayMode) {
    const removeBtn = document.getElementById('remove-btn')
    removeBtn.style.display = displayMode
}

function addNewTask() {
    const content = document.getElementById('new-task-input').value
    lists.currentTasks = [...lists.currentTasks, { content, id: lists.taskCount, choosen: false }]
    lists.taskCount++
    displayCurrentTasks()
}

function chooseTask(id) {
    const checkbox = document.getElementById(`chb-${id}`)
    const indexTask = lists.currentTasks.findIndex((task) => task.id === id)
    lists.currentTasks[indexTask].choosen = checkbox.checked

    displayRemoveBtn(lists.currentTasks.filter((task) => task.choosen).length ? 'inline' : 'none')
    displayCurrentTasks()
}

function removeTasks() {
    lists.removedTasks = [...lists.removedTasks, ...lists.currentTasks.filter((task) => task.choosen)]
    lists.currentTasks = lists.currentTasks.filter((task) => !task.choosen)

    displayTasks()
    displayRemoveBtn('none')
}

function restoreTask(id) {
    lists.currentTasks = [...lists.currentTasks, {...lists.removedTasks.find((task) => task.id === id), choosen: false}]
    lists.removedTasks = lists.removedTasks.filter((task) => task.id !== id)
    displayTasks()
}

function chooseAllTask() {
    lists.currentTasks = lists.currentTasks.map((task) => ({...task, choosen: true}))

    displayRemoveBtn('inline')
    displayCurrentTasks()
}

