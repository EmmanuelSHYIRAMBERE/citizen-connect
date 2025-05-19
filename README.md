# <div align="center">🏛️ CitizenConnect</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  
  <p align="center" class="tagline">
    <em>Bridging Communities & Government</em><br>
    <strong>A Next.js 15 citizen engagement platform with AI-powered routing</strong>
  </p>
</div>

<div class="project-badges" align="center">
  <a href="#features">
    <img src="https://img.shields.io/badge/✓-Multi--role_Access-blue" alt="Multi-role Access" />
  </a>
  <a href="#tech-stack">
    <img src="https://img.shields.io/badge/✓-AI_Powered-orange" alt="AI Powered" />
  </a>
  <a href="#features">
    <img src="https://img.shields.io/badge/✓-Multilingual-green" alt="Multilingual" />
  </a>
  <a href="#features">
    <img src="https://img.shields.io/badge/✓-Real--time_Updates-purple" alt="Real-time Updates" />
  </a>
</div>

<div class="table-of-contents">

## 📑 Table of Contents

- [👀 Project Overview](#project-overview)
- [✨ Key Features](#key-features)
- [🛠️ Tech Stack](#️tech-stack)
- [📊 Project Structure](#project-structure)
- [🚀 Getting Started](#getting-started)
- [🖥️ Usage & Demo](#️usage)
- [👥 Contributing](#contributing)
- [📞 Contact](#contact)

</div>

## 👀 Project Overview

<div class="overview-section">
  <div class="overview-card">
    <p>CitizenConnect is a comprehensive civic engagement platform that transforms how citizens interact with government agencies. It provides a streamlined system for submitting, tracking, and resolving public service complaints and feedback.</p>
    
    <p>The platform addresses the current fragmented complaint handling process by offering a centralized, efficient system that enhances citizen satisfaction and government accountability.</p>
  </div>
</div>

## ✨ Key Features

<div class="features-grid">

  <div class="feature-card ai-routing">
    <h3>🤖 AI-Powered Routing</h3>
    <p>Smart complaint categorization and automatic routing to appropriate government departments using advanced NLP algorithms.</p>
    <ul>
      <li>Intelligent complaint analysis</li>
      <li>Automatic department matching</li>
      <li>Priority scoring system</li>
    </ul>
    <a href="#" class="learn-more">Learn More →</a>
  </div>

  <div class="feature-card multilingual">
    <h3>🌐 Multilingual Support</h3>
    <p>Full platform translation with support for English, French, and Kinyarwanda - government-approved translations.</p>
    <ul>
      <li>UI language switching</li>
      <li>Automatic content translation</li>
      <li>Cultural context preservation</li>
    </ul>
    <a href="#" class="learn-more">Learn More →</a>
  </div>

  <div class="feature-card realtime">
    <h3>⚡ Real-time Updates</h3>
    <p>Live status tracking and instant notifications keep citizens informed throughout the resolution process.</p>
    <ul>
      <li>Push notifications</li>
      <li>SMS alerts</li>
      <li>Email updates</li>
    </ul>
    <a href="#" class="learn-more">Learn More →</a>
  </div>

  <div class="feature-card multi-role">
    <h3>👥 Three-Tier Access System</h3>
    <p>Role-based access control with dedicated interfaces for citizens, agency staff, and administrators.</p>
    <ul>
      <li>Citizen portal</li>
      <li>Agency dashboard</li>
      <li>Admin control center</li>
    </ul>
    <a href="#" class="learn-more">Learn More →</a>
  </div>
</div>

## 🛠️ Tech Stack

<div class="tech-stack-viz">
  <details>
  <summary>📊 <b>View Architecture Flow</b></summary>
  
  ```mermaid
  graph TD
    A[Next.js 15] --> B[App Router]
    B --> C[API Routes]
    C --> D[Auth System]
    D --> E[Multi-role Access]
    
    B --> F[Internationalization]
    F --> G[EN/FR/RW Support]
    
    H[MongoDB] --> I[Prisma ORM]
    I --> J[Data Models]
    
    K[AI Services] --> L[Complaint Analysis]
    L --> M[Department Routing]
    
    N[WebSockets] --> O[Real-time Updates]
    
    P[Tailwind CSS] --> Q[Responsive UI]
    Q --> R[Animations]
  ```
  </details>
</div>

### Core Technologies

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Prisma ORM
- **Authentication**: NextAuth.js with role-based access control
- **AI Components**: Natural Language Processing for complaint routing
- **Real-time**: WebSockets for live updates and notifications
- **Internationalization**: i18n with support for EN/FR/RW

## 📊 Project Structure

<details>
<summary>📂 <b>View Project Structure</b></summary>

```
src/app/
├── [locale]/
│   ├── (public)/
│   │   ├── complaints/
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Complaint submission wizard
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx          # Complaint details
│   │   │   └── page.tsx              # Public complaints dashboard
│   │   ├── about/
│   │   │   └── page.tsx              # About the system
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact information
│   │   └── page.tsx                  # Homepage
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Admin analytics dashboard
│   │   │   ├── complaints/
│   │   │   │   └── page.tsx          # Complaint management
│   │   │   ├── departments/
│   │   │   │   └── page.tsx          # Department management
│   │   │   └── users/
│   │   │       └── page.tsx          # User management
│   │   └── layout.tsx                # Admin layout
│   ├── (citizen)/
│   │   ├── citizen/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Citizen dashboard
│   │   │   ├── complaints/
│   │   │   │   └── page.tsx          # Citizen's complaints
│   │   │   └── profile/
│   │   │       └── page.tsx          # Citizen profile
│   │   └── layout.tsx                # Citizen layout
│   ├── (agency)/
│   │   ├── agency/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Agency dashboard
│   │   │   ├── complaints/
│   │   │   │   └── page.tsx          # Agency's complaints
│   │   │   └── reports/
│   │   │       └── page.tsx          # Agency Reports
│   │   │   └── settings/
│   │   │       └── page.tsx          # Agency Settings
│   │   └── layout.tsx                # Citizen layout
│   ├── (auth)/
│   │   ├── auth/
│   │   │   └── register.tsx              # Registration page
│   │   │   │   └── page.tsx/
│   │   │   └── login            # Login page
│   │   │       └── page.tsx/
│   │   └── layout.tsx                # Auth layout
│   └── layout.tsx                    # Root layout
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts              # Auth routes
│   ├── complaints/
│   │   └── route.ts                  # Complaints API
│   ├── departments/
│   │   └── route.ts                  # Departments API
│   ├── notifications/
│   │   └── route.ts                  # Notifications API
│   └── stats/
│       └── route.ts                  # Statistics API
components/
├── animations/                       # Reusable animation components
│   ├── AnimatedCard.tsx
│   ├── AnimatedProgress.tsx
│   ├── MicroInteraction.tsx
│   └── ScrollReveal.tsx
├── complaints/                       # Complaint components
│   ├── ComplaintCard.tsx
│   ├── ComplaintForm.tsx
│   ├── ComplaintStatus.tsx
│   └── ComplaintTimeline.tsx
├── data-viz/                         # Data visualization
│   ├── AnimatedChart.tsx
│   ├── ComplaintMap.tsx
│   └── StatsCounter.tsx
├── layout/                           # Layout components
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LanguageSwitcher.tsx
│   └── Sidebar.tsx
├── ui/                               # UI components
│   ├── AnimatedButton.tsx
│   ├── AnimatedFormField.tsx
│   ├── LoadingSkeleton.tsx
│   └── ThemeToggle.tsx
└── wizard/                           # Multi-step form components
    ├── StepIndicator.tsx
    ├── WizardForm.tsx
    └── WizardStep.tsx
└── chatbot/
    ├── Chatbot.tsx                   # Main component
    ├── ChatMessage.tsx               # Message component
    └── ChatInput.tsx                 # Input with lang detection
├── hooks/
│   ├── useChatHistory.ts             # Local storage management
│   └── useLanguageDetection.ts
├── animations/                       # Framer Motion presets
├── services/
│   ├── AIService.ts                  # API calls
│   └── TranslationService.ts
└── types/
```

</details>

## 🚀 Getting Started

Follow these simple steps to get CitizenConnect running locally:

<div class="installation-guide">

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB instance
- .env file with configuration (template provided)

### Installation

### 1. Clone the repository

```bash
https://github.com/EmmanuelSHYIRAMBERE/citizen-connect.git
cd citizen-connect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### Edit .env.local with your configuration

### 4. Initialize Prisma

```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

</div>

## 🖥️ Usage

<div class="usage-section">

### Citizen Complaint Journey

1. **Register/Login** - Create an account or sign in using social providers
2. **Submit Complaint** - Use the intuitive 3-step wizard to file a new complaint
3. **Track Progress** - Monitor real-time status updates on your submission
4. **Receive Resolution** - Get notified when your complaint is resolved

### Admin Dashboard

Access comprehensive analytics, department performance metrics, and response time statistics:

## Login to admin portal

```bash
http://localhost:3000/rw/admin/dashboard
```

## Demo Link:

```bash
https://citizenconnect-tan.vercel.app
```

#### Admin Default credentials: `admin@citizenconnect.gov` / `P@ssw0rd!`

#### Agency Default credentials: `agency@citizenconnect.gov` / `P@ssw0rd!`

#### User Default credentials: `user@citizenconnect.gov` / `P@ssw0rd!`

</div>

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Emmanuel SHYIRAMBERE - [LinkedIn Profile](https://www.linkedin.com/in/emashyirambere)

<div class="contact-section">
  <p align="center">
    <a href="mailto:emashyirambere1@gmail.com">Mail</a> | 
    <a href="https://github.com/EmmanuelSHYIRAMBERE">GitHub</a>
  </p>
</div>

<div align="center">
  <a href="#" class="back-to-top">
    <img src="https://img.shields.io/badge/↑-Back_to_Top-blue" alt="Back to Top" />
  </a>
</div>
