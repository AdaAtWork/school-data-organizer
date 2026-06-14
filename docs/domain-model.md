# Business Domain Model — Family School Dashboard MVP

## Domain framing

The MVP domain is best described as:

> A private family workspace where parents organize school-related obligations and documents for their children.

This is **not** a school management system. It does not model schools, classes, student accounts, teacher accounts, or communication between school and family.

The central domain concept is the **Family Workspace**. Everything belongs to one family and is managed by parents.

---

# 1. Core business entities

## 1. Family

### Purpose

Represents the private workspace shared by one or more parents.

The family is the top-level boundary for all data in the MVP.

### Main attributes

* Family name
* Created date
* Status
* Owner parent
* Family settings

### Lifecycle considerations

* Created when the first parent signs up.
* Can have additional parents invited.
* Exists as long as at least one parent account remains active.
* May be deleted if the family owner chooses to delete all family data.

### Notes

In DDD terms, **Family** is a strong candidate for a high-level aggregate root or tenant boundary.

---

## 2. Parent

### Purpose

Represents an authenticated adult user who manages the family dashboard.

Parents are the only real users of the application in the MVP.

### Main attributes

* Name
* Email
* Authentication identity
* Role within family
* Account status
* Created date
* Last active date

### Lifecycle considerations

* Created through registration or invitation.
* Can join one family only.
* Can update family records based on permissions.
* Can be deactivated or removed from the family.
* If the last parent leaves, the family deletion policy must be applied.

### Notes

For MVP, all parents may have equal permissions, but the model should allow future distinction between:

* owner parent
* regular parent
* read-only guardian

---

## 3. Child

### Purpose

Represents a child profile inside the family.

A child is **not a user** and does not log in.

The child is used to organize homework, events, permission slips, and documents.

### Main attributes

* Name
* Optional avatar/photo
* Optional date of birth
* Notes
* Status: active, archived, deleted
* Created by parent
* Created date

### Lifecycle considerations

* Created by a parent.
* Can be edited by a parent.
* Can be linked to many school-related records.
* Should preferably be archived rather than hard-deleted if linked records exist.
* Deleting a child raises questions about historical data retention.

### Notes

The child is a core business entity because most dashboard information is filtered or grouped by child.

---

## 4. Teacher Contact

### Purpose

Represents teacher information manually added by parents.

Teachers are **not users** in the MVP.

Teacher contacts are used to provide context for homework and parent meetings.

### Main attributes

* Name
* Subject
* Email
* Phone
* Notes
* Status
* Created by parent
* Created date

### Lifecycle considerations

* Created manually by a parent.
* Can be edited or deleted.
* Can be linked to homework and events.
* If deleted, historical records should probably retain the teacher name or use an archived teacher reference.

### Notes

Teacher Contact is reference data inside the family workspace.

---

## 5. Homework

### Purpose

Represents a school assignment or task that must be completed by one or more children.

Homework can apply to multiple children, but completion is tracked separately per child.

### Main attributes

* Title
* Description
* Due date
* Priority
* Recurrence information, if applicable
* Teacher contact
* Notes
* Status summary
* Created by parent
* Created date
* Last updated date

### Lifecycle considerations

* Created by a parent.
* Linked to one or more children.
* May be updated before completion.
* May become overdue based on due date.
* Can be marked complete per child.
* Can be deleted by a parent, subject to deletion rules.
* Recurring homework may generate separate occurrences or be represented as a recurring pattern.

### Notes

Homework is a key aggregate root candidate because it owns per-child completion state.

---

## 6. Homework Child Status

### Purpose

Represents each child’s individual progress for a homework item.

This entity is necessary because homework can belong to multiple children, but each child may complete it independently.

### Main attributes

* Child reference
* Homework reference
* Completion status
* Completed date
* Completion notes
* Last updated by parent
* Last updated date

### Possible statuses

* Not started
* In progress
* Completed
* Skipped / not applicable, optional future status

### Lifecycle considerations

* Created automatically when a child is linked to homework.
* Updated when a parent changes completion state.
* Removed or archived if the child is unlinked from the homework.
* Should not exist without both a homework item and a child.

### Notes

This is likely an entity inside the **Homework aggregate**, not an independent aggregate root.

---

## 7. School Event

### Purpose

Represents a school-related event relevant to one or more children.

Parent meetings are modeled as a type of school event in the MVP.

### Main attributes

* Title
* Event type
* Date
* Start time
* End time
* Location
* Notes
* Optional teacher contact
* Linked children
* Created by parent
* Created date
* Last updated date

