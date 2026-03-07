const postmanRoutes = [
  'POST /api/auth/login',
  'POST /api/auth/logout',
  'POST /api/auth/register',
  'POST /api/auth/refresh',
  'GET /api/users/me',
  'GET /api/users',
  'PATCH /api/users/me',
  'PATCH /api/users/:id/role',
  'POST /api/articles',
  'GET /api/articles',
  'GET /api/articles/slug/:slug',
  'PATCH /api/articles/:id',
  'PATCH /api/articles/:id/publish',
  'PATCH /api/articles/:id/archive',
  'DELETE /api/articles/:id',
  'POST /api/tags',
  'GET /api/tags',
  'GET /api/tags/:id',
  'PATCH /api/tags/:id',
  'DELETE /api/tags/:id',
  'POST /api/leads',
  'GET /api/leads',
  'GET /api/leads/:id',
  'PATCH /api/leads/:id/status',
  'PATCH /api/leads/:id/notes',
  'PATCH /api/leads/:id/read',
  'GET /actuator/health'
];

const codebaseRoutes = [
  'DELETE /api/articles/:id',
  'DELETE /api/tags/:id',
  'GET /api/articles',
  'GET /api/articles/:id',
  'GET /api/articles/slug/:slug',
  'GET /api/leads',
  'GET /api/leads/:id',
  'GET /api/leads/unread/count',
  'GET /api/tags',
  'GET /api/tags/:id',
  'GET /api/users',
  'GET /api/users/me',
  'PATCH /api/articles/:id',
  'PATCH /api/articles/:id/archive',
  'PATCH /api/articles/:id/publish',
  'PATCH /api/leads/:id/notes',
  'PATCH /api/leads/:id/read',
  'PATCH /api/leads/:id/status',
  'PATCH /api/tags/:id',
  'PATCH /api/users/:id/role',
  'PATCH /api/users/me',
  'POST /api/articles',
  'POST /api/auth/confirm-register',
  'POST /api/auth/login',
  'POST /api/auth/logout',
  'POST /api/auth/refresh',
  'POST /api/auth/register',
  'POST /api/leads',
  'POST /api/tags'
];

console.log("=== Missing in Codebase ===");
postmanRoutes.forEach(pr => {
  if (!codebaseRoutes.includes(pr)) {
    console.log(pr);
  }
});

console.log("\n=== Not in Postman ===");
codebaseRoutes.forEach(cr => {
  if (!postmanRoutes.includes(cr)) {
    console.log(cr);
  }
});
