import { Component } from "../../core/Component.js";
import { ACTIONS } from "../../store/actions.js";
import "./modal.css";
 
export class Modal extends Component {
  constructor(container, store, onClose) {
    super(container, store);
    this.onClose = onClose;
    this.render();
    this.initEventListeners();
  }
 
  render() {
    const state = this.store.getState();
 
    this.container.innerHTML = `
      <div class="modal-backdrop" id="modalBackdrop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Create New Task</h3>
            <button class="modal-close-btn" id="closeModalBtn">&times;</button>
          </div>
         
          <form id="taskForm">
            <div class="form-group">
              <label class="form-label" for="taskTitle">Task Title</label>
              <input type="text" id="taskTitle" class="form-input" placeholder="Enter task title..." required autocomplete="off">
            </div>
 
 
            <div class="form-group">
              <label class="form-label" for="taskDescription">Description</label>
              <textarea id="taskDescription" class="form-textarea" placeholder="Enter task description..."></textarea>
            </div>
 
 
            <div class="form-group">
              <label class="form-label" for="taskColumn">Column</label>
              <select id="taskColumn" class="form-select">
                ${state.columns.map((col) => `<option value="${col.id}">${col.title}</option>`).join("")}
              </select>
            </div>
 
 
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
              <button type="submit" class="btn btn-primary">Create Task</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
 
  initEventListeners() {
    const backdrop = document.getElementById("modalBackdrop");
    const closeBtn = document.getElementById("closeModalBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const form = document.getElementById("taskForm");
 
    // Закриття на кліку на хрестик, кнопку скасування або підкладку
    const closeModal = () => this.destroy();
 
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
 
    // Обробка відправлення форми
    form.addEventListener("submit", (e) => {
      e.preventDefault();
 
      const title = document.getElementById("taskTitle").value.trim();
      const description = document
        .getElementById("taskDescription")
        .value.trim();
      const columnId = document.getElementById("taskColumn").value;
 
      if (!title) return;
 
      // Створюємо нове завдання з унікальним ID через вбудований криптографічний генератор
      const newTask = {
        id: "task-" + crypto.randomUUID(),
        columnId,
        title,
        description,
      };
 
      // Надсилаємо екшен у Store
      this.store.dispatch({
        тип: ACTIONS.ADD_TASK,
        payload: newTask,
      });
 
      closeModal();
      if (this.onClose) this.onClose();
    });
  }
}
 
 