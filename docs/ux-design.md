# UX Design for Version 1 — Family School Dashboard

## Product UX goal

The app should feel like a **school-life command center for parents**, not like an administrative system.

The parent should be able to:

* see what needs attention immediately
* add homework/events/forms quickly
* find documents later
* manage multiple children without confusion
* avoid re-entering unnecessary information

The UX should prioritize:

```text
Fast capture → clear reminders → simple tracking → easy retrieval
```

---

# 1. Application navigation structure

## Recommended primary navigation

For Version 1, use these main navigation sections:

```text
Dashboard
Children
Homework
Events
Permission Slips
Documents
Teachers
Settings
```

## Suggested information architecture

```text
App
├── Dashboard
│   ├── Today
│   ├── Upcoming
│   ├── Needs Attention
│   └── Recent Documents
│
├── Children
│   ├── Child List
│   └── Child Profile
│
├── Homework
│   ├── Homework List
│   ├── Homework Detail
│   └── Add/Edit Homework
│
├── Events
│   ├── Event List
│   ├── Event Detail
│   └── Add/Edit Event
│
├── Permission Slips
│   ├── Permission Slip List
│   ├── Permission Slip Detail
│   └── Add/Edit Permission Slip
│
├── Documents
│   ├── Document List
│   ├── Document Detail
│   └── Upload Document
│
├── Teachers
│   ├── Teacher List
│   └── Add/Edit Teacher
│
└── Settings
    ├── Family Settings
    ├── Parent Account
    └── Invite Parent
```

---

# 2. Main screens

## 2.1 Register screen

### Purpose

Allow a parent to create an account and start a family workspace.

### Primary actions

* Create account
* Continue with email/password
* Go to login if account already exists

### Important information displayed

* Simple explanation of the app
* Privacy reassurance: children and teachers are not users
* Form fields:

  * parent name
  * email
  * password

### UX recommendation

After registration, immediately guide the parent to add the first child.

---

## 2.2 Login screen

### Purpose

Allow returning parents to access their family dashboard.

### Primary actions

* Login
* Forgot password
* Create account

### Important information displayed

* Email field
* Password field
* Clear error messages for failed login

---

## 2.3 Onboarding / First child setup

### Purpose

Help the parent get value immediately.

### Primary actions

* Add first child
* Skip for now, though not recommended

### Important information displayed

* “Let’s start by adding your child.”
* Required field:

  * child first name
* Optional fields:

  * last name
  * date of birth
  * notes

### Wireframe

```text
+----------------------------------+
| Welcome to Family School Dashboard |
|                                  |
| Start by adding your first child |
|                                  |
| Child first name *               |
| [ Ana                         ] |
|                                  |
| Last name                        |
| [ Ionescu                     ] |
|                                  |
| [ Add Child ]                    |
| [ Skip for now ]                 |
+----------------------------------+
```

---

## 2.4 Dashboard screen

### Purpose

Show the parent what needs attention now.

This is the most important screen in the app.

### Primary actions

* Add homework
* Add event
* Add permission slip
* Upload document
* Mark homework complete
* Filter by child

### Important information displayed

* Today’s items
* Due soon homework
* Overdue homework
* Pending permission slips
* Upcoming events
* Recent documents
* Quick add buttons

### Wireframe

```text
+------------------------------------------------+
| Family Dashboard                     [Add +]   |
| Child: [All Children ▼]                         |
+------------------------------------------------+

| Needs Attention                                |
| ⚠ Math worksheet overdue - Matei               |
| ✍ Museum permission slip due tomorrow          |

| Today                                          |
| 16:00 Parent meeting with Math teacher         |

| Homework Due Soon                              |
| [ ] Read chapter 3        Due Thu    Ana       |
| [ ] Math worksheet        Due Fri    Matei     |

| Upcoming Events                                |
| Museum Trip              Jun 20     Ana, Matei |

| Recent Documents                               |
| June lunch menu.pdf                            |
+------------------------------------------------+
```

### UX recommendation

Dashboard should avoid showing everything. It should show only what helps a parent decide:

```text
What is urgent?
What is coming soon?
What did I recently add?
```

---

## 2.5 Children screen

### Purpose

Let parents manage child profiles and view school items per child.

### Primary actions

* Add child
* Edit child
* View child-specific dashboard
* Archive child

### Important information displayed

For each child:

* name
* homework due soon
* pending permission slips
* upcoming events

### Child profile screen

```text
+----------------------------------+
| Ana Ionescu                      |
| [Edit Child]                     |
+----------------------------------+

| Homework                         |
| 2 due this week                  |

| Permission Slips                 |
| 1 pending                        |

| Upcoming Events                  |
| Museum trip - Jun 20             |

| Documents                        |
| 4 documents                      |
+----------------------------------+
```

### UX recommendation

The child profile should act as a filtered version of the dashboard.

---

## 2.6 Homework list screen

### Purpose

Show all homework in one place.

### Primary actions

* Add homework
* Filter by child
* Filter by teacher
* Filter by status
* Mark complete
* Open homework detail

### Important information displayed

* homework title
* due date
* linked children
* teacher
* completion status per child
* overdue indicator

### Wireframe

```text
+----------------------------------+
| Homework              [Add]      |
| Child: [All ▼] Status: [Open ▼] |
+----------------------------------+

| ⚠ Math worksheet                 |
| Due: Today                       |
| Teacher: Mrs. Popescu            |
| Ana: Completed                   |
| Matei: Not started               |
| [Mark Matei Complete]            |

| Read chapter 3                   |
| Due: Thu                         |
| Ana: In progress                 |
+----------------------------------+
```

---

## 2.7 Add homework screen

### Purpose

Allow fast capture of homework.

### Primary actions

* Save homework
* Add teacher inline
* Attach file
* Select children
* Add recurrence if needed

### Important information displayed / fields

Required:

* title
* at least one child

Recommended optional:

* due date
* teacher
* description
* priority
* attachment
* recurrence

### UX recommendation

Do not make too many fields required. Busy parents may only know:

```text
Math homework, Ana, due tomorrow.
```

That should be enough to save.

### Wireframe

```text
+----------------------------------+
| Add Homework                     |
+----------------------------------+

| Title *                          |
| [ Math worksheet page 12       ] |
|                                  |
| Children *                       |
| [x] Ana  [x] Matei               |
|                                  |
| Due date                         |
| [ Tomorrow ▼ ] [ Time optional ] |
|                                  |
| Teacher                          |
| [ Mrs. Popescu ▼ ] [+ Add]       |
|                                  |
| Notes                            |
| [ Page 12, exercises 1-5       ] |
|                                  |
| Attachment                       |
| [ Upload file ]                  |
|                                  |
| [ Save Homework ]                |
+----------------------------------+
```

---

## 2.8 Homework detail screen

### Purpose

Show full homework details and per-child completion.

### Primary actions

* Mark complete per child
* Edit homework
* Add attachment
* Archive/delete homework

### Important information displayed

* title
* due date
* teacher
* notes
* linked children
* per-child status
* attachments

### Important UX rule

Completion actions must be per child, not global only.

```text
Ana        Completed
Matei      Not started    [Mark Complete]
```

---

## 2.9 Events screen

### Purpose

Show school events and parent meetings.

### Primary actions

* Add event
* Filter by child
* Filter by event type
* Open event detail
* Cancel/archive event

### Important information displayed

* event title
* date/time
* event type
* linked children
* location
* teacher contact if meeting

### Recommended default view

For MVP, use a **list grouped by date** first. Calendar view can come later or be secondary.

```text
Events

Today
16:00 Parent meeting with Mrs. Popescu

This Week
Jun 20 Museum trip
Jun 21 Sports day
```

---

## 2.10 Add school event screen

### Purpose

Allow parents to quickly save a school event or meeting.

### Primary actions

* Save event
* Select children
* Choose event type
* Add teacher if event is a meeting
* Attach document

### Important fields

Required:

* title
* start date
* at least one child

Optional:

* time
* end time
* location
* event type
* teacher contact
* notes
* attachment

### Wireframe

