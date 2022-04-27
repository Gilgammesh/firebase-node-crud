import { saveTask, onChangeTasks, getTask, deleteTask, updateTask } from './firebase.js';

// Ennum Status of btn submit
const enumBtnStatus = {
	SAVE: 'save',
	EDIT: 'edit'
};
// Ennum Values of btn submit
const enumBtnValues = {
	SAVE: 'Save',
	UPDATE: 'Update'
};
// Initial status btn submit
let btnStatus = enumBtnStatus.SAVE;
// Id task edited
let idTask = '';

// Instance elements
const taskForm = document.getElementById('task-form');
const taskLegend = document.getElementById('task-legend');
const btnSubmit = document.getElementById('btn-submit');
const tasksContainer = document.getElementById('tasks-container');

// Event listener on loaded content in DOM
window.addEventListener('DOMContentLoaded', async () => {
	// On change tasks (create new task or delete task)
	await onChangeTasks(tasks => {
		// Get tasks and innerHTML
		tasksContainer.innerHTML = '';
		// Initialize count
		let count = 1;
		tasks.forEach(task => {
			tasksContainer.innerHTML += `<tr>
                                            <th scope='row'>${count}</th>
                                            <td>${task.data().title}</td>
                                            <td>${task.data().description}</td>
                                            <td>
                                                <button id='${task.id}' class='btn btn-delete'>
                                                    <i class='bi-trash' style="color: red;"></i>
                                                </button>
                                                <button id='${task.id}' class='btn btn-edit'>
                                                    <i class='bi-pencil'></i>
                                                </button>
                                            </td>
                                         </tr>`;
			count++;
		});
		// Instance all delete buttons elements
		const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
		// Instance all edit buttons elements
		const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');

		// Traverse all delete btns
		btnsDelete.forEach(btn => {
			// Event click on delete btn
			btn.addEventListener('click', async () => {
				// Delete task
				await deleteTask(btn.id);
			});
		});

		// Traverse all edit btns
		btnsEdit.forEach(btn => {
			// Event click on edit btn
			btn.addEventListener('click', async () => {
				// Obtain task by id
				const task = await getTask(btn.id);
				// Set values on form
				taskForm['task-title'].value = task.title;
				taskForm['task-description'].value = task.description;
				// Set value btn submit
				btnSubmit.value = enumBtnValues.UPDATE;
				// Set legend task to edit
				taskLegend.innerHTML = `Edit Task => ${btn.id}`;
				// Set status btn to edit
				btnStatus = enumBtnStatus.EDIT;
				// Set id task edited
				idTask = btn.id;
			});
		});
	});
});

taskForm.addEventListener('submit', async evt => {
	evt.preventDefault();

	// Form data
	const title = taskForm['task-title'];
	const description = taskForm['task-description'];

	// If status is save
	if (btnStatus === enumBtnStatus.SAVE) {
		await saveTask(title.value, description.value);
	}

	// If status is edit
	if (btnStatus === enumBtnStatus.EDIT && idTask !== '') {
		await updateTask(idTask, {
			title: title.value,
			description: description.value
		});
	}

	// Reset value btn submit
	btnSubmit.value = enumBtnValues.SAVE;
	// Set legend task to edit
	taskLegend.innerHTML = 'Create New Task';
	// Reset status btn to save
	btnStatus = enumBtnStatus.SAVE;
	// Reset id task
	idTask = '';
	// Reset form
	taskForm.reset();
});
