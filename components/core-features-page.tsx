"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, ArrowRightLeft, Settings, Zap, CheckCircle, Copy, Play, Code, FileText, Network } from "lucide-react"

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

export function CoreFeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Essential</Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Core Features</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
              @ZuziaDev/Fetch provides all the essential features you expect from a modern HTTP client. Built with
              simplicity and performance in mind.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* HTTP Methods Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Supported HTTP Methods</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Full support for all standard HTTP methods with a clean, intuitive API.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic HTTP Methods</CardTitle>
                <CardDescription>GET, POST, PUT, DELETE operations</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// GET request
const users = await client.get('/users');

// POST request with data
const newUser = await client.post('/users', { 
  name: 'Alice',
  email: 'alice@example.com'
});

// PUT request to update
const updatedUser = await client.put('/users/1', { 
  name: 'Bob' 
});

// DELETE request
await client.delete('/users/1');`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Methods</CardTitle>
                <CardDescription>PATCH, HEAD, OPTIONS support</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// PATCH for partial updates
await client.patch('/users/1', { 
  email: 'newemail@example.com' 
});

// HEAD to check resource existence
const exists = await client.head('/users/1');

// OPTIONS for CORS preflight
const options = await client.options('/api/users');`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Method Chaining & Fluent API</CardTitle>
              <CardDescription>Chain methods for complex requests</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// Fluent API for complex requests
const response = await client
  .get('/users')
  .params({ page: 1, limit: 10 })
  .headers({ 'Accept': 'application/json' })
  .timeout(5000)
  .send();

// Method-specific configurations
const user = await client
  .post('/users')
  .json({ name: 'Charlie', role: 'admin' })
  .auth('Bearer', token)
  .send();`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Interceptors Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Request & Response Interceptors</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Intercept and transform requests and responses globally across your application.
            </p>
          </div>

          <Tabs defaultValue="request" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="request">Request Interceptors</TabsTrigger>
              <TabsTrigger value="response">Response Interceptors</TabsTrigger>
              <TabsTrigger value="error">Error Handling</TabsTrigger>
            </TabsList>

            <TabsContent value="request" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Interceptors</CardTitle>
                  <CardDescription>Modify requests before they are sent</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Add authentication to all requests
client.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = \`Bearer \${token}\`;
  }
  return config;
});

// Add custom headers
client.interceptors.request.use(config => {
  config.headers['X-Custom-Header'] = 'value';
  config.headers['X-Request-ID'] = generateRequestId();
  return config;
});

// Log all outgoing requests
client.interceptors.request.use(config => {
  console.log('Making request to:', config.url);
  console.log('With data:', config.data);
  return config;
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="response" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Interceptors</CardTitle>
                  <CardDescription>Transform responses before they reach your code</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Transform response data
client.interceptors.response.use(response => {
  // Convert timestamps to Date objects
  if (response.data.createdAt) {
    response.data.createdAt = new Date(response.data.createdAt);
  }
  return response;
});

// Handle pagination metadata
client.interceptors.response.use(response => {
  if (response.headers['x-total-count']) {
    response.data = {
      items: response.data,
      total: parseInt(response.headers['x-total-count']),
      page: parseInt(response.headers['x-page'] || '1')
    };
  }
  return response;
});

// Global response logging
client.interceptors.response.use(response => {
  console.log('Response received:', response.status);
  return response;
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="error" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Error Handling</CardTitle>
                  <CardDescription>Global error handling and recovery</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Global error handling
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Show permission denied message
      showNotification('Access denied', 'error');
    } else if (error.response?.status >= 500) {
      // Log server errors
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Retry failed requests
client.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    if (config.retryCount < 3 && error.response?.status >= 500) {
      config.retryCount = (config.retryCount || 0) + 1;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return client.request(config);
    }
    return Promise.reject(error);
  }
);`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Request Configuration Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Request Configuration</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Flexible configuration options for customizing your HTTP requests.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Query Parameters & Headers</CardTitle>
                <CardDescription>Easy parameter and header management</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Query parameters
const users = await client.get('/users', {
  params: { 
    page: 2, 
    limit: 10,
    sort: 'name',
    filter: 'active'
  }
});

// Custom headers
const response = await client.get('/protected', {
  headers: { 
    'Authorization': 'Bearer token',
    'Accept': 'application/json',
    'X-API-Version': 'v2'
  }
});

// Combined configuration
const data = await client.post('/api/data', payload, {
  params: { format: 'json' },
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeout & Abort Control</CardTitle>
                <CardDescription>Request timeout and cancellation</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Request timeout
const response = await client.get('/slow-endpoint', {
  timeout: 5000 // 5 seconds
});

// Abort controller for cancellation
const controller = new AbortController();
const request = client.get('/data', {
  signal: controller.signal
});

// Cancel after 3 seconds
setTimeout(() => controller.abort(), 3000);

try {
  const response = await request;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Type Configuration</CardTitle>
                <CardDescription>Handle different response formats</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// JSON response (default)
const jsonData = await client.get('/api/users');

// Text response
const textData = await client.get('/api/status', {
  responseType: 'text'
});

// Blob for file downloads
const fileBlob = await client.get('/api/download', {
  responseType: 'blob'
});

// ArrayBuffer for binary data
const binaryData = await client.get('/api/binary', {
  responseType: 'arraybuffer'
});

// Stream for large responses
const stream = await client.get('/api/large-data', {
  responseType: 'stream'
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Base URL & Path Resolution</CardTitle>
                <CardDescription>Flexible URL handling and resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Set base URL during initialization
const client = new ZuziaFetch({
  baseURL: 'https://api.example.com/v1'
});

// Relative paths are resolved against base URL
await client.get('/users'); // -> https://api.example.com/v1/users

// Absolute URLs override base URL
await client.get('https://other-api.com/data');

// Dynamic base URL updates
client.defaults.baseURL = 'https://api-v2.example.com';

// Path parameters
await client.get('/users/{id}', {
  pathParams: { id: 123 }
}); // -> /users/123`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Overview */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Core Features Summary</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "HTTP Methods",
                description: "Full support for GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
                color: "text-blue-500",
              },
              {
                icon: ArrowRightLeft,
                title: "Interceptors",
                description: "Request and response interceptors for global transformations",
                color: "text-purple-500",
              },
              {
                icon: Settings,
                title: "Configuration",
                description: "Flexible request configuration with headers, params, timeouts",
                color: "text-green-500",
              },
              {
                icon: Code,
                title: "Promise-based",
                description: "Modern async/await support with Promise-based API",
                color: "text-orange-500",
              },
              {
                icon: FileText,
                title: "Response Types",
                description: "Support for JSON, text, blob, stream, and binary responses",
                color: "text-red-500",
              },
              {
                icon: Network,
                title: "URL Resolution",
                description: "Smart base URL handling and path parameter resolution",
                color: "text-indigo-500",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  <CardTitle className="text-slate-900 dark:text-slate-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Ready to explore more?</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Now that you know the core features, discover advanced capabilities and security features.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Try Advanced Features
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View API Reference
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
