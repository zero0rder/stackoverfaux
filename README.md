# ./Client

- Used Redux Toolkit to quickly spinup global state management to share/decouple data + handle state updates
- React Router + Hooks to perform page navigation
- Create custom LocalStorage Hook to store client-side user session state (ideally would handle server side)
- API folder for HTTP requests to backend (Could use Redux Thunk)
- MUI for boilerplate UI Components and quick styling
- Page folder represents Routed Components
- Component folders are organized by modules within the UI (i.e., Questions, Answers, Navigation, etc.)
- Utils folder for abstracted biz logic
- Dockerized client application (could also use docker-compose for running with server app)

# ./Server

- Built Express server to process requests (routers/controllers) [not wired to frontend]
- Used a Postgres DB to store data efficiently
- Utilzed Prisma ORM to easily create model/schema representations + run CRUD operations w/o using SQL statements