```text
+----------------------------------+
| Add Event                        |
+----------------------------------+

| Title *                          |
| [ Museum Trip                  ] |
|                                  |
| Type                             |
| [ Trip ▼ ]                       |
|                                  |
| Children *                       |
| [x] Ana  [x] Matei               |
|                                  |
| Date *                           |
| [ Jun 20, 2026 ]                 |
|                                  |
| Time                             |
| [ 09:00 ] to [ 14:00 ]           |
|                                  |
| Location                         |
| [ City Museum                  ] |
|                                  |
| Attachment                       |
| [ Upload file ]                  |
|                                  |
| [ Save Event ]                   |
+----------------------------------+
```

---

## 2.11 Permission slips screen

### Purpose

Show forms that require parent action.

### Primary actions

* Add permission slip
* Upload document
* Change status
* Filter by status
* Open detail

### Important information displayed

* title
* due date
* status
* linked children
* submission date if submitted
* attached document

### Recommended visual priority

Permission slips should be treated as “action required” items, not just documents.

```text
Pending
- Museum trip permission slip — due tomorrow

Submitted
- Medical update form — submitted Jun 4
```

---

## 2.12 Add / upload permission slip screen

### Purpose

Capture a permission slip and its status.

### Primary actions

* Save permission slip
* Upload file
* Select children
* Set due date
* Set status

### Important fields

Required:

* title
* at least one child

Optional but recommended:

* due date
* uploaded document
* notes

### Wireframe

```text
+----------------------------------+
| Add Permission Slip              |
+----------------------------------+

| Title *                          |
| [ Museum trip permission slip  ] |
|                                  |
| Children *                       |
| [x] Ana  [x] Matei               |
|                                  |
| Due date                         |
| [ Jun 17, 2026 ]                 |
|                                  |
| Status                           |
| [ Pending ▼ ]                    |
|                                  |
| Document                         |
| [ Upload file ]                  |
|                                  |
| Notes                            |
| [ Bring signed form by Monday  ] |
|                                  |
| [ Save Permission Slip ]         |
+----------------------------------+
```

---

## 2.13 Documents screen

### Purpose

Act as the family’s school document library.

### Primary actions

* Upload document
* Search documents
* Filter by child
* Filter by category
* Open document
* Link document to a record

### Important information displayed

* document title
* category
* linked children
* upload date
* linked record, if any

### Recommended categories

* Timetable
* Menu
* Medical
* Trip
* Exam
* Homework
* Permission slip
* General
* Other

---

## 2.14 Upload document / attachment screen

### Purpose

Allow a parent to store a file and optionally link it to another record.

### Primary actions

* Upload file
* Add title/category
* Link to children
* Link to homework/event/permission slip

### Important UX distinction

The parent should not need to understand the technical difference between:

```text
Document
Attachment
```

Use user-friendly language:

* “Upload document”
* “Attach file”
* “Link to homework”
* “Link to event”
* “Link to permission slip”

---

## 2.15 Teachers screen

### Purpose

Manage teacher contacts as simple reference data.

### Primary actions

* Add teacher
* Edit teacher
* Archive teacher

### Important information displayed

* teacher name
* subject
* email
* phone
* linked homework/meetings count

### UX recommendation

Teacher creation should also be available inline from Add Homework and Add Event.

Busy parents should not have to leave the form to create a teacher.

---

## 2.16 Settings screen

### Purpose

Manage family and account settings.

### Primary actions

* Edit parent profile
* Invite another parent
* Manage family members
* Change password
* Delete/archive data

### Important information displayed

* family name
* parent accounts
* current user role
* account settings

---

# 3. User flows

## 3.1 Register and login

### Register flow

```text
Open app
→ Click Create Account
→ Enter name, email, password
→ Create account
→ Create family workspace automatically
→ Add first child
→ Go to dashboard
```

### Login flow

```text
Open app
→ Enter email and password
→ Login
→ Go to dashboard
```

### UX principle

After registration, do not show an empty dashboard first. Guide the parent to add a child.

---

## 3.2 Add a child

