# NVX Next.js Library

<h3 align="center">🧩 A Modern & Reusable Component Library for Next.js 🧩</h3>

<p align="center">
  A collection of production-ready, customizable, and type-safe React components designed to accelerate your Next.js development workflow.
</p>

<p align="center">
  <!-- Badges/Shields -->
  
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript">
</p>


---

## About The Project

**nvx-nextjs-library-svc** is a modern component library built from the ground up for seamless integration with Next.js applications. It provides a curated collection of high-quality, reusable React components that follow best practices for performance, accessibility, and developer experience. By handling the boilerplate, this library lets you focus on building features, not components.

## ✨ Key Features

-   ✅ **Seamless Next.js Integration:** Designed to work flawlessly with the App Router, Server Components, and Client Components.
-   ✅ **Type-Safe:** Built entirely with TypeScript for a predictable and error-free development experience.
-   ✅ **Highly Customizable:** Easily adapt components to your project's theme and design system.
-   ✅ **Accessibility First:** Follows WAI-ARIA standards to ensure components are usable by everyone.
-   ✅ **Tree-Shakable:** Optimized to ensure only the code you use is included in your final bundle.
-   ✅ **Comprehensive Documentation:** (Optional) Comes with a Storybook for live previews and detailed prop documentation.

## 🛠️ Tech Stack

-   **Core:** [React](https://react.dev/) 18, [Next.js](https://nextjs.org/) 14
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** (Specify your approach, e.g., CSS Modules, Tailwind CSS, Styled-components)
-   **Bundler:** (Specify if not using Next.js default, e.g., Rollup, Vite)
-   **Documentation:** [Storybook](https://storybook.js.org/) (Recommended)

## 🚀 Getting Started

### 1. Installation

Install the package from npm or yarn:
```bash
pnpm install nvx-nextjs-library
# or
npm install nvx-nextjs-library
# or
yarn add nvx-nextjs-library
```

### 2. Usage

Import components directly into your Next.js pages or components.

```tsx
// app/page.tsx
import { Button, Card } from 'nvx-nextjs-library';
import 'nvx-nextjs-library/dist/style.css'; // Import the default styles

export default function HomePage() {
  return (
    <main>
      <Card title="Welcome!">
        <p>This is a card from our awesome library.</p>
        <Button onClick={() => alert('Button Clicked!')}>
          Click Me
        </Button>
      </Card>
    </main>
  );
}
```

## ⚙️ Local Development

To contribute to the library or run the example application locally:

1.  **Clone the repository:**
    ```
    git clone [this project]
    cd project
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    This will typically start a Storybook or a local Next.js example app.
    ```bash
    pnpm dev
    ```

Visit [http://localhost:6006](http://localhost:6006) (for Storybook) or [http://localhost:3000](http://localhost:3000) (for Next.js app) to view the components.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork** the Project.
2.  Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your Changes (`git commit -m 'feat: Add some AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/license/mit). See the `LICENSE` file for more details.

## 📬 Contact

**Satria Nur Saputro**

-   Email: [satrianursaputro06@gmail.com](mailto:satrianursaputro06@gmail.com)
