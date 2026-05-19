# React Hook Form - Qualification Task

A multi-step order form built as a qualification task. Demonstrates practical usage of `react-hook-form` with complex validation rules, cross-field dependencies, fake async API calls, and session persistence via `localStorage`.

---

## Stack

| Layer             | Library                           |
| ----------------- | --------------------------------- |
| Framework         | React 18 + TypeScript             |
| Build tool        | Vite                              |
| Form state        | react-hook-form 7                 |
| UI components     | MUI v5 (Material UI)              |
| Date/time pickers | @mui/x-date-pickers + date-fns    |
| Drag & drop       | @dnd-kit/core + @dnd-kit/sortable |
| Linting           | ESLint + Prettier                 |
| Git hooks         | Husky (pre-push lint)             |
| Package manager   | pnpm                              |

---

## Concept

The app is a single-page, three-step order form. Each step is validated independently - the user cannot advance until all required fields on the current step pass. On every "Next" click a fake save request fires; on successful order submission a completion screen is shown and the form resets.

```
Step 1: Client Info  →  Step 2: Order Info  →  Step 3: Products List  →  Confirm & Submit
```

A MUI `Stepper` displays progress. Navigation buttons (`Back` / `Next` / `Make order`) are rendered by a shared `FormActions` component that is aware of which step is active.

---

## Steps

### Step 1 - Client Info

Fields: **Name**, **Email**, **Phone**, **Delivery address**, **Comment** (optional).

### Step 2 - Order Info

Fields: **Delivery date** (date picker), **Delivery time** (time picker), **Payment method** (select), **Shipping method** (select).

### Step 3 - Products List

A dynamic list of product cards managed by `useFieldArray`. The user fills in a draft product form and saves it to the list. Cards can be **reordered by drag-and-drop** and **removed** via a confirmation modal. A running **order total** is displayed below the list.

---

## Validations

All rules live in a single `useValidationRules` hook (implemented as a hook rather than a plain object so it can call `useFormContext` for cross-field access).

### Client Info

| Field   | Rules                                                                            |
| ------- | -------------------------------------------------------------------------------- |
| Name    | Required · min 2 chars · cannot be whitespace-only                               |
| Email   | Required · regex format check · **async uniqueness check** (fake API, see below) |
| Phone   | Required · must match `+1XXXXXXXXXX` format                                      |
| Address | Required · min 10 chars · cannot be whitespace-only                              |
| Comment | Optional · hard cap of **500 characters** (UI warning, not a blocking error)     |

### Order Info

| Field           | Rules                                                                |
| --------------- | -------------------------------------------------------------------- |
| Delivery date   | Required · must be **at least tomorrow**                             |
| Delivery time   | Required · **cross-validated against the selected date** (see below) |
| Payment method  | Required                                                             |
| Shipping method | Required                                                             |

#### Cross-validation: delivery time depends on delivery date

When the selected date falls on a **weekday**, delivery time must be between **09:00 and 21:00**.  
When the date falls on a **weekend** (Saturday or Sunday), delivery is only available **11:00–13:00**.

The time picker enforces these limits visually via `shouldDisableTime` and `minTime`/`maxTime`. Additionally, whenever the date changes the time field is explicitly re-triggered (`trigger('deliveryTime')`) so the error message updates immediately without the user touching the time field again.

### Products List

| Field          | Rules                                                                        |
| -------------- | ---------------------------------------------------------------------------- |
| Product name   | Required · min 3 chars · cannot be whitespace-only                           |
| Quantity       | Required · integer · 1–99                                                    |
| Price per unit | Required · must be > 0                                                       |
| Category       | Required (select)                                                            |
| Notes          | Optional · hard cap of **200 characters** (UI warning, not a blocking error) |

The list itself is capped at **20 items**; the "Add" button is disabled and a warning is shown when the limit is reached.

---

## Fake API calls

There is no real backend. Two utilities simulate network behaviour:

### `sendData`

Resolves after **1 500 ms** with a **75 % chance of HTTP 200** and a 25 % chance of HTTP 500. Used on every "Next" click (to fake a mid-form save) and on final order submission. When a 500 is returned a MUI `Snackbar` error toast appears.

### `checkEmailAvailability`

Resolves after **500 ms** and checks the entered email against a hard-coded blocklist (`email@gmail.com`, `test@gmail.com`). If the email is taken, a field-level error is shown. The async check is skipped when the email does not yet pass the format regex, so the two rules do not race.

---

## UI states

| State                              | Component                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Loading (any API call in progress) | `LoaderWithBackground` - a spinner with a full-screen semi-transparent overlay that blocks interaction |
| API error                          | MUI `Snackbar` with an error `Alert`, auto-hides after 6 s                                             |
| Order review before submit         | `ApproveOrderModal` - a dialog listing all filled-in details and the full product list with the total  |
| Product delete confirmation        | `RemoveProductModal` - prevents accidental removal                                                     |
| Order completed                    | `OrderSuccessfullyCompleted` - replaces the whole form; a "Make new order" button resets everything    |

---

## localStorage persistence

Form data is persisted so a browser refresh does not lose progress.

- **On every "Next" click** - the current form values and the new step index are written to `localStorage` after a successful fake save.
- **Automatic interval** - `setInterval` writes the current values every **30 seconds** while the form is open, so even if the user never advances they do not lose what they typed.
- **On page load** - saved values are read and passed as `defaultValues` to `useForm`. `Date` objects are re-hydrated from their serialised string form.
- **On successful submission** - both keys (`savedOrderForm` and `savedOrderFormStep`) are removed, the form resets to defaults, and the step returns to 0.

---

## Getting started

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm build        # type-check + Vite production build
pnpm preview      # serve the production build locally
pnpm lint         # Prettier + ESLint check
pnpm lint:fix     # auto-fix formatting and lint issues
pnpm typecheck    # tsc --noEmit
```

A Husky pre-push hook runs `pnpm lint` before every push.
