# Version 1 Data Model — Family School Dashboard

## Design direction

This data model supports a first MVP where parents manually organize:

* children
* teacher contacts
* homework
* school events, including parent meetings
* permission slips
* school documents
* reusable attachments

There are **no student users**, **no teacher users**, **no school integration**, and **no class/school hierarchy**.

---

# 1. Recommended database tables

## Core account and family tables

1. `families`
2. `parent_users`
3. `family_memberships`
4. `children`

## Reference data

5. `teacher_contacts`

## Main school tracking tables

6. `homework`
7. `homework_children`
8. `school_events`
9. `school_event_children`
10. `permission_slips`
11. `permission_slip_children`
12. `school_documents`
13. `school_document_children`

## Attachment tables

14. `attachments`
15. `homework_attachments`
16. `school_event_attachments`
17. `permission_slip_attachments`
18. `school_document_attachments`

This avoids a generic polymorphic attachment table and keeps relationships explicit and easy to understand.

---

# 2. Tables and columns

## 2.1 `families`

Represents one private family workspace.

| Column       | Required? | Purpose                                 |
| ------------ | --------: | --------------------------------------- |
| `id`         |  Required | Primary key                             |
| `name`       |  Required | Family/workspace name                   |
| `status`     |  Required | `active`, `archived`, `deleted`         |
| `created_at` |  Required | Creation timestamp                      |
| `updated_at` |  Required | Last update timestamp                   |
| `deleted_at` |  Optional | Set when family is deleted/soft-deleted |

### Primary key

```text
families.id
```

### Notes

The family is the top-level data boundary. Almost every business table should reference `family_id`.

---

## 2.2 `parent_users`

Represents authenticated parent accounts.

| Column           | Required? | Purpose                                    |
| ---------------- | --------: | ------------------------------------------ |
| `id`             |  Required | Primary key                                |
| `email`          |  Required | Login/contact email                        |
| `display_name`   |  Required | Parent name shown in app                   |
| `account_status` |  Required | `active`, `invited`, `disabled`, `deleted` |
| `created_at`     |  Required | Creation timestamp                         |
| `updated_at`     |  Required | Last update timestamp                      |
| `last_login_at`  |  Optional | Last login timestamp                       |
| `deleted_at`     |  Optional | Set when account is deleted                |

### Primary key

```text
parent_users.id
```

### Important

Do **not** store child users here. Children are not users in the MVP.

---

## 2.3 `family_memberships`

Connects parent users to a family.

Even if the MVP assumes one family per parent, this table is still useful because multiple parents can manage the same family.

| Column                      | Required? | Purpose                        |
| --------------------------- | --------: | ------------------------------ |
| `id`                        |  Required | Primary key                    |
| `family_id`                 |  Required | FK to `families.id`            |
| `parent_user_id`            |  Required | FK to `parent_users.id`        |
| `role`                      |  Required | `owner`, `parent`              |
| `status`                    |  Required | `active`, `invited`, `removed` |
| `invited_by_parent_user_id` |  Optional | FK to parent who invited them  |
| `joined_at`                 |  Optional | When parent accepted invite    |
| `created_at`                |  Required | Creation timestamp             |
| `updated_at`                |  Required | Last update timestamp          |

### Primary key

```text
family_memberships.id
```

### Foreign keys

```text
family_memberships.family_id → families.id
family_memberships.parent_user_id → parent_users.id
family_memberships.invited_by_parent_user_id → parent_users.id
```

### MVP constraint

A parent should have only **one active family membership**.

---

## 2.4 `children`

Represents child profiles. Children are not app users.

| Column                      | Required? | Purpose                         |
| --------------------------- | --------: | ------------------------------- |
| `id`                        |  Required | Primary key                     |
| `family_id`                 |  Required | FK to `families.id`             |
| `first_name`                |  Required | Child first name                |
| `last_name`                 |  Optional | Child last name                 |
| `date_of_birth`             |  Optional | Useful but not required         |
| `notes`                     |  Optional | Parent notes                    |
| `status`                    |  Required | `active`, `archived`, `deleted` |
| `created_by_parent_user_id` |  Required | FK to `parent_users.id`         |
| `created_at`                |  Required | Creation timestamp              |
| `updated_at`                |  Required | Last update timestamp           |
| `archived_at`               |  Optional | Set when child is archived      |
| `deleted_at`                |  Optional | Set when child is deleted       |

