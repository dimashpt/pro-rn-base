# Development Guide

This guide covers the development workflow, technologies, and best practices for the Example App Mobile App.

## Technology Stack

### Core Technologies

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand
- **Package Manager**: Bun

### UI & Styling

- **Styling**: React Native Unistyles
- **UI Components**: React Native Paper
- **Bottom Sheets**: @gorhom/bottom-sheet
- **Animations**: React Native Reanimated, Lottie

### Data & API

- **API Client**: Axios
- **Data Fetching**: TanStack React Query (React Query)
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Features & Integrations

- **Maps**: React Native Maps
- **Camera**: React Native Vision Camera with Face Detection
- **Internationalization**: i18next with react-i18next
- **Error Tracking**: Sentry
- **Performance**: React Native Performance monitoring

### Testing

- **Test Runner**: Jest
- **Testing Library**: React Native Testing Library
- **Coverage**: Istanbul (built into Jest)

## React Compiler

This project has **React Compiler** enabled in the build configuration. The React Compiler is an experimental feature that automatically optimizes React components by analyzing your code and automatically memoizing values and functions.

### What This Means for Development

**✅ DO:**
- Write components naturally without worrying about optimization
- Let the compiler handle memoization automatically
- Focus on clean, readable code

**⚠️ MINIMIZE:**
- Usage of `React.memo`
- Usage of `useMemo`
- Usage of `useCallback`

**Only use manual memoization when:**
- You have specific, well-documented performance needs
- The compiler cannot handle your use case
- You're working with external libraries that require it

### Example

```typescript
// ❌ Before (manual optimization - not needed with React Compiler)
const MyComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => expensiveOperation(data), [data]);
  const handleClick = useCallback(() => doSomething(), []);

  return <View>...</View>;
});

// ✅ After (let the compiler optimize)
function MyComponent({ data }) {
  const processedData = expensiveOperation(data);
  const handleClick = () => doSomething();

  return <View>...</View>;
}
```

This approach keeps your code cleaner and more maintainable while still achieving optimal performance.

## Available Scripts

### Development

```bash
# Start Expo development server
bun dev
# or
bun start

# Run on specific platform
bun ios          # Run on iOS simulator
bun android      # Run on Android emulator
bun web          # Run on web browser

# Generate native projects
bun prebuild     # Run expo prebuild
```

### Building

```bash
# Local development builds (faster, requires local setup)
bun build-dev-android       # Build development AAB locally
bun build-dev-ios           # Build development IPA locally
bun build-prod-android      # Build production AAB locally
bun build-prod-ios          # Build production IPA locally

# Remote EAS builds (slower but no local setup required)
bun build-dev-all-remote    # Build development for all platforms
bun build-prod-all-remote   # Build production for all platforms
```

### Code Quality

```bash
# Linting
bun lint                    # Run ESLint
bun lint --fix              # Fix auto-fixable issues

# Type checking
bun tsc                     # Run TypeScript compiler check
```

### Testing

```bash
# Run tests
bun test                    # Run all tests in watch mode
bun test:ci                 # Run tests once for CI

# Run specific test file
bun test path/to/test.test.tsx

# Coverage
bun test --coverage         # Generate coverage report
```

### Version Management

```bash
# Bump version
bun bump <version-type>     # See VERSIONING.md for details
bun bump patch              # 1.0.0 -> 1.0.1
bun bump minor              # 1.0.0 -> 1.1.0
bun bump major              # 1.0.0 -> 2.0.0
bun bump ota                # 1.0.0 -> 1.0.0-ota.1
```

## Development Workflow

### 1. Starting a New Feature

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Start development server
bun dev
```

### 2. Making Changes

- Follow the file structure conventions (see [Project Structure](./PROJECT_STRUCTURE.md))
- Use TypeScript for type safety
- Follow the component patterns in existing code
- Add translations to locale files for any user-facing text

### 3. Testing Your Changes

```bash
# Run the app on your preferred platform
bun ios       # or bun android

# Run tests
bun test

# Check code quality
bun lint
```

### 4. Committing Changes

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(dashboard): add analytics feature"
git commit -m "fix(login): resolve authentication issue"
git commit -m "docs: update API documentation"
```

**Commit Types:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements
- `ci:` - CI/CD changes
- `build:` - Build system changes

