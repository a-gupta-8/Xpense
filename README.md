# Xpense — Personal Expense Tracker

A modern personal expense tracking web application built with **React**, **Supabase**, **Tailwind CSS**, and **MUI X Charts**. Xpense helps users track expenses, manage account balances, and visualize spending patterns through interactive charts and financial summaries.

<img width="1657" height="344" alt="Screenshot 2026-08-13 at 8 27 38 PM" src="https://github.com/user-attachments/assets/6ecd182d-d537-4777-8b4e-fe22dac7dbbe" />

<img width="737" height="583" alt="Screenshot 2026-08-13 at 8 30 18 PM" src="https://github.com/user-attachments/assets/8a7a73b7-7529-439a-964d-b4bfebd5c38a" />


## ✨ Features

* 🔐 **User Authentication**

  * Secure authentication using Supabase Auth
  * User-specific data access

* 💰 **Expense Tracking**

  * Add, edit, and delete expenses
  * Record expense name, category, amount, payment account, and date
  * View current-month expenses

* 🏦 **Asset & Account Management**

  * Track balances across multiple financial accounts

* 📊 **Interactive Financial Visualizations**

  * Expense breakdown by category
  * Monthly expense trends
  * Asset distribution across accounts
  * Six-month expense trend visualization

* 🔄 **Automatic Chart Refresh**

  * Charts automatically refresh after adding or modifying financial data

* 🔒 **Row Level Security**

  * Supabase Row Level Security (RLS) policies ensure users can only access their own financial data

* 📱 **Responsive Design**

  * Built with Tailwind CSS
  * Optimized for desktop and mobile layouts

---

## 🛠️ Tech Stack

| Technology       | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| **React**        | Frontend framework                             |
| **Vite**         | Development server and build tool              |
| **Tailwind CSS** | Styling and responsive layouts                 |
| **Supabase**     | Database, authentication, and backend services |
| **PostgreSQL**   | Relational database                            |
| **MUI X Charts** | Financial data visualization                   |
| **JavaScript**   | Application logic                              |

---

## 🏗️ Architecture

```text
React Frontend
      │
      ├── Authentication
      │      └── Supabase Auth
      │
      ├── Expense Management
      │      ├── Add Expense
      │      ├── Edit Expense
      │      └── Delete Expense
      │
      ├── Asset Management
      │      ├── Add Balance
      │      └── Update Balance
      │
      └── Data Visualization
             ├── Expense Category Chart
             ├── Asset Distribution Chart
             └── Expense Trend Chart
                    │
                    ▼
               Supabase
                    │
                    ▼
               PostgreSQL
```

---


## 🗄️ Database

Xpense uses **Supabase PostgreSQL** as its backend database.

### Expenses

The `expenses` table stores individual transactions.

| Column     | Description                        |
| ---------- | ---------------------------------- |
| `id`       | Unique expense identifier          |
| `uuid`     | Authenticated user's UUID          |
| `name`     | Name or description of the expense |
| `category` | Expense category                   |
| `amount`   | Expense amount                     |
| `paid_by`  | Account used to pay                |
| `date`     | Date of the expense                |

### Assets

The asset table stores balances associated with financial accounts.

| Column    | Description               |
| --------- | ------------------------- |
| `id`      | Unique asset identifier   |
| `uuid`    | Authenticated user's UUID |
| `bank`    | Financial account         |
| `balance` | Current account balance   |

---

## 🔐 Security

Xpense uses **Supabase Row Level Security (RLS)** to protect user data.

Each user's records are associated with their authenticated Supabase UUID. Database policies use the authenticated user's UUID to restrict access to their own records.

Conceptually:

```sql
auth.uid() = uuid
```

This ensures that authenticated users cannot read or modify another user's financial information.

> Never expose your Supabase service-role key in the frontend. Client-side applications should use the publishable/anonymous key together with properly configured RLS policies.

---

## 🔄 Data Flow

When an expense is added, Xpense follows this general flow:

```text
User enters expense
        │
        ▼
React Component
        │
        ▼
Supabase Query
        │
        ▼
RLS Policy Validation
        │
        ▼
PostgreSQL
        │
        ▼
Account Balance Updated
        │
        ▼
Charts Refresh
```

This keeps the financial dashboard synchronized with the underlying database.

---

## 🔮 Future Improvements

Potential future improvements include:

* [ ] Budget tracking
* [ ] Recurring expenses
* [ ] Custom expense categories
* [ ] Monthly spending limits
* [ ] Income tracking
* [ ] Net worth tracking
* [ ] Advanced date filtering
* [ ] CSV data export
* [ ] More detailed financial analytics
* [ ] Investment Portfolio

---

## 📄 License

This project is intended for **personal use**.

---

## 👨‍💻 Author

**Aviral Gupta**

Built as a personal project to track expenses, manage financial accounts, and explore financial data visualization with modern web technologies.
