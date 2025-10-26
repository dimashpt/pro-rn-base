# Testing

This guide covers testing practices, setup, and guidelines for the Example App Mobile App.

## Testing Stack

- **Test Runner**: Jest
- **Testing Library**: React Native Testing Library
- **Coverage**: Istanbul (integrated with Jest)
- **Mocking**: Jest mocks + Manual mocks

## Running Tests

### Basic Commands

```bash
# Run all tests in watch mode
bun test

# Run tests once (for CI)
bun test:ci

# Run specific test file
bun test path/to/test-file.test.tsx

# Run tests matching a pattern
bun test --testNamePattern="should render correctly"

# Run tests for changed files only
bun test --onlyChanged

# Update snapshots
bun test --updateSnapshot
```

### Coverage Reports

```bash
# Generate coverage report
bun test --coverage

# Open coverage report in browser
open coverage/lcov-report/index.html
```

Coverage reports are generated in the `coverage/` directory and include:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

## Test Structure

### File Organization

Tests should be placed alongside the code they test or in a `__tests__` directory:

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx           # Preferred: alongside component
│   │   └── __tests__/
│   │       └── Button.test.tsx       # Alternative: in __tests__
```

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Utility tests: `utilityName.test.ts`
- Hook tests: `useHookName.test.ts`
- Screen tests: `ScreenName.test.tsx`

### Test Structure Pattern

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  // Group related tests
  describe('rendering', () => {
    it('should render with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeTruthy();
    });

    it('should render with icon', () => {
      render(<Button icon="check">Submit</Button>);
      // Test icon rendering
    });
  });

  describe('interactions', () => {
    it('should call onPress when clicked', () => {
      const onPress = jest.fn();
      render(<Button onPress={onPress}>Click</Button>);

      fireEvent.press(screen.getByText('Click'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('states', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
    });
  });
});
```

## Testing Components

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react-native';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  };

  it('should render user information', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('john@example.com')).toBeTruthy();
    expect(screen.getByText('user')).toBeTruthy();
  });

  it('should call onPress when card is pressed', () => {
    const onPress = jest.fn();
    render(<UserCard user={mockUser} onPress={onPress} />);

    fireEvent.press(screen.getByTestId('user-card'));
    expect(onPress).toHaveBeenCalledWith(mockUser);
  });
});
```

### Testing with Context/Providers

```typescript
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme';
import { MyComponent } from './MyComponent';

function renderWithProviders(component: React.ReactElement) {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
}

describe('MyComponent', () => {
  it('should render with theme', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
```

### Testing Async Components

```typescript
import { render, screen, waitFor } from '@testing-library/react-native';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should load and display user data', async () => {
    render(<UserProfile userId="123" />);

    // Initially shows loading
    expect(screen.getByTestId('loading')).toBeTruthy();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
    });
  });

  it('should handle error state', async () => {
    // Mock API to throw error
    jest.spyOn(api, 'getUser').mockRejectedValue(new Error('Network error'));

    render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Error loading user')).toBeTruthy();
    });
  });
});
```

## Testing Hooks

### Custom Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react-native';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should accept initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});
```

### Testing Hooks with Dependencies

```typescript
import { renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserProfile } from './useUserProfile';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

describe('useUserProfile', () => {
  it('should fetch user profile', async () => {
    const { result, waitFor } = renderHook(
      () => useUserProfile('123'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
```

## Testing Navigation

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { LoginScreen } from './LoginScreen';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginScreen', () => {
  it('should navigate to home after successful login', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<LoginScreen />);

    // Fill form and submit
    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(screen.getByTestId('password-input'), 'password123');
    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });
});
```

## Mocking

### Mocking Modules

```typescript
// Mock entire module
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

// Mock specific functions
jest.mock('@/utils/storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
```

### Mocking React Native Modules

```typescript
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock Camera
jest.mock('react-native-vision-camera', () => ({
  Camera: 'Camera',
  useCameraDevice: jest.fn(() => ({})),
  useCameraPermission: jest.fn(() => ({
    hasPermission: true,
    requestPermission: jest.fn(),
  })),
}));
```

### Manual Mocks

Create manual mocks in `__mocks__` directory:

```
__mocks__/
├── react-native-maps.tsx
├── @react-navigation/
│   └── native.tsx
└── expo-router.tsx
```

Example manual mock:

```typescript
// __mocks__/expo-router.tsx
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  back: jest.fn(),
  replace: jest.fn(),
}));

export const useLocalSearchParams = jest.fn(() => ({}));
```

## Test Utilities

### Custom Render Function

Create a custom render function with common providers:

```typescript
// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/theme';

function AllTheProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react-native';
export { customRender as render };
```

Usage:

```typescript
import { render, screen } from '@/test-utils';

// Now render automatically includes all providers
render(<MyComponent />);
```

### Test Data Factories

```typescript
// test-factories.ts
export function createMockUser(overrides = {}) {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    ...overrides,
  };
}

export function createMockUser(overrides = {}) {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    ...overrides,
  };
}
```

Usage:

```typescript
const user = createMockUser({ name: 'Jane Doe' });
const adminUser = createMockUser({ role: 'admin' });
```

## Best Practices

### DO:

✅ **Write descriptive test names**
```typescript
it('should display error message when login fails', () => {
  // test
});
```

✅ **Test user behavior, not implementation**
```typescript
// Good: Test what user sees/does
fireEvent.press(screen.getByText('Login'));
expect(screen.getByText('Welcome back')).toBeTruthy();

// Avoid: Testing implementation details
expect(component.state.isLoggedIn).toBe(true);
```

✅ **Use data-testid sparingly**
```typescript
// Only when necessary
<View testID="complex-component" />
```

✅ **Keep tests simple and focused**
```typescript
// Each test should verify one behavior
it('should increment counter', () => {
  // Only test increment
});
```

✅ **Clean up after tests**
```typescript
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
```

### DON'T:

❌ **Don't test third-party libraries**
```typescript
// Don't test React Query, Zustand, etc.
// Trust they work as documented
```

❌ **Don't test styling details**
```typescript
// Avoid testing specific styles unless critical
expect(element).toHaveStyle({ color: '#FF0000' });
```

❌ **Don't rely on snapshots for everything**
```typescript
// Use snapshots sparingly, prefer explicit assertions
expect(screen.getByText('Expected Text')).toBeTruthy();
```

❌ **Don't write brittle tests**
```typescript
// Bad: Relies on specific array order
expect(items[0].name).toBe('First');

// Good: Test behavior
expect(screen.getByText('First')).toBeTruthy();
```

## Coverage Goals

Aim for the following coverage targets:

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

Priority areas for testing:
1. Business logic and utilities (100%)
2. API services and data handling (90%+)
3. Critical user flows (90%+)
4. Components (70%+)
5. UI/Presentational components (50%+)

## Continuous Integration

Tests run automatically on CI:

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: bun test:ci

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Troubleshooting

### Tests Timeout

```typescript
// Increase timeout for slow tests
jest.setTimeout(10000);

// Or per test
it('slow test', async () => {
  // test
}, 10000);
```

### Mock Not Working

```typescript
// Ensure mocks are hoisted
jest.mock('./module'); // Must be at top

// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

### Async Issues

```typescript
// Always use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeTruthy();
});

// Don't use act() unnecessarily with Testing Library
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Kent C. Dodds - Testing Principles](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Next Steps

- Review [Development Guide](./DEVELOPMENT.md) for coding standards
- See [Contributing](./CONTRIBUTING.md) for contribution workflow
- Check [Project Structure](./PROJECT_STRUCTURE.md) for code organization