### 5. Creating a Pull Request

```bash
# Push your changes
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Screenshots/videos for UI changes
- Test results
- Any breaking changes noted

## Code Style Guidelines

### TypeScript

```typescript
// ✅ Use explicit types for function parameters and returns
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Use type for unions and primitives
type Status = 'pending' | 'approved' | 'rejected';

// ❌ Avoid 'any' type
const data: any = fetchData(); // Bad

// ✅ Use proper typing or unknown
const data: UserResponse = fetchData(); // Good
```

### Component Structure

```typescript
import React from 'react';
import { View, Text } from 'react-native';

// 1. Define props interface
interface UserCardProps {
  user: User;
  onPress?: () => void;
}

// 2. Define component
export function UserCard({ user, onPress }: UserCardProps) {
  // 3. Hooks
  const { t } = useTranslation();

  // 4. Event handlers
  const handlePress = () => {
    onPress?.();
  };

  // 5. Render
  return (
    <View>
      <Text>{t('profile.title')}</Text>
    </View>
  );
}
```

### Styling

```typescript
// Use React Native Unistyles
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export function MyComponent() {
  const { styles } = useStyles(stylesheet);

  return <View style={styles.container} />;
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
}));
```

### API Services

```typescript
// repository.ts
import { api } from '@/lib/api';
import type { UserResponse } from './types';

export const userRepository = {
  getUserProfile: async (userId: string) => {
    const { data } = await api.get<UserResponse>(`/users/${userId}`, {
      params: { include: 'profile' },
    });
    return data;
  },
};

// index.ts (hooks)
import { useQuery } from '@tanstack/react-query';
import { userRepository } from './repository';

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => userRepository.getUserProfile(userId),
  });
}
```

## Performance Best Practices

### 1. Image Optimization

```typescript
// ✅ Use appropriate image formats
<Image source={require('./image.webp')} />

// ✅ Specify dimensions when possible
<Image
  source={{ uri: url }}
  style={{ width: 100, height: 100 }}
/>

// ✅ Use FastImage for network images (if installed)
<FastImage
  source={{ uri: url }}
  resizeMode="cover"
/>
```

### 2. List Optimization

```typescript
// ✅ Use FlatList for long lists
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
  windowSize={10}
  maxToRenderPerBatch={10}
  removeClippedSubviews={true}
/>
```

### 3. Avoid Inline Functions (in some cases)

```typescript
// ⚠️ Only optimize if you identify a performance issue
// The React Compiler handles most cases automatically

// If needed for specific cases:
const handlePress = useCallback(() => {
  navigation.navigate('Detail', { id });
}, [id, navigation]);
```

## Debugging

### Developer Menu

**iOS Simulator:**
- Press `Cmd+D` to open developer menu
- Shake the device (Hardware → Shake Gesture)

**Android Emulator:**
- Press `Cmd+M` (Mac) or `Ctrl+M` (Windows/Linux)
- Shake the device

### React Native Debugger

1. Install React Native Debugger
2. Open it before starting the app
3. Enable "Debug Remote JS" from developer menu

### Flipper (Alternative)

Flipper is integrated for debugging:
- Network inspector
- Layout inspector
- Logs viewer
- Redux/State inspector

### Sentry

Errors are automatically tracked in production:
- Check Sentry dashboard for production errors
- Errors include stack traces and user context

## Common Patterns

### Data Fetching

```typescript
function MyScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['key'],
    queryFn: fetchData,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView error={error} />;

  return <DataView data={data} />;
}
```

### Form Handling

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle submission
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </Form>
  );
}
```

### Navigation

```typescript
import { router } from 'expo-router';

// Navigate to a route
router.push('/profile/detail');

// Navigate with parameters
router.push({
  pathname: '/profile/[id]',
  params: { id: '123' },
});

// Go back
router.back();

// Replace current route
router.replace('/home');
```

## Internationalization

```typescript
// In component
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t('profile.edit')}</Text>;
}

// In locale file (src/locales/en/profile.json)
{
  "edit": "Edit Profile",
  "save": "Save Changes"
}
```

## Next Steps

- Review [Building](./BUILDING.md) for production builds
- See [Testing](./TESTING.md) for testing guidelines
- Check [Configuration](./CONFIGURATION.md) for environment setup
- Read [Versioning](./VERSIONING.md) for version management
