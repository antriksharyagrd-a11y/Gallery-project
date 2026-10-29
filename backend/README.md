# Future PhotoSphere Backend — Spring Boot + MySQL

This folder is a **planning boundary**, not an active backend. The current website is entirely frontend-only and remains honest about demo-mode storage.

## Suggested future structure

```text
backend/
├── pom.xml
├── src/main/java/com/photosphere/
│   ├── PhotoSphereApplication.java
│   ├── controller/PhotoController.java
│   ├── service/PhotoService.java
│   ├── repository/PhotoRepository.java
│   ├── model/Photo.java
│   └── dto/PhotoResponse.java
└── src/main/resources/
    └── application.properties
```

## Implementation order

1. Create a Spring Boot project with Spring Web, Spring Data JPA, Validation and the MySQL driver.
2. Add a `Photo` entity with `id`, `title`, `photographer`, `category`, `description`, `imageUrl`, `originalFileName` and `createdAt` fields.
3. Create `PhotoRepository extends JpaRepository<Photo, Long>`.
4. Implement `PhotoService` so controllers do not contain file/database business logic.
5. Store image bytes outside the database in a configured upload directory or object storage. Store only metadata and the resulting file URL in MySQL.
6. Add the four REST endpoints listed below and return consistent JSON errors.
7. Configure CORS for the exact frontend development origin; do not use a blanket permissive production policy without review.
8. Keep MySQL credentials in local environment variables or server configuration, never in `script.js` or public source control.
9. Connect the frontend only after testing the API with real requests. Change `DEMO_MODE` only when success/error handling is implemented.

## Planned REST contract

| Method | Path | Input | Success response |
| --- | --- | --- | --- |
| GET | `/api/photos` | None | `200 OK` with a JSON array |
| GET | `/api/photos/{id}` | Numeric path ID | `200 OK` or `404 Not Found` |
| POST | `/api/photos` | `multipart/form-data` | `201 Created` with saved metadata |
| DELETE | `/api/photos/{id}` | Numeric path ID | `204 No Content` or `404 Not Found` |

Expected multipart field names:

- `photo`: JPG, JPEG, PNG or WebP file, maximum 5 MB.
- `title`: required text, maximum 60 characters.
- `photographer`: required text, maximum 50 characters.
- `category`: one of Nature, Architecture, People, Travel, Animals.
- `description`: optional text, maximum 240 characters.

The server must repeat all validation. Browser validation improves usability but is not a security boundary. Generate safe storage filenames, inspect actual file content, prevent path traversal, and do not serve an executable upload directory.

## Suggested MySQL table

```sql
CREATE TABLE photos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(60) NOT NULL,
  photographer VARCHAR(50) NOT NULL,
  category VARCHAR(20) NOT NULL,
  description VARCHAR(240),
  image_url VARCHAR(500) NOT NULL,
  original_file_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend connection rule

The existing `API_BASE_URL` in `script.js` is the single base-URL configuration point. A future upload should use `FormData`; the browser then supplies the multipart boundary. Never show a permanent-success toast until `response.ok` is true and the server response has been handled. Keep the current local demo path available for offline presentations.
