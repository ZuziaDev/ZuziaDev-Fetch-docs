"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  AlertTriangle,
  Shield,
  Clock,
  Code,
  FileText,
  Copy,
  Lightbulb,
  Target,
  Users,
  Zap,
  Lock,
  RefreshCw,
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

export function BestPracticesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                Best Practices
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Best Practices</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
              Follow these guidelines for robust and maintainable code. Build applications that are secure, performant,
              and easy to maintain.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Error Handling Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Error Handling</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Implement comprehensive error handling to create resilient applications that gracefully handle failures.
            </p>
          </div>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              Always handle both network errors and HTTP errors differently to provide appropriate user feedback.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Error Handling</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Patterns</TabsTrigger>
              <TabsTrigger value="recovery">Error Recovery</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Comprehensive Error Handling</CardTitle>
                  <CardDescription>Handle different types of errors appropriately</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Comprehensive error handling
try {
  const response = await client.get('/users');
  return response.data;
} catch (error) {
  // Network errors (no response received)
  if (error.isNetworkError) {
    console.error('Network error:', error.message);
    showNotification('Connection failed. Please check your internet connection.', 'error');
    return null;
  }
  
  // HTTP errors (response received with error status)
  if (error.isHttpError) {
    const status = error.response.status;
    
    switch (status) {
      case 400:
        console.error('Bad request:', error.response.data);
        showNotification('Invalid request. Please check your input.', 'error');
        break;
        
      case 401:
        console.error('Unauthorized');
        // Redirect to login
        redirectToLogin();
        break;
        
      case 403:
        console.error('Forbidden');
        showNotification('You do not have permission to access this resource.', 'error');
        break;
        
      case 404:
        console.error('Not found');
        showNotification('The requested resource was not found.', 'error');
        break;
        
      case 429:
        console.error('Rate limited');
        showNotification('Too many requests. Please try again later.', 'warning');
        break;
        
      case 500:
      case 502:
      case 503:
      case 504:
        console.error('Server error:', status);
        showNotification('Server error. Please try again later.', 'error');
        break;
        
      default:
        console.error('HTTP error:', status, error.response.data);
        showNotification('An unexpected error occurred.', 'error');
    }
    
    return null;
  }
  
  // Timeout errors
  if (error.isTimeoutError) {
    console.error('Request timeout');
    showNotification('Request timed out. Please try again.', 'warning');
    return null;
  }
  
  // Validation errors
  if (error.isValidationError) {
    console.error('Validation error:', error.validationErrors);
    showValidationErrors(error.validationErrors);
    return null;
  }
  
  // Unknown errors
  console.error('Unknown error:', error);
  showNotification('An unexpected error occurred.', 'error');
  return null;
}`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Error Patterns</CardTitle>
                  <CardDescription>Sophisticated error handling strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Error handling with context and recovery
class APIError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = 'APIError';
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

// Error boundary for React components
class APIErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('API Error caught by boundary:', error, errorInfo);
    
    // Send to error tracking service
    errorTracker.captureException(error, {
      tags: { component: 'APIErrorBoundary' },
      extra: errorInfo
    });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}

// Centralized error handler
const errorHandler = {
  handle: (error, context = {}) => {
    const errorId = generateErrorId();
    
    // Log error with context
    console.error(\`Error \${errorId}:\`, {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Send to error tracking
    errorTracker.captureException(error, {
      tags: { errorId, ...context.tags },
      extra: context.extra,
      user: context.user
    });
    
    // Show user-friendly message
    const userMessage = getUserFriendlyMessage(error);
    showNotification(userMessage, 'error');
    
    return errorId;
  },
  
  // Error classification
  classify: (error) => {
    if (error.isNetworkError) return 'network';
    if (error.isTimeoutError) return 'timeout';
    if (error.response?.status >= 500) return 'server';
    if (error.response?.status >= 400) return 'client';
    return 'unknown';
  },
  
  // Recovery suggestions
  getSuggestions: (error) => {
    const classification = errorHandler.classify(error);
    
    switch (classification) {
      case 'network':
        return ['Check internet connection', 'Try again later'];
      case 'timeout':
        return ['Check connection speed', 'Retry with longer timeout'];
      case 'server':
        return ['Try again later', 'Contact support if problem persists'];
      case 'client':
        return ['Check input data', 'Verify permissions'];
      default:
        return ['Refresh page', 'Contact support'];
    }
  }
};

// Use centralized error handler
try {
  const response = await client.get('/users');
  return response.data;
} catch (error) {
  const errorId = errorHandler.handle(error, {
    operation: 'fetchUsers',
    user: getCurrentUser(),
    tags: { feature: 'user-management' }
  });
  
  // Show recovery options
  const suggestions = errorHandler.getSuggestions(error);
  showErrorDialog({
    message: 'Failed to load users',
    errorId,
    suggestions,
    actions: [
      { label: 'Retry', action: () => retryOperation() },
      { label: 'Contact Support', action: () => openSupportChat(errorId) }
    ]
  });
  
  return [];
}`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recovery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Error Recovery Strategies</CardTitle>
                  <CardDescription>Implement automatic recovery and fallback mechanisms</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Circuit breaker pattern for error recovery
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.recoveryTimeout = options.recoveryTimeout || 60000;
    this.monitoringPeriod = options.monitoringPeriod || 10000;
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }
  
  async call(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.recoveryTimeout) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
      this.successCount = 0;
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
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = 'CLOSED';
      }
    }
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

