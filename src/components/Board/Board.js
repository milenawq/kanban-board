import { Component } from "../../core/Component.js";
import { createColumnElement } from "../Column/Column.js";
import { Modal } from "../Modal/Modal.js";
import { ACTIONS } from "../../store/actions.js";
import "./board.css";
 
export class Board extends Component {
  constructor(container, store) {
    super(container, store);
    this.render();
    this.initEventListeners();
  }
 
  render() {
    const state = this.store.getState();
 
    this.container.innerHTML = `
      <div class="kanban-board-container">
        <header class="board-header" style="display: flex; justify-content: space-between; align-items: center;">
          <h1 class="board-title">Kanban Project Board</h1>
          <button class="btn btn-primary" id="openModalBtn">+ Add Task</button>
        </header>
       
        <div class="board-columns">
          ${state.columns
            .map((column) => {
              const columnTasks = state.tasks.filter(
                (task) => task.columnId === column.id,
              );
              return createColumnElement(column, columnTasks);
            })
            .join("")}
        </div>
      </div>
      <div id="modalContainer"></div>
    `;
  }
 
  initEventListeners() {
    // Кнопка додавання завдання
    const openModalBtn = e.target.closest("#openModalBtn");
    if (openModalBtn) {
      const modalContainer = document.getElementById("modalContainer");
      new Modal(modalContainer, this.store);
      return;
    }

    this.container.addEventListener('dblclick', (e) => {
      const card = e.target.closest('.kanban-card');
      if (!card) return;
 
      const taskId = card.dataset.taskId;
      if (confirm('Are you sure you want to delete this task?')) {
        this.store.dispatch({
          тип: ACTIONS.DELETE_TASK,
          payload: { taskId }
        });
      }
    });

    const editBtn = e.target.closest("[data-action='edit']");
    if (editBtn) {
      const card = editBtn.closest(".kanban-card");
      if (!card) return;

      const taskId = card.dataset.taskId;
      const state = this.store.getState();
      const taskToEdit = state.tasks.find((t) => t.id === taskId);

      if (taskToEdit) {
        const modalContainer = document.getElementById("modalContainer");
        new Modal(modalContainer, this.store, null, taskToEdit);
      }
      return;
    }   
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
 
