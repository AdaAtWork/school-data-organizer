# Family School Dashboard — Simplified MVP Definition

## Product direction

The MVP should be a **parent-managed family dashboard** for organizing school-related tasks and documents in one place.

This version is **not a school communication platform**, **not a student app**, and **not a school/class management system**. It is a private family organizer used by parents.

---

# 1. MVP scope

## Included in Version 1

### 1. Family and parent access

The app supports a single family workspace.

Included:

* Parent account creation and login
* One family per account
* Multiple parents can access and manage the same family workspace
* Parents can create and manage child profiles
* Parents can delete data they created

The MVP should treat parents as the only app users.

---

### 2. Child profiles

Parents can create child profiles so school information can be organized per child.

Included:

* Add child
* Edit child
* Delete child
* View child-specific dashboard
* Link homework, events, permission slips, documents, and meetings to one or more children

Children are **not users** of the application.

---

### 3. Teacher contacts

Teachers are stored only as reference data.

Included:

* Add teacher name
* Optional subject
* Optional email
* Optional phone
* Link homework or meetings to a teacher

Teachers do **not** log in and do **not** send messages inside the app.

---

### 4. Homework tracking

Parents can manually create homework items.

Included:

* Add homework title
* Add description or notes
* Link homework to one teacher
* Link homework to one or multiple children
* Add due date
* Add recurrence
* Track homework completion per child
* Add attachments
* Mark homework complete for each child separately

Example:

> “Math worksheet from Mrs. Smith, due Friday, for both Ana and Matei. Ana completed it, Matei has not.”

---

### 5. School events

Parents can manually add school-related events.

Included:

* Add event title
* Add date and time
* Add location
* Add notes
* Link event to one or multiple children
* Add attachments
* View events in list or calendar-style view

Examples:

* School trip
* Sports day
* Exam
* Holiday
* Performance
* Parent-teacher meeting

For MVP simplicity, **parent meetings can be handled as a type of event** instead of a separate module.

---

### 6. Permission slips

Parents can track permission slips that require action.

Included:

* Add permission slip title
* Link to one or multiple children
* Add due date
* Upload related document
* Track status:

  * Pending
  * Signed
  * Submitted
  * Expired
* Track submission date
* Store parent notes
* Only one signature required

Document versioning is excluded.

---

### 7. School documents

Parents can upload and organize school documents.

Included:

* Upload files
* Add document title
* Add document type/category
* Link document to one or multiple children
* Link one document to multiple records
* Search and filter documents
* Delete documents

Examples:

* Timetable
* School menu
* Medical form
* Trip document
* School policy
* Exam schedule
* Homework attachment

---

### 8. Attachments

Attachments are reusable files that can be linked to different records.

Included:

* Upload attachment
* Link attachment to homework, event, permission slip, or document record
* Allow one attachment to be linked to multiple records
* View attachment details
* Delete attachment if allowed

Attachment versioning is excluded.

---

### 9. Dashboard

The main value of the MVP is the dashboard.

Included dashboard sections:

* Homework due soon
* Homework overdue
* Upcoming events
* Pending permission slips
* Recently added documents
* Child filter
* “Needs attention” section

The dashboard should answer:

> “What do I need to remember or act on for my children’s school life?”

---

## Excluded from Version 1

### Excluded product areas

* Teacher messages
* Messaging or chat
* Teacher accounts
* Student accounts
* School accounts
* Class management
* School management
* LMS integration
* Email import
* Calendar sync
* Push notifications
* SMS notifications
* Digital signature workflow
* Document versioning
* Attachment versioning
* Offline access
* School/class hierarchy
* Multiple families per account
* Full audit trail
* Payment tracking
* Grade tracking
* Attendance tracking

---

# 2. Core user roles

## Parent

Primary and only active user role in MVP.

Parents can:

* Create and manage child profiles
* Invite or share access with another parent
* Add homework
* Add school events
* Add permission slips
* Upload documents
* Add teacher contact data
* Mark homework complete per child
* Track permission slip status
* Delete the data they created