```text
Dashboard or Children
→ Click Add Child
→ Enter child name
→ Add optional details
→ Save
→ Child appears in child filter and dashboard
```

### Minimum successful input

```text
First name only
```

This reduces friction.

---

## 3.3 Add homework

```text
Dashboard
→ Click Add Homework
→ Enter title
→ Select child/children
→ Add due date
→ Select or add teacher
→ Add notes/attachment if needed
→ Save
→ Homework appears in dashboard and homework list
```

### Time-saving improvement

Allow “quick add homework” from dashboard:

```text
Title + Child + Due date
```

Advanced fields can be hidden under “More details.”

---

## 3.4 Add a school event

```text
Dashboard or Events
→ Click Add Event
→ Enter title
→ Select event type
→ Select child/children
→ Add date/time
→ Add location/teacher/attachment if needed
→ Save
→ Event appears in upcoming activities
```

### UX principle

Parent meetings are not a separate area. They are event type:

```text
Meeting
```

---

## 3.5 Upload a permission slip

```text
Dashboard or Permission Slips
→ Click Add Permission Slip
→ Enter title
→ Select child/children
→ Add due date
→ Upload document
→ Set status to Pending
→ Save
→ Permission slip appears under Needs Attention
```

### Later status update

```text
Open permission slip
→ Change status to Signed or Submitted
→ Add signed/submitted date if needed
→ Save
```

---

## 3.6 Upload an attachment

There are two common flows.

### A. Upload from inside a record

```text
Open homework/event/permission slip
→ Click Add Attachment
→ Select file
→ Upload
→ File is linked automatically to the current record
```

### B. Upload standalone document

```text
Documents
→ Upload Document
→ Select file
→ Add title/category
→ Link to child/children optionally
→ Save
```

### UX rule

Uploading from inside a record should automatically link the attachment. Do not ask the parent to manually choose the record again.

---

## 3.7 Mark homework as completed

```text
Dashboard or Homework Detail
→ Find homework
→ Locate child status
→ Click Mark Complete for that child
→ Status updates immediately
```

### If homework has multiple children

```text
Math Worksheet
Ana: Completed
Matei: Not started [Mark Complete]
```

### UX warning

Avoid a single global “complete homework” button unless the UI makes clear it applies to all children.

---

## 3.8 View upcoming activities

```text
Login
→ Dashboard
→ See Today, Needs Attention, Upcoming
→ Filter by child if needed
→ Open item details
```

### Dashboard sections

Recommended order:

1. Needs Attention
2. Today
3. This Week
4. Upcoming Events
5. Recent Documents

---

# 4. Dashboard design

## What parent should see immediately after login

The dashboard should answer:

```text
What needs my attention today?
What is overdue?
What is coming soon?
What did I recently upload?
```

## Recommended dashboard sections

### 1. Quick actions

At the top:

```text
[+ Homework] [+ Event] [+ Permission Slip] [+ Document]
```

These should be always easy to access.

---

### 2. Child filter

```text
All children ▼
Ana
Matei
```

The filter should affect the dashboard content immediately.

---

### 3. Needs Attention

Highest priority section.

Show:

* overdue homework
* permission slips due soon
* permission slips pending
* events happening today
* homework due today

Example:

```text
Needs Attention
⚠ Math worksheet overdue — Matei
✍ Museum trip permission slip due tomorrow
📅 Parent meeting today at 16:00
```

---

### 4. Today

Show date-based items for the current day.

```text
Today
- Parent meeting, 16:00
- English reading due today
```

---

### 5. This Week

Show near-term planning items.

```text
This Week
- Museum trip — Jun 20
- Permission slip due — Jun 17
- Math homework due — Jun 18
```

---

### 6. Recent documents

Show the last few uploaded documents.

```text
Recent Documents
- June lunch menu.pdf
- Museum trip details.pdf
```

---

## Dashboard wireframe

