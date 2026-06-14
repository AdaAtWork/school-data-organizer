# Application Architecture — Family School Dashboard MVP

## Architecture goal

Build a maintainable MVP that a solo developer can understand, extend, and safely build with AI assistance.

The application should be simple, modular, and domain-driven, without introducing microservices, event buses, distributed systems, or unnecessary abstractions too early.

Recommended direction:

> **A modular monolith with layered architecture, one relational database, and separate file storage.**

---

# 1. High-level architecture

```text
User Browser / Mobile Web
        |
        v
Frontend Application
        |
        v
Backend Application
        |
        |--------------------|
        v                    v
Relational Database      File Storage
```

## Frontend

Responsible for:

* User interface
* Form validation for better UX
* Dashboard views
* List/detail pages
* File upload UI
* Authentication screens
* Calling backend application services

The frontend should not contain business rules that must be trusted. It can guide the user, but the backend remains the source of truth.

---

## Backend

Responsible for:

* Authentication checks
* Authorization checks
* Business rules
* Data validation
* Database access
* File upload coordination
* Attachment linking
* Error handling
* Logging

The backend should be organized by business modules, not by technical categories only.

Good module names:

* Authentication
* Family Management
* Children
* Teacher Contacts
* Homework
* School Events
* Permission Slips
* Documents
* Attachments
* Dashboard

---

## Database

Use one relational database for MVP.

Responsible for storing:

* families
* parent users
* family memberships
* children
* teacher contacts
* homework
* homework-child completion status
* events
* permission slips
* school documents
* attachment metadata
* attachment links

The database should enforce important integrity rules using primary keys, foreign keys, unique constraints, and indexes.

---

## File storage

Files should not be stored directly in the database.

Use separate file storage for:

* PDFs
* images
* scanned forms
* homework attachments
* event documents
* permission slip files
* school documents

The database should store only metadata and storage references.

Example:

```text
Database:
attachment id
original file name
file type
file size
storage location
uploaded by
uploaded date

File storage:
actual file content
```

---

# 2. Recommended architectural style

## Recommended: modular monolith

A **modular monolith** is the best fit for this MVP.

```text
One deployable application
One database
Clear internal modules
Clear boundaries between modules
No separate services yet
```

## Why not microservices?

Microservices would add unnecessary complexity:

* multiple deployments
* distributed debugging
* network failures between services
* service authentication
* duplicated infrastructure
* harder testing
* harder local development
* more DevOps work

For a solo developer building an MVP, microservices would slow down delivery without providing meaningful benefit.

## Why not a purely simple CRUD app?

A pure CRUD app may be faster initially, but it can become messy quickly.

This product has real business rules:

* homework completion is per child
* attachments can be reused
* records belong to a family
* parents can share one family workspace
* children are not users
* teachers are contacts, not users
* permission slips have lifecycle statuses

A modular monolith gives enough structure without becoming heavy.

---

# 3. Layered architecture

Recommended internal structure:

```text
Frontend
   |
Backend Application
   |
   |-- Presentation Layer
   |-- Application Layer
   |-- Domain Layer
   |-- Infrastructure Layer
   |
Database / File Storage / External Services
```

---

## Presentation layer

Responsible for receiving user actions and returning responses.

It should handle:

* request parsing
* response formatting
* authentication token/session reading
* basic input shape validation
* calling application services

It should not contain core business logic.

---

## Application layer

Responsible for use cases.

Examples:

* Create homework
* Mark homework completed for one child
* Add school event
* Submit permission slip
* Upload attachment
* Link attachment to homework
* Archive child profile

This layer coordinates domain objects, database operations, authorization, and file storage.

This is the most important layer for keeping the application organized.

---

## Domain layer

Responsible for business concepts and rules.

Contains concepts such as:

* Family
* Parent
* Child
* Teacher Contact
* Homework
* Homework Child Status
* School Event
* Permission Slip
* School Document
* Attachment

Business rules belong here conceptually, even if the MVP implementation is lightweight.

Examples:

```text
Homework must belong to at least one child.

Completing homework for one child must not complete it for another child.

A teacher contact is not a user.

A child is not a user.

A submitted permission slip must have a submission date.

An attachment cannot be deleted while still linked to active records.
```

---

## Infrastructure layer

Responsible for technical details.

Includes:

* database access
* file storage access
* authentication provider integration, if used
* email sending later
* logging provider
* configuration
* background jobs later

The rest of the application should not depend directly on storage details.

---

# 4. Main application modules

## Recommended module map

```text
Application
 ├── Authentication
 ├── Family Management
 ├── Children
 ├── Teacher Contacts
 ├── Homework
 ├── School Events
 ├── Permission Slips
 ├── School Documents
 ├── Attachments
 ├── Dashboard
 └── Shared Kernel
```