### Event types

* General
* Meeting
* Trip
* Exam
* Holiday
* Performance
* Other

### Lifecycle considerations

* Created manually by a parent.
* Linked to one or more children.
* Can be edited or cancelled.
* Can pass into the past automatically.
* Can be deleted by a parent.
* Recurring events are intentionally excluded from MVP.

### Notes

School Event is a natural aggregate root.

---

## 8. Permission Slip

### Purpose

Represents a school document or request that requires parent action.

A permission slip usually has a due date, a status, an uploaded document, and optionally a submission date.

### Main attributes

* Title
* Description
* Due date
* Status
* Submission date
* Signed date
* Notes
* Linked children
* Linked attachments/documents
* Created by parent
* Created date
* Last updated date

### Possible statuses

* Pending
* Signed
* Submitted
* Expired
* Cancelled, optional

### Lifecycle considerations

* Created by a parent.
* Linked to one or more children.
* Starts as pending by default.
* Can be marked signed.
* Can be marked submitted.
* Submission date is recorded when submitted.
* Can become expired if due date passes before completion.
* Versioning is not required in MVP.

### Notes

Permission Slip is a strong aggregate root because it has its own lifecycle and status transitions.

---

## 9. School Document

### Purpose

Represents an organized school document stored by the parent.

A document may be standalone or linked to homework, events, permission slips, or children.

### Main attributes

* Title
* Category
* Description / notes
* File reference
* Linked children
* Linked records
* Uploaded by parent
* Uploaded date
* Status

### Possible categories

* Timetable
* Menu
* Medical
* Trip
* Permission slip
* Exam schedule
* Homework material
* General

### Lifecycle considerations

* Uploaded by a parent.
* Can exist independently.
* Can be linked to multiple business records.
* Can be renamed, categorized, or deleted.
* Versioning is excluded from MVP.
* Deletion must consider whether the same document is linked elsewhere.

### Notes

This may be modeled separately from raw file storage. In business terms, a School Document is meaningful to the parent; an Attachment is a file association.

---

## 10. Attachment

### Purpose

Represents a reusable uploaded file that can be linked to one or more records.

An attachment is lower-level than School Document. It is the file asset that supports homework, events, permission slips, or documents.

### Main attributes

* File name
* File type
* File size
* Storage reference
* Uploaded by parent
* Uploaded date
* Linked records
* Status

### Lifecycle considerations

* Created when a parent uploads a file.
* Can be linked to multiple records.
* Can be unlinked from one record without being deleted globally.
* Can be deleted only when deletion rules allow.
* No versioning in MVP.

### Notes

Depending on implementation later, **School Document** and **Attachment** may be merged. For domain modeling clarity, they can remain conceptually separate:

* **School Document**: parent-facing document record
* **Attachment**: uploaded file asset

---

## 11. Reminder

### Purpose

Represents a reminder or attention marker derived from due dates and event dates.

For MVP, reminders may be generated dynamically rather than stored as persistent entities.

### Main attributes

* Reminder date
* Reminder type
* Related record
* Related child
* Status
* Created date

### Lifecycle considerations

* May be calculated from homework due dates, event dates, or permission slip due dates.
* May become obsolete when the related record is completed, submitted, cancelled, or deleted.
* Persistent reminders can be deferred until later if MVP needs to stay simple.

### Notes

For MVP, treat Reminder as a domain concept, not necessarily a stored entity.

---

## 12. Category

### Purpose

Represents classification for documents, events, or tasks.

### Main attributes

* Name
* Category type
* Parent-created or system-defined flag
* Status

### Lifecycle considerations

* MVP can start with predefined categories.
* User-defined categories can be added later.
* Deleting categories should not delete associated records.

### Notes

Category is likely a value object or reference entity, depending on whether users can create custom categories.

---

# 2. Relationship diagrams in text form

## High-level family structure

```text
Family
 ├── Parent(s)
 ├── Child(ren)
 ├── TeacherContact(s)
 ├── Homework
 ├── SchoolEvent(s)
 ├── PermissionSlip(s)
 ├── SchoolDocument(s)
 └── Attachment(s)
```

---

## Parent and family relationship

```text
ParentUser ── belongs to ──> Family

Family ── has many ──> ParentUser
Family ── has many ──> Child
Family ── has many ──> TeacherContact
```

Rules:

```text
One ParentUser belongs to exactly one Family in MVP.
One Family can have multiple ParentUsers.
Only ParentUsers can create or manage records.
```

---

