const fs = require('fs');
const postmanRaw = `
{
  "info": {
    "_postman_id": "72f13e6f-a2ae-485d-ae3d-aff3da324a2b",
    "name": "Oliveto API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "24842446",
    "_collection_link": "https://go.postman.co/collection/24842446-72f13e6f-a2ae-485d-ae3d-aff3da324a2b?source=collection_link"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login with email and password",
          "request": {
            "method": "POST",
            "url": {
              "path": ["api", "auth", "login"]
            }
          }
        },
        {
          "name": "Logout and invalidate refresh token",
          "request": {
            "method": "POST",
            "url": {
              "path": ["api", "auth", "logout"]
            }
          }
        },
        {
          "name": "Register a new user",
          "request": {
            "method": "POST",
            "url": {
              "path": ["api", "auth", "register"]
            }
          }
        },
        {
          "name": "Refresh access token using refresh token",
          "request": {
            "method": "POST",
            "url": {
              "path": ["api", "auth", "refresh"]
            }
          }
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "Get current user profile",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "users", "me"]
            }
          }
        },
        {
          "name": "List all users (admin only)",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "users"]
            }
          }
        },
        {
          "name": "Update currente user profile",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "users", "me"]
            }
          }
        },
        {
          "name": "Change a user role (admin only)",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "users", "cmmf559qg00021068adjj5w1f", "role"]
            }
          }
        }
      ]
    },
    {
      "name": "Articles",
      "item": [
        {
          "name": "Create a new article",
          "request": {
            "method": "POST",
            "url": {
              "path": ["api", "articles"]
            }
          }
        },
        {
          "name": "List articles (filterable)",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "articles"]
            }
          }
        },
        {
          "name": "List published articles with tags",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "articles"]
            }
          }
        },
        {
          "name": "Get article by slug",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "articles", "slug", "a-practical-guide-to-clean-architecture-in-nodejs"]
            }
          }
        },
        {
          "name": "Update an article",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "articles", "{{articleId}}"]
            }
          }
        },
        {
          "name": "Publish an article",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "articles", "{{articleId}}", "publish"]
            }
          }
        },
        {
          "name": "Archive an article Copy",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "articles", "{{articleId}}", "archive"]
            }
          }
        },
        {
          "name": "Delete Article",
          "request": {
            "method": "DELETE",
            "url": {
              "path": ["api", "articles", "{{articleId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Tags",
      "item": [
        {
          "name": "Create a new tag",
          "request": {
            "method": "POST",
            "url": {
              "path": ["api", "tags"]
            }
          }
        },
        {
          "name": "List all Tags",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "tags"]
            }
          }
        },
        {
          "name": "Get tag by id",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "tags", "cmmfa1u030004prs7d9jj1cwt"]
            }
          }
        },
        {
          "name": "Update a tag",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "tags", "cmmfa1u030004prs7d9jj1cwt"]
            }
          }
        },
        {
          "name": "New Request",
          "request": {
            "method": "DELETE",
            "url": {
              "path": ["api", "tags", "cmmfa1u030004prs7d9jj1cwt"]
            }
          }
        }
      ]
    },
    {
      "name": "Leads",
      "item": [
        {
          "name": "Submit a lead from",
          "request": {
            "method": "POST",
            "url": {
              "path": ["api", "leads"]
            }
          }
        },
        {
          "name": "List all leads",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "leads"]
            }
          }
        },
        {
          "name": "Get lead by ID",
          "request": {
            "method": "GET",
            "url": {
              "path": ["api", "leads", "cmmfaxnsn0000147pqg0y9g9e"]
            }
          }
        },
        {
          "name": "Update lead status",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "leads", "cmmfaxnsn0000147pqg0y9g9e", "status"]
            }
          }
        },
        {
          "name": "Add or update internal notes on a lead",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "leads", "cmmfaxnsn0000147pqg0y9g9e", "notes"]
            }
          }
        },
        {
          "name": "Mark a lead as read",
          "request": {
            "method": "PATCH",
            "url": {
              "path": ["api", "leads", "cmmfaxnsn0000147pqg0y9g9e", "read"]
            }
          }
        }
      ]
    },
    {
      "name": "Health",
      "request": {
        "method": "GET",
        "url": {
          "path": ["actuator", "health"]
        }
      }
    }
  ]
}
`;

const data = JSON.parse(postmanRaw);
const apiRoutes = [];

function parsePostman(item) {
  if (item.item) {
    item.item.forEach(parsePostman);
  } else if (item.request) {
    let method = item.request.method;
    let pathArray = item.request.url.path;
    let path = "/" + pathArray.join("/");
    // clean up parameters
    path = path.replace(/\{\{[^}]+\}\}/g, ':id');
    path = path.replace(/cmm[a-z0-9]+/g, ':id'); // match dynamic ids like cmmfaxnsn0000147pqg0y9g9e
    path = path.replace(/a-practical-guide-[a-z0-9-]+/, ':slug');
    apiRoutes.push(`${method} ${path}`);
  }
}

data.item.forEach(parsePostman);

const uniqueRoutes = [...new Set(apiRoutes)];
console.log("Expected Postman Routes:");
console.log(uniqueRoutes.join('\n'));