---

# 5. Responsibilities of each module

## 5.1 Authentication module

Responsible for:

* parent registration
* login
* logout
* password reset, if applicable
* session/token validation
* current user identity

Does not manage child profiles or family records.

Important MVP rule:

```text
Only parents authenticate.
Children and teachers do not log in.
```

---

## 5.2 Family Management module

Responsible for:

* family workspace creation
* parent membership
* inviting another parent
* parent roles
* family-level access checks
* family settings

Important rules:

```text
A parent can belong to one active family in MVP.

A family can have multiple parents.

Every business record belongs to one family.
```

---

## 5.3 Children module

Responsible for:

* creating child profiles
* editing child profiles
* archiving child profiles
* deleting unused child profiles
* showing child-specific information

Important rule:

```text
A child is a profile, not a user account.
```

Child records are used by:

* Homework
* School Events
* Permission Slips
* Documents
* Dashboard

---

## 5.4 Teacher Contacts module

Responsible for:

* creating teacher contacts
* editing teacher contacts
* archiving teacher contacts
* linking teachers to homework or meetings

Important rule:

```text
A teacher contact is reference data, not an authenticated user.
```

Teacher contacts can be linked to:

* homework
* school events of type `meeting`

---

## 5.5 Homework module

Responsible for:

* creating homework
* editing homework
* deleting or archiving homework
* linking homework to one or more children
* linking homework to a teacher contact
* tracking completion per child
* identifying overdue homework
* handling simple recurrence fields

Important rules:

```text
Homework must be linked to at least one child.

Homework completion is tracked per child.

A homework item is fully completed only when all linked children have completed it.

A homework item is overdue if its due date has passed and at least one linked child has not completed it.
```

This is one of the most important modules in the MVP.

---

## 5.6 School Events module

Responsible for:

* creating events
* editing events
* cancelling events
* archiving events
* linking events to children
* optionally linking meetings to teacher contacts

Event types:

* general
* meeting
* trip
* exam
* holiday
* performance
* other

Important MVP simplification:

```text
Parent meetings are school events with type = meeting.
```

No recurring events in Version 1.

---

## 5.7 Permission Slips module

Responsible for:

* creating permission slips
* linking permission slips to children
* attaching documents
* tracking status
* recording signed date
* recording submission date
* identifying pending or expired slips

Important rules:

```text
A permission slip must be linked to at least one child.

A submitted permission slip must have a submitted date.

Only one signature is required in MVP.

Status is shared across all linked children in MVP.
```

---

## 5.8 School Documents module

Responsible for:

* creating document records
* categorizing documents
* linking documents to children
* linking documents to attachments
* finding documents by category or child
* archiving or deleting document records

Examples:

* timetable
* menu
* medical form
* trip information
* exam schedule
* homework material
* permission slip document

Important distinction:

```text
School Document = organized parent-facing record.
Attachment = actual uploaded file asset.
```

---

## 5.9 Attachments module

Responsible for:

* file upload coordination
* validating file metadata
* storing file metadata
* storing actual files through file storage
* linking files to homework, events, permission slips, or documents
* unlinking files
* preventing unsafe deletion

Important rules:

```text
One attachment can be linked to multiple records.

Unlinking a file from one record does not delete the file globally.

An attachment should not be physically deleted while active links still exist.
```

---

## 5.10 Dashboard module

Responsible for producing read-oriented views.

The dashboard should show:

* homework due soon
* overdue homework
* upcoming events
* pending permission slips
* recent documents
* child-filtered summaries

Important design choice:

```text
Dashboard is not the source of truth.
It reads from Homework, Events, Permission Slips, Documents, and Children.
```

For MVP, this module can use direct queries instead of maintaining separate dashboard tables.

---

## 5.11 Shared Kernel

A small shared area for concepts used across modules.

Examples:

* common date/time helpers
* family access checks
* shared status values
* validation helpers
* common error types
* pagination concepts
* file metadata value objects

Keep this small. Do not let it become a dumping ground.

---

# 6. Communication between modules

Since this is a modular monolith, modules communicate through internal application services, not network calls.

## Recommended communication style

```text
Frontend
  → Backend use case/application service
      → One main module
          → Other modules only through clear interfaces
              → Database/File storage
```

Example: creating homework with attachment

```text
Homework module
 ├── validates homework data
 ├── verifies children belong to same family
 ├── verifies teacher belongs to same family, if provided
 ├── creates homework
 ├── creates homework-child status records
 └── calls Attachment module to link uploaded files
```

Example: dashboard loading