```text
+------------------------------------------------+
| Good morning, Ada                              |
| [All Children ▼]                               |
+------------------------------------------------+

| Quick Add                                      |
| [+ Homework] [+ Event] [+ Permission Slip]     |
| [+ Document]                                   |
+------------------------------------------------+

| Needs Attention                                |
| ⚠ Math worksheet overdue        Matei          |
| ✍ Permission slip due tomorrow  Ana, Matei     |
+------------------------------------------------+

| Today                                          |
| 16:00 Parent meeting with Mrs. Popescu         |
+------------------------------------------------+

| This Week                                      |
| Jun 17 Museum slip due                         |
| Jun 20 Museum trip                             |
+------------------------------------------------+

| Recent Documents                               |
| June lunch menu.pdf                            |
| Trip details.pdf                               |
+------------------------------------------------+
```

---

# 5. Mobile-first considerations

Busy parents will often use this app:

* in the morning
* at school pickup/drop-off
* while reading WhatsApp/email
* while holding a child or doing another task
* from a phone, not a desktop

## Mobile UX rules

### 1. Prioritize quick actions

Quick add buttons should be visible immediately.

```text
+ Homework
+ Event
+ Slip
+ Document
```

### 2. Use short forms

Start with required fields only.

Example for homework:

```text
Title
Child
Due date
```

Then allow optional expansion:

```text
More details
```

### 3. Use bottom navigation on mobile

Bottom navigation should include the most-used sections:

```text
Dashboard | Homework | Events | Slips | Documents
```

Settings and Teachers can be under a menu.

### 4. Use large tap targets

Parents should be able to tap:

* mark complete
* upload file
* select child
* change status

without precision.

### 5. Avoid dense tables on mobile

Use cards instead of tables.

Desktop can use table/list hybrid layouts.

### 6. Support fast file upload

On mobile, upload should allow:

* camera/photo
* file picker
* recent files

### 7. Avoid long multi-step flows

Most creation flows should fit on one screen or a short two-step process.

---

# 6. Empty states

Empty states should guide parents toward the next useful action.

## Empty dashboard

```text
Your dashboard is ready.

Start by adding your first child, then you can track homework,
events, permission slips, and school documents in one place.

[Add Child]
```

---

## No homework

```text
No homework yet.

Add homework when your child receives an assignment,
so you can track due dates and completion.

[Add Homework]
```

---

## No events

```text
No school events yet.

Add trips, meetings, exams, holidays, or performances
so they appear in your upcoming activities.

[Add Event]
```

---

## No permission slips

```text
No permission slips yet.

When a school form needs signing or submitting,
add it here so it does not get forgotten.

[Add Permission Slip]
```

---

## No documents

```text
No documents uploaded yet.

Upload menus, timetables, forms, trip details, or homework files
so you can find them later.

[Upload Document]
```

---

## No teachers

```text
No teacher contacts yet.

Add teachers when you want to link homework or meetings
to a specific teacher.

[Add Teacher]
```

---

# 7. Error states

Error messages should be clear, calm, and actionable.

## Validation errors

Example:

```text
Please enter a homework title.
```

```text
Select at least one child.
```

```text
The due date cannot be empty for a reminder.
```

## File upload errors

Example:

```text
This file is too large. Please upload a smaller file.
```

```text
This file type is not supported. Try a PDF or image file.
```

```text
Upload failed. Please check your connection and try again.
```

## Authorization errors

Example:

```text
You do not have access to this item.
```

Avoid technical explanations.

## Network errors

Example:

```text
We could not save your changes. Please try again.
```

If possible, preserve the form data so the parent does not lose what they typed.

## Delete errors

Example:

```text
This attachment is still linked to other records.
Remove those links before deleting it.
```

## Empty required relationship errors

Example:

```text
Homework must be linked to at least one child.
```

---

# 8. Notifications and reminders

For Version 1, keep reminders simple.

## MVP reminder strategy

Start with **in-app reminders** on the dashboard.

Show:

* overdue homework
* homework due today
* homework due soon
* permission slips due soon
* upcoming events
* events today

This avoids implementing push/email notifications too early.

## Recommended reminder rules

### Homework

Show in Needs Attention when:

```text
due date is today
due date has passed and not completed for at least one child
```

### Permission slips

Show in Needs Attention when:

```text
status is pending and due date is within the next few days
status is pending and due date has passed
```