### Primary key

```text
children.id
```

### Foreign keys

```text
children.family_id → families.id
children.created_by_parent_user_id → parent_users.id
```

---

## 2.5 `teacher_contacts`

Teacher reference data manually added by parents.

| Column                      | Required? | Purpose                         |
| --------------------------- | --------: | ------------------------------- |
| `id`                        |  Required | Primary key                     |
| `family_id`                 |  Required | FK to `families.id`             |
| `name`                      |  Required | Teacher name                    |
| `subject`                   |  Optional | Subject, for example Math       |
| `email`                     |  Optional | Teacher email                   |
| `phone`                     |  Optional | Teacher phone                   |
| `notes`                     |  Optional | Parent notes                    |
| `status`                    |  Required | `active`, `archived`, `deleted` |
| `created_by_parent_user_id` |  Required | FK to `parent_users.id`         |
| `created_at`                |  Required | Creation timestamp              |
| `updated_at`                |  Required | Last update timestamp           |
| `archived_at`               |  Optional | Set when archived               |
| `deleted_at`                |  Optional | Set when deleted                |

### Primary key

```text
teacher_contacts.id
```

### Foreign keys

```text
teacher_contacts.family_id → families.id
teacher_contacts.created_by_parent_user_id → parent_users.id
```

### Important

Teachers are **not users** and do not log in.

---

# 3. Homework tables

## 3.1 `homework`

Represents a homework item.

| Column                      | Required? | Purpose                              |
| --------------------------- | --------: | ------------------------------------ |
| `id`                        |  Required | Primary key                          |
| `family_id`                 |  Required | FK to `families.id`                  |
| `teacher_contact_id`        |  Optional | FK to `teacher_contacts.id`          |
| `title`                     |  Required | Homework title                       |
| `description`               |  Optional | Assignment details                   |
| `due_at`                    |  Optional | Due date/time                        |
| `priority`                  |  Optional | `low`, `normal`, `high`              |
| `recurrence_type`           |  Optional | `none`, `daily`, `weekly`, `monthly` |
| `recurrence_notes`          |  Optional | Simple recurrence explanation        |
| `status`                    |  Required | `active`, `archived`, `deleted`      |
| `created_by_parent_user_id` |  Required | FK to `parent_users.id`              |
| `created_at`                |  Required | Creation timestamp                   |
| `updated_at`                |  Required | Last update timestamp                |
| `archived_at`               |  Optional | Set when archived                    |
| `deleted_at`                |  Optional | Set when deleted                     |

### Primary key

```text
homework.id
```

### Foreign keys

```text
homework.family_id → families.id
homework.teacher_contact_id → teacher_contacts.id
homework.created_by_parent_user_id → parent_users.id
```

### Notes

Do not store a single global completion status on `homework`. Completion belongs in `homework_children`.

---

## 3.2 `homework_children`

Links homework to one or more children and tracks completion per child.

| Column              | Required? | Purpose                                   |
| ------------------- | --------: | ----------------------------------------- |
| `id`                |  Required | Primary key                               |
| `homework_id`       |  Required | FK to `homework.id`                       |
| `child_id`          |  Required | FK to `children.id`                       |
| `completion_status` |  Required | `not_started`, `in_progress`, `completed` |
| `completed_at`      |  Optional | Required only if completed                |
| `completion_notes`  |  Optional | Notes for this child’s work               |
| `created_at`        |  Required | Creation timestamp                        |
| `updated_at`        |  Required | Last update timestamp                     |

### Primary key

```text
homework_children.id
```

### Foreign keys

```text
homework_children.homework_id → homework.id
homework_children.child_id → children.id
```

### Important unique constraint

```text
homework_id + child_id must be unique
```

This prevents the same child being linked twice to the same homework.

---

# 4. Event tables

## 4.1 `school_events`

Represents school-related events and meetings.