```text
Dashboard module
 ├── reads upcoming homework
 ├── reads overdue homework
 ├── reads upcoming events
 ├── reads pending permission slips
 └── reads recent documents
```

## Avoid direct cross-module database manipulation

For example, the Permission Slips module should not directly manage attachment deletion logic. It should ask the Attachments module to link or unlink files.

Good boundary:

```text
Permission Slips module:
"Attach this file to this permission slip."

Attachments module:
"Check whether the file belongs to this family, then create the link."
```

---

# 7. Authentication and authorization strategy

## Authentication

Only parents authenticate.

Supported MVP flows:

* sign up
* log in
* log out
* reset password
* invite another parent later, if included in MVP

Authentication answers:

```text
Who is this user?
```

---

## Authorization

Authorization answers:

```text
Is this parent allowed to access this family record?
```

Every request that accesses family data should validate:

1. User is authenticated.
2. User has active membership in the family.
3. Requested record belongs to that same family.
4. User has permission for the action.

## MVP authorization model

Keep roles simple:

```text
owner
parent
```

Suggested MVP permissions:

| Action                              | Owner |   Parent |
| ----------------------------------- | ----: | -------: |
| View family data                    |   Yes |      Yes |
| Add children                        |   Yes |      Yes |
| Add homework/events/slips/documents |   Yes |      Yes |
| Edit records                        |   Yes |      Yes |
| Upload files                        |   Yes |      Yes |
| Invite parent                       |   Yes | Optional |
| Remove parent                       |   Yes |       No |
| Delete family                       |   Yes |       No |

For simplicity, regular parents can manage school records, but only owners can manage family-level destructive actions.

---

## Important authorization rule

Never trust IDs from the frontend alone.

Example:

If a request says:

```text
Update homework hw_123
```

The backend must verify:

```text
hw_123 belongs to a family where the current parent has active membership.
```

This applies to:

* children
* teachers
* homework
* events
* permission slips
* documents
* attachments

---

# 8. File upload and storage strategy

## Recommended file flow

```text
Parent selects file
        |
Frontend sends file upload request
        |
Backend validates parent/family access
        |
Backend validates file metadata
        |
Backend stores file in file storage
        |
Backend creates attachment metadata record
        |
Backend links attachment to target record
```

## File storage rules

Store files outside the database.

Database stores:

* attachment ID
* family ID
* original file name
* internal stored file name
* file type
* file size
* storage location
* upload timestamp
* uploaded by parent
* status

File storage contains:

* actual PDF/image/document file

---

## File organization recommendation

Use family-scoped file organization.

Conceptually:

```text
/families/{familyId}/attachments/{attachmentId}/{storedFileName}
```

Do not expose this internal path directly to users.

---

## File validation

Validate:

* file size
* file type
* file extension
* upload ownership
* target record belongs to same family
* file is not empty
* file name is safe to display

For MVP, allow only common safe formats:

* PDF
* images
* basic document formats

Avoid allowing executable files.

---

## File access

Files should not be public by default.

When a parent wants to view or download a file:

1. Backend checks authentication.
2. Backend checks family membership.
3. Backend checks attachment belongs to the family.
4. Backend returns controlled access to the file.

---

## Attachment deletion

Use this rule:

```text
If attachment has active links, do not physically delete it.
If attachment has no active links, it may be soft-deleted or physically deleted.
```

This avoids breaking records that reuse the same file.

---

# 9. Error handling strategy

## Error handling goals

Errors should be:

* predictable
* user-friendly
* safe
* logged internally
* not leaking sensitive details

## Error categories

Use consistent error categories:

| Category             | Meaning                                  |
| -------------------- | ---------------------------------------- |
| Validation error     | User entered invalid data                |
| Authentication error | User is not logged in                    |
| Authorization error  | User cannot access this record           |
| Not found error      | Record does not exist or is inaccessible |
| Conflict error       | Business rule conflict                   |
| File upload error    | File validation/storage failed           |
| System error         | Unexpected failure                       |

---

## Examples

### Validation error

```text
Homework title is required.
```

### Authorization error

```text
You do not have access to this record.
```

### Conflict error

```text
This attachment cannot be deleted because it is still linked to active records.
```

### Not found error

```text
Homework not found.
```

For security, “not found” can also be used when the record exists but belongs to another family.

---

## Backend error handling rule

Application services should return clear domain/application errors.

The presentation layer should translate those into user-friendly responses.

Do not expose:

* database errors
* file storage internals
* stack traces
* internal paths
* sensitive identifiers

---

# 10. Logging and monitoring considerations

For MVP, keep logging simple but useful.

## Log important events

Log:

* login failures
* file upload failures
* permission/authorization failures
* record creation failures
* unexpected system errors
* failed delete attempts
* attachment access failures

## Include useful context

Logs should include:

* timestamp
* user ID
* family ID, where applicable
* action name
* record type
* record ID
* error category
* request correlation ID, if available

Avoid logging:

* passwords
* authentication tokens
* full file contents
* sensitive child notes
* private document contents

---

## Monitoring for MVP

Basic monitoring should answer:

* Is the app running?
* Are users seeing errors?
* Are file uploads failing?
* Is the database reachable?
* Is file storage reachable?
* Are response times acceptable?

Suggested MVP monitoring areas:

```text
Application availability
Error rate
Request latency
Database failures
File upload failures
Storage failures
Authentication failures
```

No need for advanced observability in the first version, but do not ignore logs entirely.

---

# 11. Scalability considerations for future versions

The MVP does not need complex scalability architecture, but it should avoid obvious dead ends.

## Database scalability

Design for:

* indexing common queries
* family-based filtering
* child-based filtering
* due date queries
* status queries

Important dashboard queries:

```text
Homework due soon by family
Overdue homework by family
Upcoming events by family
Pending permission slips by family
Recent documents by family
```

Indexes should support these.

---

## File storage scalability

Use external file storage instead of database blobs so the application can grow without making the database huge.

Future file-related improvements:

* virus scanning
* image previews
* PDF previews
* file size limits by account plan
* duplicate detection
* document OCR
* secure temporary download links

---

## Background jobs later

Do not add a background job system immediately unless needed.

Likely future uses:

* sending reminders
* processing uploaded files
* generating previews
* scanning files
* OCR extraction
* cleanup of deleted files

For MVP, many things can remain synchronous.

---

## Future module extraction

If the app grows significantly, some modules could later become separate services.

Possible future extraction candidates:

* File Processing
* Notifications
* AI Document Extraction
* Calendar Sync
* School/LMS Integrations

But for MVP, keep them inside the modular monolith or out of scope.

---

# 12. Risks and trade-offs

## Risk 1: Modular monolith becomes messy

A monolith is simple, but it can become disorganized if boundaries are ignored.

Mitigation:

* organize by feature/domain module
* keep clear application services
* avoid random cross-module database writes
* keep shared code small

---

## Risk 2: Attachments create complexity

Reusable attachments are useful, but they complicate deletion.

Mitigation:

* use explicit attachment link tables
* distinguish unlink from delete
* prevent physical delete while links exist

---

## Risk 3: Homework recurrence can become complicated

Recurring homework sounds simple, but editing recurrence can become complex.

Questions that may appear later:

* edit only this occurrence?
* edit all occurrences?
* edit future occurrences?
* what if one child completed one occurrence?

Mitigation for MVP:

* keep recurrence simple
* possibly treat recurrence as notes or simple pattern first
* avoid building a full recurrence engine in Version 1

---

## Risk 4: Permission slips linked to multiple children may need per-child status

MVP uses one shared permission slip status.

This is simple, but may not work if:

* one child’s slip is submitted
* another child’s slip is not
* one child needs a different deadline

Mitigation:

* document this limitation
* later introduce `permission_slip_child_status`

---

## Risk 5: Parent permissions may become sensitive

For MVP, parents have broad access.

Future cases may require more nuance:

* divorced/separated parents
* read-only guardians
* restricted access
* child-specific access

Mitigation:

* keep `family_memberships`
* use roles
* do not hardcode “all parents can do everything forever”

---

## Risk 6: Dashboard queries may become slow later

At small scale, dashboard queries are simple.

At larger scale, due-soon and overdue calculations may become heavier.

Mitigation:

* add indexes from the beginning
* keep dashboard as read model
* later add cached projections if needed

---

# 13. Recommended MVP architecture summary

```text
Frontend application
   |
   v
Backend modular monolith
   |
   |-- Authentication
   |-- Family Management
   |-- Children
   |-- Teacher Contacts
   |-- Homework
   |-- School Events
   |-- Permission Slips
   |-- School Documents
   |-- Attachments
   |-- Dashboard
   |
   v
Relational database
   |
   v
Attachment metadata

Separate file storage
   |
   v
Uploaded files
```

## Final recommendation

For Version 1, build:

> **A modular monolith with a layered backend, a single relational database, and external file storage.**

This gives you:

* simple local development
* easier debugging
* fewer deployment concerns
* clear domain boundaries
* enough structure for growth
* manageable complexity for one developer using AI assistance

Avoid microservices, event-driven architecture, complex permission systems, full audit trails, notification infrastructure, and advanced file processing until the MVP proves the core product value.
