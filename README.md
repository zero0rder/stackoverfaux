# ./Client

- Used Redux Toolkit to quickly spinup global state management to share/decouple data + handle state updates
- React Router + Hooks to perform page navigation
- API folder for HTTP Client + using createAsyncThunk middlwware to perform async requests
- Created custom LocalStorage Hook to store client-side user session state (ideally would handle server side)
- MUI for boilerplate UI Components and quick styling
- Page folder represents Routed Components
- Component folders are organized by modules within the UI (i.e., Questions, Answers, Navigation, etc.)
- Utils folder for abstracted biz logic, types
- Dockerized client/server applications using docker-compose

# ./Server

- Built Express server to process requests with Routers and Controllers
- Used a Postgres DB to store data efficiently
- Utilzed Prisma ORM to easily create model/schema representations + run CRUD operations w/o writing SQL statements