| Column                      | Required? | Purpose                                                                 |
| --------------------------- | --------: | ----------------------------------------------------------------------- |
| `id`                        |  Required | Primary key                                                             |
| `family_id`                 |  Required | FK to `families.id`                                                     |
| `teacher_contact_id`        |  Optional | FK to `teacher_contacts.id`                                             |
| `title`                     |  Required | Event title                                                             |
| `event_type`                |  Required | `general`, `meeting`, `trip`, `exam`, `holiday`, `performance`, `other` |
| `start_at`                  |  Required | Event start date/time                                                   |
| `end_at`                    |  Optional | Event end date/time                                                     |
| `is_all_day`                |  Required | Whether event is all-day                                                |
| `location`                  |  Optional | Physical location or meeting link                                       |
| `notes`                     |  Optional | Parent notes                                                            |
| `status`                    |  Required | `scheduled`, `cancelled`, `archived`, `deleted`                         |
| `created_by_parent_user_id` |  Required | FK to `parent_users.id`                                                 |
| `created_at`                |  Required | Creation timestamp                                                      |
| `updated_at`                |  Required | Last update timestamp                                                   |
| `cancelled_at`              |  Optional | Set when cancelled                                                      |
| `archived_at`               |  Optional | Set when archived                                                       |
| `deleted_at`                |  Optional | Set when deleted                                                        |

### Primary key

```text
school_events.id
```

### Foreign keys

```text
school_events.family_id → families.id
school_events.teacher_contact_id → teacher_contacts.id
school_events.created_by_parent_user_id → parent_users.id
```

---

## 4.2 `school_event_children`

Links events to one or more children.

| Column            | Required? | Purpose                  |
| ----------------- | --------: | ------------------------ |
| `id`              |  Required | Primary key              |
| `school_event_id` |  Required | FK to `school_events.id` |
| `child_id`        |  Required | FK to `children.id`      |
| `created_at`      |  Required | Creation timestamp       |

### Primary key

```text
school_event_children.id
```

### Foreign keys

```text
school_event_children.school_event_id → school_events.id
school_event_children.child_id → children.id
```

### Important unique constraint

```text
school_event_id + child_id must be unique
```

---

# 5. Permission slip tables

## 5.1 `permission_slips`

Represents a permission slip or parent action form.

| Column                      | Required? | Purpose                                                                         |
| --------------------------- | --------: | ------------------------------------------------------------------------------- |
| `id`                        |  Required | Primary key                                                                     |
| `family_id`                 |  Required | FK to `families.id`                                                             |
| `title`                     |  Required | Permission slip title                                                           |
| `description`               |  Optional | Details                                                                         |
| `due_at`                    |  Optional | Deadline                                                                        |
| `status`                    |  Required | `pending`, `signed`, `submitted`, `expired`, `cancelled`, `archived`, `deleted` |
| `signed_at`                 |  Optional | Set when signed                                                                 |
| `submitted_at`              |  Optional | Set when submitted                                                              |
| `notes`                     |  Optional | Parent notes                                                                    |
| `created_by_parent_user_id` |  Required | FK to `parent_users.id`                                                         |
| `created_at`                |  Required | Creation timestamp                                                              |
| `updated_at`                |  Required | Last update timestamp                                                           |
| `archived_at`               |  Optional | Set when archived                                                               |
| `deleted_at`                |  Optional | Set when deleted                                                                |

### Primary key

```text
permission_slips.id
```

### Foreign keys

```text
permission_slips.family_id → families.id
permission_slips.created_by_parent_user_id → parent_users.id
```

### MVP simplification

One permission slip has one shared status, even if linked to multiple children.

If later you need different submission status per child, add a status column to `permission_slip_children` or introduce a separate `permission_slip_child_statuses` concept.

---

## 5.2 `permission_slip_children`

Links permission slips to one or more children.

| Column               | Required? | Purpose                     |
| -------------------- | --------: | --------------------------- |
| `id`                 |  Required | Primary key                 |
| `permission_slip_id` |  Required | FK to `permission_slips.id` |
| `child_id`           |  Required | FK to `children.id`         |
| `created_at`         |  Required | Creation timestamp          |

### Primary key

```text
permission_slip_children.id
```

### Foreign keys

```text
permission_slip_children.permission_slip_id → permission_slips.id
permission_slip_children.child_id → children.id
```

### Important unique constraint

```text
permission_slip_id + child_id must be unique
```

---

# 6. School document tables

## 6.1 `school_documents`

Represents a parent-organized school document.

Examples:

* timetable
* lunch menu
* medical form
* exam schedule
* school policy
* trip information
* general uploaded document

