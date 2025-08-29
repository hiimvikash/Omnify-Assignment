# Technology
- **Frontend :** ReactJs, Typescript, Tailwind, Recoil (State management), Zod, ShadCN - UI
- **Backend :** Hono, Cloudflare Workers, Postgress, Prisma-ORM, Prisma-Accelerate, Redis, Zod
- **Deployment :-**
    - **Frontend :** AWS Cloudfront, AWS S3
    - **Backend :** Cloudflare Workers


# How to start locally
- clone this repo `git clone https://github.com/hiimvikash/Omnify-Assignment.git`



## Backend
- `cd backend`
- `npm install`
- Keep following things handy
    - [NeonDB **post**gress_URL]
    - [Prisma Accelerate_URL]
    - [REDIS_URL]
    - [REDIS_TOKEN]
- In `.env` 
    - DATABASE_URL = `[NeonDB **post**gress_URL]`
- In `wrangler.jsonc`
    - JWT_SECRET
    - DATABASE_URL = [Prisma Accelerate_URL]
    - [REDIS_URL]
    - [REDIS_TOKEN]
- run `npx prisma migrate dev --name init` = To migrate tables in ur DB
- run `npx prisma generate`
- run `npm run dev`
- Your backend is running @ `localhost:8787`

## Deploy Backend
- `npx wrangler whoami`
- `npx wrangler deploy`
## Frontend 
- `cd frontend`
- `npm install`
- provide local backend url in `src/config.ts`
- `npm run dev`
- visit : `localhost:5173`


## API Endpoints :-

### User related : /api/v1/user/...
- **GET**	`/profile`	✅ Fetches the authenticated user’s profile (requires authentication via checkAuth).
- **POST**	`/signup`	✅ Registers a new user by storing username, name, and password. Returns a JWT token on success.
- **POST**	`/signin`	✅ Authenticates an existing user with username and password. Returns a JWT token on success.

### Blog related : /api/v1/blog/...
- **POST**	`/`	✅ Create a new blog (requires authentication). Caches are invalidated.
- **PUT**	`/:blogId`	✅ Update an existing blog by blogId (only the author can update). Caches are invalidated.
- **GET**	`/myblogs`	✅ Fetch blogs created by the authenticated user (sorted by latest).
- **GET**	`/bulk`	✅ Fetch paginated blogs from the database (supports caching with Redis).
- **GET**	`/:blogId`	✅ Fetch details of a single blog using blogId.
- **DELETE**	`/:blogId`	✅ Delete a blog by blogId (only the author can delete). Caches are invalidated.
- **POST**	`/:blogId/addcomment`	✅ Add a comment to a specific blog (requires authentication).
- **DELETE**	`/comment/:commentId`	✅ Delete a comment by commentId (only the owner can delete).