// Fallback data provider
class FallbackDataProvider {
  constructor() {
    this.cache = new Map();
    this.fallbackData = new Map();
  }
  
  // Set fallback data for endpoints
  setFallback(endpoint, data) {
    this.fallbackData.set(endpoint, data);
  }
  
  // Get data with fallback
  async getData(endpoint, fetcher) {
    try {
      const data = await fetcher();
      this.cache.set(endpoint, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.warn(\`Failed to fetch \${endpoint}, using fallback\`);
      
      // Try cached data first
      const cached = this.cache.get(endpoint);
      if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
        return cached.data;
      }
      
      // Use fallback data
      const fallback = this.fallbackData.get(endpoint);
      if (fallback) {
        return fallback;
      }
      
      throw error;
    }
  }
}

// Graceful degradation
const gracefulDegradation = {
  async fetchWithFallback(endpoint, options = {}) {
    const fallbackProvider = new FallbackDataProvider();
    
    // Set up fallback data
    fallbackProvider.setFallback('/users', [
      { id: 1, name: 'Demo User', email: 'demo@example.com' }
    ]);
    
    try {
      return await fallbackProvider.getData(endpoint, () => 
        client.get(endpoint, options)
      );
    } catch (error) {
      // Last resort: return minimal data
      if (endpoint === '/users') {
        return [{ id: 0, name: 'Guest User', email: 'guest@example.com' }];
      }
      
      throw error;
    }
  },
  
  // Progressive enhancement
  async loadWithProgression(endpoints) {
    const results = {};
    
    for (const [key, endpoint] of Object.entries(endpoints)) {
      try {
        results[key] = await client.get(endpoint);
      } catch (error) {
        console.warn(\`Failed to load \${key}, continuing with partial data\`);
        results[key] = null;
      }
    }
    
    return results;
  }
};

// Usage example
const circuitBreaker = new CircuitBreaker({
  failureThreshold: 3,
  recoveryTimeout: 30000
});

async function fetchUsers() {
  try {
    return await circuitBreaker.call(() => client.get('/users'));
  } catch (error) {
    if (error.message === 'Circuit breaker is OPEN') {
      // Use cached or fallback data
      return await gracefulDegradation.fetchWithFallback('/users');
    }
    throw error;
  }
}`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Request Timeout Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Request Timeout Management</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Implement proper timeout strategies to prevent hanging requests and improve user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Timeout Configuration</CardTitle>
                <CardDescription>Set appropriate timeouts for different scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Global timeout configuration
const client = new ZuziaFetch({
  timeout: 5000,
  timeoutErrorMessage: 'Request timed out. Please try again.'
});

// Different timeouts for different operations
const timeoutConfig = {
  // Quick operations
  health: 1000,
  ping: 2000,
  
  // Standard operations
  get: 5000,
  post: 10000,
  
  // Long-running operations
  upload: 60000,
  export: 120000,
  
  // Critical operations
  payment: 30000,
  authentication: 15000
};

// Apply timeouts based on operation type
client.interceptors.request.use((config) => {
  const operation = getOperationType(config.url, config.method);
  config.timeout = timeoutConfig[operation] || timeoutConfig.get;
  
  return config;
});

// Per-request timeout override
const users = await client.get('/users', {
  timeout: 3000 // Override global timeout
});

// Timeout with custom error handling
try {
  const response = await client.get('/slow-endpoint', {
    timeout: 2000
  });
} catch (error) {
  if (error.isTimeoutError) {
    console.log('Request timed out after 2 seconds');
    // Show user-friendly message
    showNotification('The request is taking longer than expected. Please try again.', 'warning');
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Timeout Strategies</CardTitle>
                <CardDescription>Implement sophisticated timeout handling</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Adaptive timeout based on network conditions
class AdaptiveTimeout {
  constructor() {
    this.baseTimeout = 5000;
    this.history = [];
    this.maxHistory = 100;
  }
  
  // Calculate timeout based on historical performance
  calculateTimeout(endpoint) {
    const endpointHistory = this.history
      .filter(h => h.endpoint === endpoint)
      .slice(-10); // Last 10 requests
    
    if (endpointHistory.length === 0) {
      return this.baseTimeout;
    }
    
    const avgResponseTime = endpointHistory
      .reduce((sum, h) => sum + h.responseTime, 0) / endpointHistory.length;
    
    // Set timeout to 3x average response time, minimum 2 seconds
    return Math.max(avgResponseTime * 3, 2000);
  }
  
  // Record response time
  recordResponseTime(endpoint, responseTime) {
    this.history.push({
      endpoint,
      responseTime,
      timestamp: Date.now()
    });
    
    // Keep only recent history
    if (this.history.length > this.maxHistory) {
      this.history = this.history.slice(-this.maxHistory);
    }
  }
}

// Progressive timeout with retries
async function fetchWithProgressiveTimeout(url, options = {}) {
  const timeouts = [3000, 6000, 12000]; // Progressive timeouts
  
  for (let i = 0; i < timeouts.length; i++) {
    try {
      const response = await client.get(url, {
        ...options,
        timeout: timeouts[i]
      });
      return response;
    } catch (error) {
      if (error.isTimeoutError && i < timeouts.length - 1) {
        console.log(\`Timeout after \${timeouts[i]}ms, retrying with longer timeout\`);
        continue;
      }
      throw error;
    }
  }
}

// Timeout with user feedback
async function fetchWithUserFeedback(url, options = {}) {
  const timeoutWarning = setTimeout(() => {
    showNotification('This is taking longer than usual...', 'info');
  }, 3000);
  
  const timeoutError = setTimeout(() => {
    showNotification('Still working on it...', 'warning');
  }, 8000);
  
  try {
    const response = await client.get(url, {
      ...options,
      timeout: 15000
    });
    
    clearTimeout(timeoutWarning);
    clearTimeout(timeoutError);
    
    return response;
  } catch (error) {
    clearTimeout(timeoutWarning);
    clearTimeout(timeoutError);
    
    if (error.isTimeoutError) {
      showNotification('Request timed out. The server might be busy.', 'error');
    }
    
    throw error;
  }
}

// Usage
const adaptiveTimeout = new AdaptiveTimeout();

client.interceptors.request.use((config) => {
  config.timeout = adaptiveTimeout.calculateTimeout(config.url);
  return config;
});

client.interceptors.response.use((response) => {
  adaptiveTimeout.recordResponseTime(
    response.config.url,
    response.duration
  );
  return response;
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Secure Token Storage Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Secure Token Storage</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Implement secure token storage and management practices to protect user credentials and session data.
            </p>
          </div>

          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Never store sensitive tokens in localStorage in production. Use secure, HTTP-only cookies or memory
              storage.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="storage" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="storage">Storage Options</TabsTrigger>
              <TabsTrigger value="rotation">Token Rotation</TabsTrigger>
              <TabsTrigger value="security">Security Measures</TabsTrigger>
            </TabsList>

            <TabsContent value="storage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Secure Storage Strategies</CardTitle>
                  <CardDescription>Choose the right storage method for your tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Secure token storage options
const securityLevels = {
  // Highest security: Memory only (lost on page refresh)
  memory: {
    storage: 'memory',
    persistent: false,
    security: 'highest',
    useCase: 'Highly sensitive applications'
  },
  
  // High security: HTTP-only cookies
  httpOnlyCookies: {
    storage: 'cookie',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    security: 'high',
    useCase: 'Production web applications'
  },
  
  // Medium security: Encrypted sessionStorage
  encryptedSession: {
    storage: 'sessionStorage',
    encrypted: true,
    security: 'medium',
    useCase: 'Development and testing'
  },
  
  // Lower security: Plain localStorage (not recommended)
  localStorage: {
    storage: 'localStorage',
    encrypted: false,
    security: 'low',
    useCase: 'Development only'
  }
};

// Production-ready secure storage
class SecureTokenStorage {
  constructor(options = {}) {
    this.encryptionKey = options.encryptionKey || this.generateKey();
    this.storage = options.storage || 'memory';
    this.tokens = new Map(); // For memory storage
  }
  
  // Generate encryption key
  generateKey() {
    return crypto.getRandomValues(new Uint8Array(32));
  }
  
  // Encrypt token
  async encrypt(token) {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    
    const key = await crypto.subtle.importKey(
      'raw',
      this.encryptionKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    return {
      encrypted: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv)
    };
  }
  
  // Decrypt token
  async decrypt(encryptedData) {
    const key = await crypto.subtle.importKey(
      'raw',
      this.encryptionKey,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
      key,
      new Uint8Array(encryptedData.encrypted)
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }
  
  // Store token securely
  async setToken(key, token) {
    switch (this.storage) {
      case 'memory':
        this.tokens.set(key, token);
        break;
        
      case 'cookie':
        // Set HTTP-only cookie (requires server-side implementation)
        await fetch('/api/auth/set-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        break;
        
      case 'sessionStorage':
        const encrypted = await this.encrypt(token);
        sessionStorage.setItem(key, JSON.stringify(encrypted));
        break;
        
      default:
        throw new Error('Unsupported storage type');
    }
  }
  
  // Retrieve token securely
  async getToken(key) {
    switch (this.storage) {
      case 'memory':
        return this.tokens.get(key);
        
      case 'cookie':
        // Get from HTTP-only cookie (requires server-side implementation)
        const response = await fetch('/api/auth/get-token');
        const data = await response.json();
        return data.token;
        
      case 'sessionStorage':
        const stored = sessionStorage.getItem(key);
        if (!stored) return null;
        
        const encryptedData = JSON.parse(stored);
        return await this.decrypt(encryptedData);
        
      default:
        return null;
    }
  }
  
  // Remove token
  async removeToken(key) {
    switch (this.storage) {
      case 'memory':
        this.tokens.delete(key);
        break;
        
      case 'cookie':
        await fetch('/api/auth/clear-token', { method: 'POST' });
        break;
        
      case 'sessionStorage':
        sessionStorage.removeItem(key);
        break;
    }
  }
}

// Configure client with secure storage
const secureStorage = new SecureTokenStorage({
  storage: 'memory', // Most secure for production
  encryptionKey: await generateSecureKey()
});

const client = new ZuziaFetch({
  auth: {
    storage: secureStorage,
    
    // Token validation
    validateToken: (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } catch {
        return false;
      }
    },
    
    // Clear tokens on page unload
    clearOnUnload: true
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rotation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Rotation Best Practices</CardTitle>
                  <CardDescription>Implement automatic token rotation for enhanced security</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Automatic token rotation
class TokenRotationManager {
  constructor(client, options = {}) {
    this.client = client;
    this.rotationInterval = options.rotationInterval || 3600000; // 1 hour
    this.rotationThreshold = options.rotationThreshold || 300000; // 5 minutes before expiry
    this.maxRetries = options.maxRetries || 3;
    this.rotationTimer = null;
  }
  
  // Start automatic rotation
  startRotation() {
    this.scheduleNextRotation();
  }
  
  // Stop automatic rotation
  stopRotation() {
    if (this.rotationTimer) {
      clearTimeout(this.rotationTimer);
      this.rotationTimer = null;
    }
  }
  
  // Schedule next rotation
  scheduleNextRotation() {
    const token = this.client.getToken();
    if (!token) return;
    
    const payload = this.parseTokenPayload(token);
    if (!payload) return;
    
    const expiryTime = payload.exp * 1000;
    const rotationTime = expiryTime - this.rotationThreshold;
    const delay = Math.max(rotationTime - Date.now(), 0);
    
    this.rotationTimer = setTimeout(() => {
      this.rotateToken();
    }, delay);
  }
  
  // Rotate token
  async rotateToken(retryCount = 0) {
    try {
      console.log('Rotating token...');
      
      const refreshToken = await this.client.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      
      const { accessToken, refreshToken: newRefreshToken } = await response.json();
      
      // Update tokens
      await this.client.setToken(accessToken);
      await this.client.setRefreshToken(newRefreshToken);
      
      console.log('Token rotated successfully');
      
      // Schedule next rotation
      this.scheduleNextRotation();
      
      // Notify listeners
      this.client.emit('token:rotated', { accessToken });
      
    } catch (error) {
      console.error('Token rotation failed:', error);
      
      if (retryCount < this.maxRetries) {
        console.log(\`Retrying token rotation (attempt \${retryCount + 1})\`);
        setTimeout(() => {
          this.rotateToken(retryCount + 1);
        }, 1000 * Math.pow(2, retryCount)); // Exponential backoff
      } else {
        console.error('Token rotation failed after maximum retries');
        this.client.emit('token:rotation-failed', error);
        
        // Redirect to login
        window.location.href = '/login';
      }
    }
  }
  
  // Parse token payload
  parseTokenPayload(token) {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}

// Token rotation with multiple strategies
const rotationStrategies = {
  // Time-based rotation
  timeBased: {
    interval: 3600000, // 1 hour
    beforeExpiry: 300000 // 5 minutes
  },
  
  // Usage-based rotation
  usageBased: {
    requestCount: 100, // Rotate after 100 requests
    dataThreshold: 1024 * 1024 // Rotate after 1MB of data
  },
  
  // Risk-based rotation
  riskBased: {
    suspiciousActivity: true,
    locationChange: true,
    deviceChange: true
  }
};

// Initialize token rotation
const rotationManager = new TokenRotationManager(client, {
  rotationInterval: 3600000,
  rotationThreshold: 300000
});

// Start rotation when user logs in
client.on('auth:login', () => {
  rotationManager.startRotation();
});

// Stop rotation when user logs out
client.on('auth:logout', () => {
  rotationManager.stopRotation();
});

// Handle rotation events
client.on('token:rotated', (event) => {
  console.log('Token rotated at:', new Date().toISOString());
});

client.on('token:rotation-failed', (error) => {
  console.error('Token rotation failed:', error);
  // Show user notification
  showNotification('Session expired. Please log in again.', 'error');
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Security Measures</CardTitle>
                  <CardDescription>Implement comprehensive token security</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Comprehensive token security
class TokenSecurityManager {
  constructor(options = {}) {
    this.fingerprintEnabled = options.fingerprint !== false;
    this.integrityCheckEnabled = options.integrityCheck !== false;
    this.auditLogEnabled = options.auditLog !== false;
    this.deviceBinding = options.deviceBinding || false;
  }
  
  // Generate device fingerprint
  generateFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: \`\${screen.width}x\${screen.height}\`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvas: canvas.toDataURL(),
      webgl: this.getWebGLFingerprint()
    };
    
    return btoa(JSON.stringify(fingerprint));
  }
  
  // Get WebGL fingerprint
  getWebGLFingerprint() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) return null;
    
    return {
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
      version: gl.getParameter(gl.VERSION)
    };
  }
  
  // Validate token integrity
  validateTokenIntegrity(token) {
    if (!this.integrityCheckEnabled) return true;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Verify signature (simplified - use proper JWT library in production)
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      // Check token structure
      if (!header.alg || !header.typ) return false;
      if (!payload.sub || !payload.exp || !payload.iat) return false;
      
      // Check expiration
      if (payload.exp * 1000 < Date.now()) return false;
      
      // Check device binding if enabled
      if (this.deviceBinding && payload.device_id) {
        const currentFingerprint = this.generateFingerprint();
        if (payload.device_id !== currentFingerprint) {
          console.warn('Device fingerprint mismatch');
          return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }
  
  // Audit token usage
  auditTokenUsage(action, token, context = {}) {
    if (!this.auditLogEnabled) return;
    
    const auditEntry = {
      timestamp: new Date().toISOString(),
      action,
      tokenId: this.extractTokenId(token),
      userAgent: navigator.userAgent,
      ip: context.ip || 'unknown',
      fingerprint: this.fingerprintEnabled ? this.generateFingerprint() : null,
      context
    };
    
    // Send to audit service
    this.sendAuditLog(auditEntry);
  }
  
  // Extract token ID for auditing
  extractTokenId(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.jti || payload.sub || 'unknown';
    } catch {
      return 'invalid';
    }
  }
  
  // Send audit log
  async sendAuditLog(entry) {
    try {
      await fetch('/api/audit/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
    } catch (error) {
      console.error('Failed to send audit log:', error);
    }
  }
  
  // Detect suspicious activity
  detectSuspiciousActivity(token, context = {}) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const suspiciousIndicators = [];
    
    // Check for unusual location
    if (context.location && payload.location) {
      const distance = this.calculateDistance(context.location, payload.location);
      if (distance > 1000) { // More than 1000km
        suspiciousIndicators.push('unusual_location');
      }
    }
    
    // Check for device change
    if (this.deviceBinding && context.fingerprint !== payload.device_id) {
      suspiciousIndicators.push('device_change');
    }
    
    // Check for time anomalies
    const timeSinceIssued = Date.now() - (payload.iat * 1000);
    if (timeSinceIssued < 0) {
      suspiciousIndicators.push('future_token');
    }
    
    // Check for rapid requests
    if (context.requestCount > 100 && context.timeWindow < 60000) {
      suspiciousIndicators.push('rapid_requests');
    }
    
    return suspiciousIndicators;
  }
  
  // Calculate distance between two locations
  calculateDistance(loc1, loc2) {
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lon - loc1.lon) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}

// Initialize security manager
const securityManager = new TokenSecurityManager({
  fingerprint: true,
  integrityCheck: true,
  auditLog: true,
  deviceBinding: true
});

// Integrate with client
client.interceptors.request.use((config) => {
  const token = client.getToken();
  if (token) {
    // Validate token integrity
    if (!securityManager.validateTokenIntegrity(token)) {
      throw new Error('Token integrity check failed');
    }
    
    // Audit token usage
    securityManager.auditTokenUsage('request', token, {
      url: config.url,
      method: config.method
    });
    
    // Check for suspicious activity
    const suspicious = securityManager.detectSuspiciousActivity(token, {
      fingerprint: securityManager.generateFingerprint(),
      location: getCurrentLocation()
    });
    
    if (suspicious.length > 0) {
      console.warn('Suspicious activity detected:', suspicious);
      // Optionally block request or require re-authentication
    }
  }
  
  return config;
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Code Organization Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Code Organization</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Structure your HTTP client code for maintainability, reusability, and testability.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Modular Client Architecture</CardTitle>
              <CardDescription>Organize your HTTP client code for scalability</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// api/client.js - Base client configuration
import { ZuziaFetch } from 'zuzia-fetch';
import { authInterceptor } from './interceptors/auth';
import { errorInterceptor } from './interceptors/error';
import { loggingInterceptor } from './interceptors/logging';

export const createAPIClient = (config = {}) => {
  const client = new ZuziaFetch({
    baseURL: process.env.REACT_APP_API_URL || 'https://api.example.com',
    timeout: 10000,
    retry: {
      attempts: 3,
      delay: 1000,
      exponentialBackoff: true
    },
    ...config
  });

  // Apply interceptors
  authInterceptor(client);
  errorInterceptor(client);
  loggingInterceptor(client);

  return client;
};

// api/interceptors/auth.js - Authentication interceptor
export const authInterceptor = (client) => {
  client.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          await refreshToken();
          // Retry original request
          return client.request(error.config);
        } catch (refreshError) {
          redirectToLogin();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

// api/services/users.js - User service
import { createAPIClient } from '../client';

class UserService {
  constructor() {
    this.client = createAPIClient();
  }

  async getUsers(params = {}) {
    const response = await this.client.get('/users', { params });
    return response.data;
  }

  async getUserById(id) {
    const response = await this.client.get(\`/users/\${id}\`);
    return response.data;
  }

  async createUser(userData) {
    const response = await this.client.post('/users', userData);
    return response.data;
  }

  async updateUser(id, userData) {
    const response = await this.client.put(\`/users/\${id}\`, userData);
    return response.data;
  }

  async deleteUser(id) {
    await this.client.delete(\`/users/\${id}\`);
  }

  // Batch operations
  async getUsersWithPosts(userIds) {
    const batch = this.client.createBatch();
    
    userIds.forEach(id => {
      batch.add('GET', \`/users/\${id}\`);
      batch.add('GET', \`/users/\${id}/posts\`);
    });
    
    const results = await batch.execute();
    
    // Process batch results
    const usersWithPosts = [];
    for (let i = 0; i < userIds.length; i++) {
      usersWithPosts.push({
        user: results[i * 2].data,
        posts: results[i * 2 + 1].data
      });
    }
    
    return usersWithPosts;
  }
}

export const userService = new UserService();

// api/index.js - Main API exports from './client'; from './services/users';
export { postService } from './services/posts';
export { authService } from './services/auth';

// hooks/useAPI.js - React hook for API calls
import { useState, useEffect, useCallback } from 'react';
import { userService } from '../api';

export const useUsers = (params = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers(params);
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers
  };
};

// Usage in components
import { useUsers } from '../hooks/useAPI';

function UserList() {
  const { users, loading, error, refetch } = useUsers({ 
    page: 1, 
    limit: 10 
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices Summary */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-indigo-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Best Practices Checklist</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Error Handling",
                items: [
                  "Handle network and HTTP errors separately",
                  "Provide user-friendly error messages",
                  "Implement error recovery strategies",
                  "Log errors with context for debugging",
                ],
                color: "text-red-500",
              },
              {
                icon: Clock,
                title: "Timeout Management",
                items: [
                  "Set appropriate timeouts for operations",
                  "Use adaptive timeouts based on performance",
                  "Provide user feedback for long operations",
                  "Implement progressive timeout strategies",
                ],
                color: "text-blue-500",
              },
              {
                icon: Shield,
                title: "Security",
                items: [
                  "Use secure token storage methods",
                  "Implement automatic token rotation",
                  "Validate token integrity",
                  "Audit security events",
                ],
                color: "text-green-500",
              },
              {
                icon: Code,
                title: "Code Organization",
                items: [
                  "Modularize API clients and services",
                  "Use interceptors for cross-cutting concerns",
                  "Create reusable hooks and utilities",
                  "Maintain consistent error handling",
                ],
                color: "text-purple-500",
              },
              {
                icon: Zap,
                title: "Performance",
                items: [
                  "Enable request batching for efficiency",
                  "Use response compression",
                  "Implement connection pooling",
                  "Monitor performance metrics",
                ],
                color: "text-orange-500",
              },
              {
                icon: Users,
                title: "User Experience",
                items: [
                  "Provide loading states and feedback",
                  "Implement graceful degradation",
                  "Handle offline scenarios",
                  "Show meaningful error messages",
                ],
                color: "text-indigo-500",
              },
            ].map((practice, index) => (
              <Card key={index} className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <practice.icon className={`w-8 h-8 ${practice.color}`} />
                  <CardTitle className="text-slate-900 dark:text-slate-100">{practice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {practice.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Build robust, maintainable applications
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Following these best practices will help you create applications that are secure, performant, and easy to
              maintain. Your users will thank you for the great experience!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <FileText className="w-4 h-4 mr-2" />
                View API Reference
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Migration Guide
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