## Homework relationship model

```text
Family
 └── Homework
      ├── linked to one optional TeacherContact
      ├── linked to one or more Child records
      ├── has one HomeworkChildStatus per linked Child
      └── linked to zero or more Attachment records
```

Detailed structure:

```text
Homework
 ├── TeacherContact
 ├── HomeworkChildStatus ── for ──> Child A
 ├── HomeworkChildStatus ── for ──> Child B
 └── Attachment(s)
```

Important rule:

```text
Homework completion is not stored only on Homework.
Completion is stored per child through HomeworkChildStatus.
```

---

## Event relationship model

```text
Family
 └── SchoolEvent
      ├── linked to one or more Child records
      ├── optionally linked to TeacherContact
      └── linked to zero or more Attachment records
```

Parent meeting as event:

```text
SchoolEvent
 ├── type: Meeting
 ├── optional TeacherContact
 ├── date/time
 ├── location or meeting link
 └── linked Child or Children
```

---

## Permission slip relationship model

```text
Family
 └── PermissionSlip
      ├── linked to one or more Child records
      ├── linked to zero or more SchoolDocument records
      └── linked to zero or more Attachment records
```

MVP simplification:

```text
PermissionSlip
 ├── one overall status
 ├── one submission date
 └── one required signature status
```

Potential issue:

```text
If one permission slip applies to multiple children,
the MVP must decide whether status is shared or tracked per child.
```

---

## Document and attachment relationship model

```text
SchoolDocument
 ├── uses one Attachment / file asset
 ├── linked to zero or more Child records
 └── linked to zero or more business records
       ├── Homework
       ├── SchoolEvent
       └── PermissionSlip
```

Reusable attachment model:

```text
Attachment
 ├── linked to Homework
 ├── linked to SchoolEvent
 ├── linked to PermissionSlip
 └── linked to SchoolDocument
```

Deletion implication:

```text
Deleting a link is not the same as deleting the uploaded file.
```

---

## Dashboard projection model

The dashboard is probably not its own aggregate. It is a read model built from other domain entities.

```text
Family Dashboard
 ├── Homework due soon
 ├── Overdue homework
 ├── Upcoming events
 ├── Pending permission slips
 └── Recent documents
```

Source entities:

```text
Dashboard
 ├── reads from Homework
 ├── reads from HomeworkChildStatus
 ├── reads from SchoolEvent
 ├── reads from PermissionSlip
 └── reads from SchoolDocument
```

---

# 3. Aggregate roots

## Recommended MVP aggregates

### 1. Family Aggregate

```text
Family
 ├── Parent membership references
 ├── Family settings
 └── Family status
```

Purpose:

* Defines the workspace boundary.
* Controls membership.
* Ensures one-account-one-family MVP rule.

The Family aggregate should not necessarily contain every child, homework item, document, or event as in-memory children. It is the business ownership boundary, not a giant object graph.

---

### 2. Child Aggregate

```text
Child
 └── Child profile details
```

Purpose:

* Manages child identity inside the family.
* Prevents child profile inconsistencies.

Rules enforced:

* A child belongs to one family.
* A child is not a login user.
* A child may be active or archived.

---

### 3. Teacher Contact Aggregate

```text
TeacherContact
 └── Contact details
```

Purpose:

* Manages teacher reference data.
* Keeps teacher details consistent for homework and meetings.

Rules enforced:

* Teacher belongs to one family.
* Teacher is not a platform user.
* Teacher can be linked to homework and events.

---

### 4. Homework Aggregate

```text
Homework
 ├── Linked children
 ├── HomeworkChildStatus records
 ├── Teacher reference
 ├── Recurrence information
 └── Attachment links
```

Purpose:

* Owns homework-level data.
* Owns completion state per linked child.

Rules enforced:

* Homework must belong to a family.
* Homework must link to at least one child.
* For every linked child, a HomeworkChildStatus must exist.
* Completion status is tracked per child.
* Removing a child from homework also removes or archives that child’s completion status.
* Homework can be overdue if due date has passed and at least one child has not completed it.

---

### 5. School Event Aggregate

```text
SchoolEvent
 ├── Linked children
 ├── Optional teacher reference
 └── Attachment links
```

Purpose:

* Owns event details and child targeting.

Rules enforced:

* Event must belong to a family.
* Event must target at least one child.
* Event date is required.
* Recurrence is excluded in MVP.
* Meeting is an event type, not a separate aggregate.

---

### 6. Permission Slip Aggregate

