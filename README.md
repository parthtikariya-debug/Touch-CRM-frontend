# WOVE — AI Customer Engagement Platform

A modern, interactive **AI customer engagement platform frontend** built with **React & Next.js**. This project showcases a visually polished SaaS-style UI with smooth animations, responsive layouts, reusable components, and interactive sections designed around AI-powered customer engagement.

---

## Project Objective

The goal of this project was to build a **high-fidelity SaaS platform frontend** for an AI-powered customer engagement product.

The interface is designed around helping D2C brands manage customer relationships, automate engagement, communicate across multiple channels, and improve customer retention.

This project was also my **first major project using React and Next.js**, giving me hands-on experience with component-based development, responsive design, animations, and modern frontend architecture.

> **Note:** This project is currently frontend-only. No production backend, database, authentication, or real CRM functionality is implemented.

---

## Key Features

* **AI Agents Interface** — Modern UI representing AI-powered customer engagement agents and automated interactions.

* **CRM Interface** — A dedicated section representing customer relationship and contact management.

* **Omnichannel Communication** — UI concept for managing customer conversations across multiple communication channels.

* **Automation Workflows** — Interactive visual sections representing automated customer engagement workflows.

* **Customer Journey** — A visual representation of different stages of the customer lifecycle.

* **Interactive DotBot** — An animated AI assistant element integrated into the interface.

* **Smooth Animations** — Page transitions, scroll animations, hover effects, and interactive elements powered by Framer Motion.

* **Responsive Layout** — Designed to provide a consistent experience across desktop, tablet, and mobile devices.

* **Reusable Components** — UI sections are separated into reusable React components for cleaner and more maintainable code.

* **Modern SaaS Design** — Uses gradients, glass effects, cards, floating elements, and layered UI to create a modern product experience.

---

## Project Structure

```text
TouchCRM-main/

├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── dotbot/
│   ├── ui/
│   └── wove/
│
├── hooks/
├── lib/
├── memory/
├── public/
├── tests/
│
├── components.json
├── jsconfig.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## How It Works

### Component-Based Architecture

The interface is divided into multiple reusable React components instead of keeping the entire application inside a single page.

Major sections include:

* AI Agents
* CRM
* Omnichannel Communication
* Automation
* Customer Journey
* Navigation
* Footer
* DotBot
* Reusable UI Components

This makes the interface easier to maintain and allows individual sections to be modified independently.

---

### Animations & Interactions

The project uses **Framer Motion** to create smooth animations and transitions.

Animations are used for:

* Section entrances
* Hover interactions
* Floating elements
* Navigation interactions
* DotBot animations
* Scroll-based effects
* UI transitions

Example:

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  ...
</motion.div>
```

---

### Responsive Design

The frontend uses **Tailwind CSS** and responsive layouts to adapt the interface to different screen sizes.

The goal was to maintain the same visual hierarchy and usability across:

* Desktop
* Tablet
* Mobile

---

## Challenges & What I Learned

### Challenge 1 — Moving From HTML/CSS to React

**Problem:** Coming from simpler HTML and CSS projects, structuring a complete interface using React components was a new approach.

**What I learned:** Large interfaces can be broken down into smaller, reusable components instead of maintaining one large HTML structure.

---

### Challenge 2 — Creating Smooth UI Animations

**Problem:** Building a polished SaaS interface requires more than static layouts. Elements need to respond naturally to scrolling, hovering, and user interaction.

**What I learned:** Framer Motion provides a powerful way to create reusable animation patterns while keeping the animation logic inside React components.

---

### Challenge 3 — Building a Consistent Responsive UI

**Problem:** Maintaining spacing, typography, component sizing, and visual hierarchy across different screen sizes required careful responsive design.

**What I learned:** Responsive development isn't just about making elements smaller. The layout and hierarchy sometimes need to change depending on the available screen space.

---

## Tech Stack

| Technology          | Usage                                        |
| ------------------- | -------------------------------------------- |
| **React**           | Component-based UI development               |
| **Next.js**         | Frontend framework and application structure |
| **JavaScript**      | Application logic                            |
| **Tailwind CSS**    | Styling and responsive layouts               |
| **Framer Motion**   | Animations and interactions                  |
| **Radix UI**        | Accessible UI primitives                     |
| **Lucide React**    | Icons                                        |
| **Recharts**        | Data visualization                           |
| **React Hook Form** | Form handling                                |
| **Zod**             | Data validation                              |

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### Navigate into the project

```bash
cd TouchCRM-main
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

## Project Status

**Frontend Only — Work in Progress**

The current version focuses on the frontend experience and UI implementation.

### Currently Implemented

* Modern responsive UI
* React components
* Next.js application structure
* Tailwind CSS styling
* Framer Motion animations
* AI Agents UI
* CRM UI
* Omnichannel UI
* Automation UI
* Customer Journey UI
* Interactive UI elements

### Not Currently Implemented

* Backend API
* Database
* User authentication
* Real CRM data
* Real customer conversations
* Production AI agents
* Persistent user accounts
* Payment system

---

## Future Improvements

Possible future additions include:

* Backend API
* Database integration
* User authentication
* Real customer/contact management
* AI-powered customer agents
* Real-time messaging
* CRM pipelines
* Analytics dashboard
* Customer data synchronization
* Third-party integrations
* Role-based access control

---

## What I Learned

This project was my **first major project using React and Next.js**.

It helped me move beyond basic HTML and CSS and understand how modern frontend applications are structured.

Through this project, I gained experience with:

* React component architecture
* Next.js
* Tailwind CSS
* Framer Motion
* Responsive web design
* Reusable UI components
* Modern SaaS interface design
* Git and GitHub

---

## Author

**Parth Tikariya**

GitHub: [@parthtikariya-debug](https://github.com/parthtikariya-debug)

---

*Built as a learning project while exploring modern frontend development with React and Next.js.*