| Column                      | Required? | Purpose                                                                                           |
| --------------------------- | --------: | ------------------------------------------------------------------------------------------------- |
| `id`                        |  Required | Primary key                                                                                       |
| `family_id`                 |  Required | FK to `families.id`                                                                               |
| `title`                     |  Required | Document title                                                                                    |
| `category`                  |  Required | `timetable`, `menu`, `medical`, `trip`, `exam`, `homework`, `permission_slip`, `general`, `other` |
| `description`               |  Optional | Document notes                                                                                    |
| `status`                    |  Required | `active`, `archived`, `deleted`                                                                   |
| `created_by_parent_user_id` |  Required | FK to `parent_users.id`                                                                           |
| `created_at`                |  Required | Creation timestamp                                                                                |
| `updated_at`                |  Required | Last update timestamp                                                                             |
| `archived_at`               |  Optional | Set when archived                                                                                 |
| `deleted_at`                |  Optional | Set when deleted                                                                                  |

### Primary key

```text
school_documents.id
```

### Foreign keys

```text
school_documents.family_id → families.id
school_documents.created_by_parent_user_id → parent_users.id
```

---

## 6.2 `school_document_children`

Links documents to children.

| Column               | Required? | Purpose                     |
| -------------------- | --------: | --------------------------- |
| `id`                 |  Required | Primary key                 |
| `school_document_id` |  Required | FK to `school_documents.id` |
| `child_id`           |  Required | FK to `children.id`         |
| `created_at`         |  Required | Creation timestamp          |

### Primary key

```text
school_document_children.id
```

### Foreign keys

```text
school_document_children.school_document_id → school_documents.id
school_document_children.child_id → children.id
```

### Important unique constraint

```text
school_document_id + child_id must be unique
```

---

# 7. Attachment tables

## 7.1 `attachments`

Represents a reusable uploaded file.

| Column                       | Required? | Purpose                             |
| ---------------------------- | --------: | ----------------------------------- |
| `id`                         |  Required | Primary key                         |
| `family_id`                  |  Required | FK to `families.id`                 |
| `original_file_name`         |  Required | Name uploaded by parent             |
| `stored_file_name`           |  Required | Internal stored file name/reference |
| `file_type`                  |  Required | MIME type or file category          |
| `file_size`                  |  Required | File size                           |
| `storage_location`           |  Required | Storage path/reference              |
| `checksum`                   |  Optional | Used for duplicate detection later  |
| `status`                     |  Required | `active`, `deleted`                 |
| `uploaded_by_parent_user_id` |  Required | FK to `parent_users.id`             |
| `uploaded_at`                |  Required | Upload timestamp                    |
| `deleted_at`                 |  Optional | Set when file is deleted            |

### Primary key

```text
attachments.id
```

### Foreign keys

```text
attachments.family_id → families.id
attachments.uploaded_by_parent_user_id → parent_users.id
```

### Notes

An attachment can be linked to multiple records.

---

## 7.2 `homework_attachments`

Links attachments to homework.

| Column          | Required? | Purpose                 |
| --------------- | --------: | ----------------------- |
| `id`            |  Required | Primary key             |
| `homework_id`   |  Required | FK to `homework.id`     |
| `attachment_id` |  Required | FK to `attachments.id`  |
| `created_at`    |  Required | Link creation timestamp |

### Foreign keys

```text
homework_attachments.homework_id → homework.id
homework_attachments.attachment_id → attachments.id
```

### Unique constraint

```text
homework_id + attachment_id must be unique
```

---

## 7.3 `school_event_attachments`

Links attachments to school events.

| Column            | Required? | Purpose                  |
| ----------------- | --------: | ------------------------ |
| `id`              |  Required | Primary key              |
| `school_event_id` |  Required | FK to `school_events.id` |
| `attachment_id`   |  Required | FK to `attachments.id`   |
| `created_at`      |  Required | Link creation timestamp  |

### Foreign keys

```text
school_event_attachments.school_event_id → school_events.id
school_event_attachments.attachment_id → attachments.id
```

### Unique constraint

```text
school_event_id + attachment_id must be unique
```

---

## 7.4 `permission_slip_attachments`

Links attachments to permission slips.

| Column               | Required? | Purpose                     |
| -------------------- | --------: | --------------------------- |
| `id`                 |  Required | Primary key                 |
| `permission_slip_id` |  Required | FK to `permission_slips.id` |
| `attachment_id`      |  Required | FK to `attachments.id`      |
| `created_at`         |  Required | Link creation timestamp     |

### Foreign keys

```text
permission_slip_attachments.permission_slip_id → permission_slips.id
permission_slip_attachments.attachment_id → attachments.id
```

### Unique constraint

