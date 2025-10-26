# Example App Mobile App

<div align="center">

**A comprehensive React Native mobile application built with modern technologies and best practices**

Built with Expo, TypeScript, and React Native

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Tech Stack](#tech-stack)

</div>

---

## 📱 About

Example App is a comprehensive mobile application that provides a seamless user experience. Built with modern technologies and best practices, it demonstrates best practices for React Native development with Expo.

### Features

- **🔐 Authentication** - Secure login and user management
- **📱 Modern UI** - Beautiful and responsive user interface
- **🌍 Multi-language** - Support for English and Indonesian
- **🔔 Notifications** - Real-time updates and alerts
- **📊 Data Management** - Efficient data handling and state management
- **🎨 Theming** - Customizable themes and design system
- **📱 Cross-platform** - Works on iOS, Android, and Web
- **⚡ Performance** - Optimized for speed and efficiency
- **🧪 Testing** - Comprehensive testing setup

## 🚀 Quick Start

Get up and running in minutes:

```bash
# Clone the repository
git clone <repository-url>
cd example-app

# Install dependencies
bun install

# Prebuild
bun prebuild

# Start development server
bun dev

# Run on your platform
bun ios       # iOS Simulator
bun android   # Android Emulator
```

## 🛠 Tech Stack

### Core Technologies

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand
- **Styling**: React Native Unistyles
- **Package Manager**: Bun

### Key Features

- **New Architecture**: React Native's latest architecture (Fabric)
- **React Compiler**: Automatic optimization (experimental)
- **Typed Routes**: Type-safe navigation with Expo Router

### Libraries & Tools

- **Data Fetching**: TanStack React Query (React Query) with Axios
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: React Native Paper, Bottom Sheet
- **Internationalization**: i18next with react-i18next
- **Animations**: React Native Reanimated
- **Testing**: Jest with React Native Testing Library
- **Error Tracking**: Sentry
- **Performance**: React Native Performance monitoring

## 📱 App Variants

The app supports three build variants:

| Variant | Purpose | Bundle ID | Status |
|---------|---------|-----------|--------|
| **Development** | Internal testing | `com.example.app.dev` | 🔧 Debug enabled |
| **Preview** | Staging/QA | `com.example.app.preview` | 🧪 Testing |
| **Production** | App Store release | `com.example.app` | ✅ Production |

Each variant has unique icons, configurations, and environment settings.

## 🎯 Project Highlights

### React Compiler

This project uses the **experimental React Compiler** which automatically optimizes components. This means:

- ✅ Write cleaner code without manual optimization
- ✅ Minimal need for `useMemo`, `useCallback`, `React.memo`
- ✅ Better performance with less boilerplate

Learn more in the [Development Guide](./docs/DEVELOPMENT.md#react-compiler).

### File-based Routing

Using **Expo Router** for intuitive, file-based routing:

```
src/app/
├── (stack)/
│   ├── (guarded)/    # Protected routes
│   └── (unguarded)/  # Public routes
└── (tab)/            # Bottom tab navigation
```

### Type Safety

Full TypeScript coverage with:
- Strict mode enabled
- Custom type definitions in `src/@types/`
- Type-safe navigation with typed routes
- Zod schemas for runtime validation

## � Project Status

- **Version**: See [package.json](./package.json)
- **License**: Proprietary - WZ Technology
- **Repository**: Private

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./docs/CONTRIBUTING.md) for:

- Development workflow
- Commit conventions (Conventional Commits)
- Pull request process
- Code style guidelines

### Quick Contribution Flow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and test
bun test

# Commit with conventional commits
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

## 🆘 Support & Resources

### Internal Resources

- 🐛 [GitHub Issues](../../issues)
- 💬 Team Communication Channels

### External Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is proprietary software owned by **WZ Technology**. All rights reserved.

**Note**: This is a private repository. Please ensure you have proper access permissions before contributing.

---

<div align="center">

**Built with ❤️ by WZ Technology**

[Documentation](./docs/) • [Issues](../../issues) • [Changelog](./docs/CHANGELOG.md)

</div>