```text
PermissionSlip
 ├── Linked children
 ├── Status
 ├── Submission date
 └── Attachment/document links
```

Purpose:

* Owns the action lifecycle of a permission slip.

Rules enforced:

* Permission slip must belong to a family.
* Permission slip must target at least one child.
* Permission slip has one overall status in MVP.
* Submission date is required when status becomes Submitted.
* Document versioning is not supported.
* Only one signature is required.

Potential refinement:

If permission slip status must differ per child later, introduce:

```text
PermissionSlipChildStatus
```

For MVP, avoid this unless required.

---

### 7. School Document Aggregate

```text
SchoolDocument
 ├── Metadata
 ├── File/attachment reference
 ├── Linked children
 └── Linked business records
```

Purpose:

* Owns parent-facing document metadata and associations.

Rules enforced:

* Document belongs to one family.
* Document may be standalone.
* Document may link to multiple children.
* Document may link to multiple records.
* Versioning is not supported.

---

### 8. Attachment Aggregate

```text
Attachment
 ├── File metadata
 ├── Storage reference
 └── Link references
```

Purpose:

* Represents uploaded file asset.
* Controls file lifecycle and reuse.

Rules enforced:

* Attachment belongs to one family.
* Attachment can be linked to multiple records.
* Attachment cannot be physically deleted while still linked, unless forced deletion is explicitly allowed.
* Unlinking an attachment from a record does not necessarily delete the file.

---

# 4. Entity descriptions

## Family

The Family is the highest-level business boundary. It represents a single household or family unit using the app.

A family has parents, children, teachers, school tasks, events, permission slips, and documents.

The MVP explicitly disallows one parent managing multiple families.

### Key business meaning

```text
Family = the private workspace where all school-related data is organized.
```

---

## Parent

The Parent is the active user who creates and manages records.

All business actions in the MVP are performed by a parent.

### Key business meaning

```text
Parent = authenticated family administrator.
```

---

## Child

The Child is a profile used to organize records.

Children do not have accounts, credentials, permissions, or app access.

### Key business meaning

```text
Child = the person for whom school obligations are tracked.
```

---

## Teacher Contact

The Teacher Contact is manually entered contextual information.

It helps parents remember which teacher assigned homework or participates in a meeting.

### Key business meaning

```text
Teacher Contact = parent-created reference data, not an app user.
```

---

## Homework

Homework represents assigned school work.

The main modeling concern is that homework may apply to multiple children but have separate completion states.

### Key business meaning

```text
Homework = a school task assigned to one or more children.
```

---

## Homework Child Status

Homework Child Status captures the state of homework for each child.

Without this entity, the model cannot accurately handle shared homework where one child has completed it and another has not.

### Key business meaning

```text
Homework Child Status = one child’s progress on one homework item.
```

---

## School Event

School Event represents anything scheduled: school trip, exam, holiday, performance, or parent meeting.

### Key business meaning

```text
School Event = a dated school-related item relevant to one or more children.
```

---

## Permission Slip

Permission Slip represents an action item requiring parent signature or submission.

### Key business meaning

```text
Permission Slip = a parent action required by a deadline.
```

---

## School Document

School Document represents an organized file or document meaningful to the parent.

It may be standalone or connected to homework, events, or permission slips.

### Key business meaning

```text
School Document = a categorized family school document.
```

---

## Attachment

Attachment represents the actual uploaded file asset.

It can be reused across multiple records.

### Key business meaning

```text
Attachment = reusable uploaded file.
```

---

# 5. Business rules and constraints

## Family rules

1. A parent account can belong to only one family in the MVP.
2. A family can have multiple parents.
3. A family can have multiple children.
4. All records must belong to exactly one family.
5. Records from one family must never be visible to another family.
6. If the last parent leaves or deletes the family, the product must define what happens to all family records.

---

## Parent rules

1. Only parents can log in.
2. Only parents can create, edit, or delete records.
3. Children cannot access the application.
4. Teachers cannot access the application.
5. Parent permissions must be checked within the family boundary.
6. A parent can delete records they created.
7. The system must decide whether one parent can delete records created by another parent in the same family.

---

## Child rules

1. A child belongs to exactly one family.
2. A child is not a user.
3. A child can be linked to many homework items.
4. A child can be linked to many events.
5. A child can be linked to many permission slips.
6. A child can be linked to many documents.
7. A homework item must have at least one linked child.
8. An event must have at least one linked child.
9. A permission slip must have at least one linked child.
10. If a child is archived, historical records should remain accessible.

---

## Teacher contact rules