```text
permission_slip_id + attachment_id must be unique
```

---

## 7.5 `school_document_attachments`

Links attachments to school documents.

| Column               | Required? | Purpose                     |
| -------------------- | --------: | --------------------------- |
| `id`                 |  Required | Primary key                 |
| `school_document_id` |  Required | FK to `school_documents.id` |
| `attachment_id`      |  Required | FK to `attachments.id`      |
| `created_at`         |  Required | Link creation timestamp     |

### Foreign keys

```text
school_document_attachments.school_document_id → school_documents.id
school_document_attachments.attachment_id → attachments.id
```

### Unique constraint

```text
school_document_id + attachment_id must be unique
```

---

# 8. Relationship overview

## Family ownership

```text
families
 ├── parent_users through family_memberships
 ├── children
 ├── teacher_contacts
 ├── homework
 ├── school_events
 ├── permission_slips
 ├── school_documents
 └── attachments
```

## Parent membership

```text
parent_users
 └── family_memberships
      └── families
```

## Children and school records

```text
children
 ├── homework through homework_children
 ├── school_events through school_event_children
 ├── permission_slips through permission_slip_children
 └── school_documents through school_document_children
```

## Homework

```text
homework
 ├── teacher_contacts, optional
 ├── children through homework_children
 └── attachments through homework_attachments
```

## Events

```text
school_events
 ├── teacher_contacts, optional
 ├── children through school_event_children
 └── attachments through school_event_attachments
```

## Permission slips

```text
permission_slips
 ├── children through permission_slip_children
 └── attachments through permission_slip_attachments
```

## Documents and attachments

```text
school_documents
 ├── children through school_document_children
 └── attachments through school_document_attachments
```

---

# 9. Suggested indexes

## Account and family

```text
parent_users.email
family_memberships.parent_user_id
family_memberships.family_id
family_memberships.family_id + parent_user_id
```

Unique:

```text
parent_users.email
family_memberships.family_id + parent_user_id
```

MVP business uniqueness:

```text
one active family_membership per parent_user_id
```

---

## Children

```text
children.family_id
children.family_id + status
children.family_id + first_name
```

---

## Teacher contacts

```text
teacher_contacts.family_id
teacher_contacts.family_id + name
teacher_contacts.family_id + subject
teacher_contacts.family_id + status
```

---

## Homework

```text
homework.family_id
homework.family_id + due_at
homework.family_id + status
homework.teacher_contact_id
homework_children.child_id
homework_children.homework_id
homework_children.child_id + completion_status
homework_children.homework_id + child_id
```

Unique:

```text
homework_children.homework_id + homework_children.child_id
```

---

## Events

```text
school_events.family_id
school_events.family_id + start_at
school_events.family_id + event_type
school_events.family_id + status
school_event_children.child_id
school_event_children.school_event_id
school_event_children.school_event_id + child_id
```

Unique:

```text
school_event_children.school_event_id + school_event_children.child_id
```

---

## Permission slips

```text
permission_slips.family_id
permission_slips.family_id + due_at
permission_slips.family_id + status
permission_slip_children.child_id
permission_slip_children.permission_slip_id
permission_slip_children.permission_slip_id + child_id
```

Unique:

```text
permission_slip_children.permission_slip_id + permission_slip_children.child_id
```

---

## School documents

```text
school_documents.family_id
school_documents.family_id + category
school_documents.family_id + status
school_documents.family_id + created_at
school_document_children.child_id
school_document_children.school_document_id
```

Unique:

```text
school_document_children.school_document_id + school_document_children.child_id
```

---

## Attachments

```text
attachments.family_id
attachments.family_id + uploaded_at
attachments.family_id + status
attachments.uploaded_by_parent_user_id
attachments.checksum
```

Attachment link indexes:

```text
homework_attachments.homework_id
homework_attachments.attachment_id

school_event_attachments.school_event_id
school_event_attachments.attachment_id

permission_slip_attachments.permission_slip_id
permission_slip_attachments.attachment_id

school_document_attachments.school_document_id
school_document_attachments.attachment_id
```

---

# 10. Data validation rules

## Family validation

* `name` is required.
* `status` must be one of:

  * `active`
  * `archived`
  * `deleted`
* A deleted family should not allow new children, homework, events, permission slips, or documents.

---

## Parent validation

