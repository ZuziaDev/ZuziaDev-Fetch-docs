"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertTriangle,
  Copy,
  ChevronDown,
  ChevronRight,
  Wifi,
  Shield,
  Key,
  Bug,
  Clock,
  Server,
  Network,
  Eye,
  HelpCircle,
} from "lucide-react"

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

function TroubleshootingItem({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: any
  title: string
  description: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-orange-500" />
                <div>
                  <CardTitle className="text-left">{title}</CardTitle>
                  <CardDescription className="text-left">{description}</CardDescription>
                </div>
              </div>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-4 px-6 pb-6">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function TroubleshootingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Troubleshooting</h1>
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Common issues and solutions to help you resolve problems quickly
        </p>
      </div>

      <Tabs defaultValue="common" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="common">Common Issues</TabsTrigger>
          <TabsTrigger value="debugging">Debugging</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="common" className="space-y-6">
          <TroubleshootingItem
            icon={Wifi}
            title="Network Issues"
            description="Connection problems and network-related errors"
          >
            <div className="space-y-6">
              <Alert>
                <Network className="h-4 w-4" />
                <AlertTitle>Quick Diagnosis</AlertTitle>
                <AlertDescription>
                  Start by checking your internet connection and verifying the API endpoint URL
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h4 className="font-semibold">Common Network Error Messages:</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                  <li>
                    <code>ENOTFOUND</code> - DNS resolution failed
                  </li>
                  <li>
                    <code>ECONNREFUSED</code> - Connection refused by server
                  </li>
                  <li>
                    <code>ETIMEDOUT</code> - Request timed out
                  </li>
                  <li>
                    <code>EHOSTUNREACH</code> - Host unreachable
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Diagnostic Steps:</h4>
                <CodeBlock>
                  {`// Check if the API endpoint is reachable
const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  debug: true
});

try {
  // Test basic connectivity
  const response = await client.get('/health');
  console.log('API is reachable:', response.status);
} catch (error) {
  console.error('Network Error:', error.message);
  
  if (error.code === 'ENOTFOUND') {
    console.log('DNS resolution failed - check the URL');
  } else if (error.code === 'ECONNREFUSED') {
    console.log('Server is not accepting connections');
  } else if (error.code === 'ETIMEDOUT') {
    console.log('Request timed out - server may be slow');
  }
}`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Solutions:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">DNS Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        <li>• Verify the domain name spelling</li>
                        <li>• Try using IP address directly</li>
                        <li>• Check DNS settings</li>
                        <li>• Clear DNS cache</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Connection Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        <li>• Check firewall settings</li>
                        <li>• Verify port accessibility</li>
                        <li>• Test with curl/Postman</li>
                        <li>• Check proxy settings</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TroubleshootingItem>

          <TroubleshootingItem
            icon={Shield}
            title="CORS Errors"
            description="Cross-Origin Resource Sharing configuration issues"
          >
            <div className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Understanding CORS</AlertTitle>
                <AlertDescription>
                  CORS errors occur when the browser blocks requests to a different domain, port, or protocol
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-3">Common CORS Error Messages:</h4>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <code className="text-sm text-red-800 dark:text-red-200">
                    Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' has been blocked by
                    CORS policy
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Client-Side Solutions:</h4>
                <CodeBlock>
                  {`// Option 1: Use a proxy in development
const client = new ZuziaFetch({
  baseURL: '/api/proxy', // Proxy to avoid CORS
  headers: { 'Content-Type': 'application/json' }
});

// Option 2: Configure for CORS-enabled endpoints
const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  withCredentials: true, // Include credentials if needed
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Option 3: Handle preflight requests
const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  // These headers might trigger preflight
  headers: {
    'Authorization': 'Bearer token',
    'X-Custom-Header': 'value'
  }
});`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Server-Side Solutions:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2">Express.js</h5>
                    <CodeBlock language="javascript">
                      {`const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`}
                    </CodeBlock>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Manual Headers</h5>
                    <CodeBlock language="javascript">
                      {`app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});`}
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </div>
          </TroubleshootingItem>

          <TroubleshootingItem
            icon={Key}
            title="Authentication Failures"
            description="Token and credential related issues"
          >
            <div className="space-y-6">
              <Alert>
                <Key className="h-4 w-4" />
                <AlertTitle>Authentication Debug</AlertTitle>
                <AlertDescription>Check token validity, format, and refresh logic implementation</AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-3">Common Authentication Issues:</h4>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <strong>401 Unauthorized:</strong> Invalid or expired token
                  </div>
                  <div className="border rounded-lg p-3">
                    <strong>403 Forbidden:</strong> Valid token but insufficient permissions
                  </div>
                  <div className="border rounded-lg p-3">
                    <strong>Token Format Error:</strong> Incorrect Bearer format or encoding
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Debug Authentication:</h4>
                <CodeBlock>
                  {`const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  debug: true
});

// Method 1: Manual token management
client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  // Check if token is expired
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  if (tokenData.exp * 1000 < Date.now()) {
    console.log('Token expired, refreshing...');
    const newToken = await refreshToken();
    localStorage.setItem('authToken', newToken);
    config.headers.Authorization = \`Bearer \${newToken}\`;
  } else {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  
  return config;
});

// Method 2: Automatic token refresh
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshToken();
        localStorage.setItem('authToken', newToken);
        
        // Retry the original request
        const config = error.config;
        config.headers.Authorization = \`Bearer \${newToken}\`;
        return client.request(config);
      } catch (refreshError) {
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Token Validation Utility:</h4>
                <CodeBlock>
                  {`function validateToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' };
    }
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Date.now() / 1000;
    
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'Token expired' };
    }
    
    if (payload.iat && payload.iat > now) {
      return { valid: false, error: 'Token not yet valid' };
    }
    
    return { valid: true, payload };
  } catch (error) {
    return { valid: false, error: 'Token parsing failed' };
  }
}`}
                </CodeBlock>
              </div>
            </div>
          </TroubleshootingItem>
        </TabsContent>

        <TabsContent value="debugging" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-purple-500" />
                  Enable Debug Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  debug: true,
  logger: {
    level: 'debug',
    format: 'detailed'
  }
});

// This will log:
// - Request details
// - Response data
// - Timing information
// - Error details`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  Request Inspection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Log all requests and responses
client.interceptors.request.use((config) => {
  console.log('🚀 Request:', {
    method: config.method,
    url: config.url,
    headers: config.headers,
    data: config.data
  });
  return config;
});

