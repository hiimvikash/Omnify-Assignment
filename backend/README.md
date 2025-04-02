# How to start backend locally ? 
- cd backend
- `npm install`
- create `.env`
```
# This will be used by CLI commands like `npx prisma migrate`
DATABASE_URL="postgresql://omnifyblog_owner:....."
``` 
- Update `wrangler.jsonc` with DB pool URL
```
  "vars": { // will be access by application(index.ts)
    "DATABASE_URL": "prisma://accelerate.prisma-data.net/?......",
    "JWT_SECRET" : "******"
  },
```
- run `npx prisma migrate dev --name init` to migrate all the table in your DB (this will access your DatabaseURL in .env)
- run `npx prisma generate`
- go to `/src/routes/blogRoutes` and update with ur REDIS URI.
- run `npm run dev`