* `email` is required.
* `email` must be unique.
* `email` must be in a valid email format.
* `display_name` is required.
* `account_status` must be one of:

  * `active`
  * `invited`
  * `disabled`
  * `deleted`

---

## Family membership validation

* A membership must reference a valid family.
* A membership must reference a valid parent.
* `role` must be one of:

  * `owner`
  * `parent`
* `status` must be one of:

  * `active`
  * `invited`
  * `removed`
* A parent can have only one active family membership in MVP.
* A family must have at least one active owner.

---

## Child validation

* `first_name` is required.
* `family_id` is required.
* A child must belong to exactly one family.
* `status` must be one of:

  * `active`
  * `archived`
  * `deleted`

---

## Teacher contact validation

* `name` is required.
* `email` is optional, but if provided, it must be a valid email format.
* `phone` is optional.
* A teacher contact belongs to exactly one family.
* `status` must be one of:

  * `active`
  * `archived`
  * `deleted`

---

## Homework validation

* `title` is required.
* `family_id` is required.
* Homework must be linked to at least one child through `homework_children`.
* If `teacher_contact_id` is provided, the teacher must belong to the same family.
* If `due_at` is provided, it should be a valid future or past date/time.
* `priority` must be one of:

  * `low`
  * `normal`
  * `high`
* `recurrence_type` must be one of:

  * `none`
  * `daily`
  * `weekly`
  * `monthly`
* `status` must be one of:

  * `active`
  * `archived`
  * `deleted`

---

## Homework child status validation

* One `homework_children` record is required per child linked to homework.
* `homework_id + child_id` must be unique.
* `completion_status` must be one of:

  * `not_started`
  * `in_progress`
  * `completed`
* `completed_at` is required when `completion_status = completed`.
* `completed_at` should be empty or ignored when status is not completed.
* Homework and child must belong to the same family.

---

## Event validation

* `title` is required.
* `family_id` is required.
* `start_at` is required.
* Event must be linked to at least one child through `school_event_children`.
* If `end_at` is provided, it should not be earlier than `start_at`.
* If `is_all_day = true`, time values should be normalized consistently.
* `event_type` must be one of:

  * `general`
  * `meeting`
  * `trip`
  * `exam`
  * `holiday`
  * `performance`
  * `other`
* `status` must be one of:

  * `scheduled`
  * `cancelled`
  * `archived`
  * `deleted`
* If `teacher_contact_id` is provided, the teacher must belong to the same family.

---

## Permission slip validation

* `title` is required.
* `family_id` is required.
* Permission slip must be linked to at least one child through `permission_slip_children`.
* `status` must be one of:

  * `pending`
  * `signed`
  * `submitted`
  * `expired`
  * `cancelled`
  * `archived`
  * `deleted`
* `signed_at` is required when `status = signed`, unless the item later moves to submitted.
* `submitted_at` is required when `status = submitted`.
* If `submitted_at` is set, it should not be before `signed_at` when both exist.
* Permission slip and linked children must belong to the same family.

---

## School document validation

* `title` is required.
* `family_id` is required.
* `category` must be one of:

  * `timetable`
  * `menu`
  * `medical`
  * `trip`
  * `exam`
  * `homework`
  * `permission_slip`
  * `general`
  * `other`
* A document may be standalone, so child links are optional.
* `status` must be one of:

  * `active`
  * `archived`
  * `deleted`

---

## Attachment validation

* `family_id` is required.
* `original_file_name` is required.
* `stored_file_name` is required.
* `file_type` is required.
* `file_size` is required and must be greater than zero.
* `storage_location` is required.
* Uploaded file must belong to the same family as any record it is linked to.
* `status` must be one of:

  * `active`
  * `deleted`

---

# 11. Deletion and archiving rules

## General principle

For MVP, use **soft deletion** for most business records.

That means:

* set `status = deleted`
* set `deleted_at`
* hide from normal views
* keep data recoverable internally if needed

This is safer than hard deletion because many records are linked to children, attachments, and family history.

---

## What can be deleted

Parents should be allowed to delete:

* homework they created
* events they created
* permission slips they created
* school documents they created
* attachments they uploaded, if not linked elsewhere
* teacher contacts, if not actively used
* child profiles, if no important linked history exists

For MVP, the app can present this as “Delete,” but internally it should usually be soft delete.

---

## What should be archived instead

Prefer archive instead of delete for:

### Children

If a child has linked homework, events, permission slips, or documents:

```text
Archive child instead of deleting.
```