1. A teacher contact belongs to one family.
2. A teacher contact is not an authenticated user.
3. A teacher contact can be linked to homework.
4. A teacher contact can be linked to school events of type Meeting.
5. Homework may require a teacher if the product chooses strict organization.
6. Teacher contact deletion should not corrupt historical homework or meeting records.
7. Duplicate teacher names may exist unless duplicate prevention is explicitly added.

---

## Homework rules

1. Homework belongs to one family.
2. Homework must be linked to at least one child.
3. Homework may be linked to one teacher contact.
4. Homework can belong to multiple children.
5. Homework completion is tracked per child.
6. Each linked child must have exactly one homework status for that homework.
7. Homework is overdue when:

   * due date has passed, and
   * at least one linked child has not completed it.
8. Homework is fully completed only when all linked children have completed it.
9. Homework can have attachments.
10. Homework can recur, but recurrence should be carefully scoped in MVP.
11. If a homework recurrence is used, the system must decide whether to generate occurrences or store recurrence rules.

---

## Homework completion rules

1. A child’s completion status can be changed independently from other children.
2. Completing homework for one child must not complete it for all linked children.
3. Completed date should be captured when status changes to Completed.
4. If status changes away from Completed, completed date should be cleared or retained according to a defined rule.
5. Removing a child from homework should remove or archive that child’s homework status.

---

## Event rules

1. School events belong to one family.
2. Events must be linked to at least one child.
3. Events can target one or multiple children.
4. Events can optionally reference a teacher contact.
5. Parent meetings are modeled as School Events with type Meeting.
6. Recurring events are excluded from MVP.
7. Event date is required.
8. End time may be optional, but the product must decide.
9. Past events remain available unless deleted.

---

## Permission slip rules

1. Permission slips belong to one family.
2. Permission slips must be linked to at least one child.
3. Permission slips require only one signature in MVP.
4. Permission slips have one overall status in MVP.
5. Submission date must be captured when status becomes Submitted.
6. Signed date may be captured when status becomes Signed.
7. A permission slip may have one or more attachments.
8. Document versioning is not supported.
9. If due date passes before submission, the permission slip may become Expired.
10. The product must decide whether expiration is automatic or manual.
11. If a permission slip applies to multiple children, the MVP assumes one shared status unless per-child status is introduced.

---

## Document rules

1. A school document belongs to one family.
2. A document may be linked to one or multiple children.
3. A document may be standalone.
4. A document may be linked to homework, event, or permission slip records.
5. A document may use one uploaded attachment as its file asset.
6. Document versioning is not required in MVP.
7. A document should not be visible outside the family.
8. Deleting a document should not automatically delete the underlying file if it is linked elsewhere.

---

## Attachment rules

1. An attachment belongs to one family.
2. One attachment can be linked to multiple records.
3. An attachment can be linked to:

   * homework
   * school event
   * permission slip
   * school document
4. Unlinking an attachment from one record does not delete the attachment globally.
5. Physical file deletion should only happen when no records reference the attachment or when explicitly forced.
6. Attachment versioning is not supported.
7. Attachment metadata should remain consistent even if the file is reused.

---

## Dashboard rules

1. Dashboard is a derived view, not the source of truth.
2. Dashboard items are calculated from homework, events, permission slips, and documents.
3. Dashboard should support filtering by child.
4. Dashboard should surface overdue homework.
5. Dashboard should surface pending permission slips.
6. Dashboard should surface upcoming events.
7. Dashboard should surface recent documents.

---

# 6. Lifecycle considerations by entity

## Family lifecycle

```text
Created
 → Active
 → Deactivated / Deleted
```

Open decision:

```text
What happens when the final parent leaves?
```

---

## Parent lifecycle

```text
Invited
 → Active
 → Removed / Deactivated
```

Open decision:

```text
Can removed parents regain access later?
```

---

## Child lifecycle

```text
Created
 → Active
 → Archived
 → Deleted
```

Recommendation:

Use archive before delete because children may have linked historical records.

---

## Teacher contact lifecycle

```text
Created
 → Active
 → Archived
 → Deleted
```

Recommendation:

If a teacher is linked to historical records, archive instead of hard-delete.

---

## Homework lifecycle

```text
Created
 → Active
 → Partially Completed
 → Completed
 → Archived / Deleted
```

Derived states:

```text
Overdue = due date has passed and at least one child is incomplete.
Fully completed = all linked children are completed.
```

---

## Homework child status lifecycle

```text
Not Started
 → In Progress
 → Completed
```

