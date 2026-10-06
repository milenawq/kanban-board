import "./card.css";
 
export function createCardElement(task) {
  return `
    <div class="kanban-card" draggable="true" data-task-id="${task.id}" title="Double click to delete">
      <h4 class="card-title">${escapeHTML(task.title)}</h4>
      <button class="edit-button" data-action="edit">Edit</button>
      ${task.description ? `<p class="card-description">${escapeHTML(task.description)}</p>` : ""}
    </div>
  `;
}
 
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
 
 