Reason: deleting the child would damage historical records.

---

### Teacher contacts

If a teacher is linked to homework or events:

```text
Archive teacher contact instead of deleting.
```

Reason: past homework and meetings should still show the teacher context.

---

### Homework

If homework has completion history or attachments:

```text
Soft delete or archive.
```

Do not hard delete immediately.

---

### Permission slips

If a permission slip was submitted:

```text
Archive instead of deleting.
```

Reason: submitted permission slips may be useful as historical records.

---

### Attachments

If an attachment is linked to any record:

```text
Do not physically delete it.
Unlink it from the record first.
Only physically delete when no links remain.
```

---

## Suggested deletion behavior by table

| Table                      | Recommended deletion behavior                  |
| -------------------------- | ---------------------------------------------- |
| `families`                 | Soft delete                                    |
| `parent_users`             | Soft delete / deactivate                       |
| `family_memberships`       | Mark as `removed`                              |
| `children`                 | Archive if linked, soft delete if unused       |
| `teacher_contacts`         | Archive if linked, soft delete if unused       |
| `homework`                 | Soft delete                                    |
| `homework_children`        | Remove only when unlinking child from homework |
| `school_events`            | Cancel, archive, or soft delete                |
| `school_event_children`    | Remove only when unlinking child from event    |
| `permission_slips`         | Archive if submitted, soft delete otherwise    |
| `permission_slip_children` | Remove only when unlinking child from slip     |
| `school_documents`         | Soft delete                                    |
| `school_document_children` | Remove only when unlinking child from document |
| `attachments`              | Soft delete only when no active links exist    |
| Attachment link tables     | Hard delete link rows is acceptable            |

---

# 12. Simple example records

The examples below are conceptual. They are not SQL.

## `families`

| id        | name           | status |
| --------- | -------------- | ------ |
| `fam_001` | Ionescu Family | active |

---

## `parent_users`

| id        | email                                         | display_name  | account_status |
| --------- | --------------------------------------------- | ------------- | -------------- |
| `par_001` | [ada@example.com](mailto:ada@example.com)     | Ada Ionescu   | active         |
| `par_002` | [mihai@example.com](mailto:mihai@example.com) | Mihai Ionescu | active         |

---

## `family_memberships`

| id        | family_id | parent_user_id | role   | status |
| --------- | --------- | -------------- | ------ | ------ |
| `mem_001` | `fam_001` | `par_001`      | owner  | active |
| `mem_002` | `fam_001` | `par_002`      | parent | active |

---

## `children`

| id        | family_id | first_name | last_name | status |
| --------- | --------- | ---------- | --------- | ------ |
| `chi_001` | `fam_001` | Ana        | Ionescu   | active |
| `chi_002` | `fam_001` | Matei      | Ionescu   | active |

---

## `teacher_contacts`

| id        | family_id | name          | subject | email                                                 | status |
| --------- | --------- | ------------- | ------- | ----------------------------------------------------- | ------ |
| `tea_001` | `fam_001` | Mrs. Popescu  | Math    | [popescu@example.com](mailto:popescu@example.com)     | active |
| `tea_002` | `fam_001` | Mr. Georgescu | English | [georgescu@example.com](mailto:georgescu@example.com) | active |

---

## `homework`

| id       | family_id | teacher_contact_id | title                  | due_at           | priority | recurrence_type | status |
| -------- | --------- | ------------------ | ---------------------- | ---------------- | -------- | --------------- | ------ |
| `hw_001` | `fam_001` | `tea_001`          | Math worksheet page 12 | 2026-06-15 18:00 | normal   | none            | active |
| `hw_002` | `fam_001` | `tea_002`          | Read chapter 3         | 2026-06-18 18:00 | high     | weekly          | active |

---

## `homework_children`

| id        | homework_id | child_id  | completion_status | completed_at     |
| --------- | ----------- | --------- | ----------------- | ---------------- |
| `hwc_001` | `hw_001`    | `chi_001` | completed         | 2026-06-14 17:30 |
| `hwc_002` | `hw_001`    | `chi_002` | not_started       | empty            |
| `hwc_003` | `hw_002`    | `chi_001` | in_progress       | empty            |

This supports the rule that the same homework can apply to multiple children, but each child has separate completion.

---

## `school_events`

