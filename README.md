# TaskFlow — To-Do List App

A clean, responsive to-do list web app for organizing daily tasks, setting priorities, and tracking progress — built with vanilla JavaScript and Bootstrap 5.

Demo # https://sannansarwer.github.io/js-taskflow-todo-web-app/

## Features

- **Add, edit, and delete tasks** with a title, description, priority, and due date
- **Priority levels** — High, Low, and Urgent — shown as color-coded badges
- **Live stats dashboard** showing total, completed, and pending task counts
- **Filter tasks** by All, Pending, or Completed
- **Sort tasks** by date added, priority, due date, or alphabetically
- **Dark mode** toggle with saved preference
- **Import / Export tasks** as JSON for backup or transfer between devices
- **Clear all data** with a confirmation prompt
- **Persistent storage** — tasks are saved locally in the browser, so nothing is lost on refresh

## Tech Stack

- HTML5, CSS3, JavaScript (vanilla, no frameworks)
- [Bootstrap 5](https://getbootstrap.com/) for layout and components
- [Bootstrap Icons](https://icons.getbootstrap.com/) for iconography
- Browser `localStorage` for data persistence

## Project Structure

```
To-Do List/
├── index.html      # App markup and modal for adding/editing tasks
├── css/
│   └── style.css   # Custom styling, including dark mode
└── js/
    └── script.js   # App logic: CRUD, filtering, sorting, import/export
```

## Getting Started

No build steps or dependencies to install — this is a static site.

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   ```
2. Open `index.html` in your browser

   Or serve it locally for a smoother experience:
   ```bash
   npx serve .
   ```

## Usage

1. Click **Add New Task** to open the task form
2. Enter a title, optional description, priority, and dates
3. Use the checkbox to mark a task as complete
4. Use the filter buttons to view All, Pending, or Completed tasks
5. Use **Sort By** to reorder tasks
6. Access **Import Tasks**, **Export Tasks**, **Dark Mode**, and **Clear All Data** from the settings (gear) menu

## Data Storage

Tasks are stored in the browser's `localStorage` under the `tasks` key, so your list persists between sessions on the same browser and device. Use the **Export Tasks** option to back up your data as a JSON file, and **Import Tasks** to restore it.

## Roadmap

- [ ] Task search
- [ ] Due-date reminders/notifications
- [ ] Drag-and-drop task reordering
- [ ] Cloud sync across devices

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