A parent is effectively an admin within the family workspace.

---

## Child

A child is **not a user**.

A child is a profile/entity used for organizing data.

Child profile may include:

* Name
* Optional photo/avatar
* Optional date of birth
* Optional notes

No login, permissions, or app access are needed for children in MVP.

---

## Teacher contact

A teacher is **not a user**.

A teacher is a data record created by parents.

Teacher contact may include:

* Name
* Subject
* Email
* Phone
* Notes

Teachers are used mainly to organize homework and meetings.

---

# 3. Main user flows

## Flow 1: Adding homework

1. Parent opens the dashboard.
2. Parent selects **Add Homework**.
3. Parent enters:

   * title
   * description
   * due date
   * recurrence, if needed
4. Parent selects one teacher.
5. Parent selects one or multiple children.
6. Parent uploads optional attachments.
7. Parent saves the homework.
8. Homework appears on the dashboard and in each linked child profile.
9. Parent can mark completion separately for each child.

Important MVP behavior:

* Homework can belong to multiple children.
* Completion must be tracked per child, not only at homework level.

---

## Flow 2: Adding a school event

1. Parent opens **Events**.
2. Parent selects **Add Event**.
3. Parent enters:

   * event title
   * date and time
   * location
   * notes
4. Parent selects one or multiple children.
5. Parent optionally marks the event type:

   * general event
   * meeting
   * trip
   * exam
   * holiday
6. Parent uploads optional attachments.
7. Parent saves the event.
8. Event appears in the dashboard and events list.

Important MVP behavior:

* Recurring events are excluded from Version 1.
* Parent-teacher meetings can be modeled as event type `Meeting`.

---

## Flow 3: Tracking a permission slip

1. Parent opens **Permission Slips**.
2. Parent selects **Add Permission Slip**.
3. Parent enters:

   * title
   * description
   * due date
4. Parent selects one or multiple children.
5. Parent uploads the permission slip document.
6. Parent sets status to `Pending`.
7. Parent later updates status to:

   * Signed
   * Submitted
   * Expired
8. If submitted, parent records submission date.

Important MVP behavior:

* Only one signature is required.
* No document versioning.
* Submission date is tracked.

---

## Flow 4: Uploading a school document

1. Parent opens **Documents**.
2. Parent selects **Upload Document**.
3. Parent uploads the file.
4. Parent enters:

   * title
   * document category
   * notes, optional
5. Parent links the document to one or multiple children.
6. Parent optionally links the document to an existing homework, event, or permission slip.
7. Parent saves the document.

Important MVP behavior:

* A document can be standalone.
* A document can also be linked to multiple records.

---

## Flow 5: Adding a teacher contact

1. Parent opens **Teachers** or adds a teacher inline while creating homework/event.
2. Parent enters:

   * teacher name
   * subject, optional
   * email, optional
   * phone, optional
3. Parent saves the teacher contact.
4. Teacher becomes available for linking to homework or meetings.

Important MVP behavior:

* Teacher contact is parent-created data.
* Teacher does not receive notifications or access.

---

## Flow 6: Managing homework completion per child

1. Parent opens homework detail.
2. App shows all linked children.
3. Each child has an individual completion status.
4. Parent marks one child as complete.
5. Other linked children remain incomplete until separately updated.

Example:

| Child | Completion status |
| ----- | ----------------- |
| Ana   | Completed         |
| Matei | Not completed     |

---

# 4. Main screens/pages needed

## 1. Login / Registration

Basic parent account access.

Needed screens:

* Sign up
* Login
* Forgot password

---

## 2. Family Dashboard

Primary landing page.

Should show:

* Due soon homework
* Overdue homework
* Upcoming events
* Pending permission slips
* Recent documents
* Child filter
* Add shortcut buttons

Suggested shortcuts:

* Add Homework
* Add Event
* Add Permission Slip
* Upload Document

---

## 3. Children

Screens:

* Child list
* Child profile
* Add/edit child

