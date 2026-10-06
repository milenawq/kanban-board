export const initialState = {
  columns: [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ],
  tasks: [
    {
      id: "task-1",
      columnId: "todo",
      title: "Design Architecture",
      description: "Create modules and core classes",
    },
    {
      id: "task-2",
      columnId: "in-progress",
      title: "Setup Vite",
      description: "Initialize project structure",
    },
  ],
  searchQuery: "",
};