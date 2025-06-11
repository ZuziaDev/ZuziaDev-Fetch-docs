"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Copy, Play, Settings, Zap, Shield, Code, Book, CheckCircle, Info } from "lucide-react"

function CodeBlock({
  children,
  language = "javascript",
  title,
  interactive = false,
}: { children: string; language?: string; title?: string; interactive?: boolean }) {
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
          {interactive && (
            <Badge variant="secondary" className="text-xs">
              Interactive
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {interactive && (
            <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-300 hover:text-white hover:bg-slate-700">
              <Play className="w-3 h-3" />
              Run
            </Button>
          )}
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
      </div>
      <pre className="bg-slate-900 p-4 rounded-b-lg overflow-x-auto">
        <code className="text-slate-100 text-sm font-mono leading-relaxed">{children}</code>
      </pre>
    </div>
  )
}

function MethodCard({
  method,
  signature,
  description,
  parameters,
  returns,
  example,
}: {
  method: string
  signature: string
  description: string
  parameters?: Array<{ name: string; type: string; required: boolean; description: string }>
  returns: string
  example: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-500" />
              {method}
            </CardTitle>
            <CardDescription className="font-mono text-sm mt-1">{signature}</CardDescription>
          </div>
          <Badge variant="outline">Method</Badge>
        </div>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="parameters" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="example">Example</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters">
            {parameters && parameters.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parameters.map((param, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{param.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{param.type}</Badge>
                      </TableCell>
                      <TableCell>
                        {param.required ? (
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Optional
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{param.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 italic">No parameters</p>
            )}
          </TabsContent>

          <TabsContent value="returns">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Returns</Badge>
                <code className="text-sm">{returns}</code>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="example">
            <CodeBlock interactive>{example}</CodeBlock>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function ApiReferencePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">API Reference</h1>
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Complete documentation for all @ZuziaDev/Fetch classes, methods, and configuration options
        </p>
      </div>

      <Tabs defaultValue="client" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="client">FetchClient</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="interceptors">Interceptors</TabsTrigger>
          <TabsTrigger value="types">Types</TabsTrigger>
        </TabsList>

        <TabsContent value="client" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                FetchClient Class
              </CardTitle>
              <CardDescription>The main class for making HTTP requests with advanced features</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Constructor</AlertTitle>
                <AlertDescription>Create a new instance of FetchClient with optional configuration</AlertDescription>
              </Alert>

              <CodeBlock title="Constructor Signature">
                {`const { ZuziaFetch } = require('@zuziadev/fetch');

const client = new ZuziaFetch(config);`}
              </CodeBlock>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <MethodCard
              method="get"
              signature="get(url: string, config?: RequestConfig): Promise<Response>"
              description="Performs a GET request to the specified URL"
              parameters={[
                { name: "url", type: "string", required: true, description: "The URL to request" },
                {
                  name: "config",
                  type: "RequestConfig",
                  required: false,
                  description: "Additional request configuration",
                },
              ]}
              returns="Promise<Response>"
              example={`// Basic GET request
const response = await client.get('/users');

// GET with query parameters
const response = await client.get('/users', {
  params: { page: 1, limit: 10 }
});

// GET with custom headers
const response = await client.get('/users', {
  headers: { 'Accept': 'application/json' }
});`}
            />

            <MethodCard
              method="post"
              signature="post(url: string, data?: any, config?: RequestConfig): Promise<Response>"
              description="Performs a POST request with optional data payload"
              parameters={[
                { name: "url", type: "string", required: true, description: "The URL to post to" },
                { name: "data", type: "any", required: false, description: "Data to send in request body" },
                {
                  name: "config",
                  type: "RequestConfig",
                  required: false,
                  description: "Additional request configuration",
                },
              ]}
              returns="Promise<Response>"
              example={`// POST with JSON data
const response = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// POST with form data
const formData = new FormData();
formData.append('file', fileInput.files[0]);
const response = await client.post('/upload', formData);

// POST with custom headers
const response = await client.post('/api/data', { key: 'value' }, {
  headers: { 'Content-Type': 'application/json' }
});`}
            />

            <MethodCard
              method="put"
              signature="put(url: string, data?: any, config?: RequestConfig): Promise<Response>"
              description="Performs a PUT request to update resources"
              parameters={[
                { name: "url", type: "string", required: true, description: "The URL to put to" },
                { name: "data", type: "any", required: false, description: "Data to send in request body" },
                {
                  name: "config",
                  type: "RequestConfig",
                  required: false,
                  description: "Additional request configuration",
                },
              ]}
              returns="Promise<Response>"
              example={`// Update user data
const response = await client.put('/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});

// Partial update with PATCH semantics
const response = await client.put('/users/123', { name: 'New Name' });`}
            />

            <MethodCard
              method="delete"
              signature="delete(url: string, config?: RequestConfig): Promise<Response>"
              description="Performs a DELETE request to remove resources"
              parameters={[
                { name: "url", type: "string", required: true, description: "The URL to delete" },
                {
                  name: "config",
                  type: "RequestConfig",
                  required: false,
                  description: "Additional request configuration",
                },
              ]}
              returns="Promise<Response>"
              example={`// Delete a user
const response = await client.delete('/users/123');

// Delete with confirmation
const response = await client.delete('/users/123', {
  headers: { 'X-Confirm': 'true' }
});`}
            />

            <MethodCard
              method="setToken"
              signature="setToken(token: string, type?: string): void"
              description="Sets the authentication token for all requests"
              parameters={[
                { name: "token", type: "string", required: true, description: "The authentication token" },
                { name: "type", type: "string", required: false, description: "Token type (default: 'Bearer')" },
              ]}
              returns="void"
              example={`// Set Bearer token
const client.setToken('your-jwt-token');

// Set custom token type
const client.setToken('api-key-value', 'ApiKey');

// Remove token
client.setToken('');`}
            />

            <MethodCard
              method="setCSRFToken"
              signature="setCSRFToken(token: string): void"
              description="Sets the CSRF token for request protection"
              parameters={[{ name: "token", type: "string", required: true, description: "The CSRF token" }]}
              returns="void"
              example={`// Set CSRF token
const client.setCSRFToken('csrf-token-value');

// Get CSRF token from meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) {
  client.setCSRFToken(csrfToken);
}`}
            />
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                Configuration Options
              </CardTitle>
              <CardDescription>All available configuration options for FetchClient</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Option</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">baseURL</TableCell>
                    <TableCell>
                      <Badge variant="secondary">string</Badge>
                    </TableCell>
                    <TableCell>
                      <code>''</code>
                    </TableCell>
                    <TableCell>Base URL for all requests</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">timeout</TableCell>
                    <TableCell>
                      <Badge variant="secondary">number</Badge>
                    </TableCell>
                    <TableCell>
                      <code>5000</code>
                    </TableCell>
                    <TableCell>Request timeout in milliseconds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">retry</TableCell>
                    <TableCell>
                      <Badge variant="secondary">RetryConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Retry configuration for failed requests</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">cache</TableCell>
                    <TableCell>
                      <Badge variant="secondary">CacheConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Response caching configuration</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rateLimit</TableCell>
                    <TableCell>
                      <Badge variant="secondary">RateLimitConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Rate limiting configuration</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">proxy</TableCell>
                    <TableCell>
                      <Badge variant="secondary">ProxyConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Proxy server settings</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">auth</TableCell>
                    <TableCell>
                      <Badge variant="secondary">AuthConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Authentication configuration</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">debug</TableCell>
                    <TableCell>
                      <Badge variant="secondary">boolean</Badge>
                    </TableCell>
                    <TableCell>
                      <code>false</code>
                    </TableCell>
                    <TableCell>Enable debug mode and logging</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">logger</TableCell>
                    <TableCell>
                      <Badge variant="secondary">LoggerConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Custom logging configuration</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">validation</TableCell>
                    <TableCell>
                      <Badge variant="secondary">ValidationConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Request/response validation settings</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">batch</TableCell>
                    <TableCell>
                      <Badge variant="secondary">BatchConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Request batching configuration</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">compression</TableCell>
                    <TableCell>
                      <Badge variant="secondary">CompressionConfig</Badge>
                    </TableCell>
                    <TableCell>
                      <code>null</code>
                    </TableCell>
                    <TableCell>Response compression settings</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="production">Production</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <CodeBlock title="Basic Configuration">
                    {`const { ZuziaFetch } = require('@zuziadev/fetch');

const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  debug: true
});`}
                  </CodeBlock>
                </TabsContent>

                <TabsContent value="advanced">
                  <CodeBlock title="Advanced Configuration">
                    {`const { ZuziaFetch } = require('@zuziadev/fetch');

const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  retry: {
    attempts: 3,
    delay: 1000,
    exponentialBackoff: true,
    retryCondition: (error) => error.status >= 500
  },
  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
    storage: 'memory'
  },
  rateLimit: {
    requests: 100,
    window: 60000 // 1 minute
  }
});`}
                  </CodeBlock>
                </TabsContent>

                <TabsContent value="production">
                  <CodeBlock title="Production Configuration">
                    {`const { ZuziaFetch } = require('@zuziadev/fetch');

const client = new ZuziaFetch({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  retry: {
    attempts: 2,
    delay: 500,
    exponentialBackoff: true
  },
  auth: {
    type: 'bearer',
    refreshTokenEndpoint: '/auth/refresh'
  },
  logger: {
    level: 'error',
    format: 'json'
  },
  validation: {
    request: true,
    response: true
  },
  compression: {
    enabled: true,
    threshold: 1024
  }
});`}
                  </CodeBlock>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interceptors" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Request & Response Interceptors
              </CardTitle>
              <CardDescription>Modify requests and responses before they are handled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Request Interceptors</h4>
                  <CodeBlock>
                    {`// Add request interceptor
const requestInterceptor = client.interceptors.request.use(
  (config) => {
    // Modify config before request is sent
    config.headers.Authorization = \`Bearer \${getToken()}\`;
    config.headers['X-Timestamp'] = Date.now().toString();
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Remove request interceptor
client.interceptors.request.eject(requestInterceptor);`}
                  </CodeBlock>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Response Interceptors</h4>
                  <CodeBlock>
                    {`// Add response interceptor
const responseInterceptor = client.interceptors.response.use(
  (response) => {
    // Process successful response
    console.log('Response received:', response.status);
    
    // Transform response data
    if (response.data?.items) {
      response.data.items = response.data.items.map(item => ({
        ...item,
        processed: true
      }));
    }
    
    return response;
  },
  async (error) => {
    // Handle response error
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      try {
        const newToken = await refreshToken();
        error.config.headers.Authorization = \`Bearer \${newToken}\`;
        return client.request(error.config);
      } catch (refreshError) {
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Remove response interceptor
client.interceptors.response.eject(responseInterceptor);`}
                  </CodeBlock>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Multiple Interceptors</h4>
                  <CodeBlock>
                    {`// Multiple interceptors are executed in order
client.interceptors.request.use(config => {
  console.log('First interceptor');
  return config;
});

client.interceptors.request.use(config => {
  console.log('Second interceptor');
  return config;
});

client.interceptors.request.use(config => {
  console.log('Third interceptor');
  return config;
});

// Output when making a request:
// First interceptor
// Second interceptor
// Third interceptor`}
                  </CodeBlock>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5 text-purple-500" />
                TypeScript Types
              </CardTitle>
              <CardDescription>Type definitions for better development experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Core Types</h4>
                  <CodeBlock language="typescript">
                    {`import { ZuziaFetch, FetchClientConfig, RequestConfig, Response, HttpMethod } from '@zuziadev/fetch';

interface FetchClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retry?: RetryConfig;
  cache?: CacheConfig;
  rateLimit?: RateLimitConfig;
  proxy?: ProxyConfig;
  auth?: AuthConfig;
  debug?: boolean;
  logger?: LoggerConfig;
  validation?: ValidationConfig;
  batch?: BatchConfig;
  compression?: CompressionConfig;
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Configuration Types</h4>
                  <CodeBlock language="typescript">
                    {`interface RetryConfig {
  attempts: number;
  delay: number;
  exponentialBackoff?: boolean;
  retryCondition?: (error: any) => boolean;
}

interface CacheConfig {
  enabled: boolean;
  ttl: number;
  storage?: 'memory' | 'localStorage' | 'sessionStorage';
  keyGenerator?: (config: RequestConfig) => string;
}

interface RateLimitConfig {
  requests: number;
  window: number;
  strategy?: 'sliding' | 'fixed';
}

interface AuthConfig {
  type: 'bearer' | 'basic' | 'apiKey';
  token?: string;
  username?: string;
  password?: string;
  refreshTokenEndpoint?: string;
  refreshCallback?: () => Promise<string>;
}

interface LoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'simple' | 'detailed' | 'json';
  output?: (message: any) => void;
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Generic Usage</h4>
                  <CodeBlock language="typescript">
                    {`import { ZuziaFetch } from '@zuziadev/fetch';

// Type-safe API calls
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

const client = new ZuziaFetch({
  baseURL: 'https://api.example.com'
});

// Typed requests
const users = await client.get<ApiResponse<User[]>>('/users');
const newUser = await client.post<ApiResponse<User>, CreateUserRequest>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Type inference
const userData = users.data.data; // Type: User[]
const userName = userData[0].name; // Type: string`}
                  </CodeBlock>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Basic Usage</h4>
              <code className="text-sm">await client.get('/api/data')</code>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">With Parameters</h4>
              <code className="text-sm">{'const params = {page: 1}; await client.get("/api/data", {params});'}</code>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">POST Data</h4>
              <code className="text-sm">{'const data = {key: "value"}; await client.post("/api", data);'}</code>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Authentication</h4>
              <code className="text-sm">client.setToken(token)</code>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Error Handling</h4>
              <code className="text-sm">try/catch or .catch()</code>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Interceptors</h4>
              <code className="text-sm">client.interceptors.request.use()</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
