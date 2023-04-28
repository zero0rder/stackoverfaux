# ./Client

- Used Redux Toolkit to quickly spinup global state management to share/decouple data + handle state updates
- React Router + Hooks to perform page navigation
- Create custom LocalStorage Hook to store client-side user session state
- API folder for HTTP requests to backend
- MUI for boilerplate UI Components and quick styling
- Page folder represent Routed Components
- Component folders are organized by usage within the UI (i.e., Shared, Layout, etc.)
- Utils folder for abstracted biz logic

# ./Server

- Built Express server to process requests (routers/controllers) [not wired to frontend]
- Used a Postgres DB to store data efficiently
- Utilzed Prisma ORM to easily create model/table representations + run CRUD operations w/o using SQL statements
