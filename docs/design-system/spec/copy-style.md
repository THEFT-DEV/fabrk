# Copy & Microcopy Style Guide

> Terminal-first copywriting for a developer-focused SaaS boilerplate.

## Core Principles

1. **Developer-friendly** - Direct, no-nonsense language
2. **Terminal aesthetic** - Command-line inspired formatting
3. **Consistency** - Same phrase = same format everywhere
4. **Brevity** - Shorter is better

---

## Button Text Format

### Primary Actions

```
> ACTION_NAME
```

**Rules:**

- Always prefix with `>` (command prompt)
- UPPERCASE with underscores
- No periods, no exclamation marks
- Action verbs preferred

**Examples:**
| Canonical | Never Use |
|-----------|-----------|
| `> GET_STARTED` | Get Started, GET STARTED, get started |
| `> GET_FABRK` | Get Fabrk, EXECUTE: GET_FABRK |
| `> SAVE_CHANGES` | Save Changes, Save |
| `> SEND_MESSAGE` | Send Message, Send, Submit |
| `> VIEW_DOCUMENTATION` | View Documentation, VIEW: DOCUMENTATION |

### Loading States

```
> LOADING...
> SAVING...
> SENDING...
```

**Rules:**

- Keep the `>` prefix during loading
- UPPERCASE with ellipsis (`...`)
- Match the action verb when possible

**Examples:**
| Action | Loading State |
|--------|---------------|
| `> SAVE_CHANGES` | `> SAVING...` |
| `> SEND_MESSAGE` | `> SENDING...` |
| `> EXPORT` | `> EXPORTING...` |
| `> START_IMPERSONATION` | `> STARTING...` |
| `> DELETE_ACCOUNT` | `> DELETING...` |

### Secondary Actions

Same format as primary:

```
> VIEW_DOCS
> CANCEL
> BACK
```

---

## Labels Format

### Field Labels

```
[LABEL]:
```

**Examples:**

- `[EMAIL]:`
- `[PASSWORD]:`
- `[NAME]:`

### Status Labels

```
[STATUS]
```

**Examples:**

- `[ACTIVE]`
- `[PENDING]`
- `[ERROR]`
- `[SUCCESS]`

---

## Card Headers

### Standard Format

```
[ [0xNN] TITLE_WITH_UNDERSCORES ]
```

**Rules:**

- Square brackets with spaces inside
- Hex code prefix (`0x00`, `0x01`, etc.)
- UPPERCASE with underscores
- Incremental numbering per page/section

**Examples:**

- `[ [0x00] COOKIE_PREFERENCES ]`
- `[ [0x01] USER_SETTINGS ]`
- `[ [0x02] BILLING_INFO ]`

### Danger Zone

```
[ [!] DANGER_ZONE ]
```

---

## Tab Labels

```
[TAB_NAME]
```

**Rules:**

- Square brackets
- UPPERCASE with underscores
- No `>` prefix (tabs are not commands)

**Examples:**

- `[CONSENT]`
- `[DETAILS]`
- `[OVERVIEW]`
- `[ANALYTICS]`

---

## Error Messages

### Format

```
[ERROR]: Description in sentence case.
```

**Examples:**

- `[ERROR]: Invalid email address.`
- `[ERROR]: Password must be at least 8 characters.`

---

## Success Messages

### Format

```
[SUCCESS]: Description in sentence case.
```

**Examples:**

- `[SUCCESS]: Changes saved.`
- `[SUCCESS]: Email sent.`

---

## Casing Rules

| Context              | Case            | Example                  |
| -------------------- | --------------- | ------------------------ |
| Button text          | UPPERCASE_SNAKE | `> SAVE_CHANGES`         |
| Loading text         | UPPERCASE       | `> LOADING...`           |
| Labels               | UPPERCASE_SNAKE | `[EMAIL]:`               |
| Card headers         | UPPERCASE_SNAKE | `[ [0x00] SETTINGS ]`    |
| Tab labels           | UPPERCASE_SNAKE | `[DETAILS]`              |
| Error/success bodies | Sentence case   | `Invalid email address.` |
| Body copy            | Sentence case   | `This will log you out.` |
| Page titles          | Title Case      | `Cookie Policy`          |

---

## Reserved Words

These words have specific meanings in the terminal theme:

| Word      | Usage                            |
| --------- | -------------------------------- |
| `EXECUTE` | **DEPRECATED** - Don't use       |
| `VIEW`    | Action for navigation/display    |
| `GET`     | Action for obtaining something   |
| `SAVE`    | Action for persisting data       |
| `SEND`    | Action for transmitting data     |
| `DELETE`  | Action for removal (destructive) |
| `CANCEL`  | Action for aborting              |

---

## Documentation Exceptions

Code examples in `/docs/` may use typical patterns (Title Case, no prefix) to show conventional implementations:

```tsx
// Acceptable in docs
<Button>Save Changes</Button>

// Production code must use
<Button>> SAVE_CHANGES</Button>
```

---

## Quick Reference

```
Button:       > ACTION_NAME
Loading:      > LOADING...
Label:        [LABEL]:
Status:       [STATUS]
Card Header:  [ [0xNN] TITLE ]
Tab:          [TAB_NAME]
Error:        [ERROR]: Message.
Success:      [SUCCESS]: Message.
```