| id        | family_id | teacher_contact_id | title                            | event_type | start_at         | end_at           | location    | status    |
| --------- | --------- | ------------------ | -------------------------------- | ---------- | ---------------- | ---------------- | ----------- | --------- |
| `evt_001` | `fam_001` | empty              | Museum trip                      | trip       | 2026-06-20 09:00 | 2026-06-20 14:00 | City Museum | scheduled |
| `evt_002` | `fam_001` | `tea_001`          | Parent meeting with Math teacher | meeting    | 2026-06-22 16:00 | 2026-06-22 16:30 | Classroom 2 | scheduled |

---

## `school_event_children`

| id        | school_event_id | child_id  |
| --------- | --------------- | --------- |
| `evc_001` | `evt_001`       | `chi_001` |
| `evc_002` | `evt_001`       | `chi_002` |
| `evc_003` | `evt_002`       | `chi_001` |

---

## `permission_slips`

| id       | family_id | title                       | due_at           | status    | signed_at        | submitted_at     |
| -------- | --------- | --------------------------- | ---------------- | --------- | ---------------- | ---------------- |
| `ps_001` | `fam_001` | Museum trip permission slip | 2026-06-17 18:00 | submitted | 2026-06-13 20:00 | 2026-06-14 08:30 |
| `ps_002` | `fam_001` | Medical update form         | 2026-06-25 18:00 | pending   | empty            | empty            |

---

## `permission_slip_children`

| id        | permission_slip_id | child_id  |
| --------- | ------------------ | --------- |
| `psc_001` | `ps_001`           | `chi_001` |
| `psc_002` | `ps_001`           | `chi_002` |
| `psc_003` | `ps_002`           | `chi_001` |

---

## `school_documents`

| id        | family_id | title               | category | status |
| --------- | --------- | ------------------- | -------- | ------ |
| `doc_001` | `fam_001` | June lunch menu     | menu     | active |
| `doc_002` | `fam_001` | Museum trip details | trip     | active |

---

## `school_document_children`

| id        | school_document_id | child_id  |
| --------- | ------------------ | --------- |
| `sdc_001` | `doc_001`          | `chi_001` |
| `sdc_002` | `doc_001`          | `chi_002` |
| `sdc_003` | `doc_002`          | `chi_001` |
| `sdc_004` | `doc_002`          | `chi_002` |

---

## `attachments`

| id        | family_id | original_file_name    | file_type       | file_size | status |
| --------- | --------- | --------------------- | --------------- | --------- | ------ |
| `att_001` | `fam_001` | museum_permission.pdf | application/pdf | 245000    | active |
| `att_002` | `fam_001` | lunch_menu_june.pdf   | application/pdf | 180000    | active |
| `att_003` | `fam_001` | math_page_12.jpg      | image/jpeg      | 950000    | active |

---

## `permission_slip_attachments`

| id        | permission_slip_id | attachment_id |
| --------- | ------------------ | ------------- |
| `psa_001` | `ps_001`           | `att_001`     |

---

## `school_document_attachments`

| id        | school_document_id | attachment_id |
| --------- | ------------------ | ------------- |
| `sda_001` | `doc_001`          | `att_002`     |
| `sda_002` | `doc_002`          | `att_001`     |

This shows the same attachment, `att_001`, linked both to a permission slip and to a school document.

---

## `homework_attachments`

| id        | homework_id | attachment_id |
| --------- | ----------- | ------------- |
| `hwa_001` | `hw_001`    | `att_003`     |

---

# 13. Recommended MVP simplifications

To avoid overengineering Version 1:

## Keep these simple

* Use predefined categories instead of custom category tables.
* Use predefined statuses instead of configurable workflows.
* Use one shared permission slip status, not per-child status.
* Use simple recurrence fields for homework.
* Use join tables for attachments instead of a generic polymorphic relationship.
* Use soft deletion for important records.
* Use dashboard queries/views instead of a separate dashboard table.

## Do not add yet

* school table
* class table
* student user table
* teacher user table
* message table
* audit log table
* notification table
* recurring event engine
* document versioning
* attachment versioning

---

# Final recommended table list

```text
families
parent_users
family_memberships
children
teacher_contacts

homework
homework_children

school_events
school_event_children

permission_slips
permission_slip_children

school_documents
school_document_children

attachments
homework_attachments
school_event_attachments
permission_slip_attachments
school_document_attachments
```

This is a realistic Version 1 data model: small enough for an MVP, but structured enough to support the core product rules without needing a redesign immediately after launch.