Child profile should show:

* Homework for this child
* Events for this child
* Permission slips for this child
* Documents linked to this child

---

## 4. Homework

Screens:

* Homework list
* Homework detail
* Add/edit homework

List filters:

* Child
* Teacher
* Due date
* Status
* Overdue
* Recurring/non-recurring

---

## 5. Events

Screens:

* Event list
* Event detail
* Add/edit event

Optional views:

* List view first
* Calendar-style view as should-have

Event types:

* General
* Meeting
* Trip
* Exam
* Holiday
* Other

---

## 6. Permission Slips

Screens:

* Permission slip list
* Permission slip detail
* Add/edit permission slip

Useful filters:

* Pending
* Signed
* Submitted
* Expired
* Due soon
* Child

---

## 7. Documents

Screens:

* Document list
* Document detail
* Upload/edit document

Filters:

* Child
* Category
* Linked record type
* Date uploaded

---

## 8. Teachers

Screens:

* Teacher list
* Teacher detail
* Add/edit teacher

Teacher detail may show:

* Homework linked to teacher
* Meetings linked to teacher

---

## 9. Family Settings

Screens:

* Parent profile
* Family members
* Invite parent
* Delete data
* Basic preferences

---

# 5. Suggested data entities

High-level only. No database schema yet.

## Family

Represents one family workspace.

Contains:

* parents
* children
* homework
* events
* permission slips
* documents
* teachers

---

## ParentUser

Represents a parent account.

Belongs to one family.

---

## Child

Represents a child profile inside a family.

Not an app user.

---

## TeacherContact

Parent-created teacher reference data.

Not an app user.

---

## Homework

Represents a school assignment.

Can be linked to:

* one teacher
* one or multiple children
* one or multiple attachments/documents

---

## HomeworkChildStatus

Tracks homework status per child.

Needed because homework can belong to multiple children, but completion differs per child.

Example statuses:

* Not started
* In progress
* Completed

---

## SchoolEvent

Represents school-related events and meetings.

Can be linked to:

* one or multiple children
* optional teacher contact
* one or multiple documents/attachments

---

## PermissionSlip

Represents an action item requiring parent signature/submission.

Can be linked to:

* one or multiple children
* one or multiple attachments/documents

---

## SchoolDocument

Represents a parent-uploaded document.

Can be standalone or linked to other records.

---

## Attachment

Represents a file upload.

Can be linked to multiple records.

Depending on design, `SchoolDocument` and `Attachment` may be merged later, but for product clarity they can be treated differently:

* **SchoolDocument** = user-visible organized document record
* **Attachment** = file linked to another record

---

## Reminder

Optional high-level entity for due dates and reminders.

In MVP, reminders may simply be derived from due dates rather than stored separately.

---

## Category

Optional classification entity.

Examples:

* Homework
* Trip
* Medical
* Permission slip
* Exam
* Meeting
* Timetable
* Other

---

# 6. Prioritized feature list

## Must-have

These are required for the MVP to be useful.

### Family and parent management

* Parent registration/login
* One family workspace
* Multiple parents can manage one family
* Child profiles

### Core tracking

* Add/edit/delete homework
* Link homework to one or multiple children
* Link homework to teacher
* Track homework completion per child
* Add/edit/delete school events
* Link events to one or multiple children
* Add/edit/delete permission slips
* Track permission slip status
* Track permission slip due date
* Track permission slip submission date

### Documents and attachments

* Upload documents
* Link documents/attachments to children
* Link attachments to homework, events, and permission slips
* Allow one attachment to be linked to multiple records

### Dashboard

* Unified family dashboard
* Child filter
* Due soon homework
* Overdue homework
* Upcoming events
* Pending permission slips
* Recent documents

---

## Should-have

Important, but not strictly necessary for the first usable release.

* Calendar-style event view
* Teacher contact list
* Search across homework, events, permission slips, and documents
* Basic categories/tags
* Basic reminders based on due dates
* Homework recurrence
* Event type classification, including meeting
* File preview for common file types
* Parent invitation flow