### Events

Show in Today when:

```text
event date is today
```

Show in Upcoming when:

```text
event date is within the next 7–14 days
```

## Future notifications

Add later:

* email reminders
* push notifications
* daily summary
* parent-specific notification preferences

Do not build a complex notification system in Version 1 unless the MVP requires it.

---

# 9. Navigation recommendations

## Desktop recommendation

Use a **left sidebar**.

```text
Dashboard
Children
Homework
Events
Permission Slips
Documents
Teachers
Settings
```

Why sidebar works on desktop:

* dashboard apps usually have multiple sections
* navigation is always visible
* parents can quickly switch between modules
* scales better than a top menu

---

## Mobile recommendation

Use **bottom navigation** for primary sections.

Recommended mobile bottom nav:

```text
Dashboard | Homework | Events | Slips | Documents
```

Put less frequent items in a menu:

```text
Children
Teachers
Settings
```

Why bottom navigation works on mobile:

* easier thumb access
* faster switching
* keeps the most common actions visible
* avoids hidden hamburger-only navigation

---

## Top bar recommendation

Use a simple top bar for:

* page title
* child filter
* quick add button
* account/menu access

Example:

```text
[Dashboard]       [All Children ▼]    [+]
```

---

## Floating action button option

On mobile, a floating `+` button can open quick actions:

```text
Add Homework
Add Event
Add Permission Slip
Upload Document
```

This is useful because adding items quickly is central to the product.

---

# 10. UX principles for this app

## 1. Minimize clicks

Common actions should be available from the dashboard:

```text
Add homework
Add event
Add permission slip
Upload document
Mark homework complete
```

Avoid forcing parents to navigate deep into modules for everyday actions.

---

## 2. Minimize manual data entry

Use:

* sensible defaults
* optional fields
* recent teachers
* recent children
* date shortcuts
* reusable attachments
* inline teacher creation
* quick-add forms

Examples:

```text
Due date shortcuts:
Today
Tomorrow
This Friday
Next Monday
```

```text
Teacher field:
Recently used teachers appear first.
```

---

## 3. Reduce cognitive load

Use simple language.

Prefer:

```text
Permission Slip
```

over:

```text
Actionable Document Workflow
```

Prefer:

```text
Needs Attention
```

over:

```text
Pending Administrative Obligations
```

Group by urgency:

```text
Overdue
Today
This Week
Later
```

not by database type only.

---

## 4. Optimize for busy parents

Parents are not opening the app to “manage data.” They are opening it to avoid forgetting things.

Design around real parent moments:

```text
I just received a form.
I need to remember a deadline.
I need to know what is due tomorrow.
I need to find that PDF.
I need to mark this homework as done.
```

---

## 5. Make the dashboard action-oriented

The dashboard should not be just a summary. It should allow immediate action.

Examples:

```text
[Mark Complete]
[Mark Submitted]
[Upload Signed Form]
[Add Reminder]
```

---

## 6. Use progressive disclosure

Show basic fields first.

Hide advanced fields behind:

```text
More details
```

For example, Add Homework should not initially overwhelm the user with every possible field.

---

## 7. Keep child context visible

Whenever a record involves children, show child names clearly.

Bad:

```text
Math worksheet
```

Better:

```text
Math worksheet — Ana, Matei
```

Even better when completion differs:

```text
Math worksheet
Ana: Completed
Matei: Not started
```

---

## 8. Make status obvious

Use clear status labels:

Homework:

```text
Not started
In progress
Completed
Overdue
```

Permission slips:

```text
Pending
Signed
Submitted
Expired
```

Events:

```text
Scheduled
Cancelled
Past
```

---

# Recommended MVP UX summary

The Version 1 UX should be built around five core areas:

```text
Dashboard
Homework
Events
Permission Slips
Documents
```

Children and teachers support those flows, but they should not dominate the experience.

The ideal parent experience is:

```text
Open app
→ See what needs attention
→ Add a new item quickly
→ Mark something done
→ Find a document fast
→ Leave the app
```

That is the correct UX target for a time-saving Family School Dashboard.