Optional:

```text
Skipped / Not Applicable
```

---

## School event lifecycle

```text
Scheduled
 → Completed / Past
 → Cancelled
 → Deleted
```

For MVP, “past” can be derived from date rather than manually stored.

---

## Permission slip lifecycle

```text
Pending
 → Signed
 → Submitted
```

Alternative paths:

```text
Pending
 → Expired

Pending
 → Cancelled
```

Important status transition rule:

```text
Submitted should require submission date.
```

---

## School document lifecycle

```text
Uploaded
 → Active
 → Archived
 → Deleted
```

---

## Attachment lifecycle

```text
Uploaded
 → Linked
 → Unlinked
 → Deleted
```

Important distinction:

```text
Unlinked does not mean deleted.
```

---

# 7. Potential future extensions without overengineering

The MVP model should remain simple, but avoid decisions that block likely future needs.

## 1. Teacher accounts

Future possibility:

```text
TeacherContact → TeacherUser
```

Do not build teacher accounts now, but avoid assuming teacher contact data can never become linked to real users.

---

## 2. School and class structure

Future possibility:

```text
Family
 └── Child
      └── SchoolEnrollment
           ├── School
           └── Class
```

Do not add school/class to MVP if not needed, but avoid hardcoding that children can never have school context.

---

## 3. Multiple families per parent

Future possibility:

```text
ParentUser
 └── FamilyMembership
      └── Family
```

MVP says one account cannot manage multiple families. Still, consider a membership concept internally if it does not add much complexity.

---

## 4. Granular parent permissions

Future possibility:

* owner
* editor
* viewer
* emergency contact
* separated parent with restricted access

The MVP can use equal permissions, but avoid designing deletion rules that assume all parents always have identical authority.

---

## 5. Per-child permission slip status

Future possibility:

```text
PermissionSlipChildStatus
```

This may become necessary if one permission slip applies to multiple children but each child has separate submission state.

MVP can use one shared status, but this limitation should be explicit.

---

## 6. Recurring homework expansion

Future possibility:

```text
RecurringHomeworkPattern
 └── HomeworkOccurrence
```

For MVP, recurrence can be simple. But recurring homework often becomes complex when editing one occurrence versus all future occurrences.

---

## 7. Notification system

Future possibility:

```text
NotificationPreference
Notification
Reminder
```

MVP can derive reminders from due dates. Later, push/email notifications may need explicit notification entities.

---

## 8. Document intelligence

Future possibility:

* OCR
* automatic due date extraction
* automatic category detection
* document summary
* duplicate document detection

The document model should allow metadata expansion later.

---

## 9. Audit trail

Future possibility:

```text
ActivityLog
```

Useful for:

* multi-parent families
* deletion history
* support
* security reviews

MVP may not need full audit history, but created-by and updated-by fields are still valuable.

---

## 10. External calendar integration

Future possibility:

```text
ExternalCalendarSync
ExternalCalendarEventMapping
```

Avoid tightly coupling event identity to only internal events if calendar sync is likely later.

---

# 8. Recommended bounded contexts for MVP

For a small MVP, these do not need to become separate services. They are conceptual boundaries.

## Family Management Context

Responsible for:

* Family
* Parent
* Child
* Family membership

---

## School Organization Context

Responsible for:

* Homework
* Homework child status
* School event
* Permission slip
* Teacher contact

---

## Document Management Context

Responsible for:

* School document
* Attachment
* File links
* File lifecycle

---

## Dashboard / Planning Context

Responsible for:

* Dashboard projections
* Due soon items
* Overdue items
* Upcoming events
* Pending actions

This is likely a read model, not a transactional core model.

---

# 9. Suggested final domain model summary

```text
Family is the workspace.

Parents manage the workspace.

Children are profiles inside the workspace.

Teacher Contacts are reference data.

Homework tracks assignments and owns per-child completion.

School Events track dated school activities, including meetings.

Permission Slips track parent action items with status and submission date.

School Documents organize uploaded school files.

Attachments represent reusable file assets.

The Dashboard is a derived view over homework, events, permission slips, and documents.
```

The most important modeling decisions are:

1. **Child is not a user.**
2. **Teacher is not a user.**
3. **School and class are excluded from MVP.**
4. **Homework completion belongs to the child-homework relationship, not just homework.**
5. **Permission slips have one shared status in MVP unless per-child status becomes necessary.**
6. **Attachments are reusable and can link to multiple records.**
7. **Dashboard is a projection, not a primary domain entity.**
