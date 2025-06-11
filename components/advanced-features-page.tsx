"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Zap,
  RotateCcw,
  Clock,
  Database,
  Network,
  Settings,
  Copy,
  Play,
  AlertCircle,
  CheckCircle,
  Info,
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

export function AdvancedFeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-purple-600" />
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">Advanced</Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Advanced Features</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
              Take your HTTP requests to the next level with these advanced capabilities. Built for production
              applications that demand reliability and performance.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Automatic Retries Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Automatic Retries</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Intelligent retry mechanisms to handle transient failures and improve reliability.
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Retries are automatically applied to network errors and 5xx server responses by default.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Retry</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Config</TabsTrigger>
              <TabsTrigger value="custom">Custom Logic</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Retry Configuration</CardTitle>
                  <CardDescription>Basic retry setup with attempts and delay</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Basic retry configuration
const client = new ZuziaFetch({
  retry: { 
    attempts: 3, 
    delay: 1000 // 1 second delay
  }
});

// Per-request retry override
const response = await client.get('/unreliable-endpoint', {
  retry: { 
    attempts: 5, 
    delay: 2000 
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Retry Configuration</CardTitle>
                  <CardDescription>Exponential backoff and conditional retries</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Advanced retry with exponential backoff
const client = new ZuziaFetch({
  retry: {
    attempts: 3,
    delay: 1000,
    exponentialBackoff: true,
    maxDelay: 10000,
    jitter: true, // Add randomness to prevent thundering herd
    
    // Custom retry condition
    retryCondition: (error) => {
      // Retry on network errors and 5xx responses
      return !error.response || error.response.status >= 500;
    },
    
    // Custom delay calculation
    delayCalculation: (attempt, delay) => {
      return Math.min(delay * Math.pow(2, attempt), 10000);
    }
  }
});

// Retry with different strategies
const client2 = new ZuziaFetch({
  retry: {
    attempts: 5,
    delay: 500,
    strategy: 'exponential', // 'linear', 'exponential', 'custom'
    retryOn: [408, 429, 500, 502, 503, 504], // Specific status codes
    onRetry: (attempt, error) => {
      console.log(\`Retry attempt \${attempt} for \${error.config.url}\`);
    }
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Retry Logic</CardTitle>
                  <CardDescription>Implement your own retry strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Custom retry implementation
const client = new ZuziaFetch({
  retry: {
    attempts: 3,
    customRetry: async (error, attempt, config) => {
      // Custom logic for determining if we should retry
      if (attempt >= 3) return false;
      
      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        return false;
      }
      
      // Custom delay based on response headers
      const retryAfter = error.response?.headers['retry-after'];
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return true;
      }
      
      // Default exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return true;
    }
  }
});

// Circuit breaker pattern
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }
  
  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

const breaker = new CircuitBreaker();
const response = await breaker.call(() => client.get('/api/data'));`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Rate Limiting Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Rate Limiting</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Control request frequency to respect API limits and prevent overwhelming servers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Rate Limiting</CardTitle>
                <CardDescription>Simple request throttling</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Basic rate limiting
const client = new ZuziaFetch({
  rateLimit: { 
    maxRequests: 100, 
    perMinute: true 
  }
});

// Per-second rate limiting
const client2 = new ZuziaFetch({
  rateLimit: {
    maxRequests: 10,
    perSecond: true
  }
});

// Custom time window
const client3 = new ZuziaFetch({
  rateLimit: {
    maxRequests: 1000,
    window: 3600000 // 1 hour in milliseconds
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Rate Limiting</CardTitle>
                <CardDescription>Token bucket and sliding window algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Token bucket rate limiter
const client = new ZuziaFetch({
  rateLimit: {
    algorithm: 'token-bucket',
    capacity: 100, // bucket capacity
    refillRate: 10, // tokens per second
    initialTokens: 50
  }
});

// Sliding window rate limiter
const client2 = new ZuziaFetch({
  rateLimit: {
    algorithm: 'sliding-window',
    maxRequests: 100,
    windowSize: 60000, // 1 minute
    precision: 1000 // 1 second precision
  }
});

// Per-endpoint rate limiting
const client3 = new ZuziaFetch({
  rateLimit: {
    rules: [
      { pattern: '/api/search/*', maxRequests: 10, perMinute: true },
      { pattern: '/api/upload/*', maxRequests: 5, perMinute: true },
      { pattern: '/api/*', maxRequests: 100, perMinute: true }
    ]
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Caching Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Intelligent Caching</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Reduce network requests and improve performance with smart caching strategies.
            </p>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Caching respects HTTP cache headers (Cache-Control, ETag, Last-Modified) by default.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Caching</TabsTrigger>
              <TabsTrigger value="strategies">Cache Strategies</TabsTrigger>
              <TabsTrigger value="invalidation">Cache Control</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Cache Configuration</CardTitle>
                  <CardDescription>Enable caching with TTL</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Basic caching setup
const client = new ZuziaFetch({
  cache: { 
    enabled: true, 
    ttl: 3600000 // 1 hour in milliseconds
  }
});

// Per-request cache override
const users = await client.get('/users', {
  cache: { 
    ttl: 300000 // 5 minutes
  }
});

// Disable cache for specific request
const freshData = await client.get('/real-time-data', {
  cache: false
});

// Cache with custom key
const data = await client.get('/data', {
  cache: {
    key: 'custom-cache-key',
    ttl: 600000
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cache Strategies</CardTitle>
                  <CardDescription>Different caching approaches for various use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Memory cache (default)
const client1 = new ZuziaFetch({
  cache: {
    enabled: true,
    storage: 'memory',
    maxSize: 100, // Maximum number of cached responses
    ttl: 3600000
  }
});

// LocalStorage cache (persistent)
const client2 = new ZuziaFetch({
  cache: {
    enabled: true,
    storage: 'localStorage',
    prefix: 'api-cache-',
    ttl: 86400000 // 24 hours
  }
});

// SessionStorage cache
const client3 = new ZuziaFetch({
  cache: {
    enabled: true,
    storage: 'sessionStorage',
    ttl: 3600000
  }
});

// Custom cache storage
const client4 = new ZuziaFetch({
  cache: {
    enabled: true,
    storage: {
      get: async (key) => {
        return await redis.get(key);
      },
      set: async (key, value, ttl) => {
        await redis.setex(key, ttl / 1000, value);
      },
      delete: async (key) => {
        await redis.del(key);
      },
      clear: async () => {
        await redis.flushdb();
      }
    }
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invalidation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cache Invalidation & Control</CardTitle>
                  <CardDescription>Manage cache lifecycle and invalidation</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Cache invalidation patterns
const client = new ZuziaFetch({
  cache: {
    enabled: true,
    ttl: 3600000,
    
    // Invalidate cache on mutations
    invalidateOn: ['POST', 'PUT', 'DELETE', 'PATCH'],
    
    // Custom invalidation rules
    invalidationRules: [
      {
        pattern: '/users/*',
        invalidate: ['/users', '/users/*', '/profile']
      },
      {
        pattern: '/posts/*',
        invalidate: ['/posts', '/posts/*', '/feed']
      }
    ]
  }
});

// Manual cache control
// Clear specific cache entry
await client.cache.delete('/users');

// Clear all cache
await client.cache.clear();

// Check if cached
const isCached = await client.cache.has('/users');

// Get cache info
const cacheInfo = await client.cache.info('/users');
console.log(cacheInfo); // { key, ttl, size, createdAt }

// Conditional requests with ETags
const response = await client.get('/data', {
  cache: {
    revalidate: true, // Always check with server
    staleWhileRevalidate: true // Return stale data while fetching fresh
  }
});

// Cache warming
await client.cache.warm([
  '/users',
  '/posts',
  '/categories'
]);`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Proxy Support Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Proxy Support</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Route requests through proxies for security, caching, or network requirements.
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Proxy support is available in Node.js environments. Browser environments use CORS proxies.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Proxy Configuration</CardTitle>
                <CardDescription>Simple HTTP and HTTPS proxy setup</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Basic HTTP proxy
const client = new ZuziaFetch({
  proxy: { 
    host: 'proxy.example.com', 
    port: 8080 
  }
});

// HTTPS proxy with authentication
const client2 = new ZuziaFetch({
  proxy: {
    host: 'secure-proxy.example.com',
    port: 8443,
    protocol: 'https',
    auth: {
      username: 'proxyuser',
      password: 'proxypass'
    }
  }
});

// Environment-based proxy
const client3 = new ZuziaFetch({
  proxy: process.env.HTTP_PROXY || {
    host: 'localhost',
    port: 3128
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Proxy Features</CardTitle>
                <CardDescription>Conditional proxying and proxy chains</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Conditional proxy usage
const client = new ZuziaFetch({
  proxy: {
    host: 'proxy.company.com',
    port: 8080,
    
    // Only use proxy for specific domains
    bypass: ['localhost', '*.internal.com', '192.168.*'],
    
    // Or use proxy only for specific domains
    include: ['*.external-api.com', 'api.partner.com']
  }
});

// Multiple proxy configurations
const client2 = new ZuziaFetch({
  proxies: [
    {
      pattern: '*.api1.com',
      proxy: { host: 'proxy1.com', port: 8080 }
    },
    {
      pattern: '*.api2.com', 
      proxy: { host: 'proxy2.com', port: 8080 }
    },
    {
      default: { host: 'default-proxy.com', port: 8080 }
    }
  ]
});

// SOCKS proxy support
const client3 = new ZuziaFetch({
  proxy: {
    type: 'socks5',
    host: 'socks-proxy.example.com',
    port: 1080,
    auth: {
      username: 'socksuser',
      password: 'sockspass'
    }
  }
});

// Proxy rotation for load balancing
const client4 = new ZuziaFetch({
  proxy: {
    rotation: [
      { host: 'proxy1.com', port: 8080 },
      { host: 'proxy2.com', port: 8080 },
      { host: 'proxy3.com', port: 8080 }
    ],
    strategy: 'round-robin' // 'random', 'least-used'
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced Configuration */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-indigo-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Advanced Configuration</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Fine-tune your HTTP client with advanced configuration options.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Complete Advanced Setup</CardTitle>
              <CardDescription>Combining all advanced features</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// Complete advanced configuration
const client = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000,
    exponentialBackoff: true,
    maxDelay: 10000,
    retryCondition: (error) => {
      return !error.response || error.response.status >= 500;
    }
  },
  
  // Rate limiting
  rateLimit: {
    maxRequests: 100,
    perMinute: true,
    algorithm: 'token-bucket'
  },
  
  // Caching
  cache: {
    enabled: true,
    ttl: 3600000,
    storage: 'memory',
    maxSize: 100,
    invalidateOn: ['POST', 'PUT', 'DELETE']
  },
  
  // Proxy configuration
  proxy: {
    host: 'proxy.company.com',
    port: 8080,
    bypass: ['localhost', '*.internal.com']
  },
  
  // Request/Response transformation
  transformRequest: [(data) => {
    // Add request ID to all requests
    if (typeof data === 'object') {
      data.requestId = generateUUID();
    }
    return data;
  }],
  
  transformResponse: [(data) => {
    // Transform all timestamps to Date objects
    return transformTimestamps(data);
  }],
  
  // Default headers
  headers: {
    'User-Agent': 'MyApp/1.0.0',
    'Accept': 'application/json'
  },
  
  // Connection pooling
  pool: {
    maxSockets: 10,
    keepAlive: true,
    keepAliveMsecs: 30000
  },
  
  // Compression
  compression: {
    enabled: true,
    threshold: 1024, // Compress responses > 1KB
    algorithms: ['gzip', 'deflate', 'br']
  }
});

// Environment-specific configurations
const config = {
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 30000,
    retry: { attempts: 1 },
    cache: { enabled: false }
  },
  
  production: {
    baseURL: 'https://api.production.com',
    timeout: 10000,
    retry: { attempts: 3, exponentialBackoff: true },
    cache: { enabled: true, ttl: 3600000 },
    rateLimit: { maxRequests: 1000, perMinute: true }
  }
};

const client = new ZuziaFetch(config[process.env.NODE_ENV]);`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Master the advanced features</h2>
            <p className="text-slate-600 dark:text-slate-300">
              You now have the tools to build robust, high-performance HTTP clients. Next, explore security features to
              protect your applications.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4 mr-2" />
                Explore Security Features
              </Button>
              <Button variant="outline">View Performance Guide</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