client.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('❌ Error:', error);
    return Promise.reject(error);
  }
);`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Browser Developer Tools</CardTitle>
              <CardDescription>Use browser tools to inspect network requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Network Tab Inspection:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    <li>Open Developer Tools (F12)</li>
                    <li>Navigate to Network tab</li>
                    <li>Filter by XHR/Fetch requests</li>
                    <li>Check request headers, response data, and timing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Console Debugging:</h4>
                  <CodeBlock>
                    {`// Add this to your client for detailed logging
client.interceptors.request.use((config) => {
  console.group(\`📤 \${config.method?.toUpperCase()} \${config.url}\`);
  console.log('Headers:', config.headers);
  console.log('Data:', config.data);
  console.log('Config:', config);
  console.groupEnd();
  return config;
});`}
                  </CodeBlock>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TroubleshootingItem
              icon={Clock}
              title="Slow Request Performance"
              description="Diagnose and fix slow API calls"
            >
              <div className="space-y-4">
                <CodeBlock>
                  {`// Add performance monitoring
const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 30000
});

client.interceptors.request.use((config) => {
  config.startTime = performance.now();
  return config;
});

client.interceptors.response.use(
  (response) => {
    const duration = performance.now() - response.config.startTime;
    console.log(\`Request took \${duration.toFixed(2)}ms\`);
    
    if (duration > 5000) {
      console.warn('Slow request detected:', response.config.url);
    }
    
    return response;
  },
  (error) => {
    if (error.config?.startTime) {
      const duration = performance.now() - error.config.startTime;
      console.log(\`Failed request took \${duration.toFixed(2)}ms\`);
    }
    return Promise.reject(error);
  }
);`}
                </CodeBlock>
              </div>
            </TroubleshootingItem>

            <TroubleshootingItem icon={Server} title="Memory Leaks" description="Detect and prevent memory issues">
              <div className="space-y-4">
                <CodeBlock>
                  {`// Prevent memory leaks with proper cleanup
class ApiService {
  constructor() {
    this.abortControllers = new Set();
    this.client = new ZuziaFetch({
      baseURL: 'https://api.example.com'
    });
  }
  
  async makeRequest(url, options = {}) {
    const controller = new AbortController();
    this.abortControllers.add(controller);
    
    try {
      const response = await this.client.get(url, {
        ...options,
        signal: controller.signal
      });
      return response;
    } finally {
      this.abortControllers.delete(controller);
    }
  }
  
  cleanup() {
    // Cancel all pending requests
    this.abortControllers.forEach(controller => {
      controller.abort();
    });
    this.abortControllers.clear();
  }
}`}
                </CodeBlock>
              </div>
            </TroubleshootingItem>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Error Recovery Patterns</CardTitle>
              <CardDescription>Advanced error handling and recovery strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// Circuit breaker pattern
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureThreshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

// Usage with ZuziaFetch
const circuitBreaker = new CircuitBreaker();
const client = new ZuziaFetch({ baseURL: 'https://api.example.com' });

async function resilientApiCall(url) {
  return circuitBreaker.execute(() => client.get(url));
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Error Classes</CardTitle>
              <CardDescription>Create specific error types for better error handling</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// Custom error classes
class ApiError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

class NetworkError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
  }
}

class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Enhanced error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status >= 400 && status < 500) {
        if (status === 422 && data.errors) {
          throw new ValidationError('Validation failed', data.errors);
        }
        throw new ApiError(\`Client error: \${status}\`, status, data);
      } else if (status >= 500) {
        throw new ApiError(\`Server error: \${status}\`, status, data);
      }
    } else if (error.request) {
      // Network error
      throw new NetworkError('Network request failed', error);
    }
    
    return Promise.reject(error);
  }
);`}
              </CodeBlock>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            Still Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">GitHub Issues</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Report bugs or request features</p>
              <Button variant="outline" size="sm">
                Open Issue
              </Button>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Discord Community</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Get help from the community</p>
              <Button variant="outline" size="sm">
                Join Discord
              </Button>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Stack Overflow</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Search existing questions</p>
              <Button variant="outline" size="sm">
                Ask Question
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