Note: homework recurrence is requested, but it can be implemented after basic homework creation if MVP delivery needs to be smaller.

---

## Nice-to-have

Good future enhancements.

* Push notifications
* Email reminders
* Calendar sync
* OCR for scanned documents
* AI document categorization
* AI deadline extraction
* Advanced document search
* Mobile widgets
* Shared notes between parents
* Activity history
* Document expiration tracking
* Templates for common records
* Bulk upload
* School/LMS integration
* Teacher messaging

---

# 7. Updated assumptions

## Product assumptions

* The app is parent-first, not school-first.
* Parents manually enter school information.
* Parents are the only active users.
* Children are profiles, not users.
* Teachers are contacts, not users.
* No school or class structure is needed in MVP.
* A family is the top-level workspace.
* One parent account belongs to one family only.
* Multiple parents can manage the same family workspace.
* Homework can apply to multiple children.
* Homework completion must be tracked per child.
* Events can apply to one or multiple children.
* Parent meetings can be represented as school events with type `Meeting`.
* Permission slips require only one signature.
* Records are retained until parents delete them.
* Offline access is not needed.
* Versioning is not needed for documents or attachments.

---

# 8. Questions that must be answered before designing the database

Many earlier questions are now answered. The remaining database-relevant questions are below.

## Family and parent access

1. When multiple parents manage the same family, do they have equal permissions?
2. Can any parent delete records created by another parent, or only their own?
3. How does a second parent join the family: invite link, email invite, shared code, or manual admin approval?
4. Can a parent leave a family workspace?
5. What happens to data if the last parent deletes their account?

---

## Child profiles

6. What minimum child data is required?

   * name only?
   * date of birth?
   * avatar?
   * notes?
7. Can a child profile be archived instead of deleted?
8. Should historical records remain if a child profile is deleted?

---

## Teacher contacts

9. Is teacher name required for homework?
10. Can homework be added without a teacher?
11. Can the same teacher be linked to multiple children?
12. Should duplicate teacher contacts be allowed?
13. Should teachers have subject information, or is name enough?

---

## Homework

14. Which recurrence patterns are needed?

* daily
* weekly
* monthly
* custom days

15. When recurring homework is edited, does the change affect:

* only one occurrence?
* future occurrences?
* all occurrences?

16. Should homework support priority?
17. Should homework support partial completion notes per child?
18. Should overdue homework automatically appear as overdue based on due date?

---

## Events and meetings

19. Should parent meetings be a separate entity or an event type?
20. Can events have an optional teacher contact?
21. Do events need start and end time, or only date/time?
22. Should all-day events be supported?
23. Should events have RSVP/status tracking, or only informational tracking?

---

## Permission slips

24. What statuses are required exactly?

* Pending
* Signed
* Submitted
* Expired
* Cancelled?

25. Can one permission slip apply to multiple children but have different statuses per child?
26. Is submission date tracked once for the slip or separately per child?
27. Should a permission slip always require an uploaded document?
28. Should the app store the actual signature, or only the status “signed”?

---

## Documents and attachments

29. Should `Document` and `Attachment` be the same concept or separate concepts?
30. What file types are allowed?
31. What is the maximum file size?
32. Can a file be deleted if it is linked to multiple records?
33. Should deleting a homework/event/permission slip also delete linked attachments?
34. Are document categories predefined or user-created?

---

## Retention and deletion

35. Should deletion be permanent or soft-delete with recovery?
36. Should parents be able to export family data before deletion?
37. Should deleted attachments be recoverable?
38. Should the app keep minimal metadata after deletion for security or support reasons?

---

# Recommended simplified MVP boundary

The most realistic first version is:

> A private family dashboard where parents manually track homework, school events, permission slips, and documents for one or more children, with teacher contacts used only as reference data.

The MVP should avoid messaging, school integration, student accounts, and complex school structures. The product should first prove that parents value having a clean, centralized family school organizer.
