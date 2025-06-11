"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wrench, Bug, FileText, CheckSquare, Copy, Info, Zap, TestTube, Monitor } from "lucide-react"

function CodeBlock({
  children,
  language = "javascript",
  title,
}: { children: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-300">{language}</span>
          {title && <span className="text-xs text-slate-400">• {title}</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 px-2 text-slate-300 hover:text-white hover:bg-slate-700"
        >
          <Copy className="w-3 h-3" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="bg-slate-900 p-4 rounded-b-lg overflow-x-auto">
        <code className="text-slate-100 text-sm font-mono leading-relaxed">{children}</code>
      </pre>
    </div>
  )
}

export function DeveloperToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-8 h-8 text-purple-600" />
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Developer Tools
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Developer Tools</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
              Boost your productivity with built-in developer tools. Debug, test, and monitor your HTTP requests with
              powerful development features.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Debug Mode Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bug className="w-6 h-6 text-red-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Debug Mode</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Enable comprehensive debugging to track requests, responses, and performance metrics.
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Debug mode should only be enabled in development environments for security reasons.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Debug</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Debug</TabsTrigger>
              <TabsTrigger value="browser">Browser Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Debug Configuration</CardTitle>
                  <CardDescription>Enable basic debugging features</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Enable debug mode
const client = new ZuziaFetch({ 
  debug: true 
});

// Debug with custom options
const client2 = new ZuziaFetch({
  debug: {
    enabled: true,
    logRequests: true,
    logResponses: true,
    logErrors: true,
    logTiming: true
  }
});

// Environment-based debugging
const client3 = new ZuziaFetch({
  debug: process.env.NODE_ENV === 'development'
});

// Debug specific requests
const response = await client.get('/users', {
  debug: true // Override global debug setting
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Debug Features</CardTitle>
                  <CardDescription>Detailed debugging with custom handlers</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Advanced debug configuration
const client = new ZuziaFetch({
  debug: {
    enabled: true,
    
    // Custom debug handlers
    onRequest: (config) => {
      console.group(\`🚀 Request: \${config.method?.toUpperCase()} \${config.url}\`);
      console.log('Headers:', config.headers);
      console.log('Data:', config.data);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
    },
    
    onResponse: (response) => {
      console.group(\`✅ Response: \${response.status} \${response.statusText}\`);
      console.log('Headers:', response.headers);
      console.log('Data:', response.data);
      console.log('Duration:', response.duration + 'ms');
      console.groupEnd();
    },
    
    onError: (error) => {
      console.group(\`❌ Error: \${error.message}\`);
      console.error('Config:', error.config);
      console.error('Response:', error.response);
      console.error('Stack:', error.stack);
      console.groupEnd();
    },
    
    // Performance tracking
    trackPerformance: true,
    performanceMarks: true,
    
    // Network analysis
    networkAnalysis: {
      enabled: true,
      trackRedirects: true,
      trackDNS: true,
      trackSSL: true
    },
    
    // Request/Response size tracking
    trackSize: true,
    
    // Custom debug levels
    level: 'verbose', // 'silent', 'error', 'warn', 'info', 'debug', 'verbose'
    
    // Debug output format
    format: 'pretty', // 'pretty', 'json', 'compact'
    
    // Save debug logs
    saveToFile: {
      enabled: true,
      filename: 'zuzia-debug.log',
      maxSize: '10MB'
    }
  }
});

// Debug interceptors
client.interceptors.request.use(
  (config) => {
    if (config.debug) {
      config.metadata = {
        startTime: performance.now(),
        requestId: generateUUID()
      };
    }
    return config;
  }
);

client.interceptors.response.use(
  (response) => {
    if (response.config.debug) {
      const duration = performance.now() - response.config.metadata.startTime;
      console.log(\`Request \${response.config.metadata.requestId} took \${duration}ms\`);
    }
    return response;
  }
);`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="browser" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Browser Developer Tools Integration</CardTitle>
                  <CardDescription>Enhanced browser debugging experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Browser-specific debugging
const client = new ZuziaFetch({
  debug: {
    enabled: true,
    
    // Browser DevTools integration
    browserDevTools: {
      enabled: true,
      
      // Network tab integration
      networkTab: true,
      
      // Console grouping
      consoleGrouping: true,
      
      // Performance timeline
      performanceTimeline: true,
      
      // Memory usage tracking
      memoryTracking: true
    },
    
    // Visual debugging
    visual: {
      enabled: true,
      showNotifications: true,
      showProgressBar: true,
      highlightErrors: true
    }
  }
});

// Debug panel (development only)
if (process.env.NODE_ENV === 'development') {
  client.enableDebugPanel({
    position: 'bottom-right',
    theme: 'dark',
    features: [
      'request-history',
      'performance-metrics',
      'error-tracking',
      'cache-inspector'
    ]
  });
}

// Browser extension support
client.enableBrowserExtension({
  name: 'Zuzia Debug Extension',
  version: '1.0.0'
});

// React DevTools integration
if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  client.enableReactDevTools();
}`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Logging Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Advanced Logging</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Comprehensive logging system with multiple output formats and destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Logging Setup</CardTitle>
                <CardDescription>Configure logging levels and formats</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Basic logging configuration
const client = new ZuziaFetch({
  logger: { 
    level: 'debug', 
    format: 'json' 
  }
});

// Custom log levels
const client2 = new ZuziaFetch({
  logger: {
    level: 'info', // 'silent', 'error', 'warn', 'info', 'debug', 'trace'
    format: 'pretty', // 'json', 'pretty', 'compact', 'custom'
    
    // Timestamp format
    timestamp: true,
    timestampFormat: 'ISO', // 'ISO', 'unix', 'relative'
    
    // Include metadata
    includeMetadata: true,
    metadata: {
      requestId: true,
      userAgent: true,
      ip: true,
      sessionId: true
    }
  }
});

// Environment-based logging
const client3 = new ZuziaFetch({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.NODE_ENV === 'production' ? 'json' : 'pretty'
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Logging Features</CardTitle>
                <CardDescription>Custom loggers and output destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Advanced logging with custom logger
const client = new ZuziaFetch({
  logger: {
    level: 'debug',
    
    // Custom logger implementation
    customLogger: {
      debug: (message, meta) => winston.debug(message, meta),
      info: (message, meta) => winston.info(message, meta),
      warn: (message, meta) => winston.warn(message, meta),
      error: (message, meta) => winston.error(message, meta)
    },
    
    // Multiple outputs
    outputs: [
      {
        type: 'console',
        level: 'debug',
        format: 'pretty'
      },
      {
        type: 'file',
        level: 'info',
        filename: 'api-requests.log',
        format: 'json',
        maxSize: '10MB',
        maxFiles: 5
      },
      {
        type: 'remote',
        level: 'error',
        endpoint: 'https://logs.example.com/api',
        format: 'json',
        batchSize: 10,
        flushInterval: 5000
      }
    ],
    
    // Log filtering
    filters: [
      {
        field: 'url',
        pattern: '/health',
        action: 'exclude'
      },
      {
        field: 'status',
        range: [200, 299],
        level: 'info'
      },
      {
        field: 'status',
        range: [400, 599],
        level: 'error'
      }
    ],
    
    // Sensitive data masking
    maskSensitiveData: {
      enabled: true,
      fields: ['password', 'token', 'apiKey', 'authorization'],
      maskChar: '*',
      preserveLength: true
    }
  }
});

// Structured logging
client.logger.info('User login attempt', {
  userId: '12345',
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
  timestamp: new Date().toISOString()
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Schema Validation Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Schema Validation</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Validate requests and responses against JSON schemas to ensure data integrity.
            </p>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Validation</TabsTrigger>
              <TabsTrigger value="schemas">Custom Schemas</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enable Schema Validation</CardTitle>
                  <CardDescription>Basic request and response validation</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Enable validation
const client = new ZuziaFetch({
  validation: {
    request: true,
    response: true,
    
    // JSON Schema for validation
    schema: {
      // Request schemas by endpoint
      requests: {
        'POST /users': {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            age: { type: 'number', minimum: 0 }
          }
        }
      },
      
      // Response schemas by endpoint
      responses: {
        'GET /users': {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name', 'email'],
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string', format: 'email' }
            }
          }
        }
      }
    }
  }
});

// Validation will automatically run
try {
  const response = await client.post('/users', {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  });
} catch (error) {
  if (error.isValidationError) {
    console.error('Validation failed:', error.validationErrors);
  }
}`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schemas" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Schema Definitions</CardTitle>
                  <CardDescription>Define reusable schemas and validation rules</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Define reusable schemas
const userSchema = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string', minLength: 1, maxLength: 100 },
    email: { type: 'string', format: 'email' },
    age: { type: 'number', minimum: 0, maximum: 150 },
    role: { type: 'string', enum: ['user', 'admin', 'moderator'] },
    createdAt: { type: 'string', format: 'date-time' }
  },
  additionalProperties: false
};

const paginationSchema = {
  type: 'object',
  properties: {
    page: { type: 'number', minimum: 1 },
    limit: { type: 'number', minimum: 1, maximum: 100 },
    total: { type: 'number', minimum: 0 },
    totalPages: { type: 'number', minimum: 0 }
  }
};

// Advanced validation configuration
const client = new ZuziaFetch({
  validation: {
    enabled: true,
    
    // Schema registry
    schemas: {
      user: userSchema,
      pagination: paginationSchema,
      
      // Composed schemas
      userList: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: { $ref: '#/schemas/user' }
          },
          pagination: { $ref: '#/schemas/pagination' }
        }
      }
    },
    
    // Endpoint-specific validation
    endpoints: {
      'POST /users': {
        request: { $ref: '#/schemas/user' },
        response: { $ref: '#/schemas/user' }
      },
      'GET /users': {
        response: { $ref: '#/schemas/userList' }
      }
    },
    
    // Validation options
    options: {
      strict: true,
      removeAdditional: true,
      useDefaults: true,
      coerceTypes: true
    },
    
    // Custom validation functions
    customValidators: {
      uniqueEmail: async (email) => {
        const exists = await checkEmailExists(email);
        return !exists;
      },
      
      strongPassword: (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
      }
    },
    
    // Error handling
    onValidationError: (error, data, schema) => {
      console.error('Validation failed:', {
        errors: error.errors,
        data: data,
        schema: schema
      });
      
      // Send to error tracking service
      errorTracker.captureException(error);
    }
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typescript" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>TypeScript Integration</CardTitle>
                  <CardDescription>Type-safe validation with TypeScript</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock language="typescript">
                    {`// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
  role?: 'user' | 'admin' | 'moderator';
}

interface UserListResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Type-safe client with validation
const client = new ZuziaFetch({
  validation: {
    enabled: true,
    generateSchemaFromTypes: true, // Auto-generate schemas from TS types
    
    // Runtime type checking
    runtimeTypeChecking: {
      enabled: true,
      library: 'zod', // 'zod', 'joi', 'yup', 'ajv'
    }
  }
});

// Type-safe requests with validation
const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const response = await client.post<User, CreateUserRequest>('/users', userData);
  return response.data;
};

const getUsers = async (): Promise<UserListResponse> => {
  const response = await client.get<UserListResponse>('/users');
  return response.data;
};

// Zod schema integration
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(0).max(150).optional(),
  role: z.enum(['user', 'admin', 'moderator']),
  createdAt: z.string().datetime()
});

const client2 = new ZuziaFetch({
  validation: {
    zodSchemas: {
      'POST /users': {
        request: UserSchema.omit({ id: true, createdAt: true }),
        response: UserSchema
      }
    }
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Testing Tools Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TestTube className="w-6 h-6 text-orange-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Testing Tools</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Built-in testing utilities and mocking capabilities for comprehensive testing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Mocking</CardTitle>
                <CardDescription>Mock HTTP requests for testing</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Enable mocking for tests
const client = new ZuziaFetch({
  mock: {
    enabled: process.env.NODE_ENV === 'test',
    
    // Mock responses
    responses: {
      'GET /users': {
        status: 200,
        data: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ],
        delay: 100 // Simulate network delay
      },
      
      'POST /users': {
        status: 201,
        data: { id: 3, name: 'New User', email: 'new@example.com' }
      },
      
      'GET /users/404': {
        status: 404,
        data: { error: 'User not found' }
      }
    },
    
    // Dynamic mocking
    dynamicMocks: {
      'GET /users/:id': (params) => ({
        status: 200,
        data: { id: params.id, name: \`User \${params.id}\` }
      })
    }
  }
});

// Test with mocked responses
describe('User API', () => {
  test('should fetch users', async () => {
    const users = await client.get('/users');
    expect(users.data).toHaveLength(2);
    expect(users.data[0].name).toBe('John Doe');
  });
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Utilities</CardTitle>
                <CardDescription>Helper functions for testing HTTP clients</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Test utilities
import { createTestClient, mockServer } from 'zuzia-fetch/testing';

// Create test client with built-in mocks
const testClient = createTestClient({
  baseURL: 'https://api.test.com',
  mocks: {
    'GET /users': { status: 200, data: [] }
  }
});

// Mock server for integration tests
const server = mockServer({
  port: 3001,
  routes: {
    'GET /api/users': (req, res) => {
      res.json([{ id: 1, name: 'Test User' }]);
    },
    
    'POST /api/users': (req, res) => {
      const user = { id: Date.now(), ...req.body };
      res.status(201).json(user);
    }
  }
});

// Test helpers
describe('API Tests', () => {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  
  test('should handle network errors', async () => {
    // Simulate network error
    testClient.mockNetworkError('GET /users');
    
    await expect(testClient.get('/users')).rejects.toThrow('Network Error');
  });
  
  test('should track request metrics', async () => {
    const metrics = testClient.getMetrics();
    
    await testClient.get('/users');
    
    expect(metrics.requestCount).toBe(1);
    expect(metrics.averageResponseTime).toBeGreaterThan(0);
  });
});

// Snapshot testing for requests
test('should match request snapshot', () => {
  const requestConfig = client.buildRequestConfig('POST', '/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });
  
  expect(requestConfig).toMatchSnapshot();
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Monitoring & Analytics */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Monitor className="w-6 h-6 text-indigo-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Monitoring & Analytics</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Monitor application performance and gather analytics on HTTP requests.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Monitoring</CardTitle>
              <CardDescription>Track and analyze request performance</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// Enable performance monitoring
const client = new ZuziaFetch({
  monitoring: {
    enabled: true,
    
    // Performance metrics
    metrics: {
      responseTime: true,
      throughput: true,
      errorRate: true,
      cacheHitRate: true,
      retryRate: true
    },
    
    // Real-time monitoring
    realTime: {
      enabled: true,
      interval: 1000, // 1 second
      
      // Send metrics to monitoring service
      endpoint: 'https://monitoring.example.com/metrics',
      
      // Custom metric collection
      customMetrics: {
        userAgent: (config) => config.headers['User-Agent'],
        endpoint: (config) => config.url,
        method: (config) => config.method
      }
    },
    
    // Alerting
    alerts: {
      enabled: true,
      
      // Alert conditions
      conditions: [
        {
          metric: 'responseTime',
          threshold: 5000, // 5 seconds
          operator: 'gt',
          action: 'email'
        },
        {
          metric: 'errorRate',
          threshold: 0.1, // 10%
          operator: 'gt',
          action: 'slack'
        }
      ],
      
      // Alert handlers
      handlers: {
        email: (alert) => sendEmail(alert),
        slack: (alert) => sendSlackMessage(alert)
      }
    },
    
    // Analytics
    analytics: {
      enabled: true,
      
      // Track user behavior
      trackUserBehavior: true,
      
      // A/B testing support
      abTesting: {
        enabled: true,
        experiments: {
          'api-timeout': {
            variants: ['5s', '10s'],
            metric: 'responseTime'
          }
        }
      },
      
      // Custom events
      customEvents: {
        'user-login': (data) => ({
          userId: data.userId,
          timestamp: Date.now(),
          success: data.success
        })
      }
    }
  }
});

// Access monitoring data
const metrics = client.getMetrics();
console.log('Average response time:', metrics.averageResponseTime);
console.log('Error rate:', metrics.errorRate);
console.log('Cache hit rate:', metrics.cacheHitRate);

// Custom performance tracking
client.trackEvent('api-call', {
  endpoint: '/users',
  duration: 150,
  success: true
});`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-purple-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Supercharge your development workflow
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              With these developer tools, you can debug, test, and monitor your HTTP requests like a pro. Next, learn
              about performance optimization techniques.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Zap className="w-4 h-4 mr-2" />
                Explore Performance
              </Button>
              <Button variant="outline">
                <TestTube className="w-4 h-4 mr-2" />
                Testing Guide
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
