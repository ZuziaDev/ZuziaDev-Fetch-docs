"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Key,
  Lock,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Copy,
  Play,
  FileText,
  Fingerprint,
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

export function SecurityFeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-green-600" />
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Security</Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Security Features</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
              @ZuziaDev/Fetch helps you build secure applications with built-in security mechanisms. Protect your data
              and users with enterprise-grade security features.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Token Management Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Token Management</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Secure token handling with automatic refresh and storage management.
            </p>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Tokens are automatically included in requests and refreshed when expired.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Tokens</TabsTrigger>
              <TabsTrigger value="refresh">Auto Refresh</TabsTrigger>
              <TabsTrigger value="storage">Secure Storage</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Token Management</CardTitle>
                  <CardDescription>Basic token setup and usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Set authentication token
client.setToken('your-access-token');

// Token is automatically added to all requests
const users = await client.get('/users');
// Authorization: Bearer your-access-token

// Set token with custom header name
client.setToken('your-token', 'X-API-Key');

// Remove token
client.clearToken();

// Check if token is set
if (client.hasToken()) {
  console.log('Token is configured');
}

// Get current token (for debugging)
const currentToken = client.getToken();`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="refresh" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Automatic Token Refresh</CardTitle>
                  <CardDescription>Handle token expiration automatically</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Configure automatic token refresh
const client = new ZuziaFetch({
  auth: {
    token: 'initial-access-token',
    refreshToken: 'refresh-token',
    
    // Automatic refresh configuration
    autoRefresh: true,
    refreshEndpoint: '/auth/refresh',
    refreshMethod: 'POST',
    
    // Token expiration handling
    tokenExpiry: new Date('2024-12-31'),
    refreshBeforeExpiry: 300000, // 5 minutes
    
    // Custom refresh logic
    onTokenRefresh: async (refreshToken) => {
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      
      const data = await response.json();
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: new Date(data.expiresAt)
      };
    },
    
    // Handle refresh failure
    onRefreshError: (error) => {
      console.error('Token refresh failed:', error);
      // Redirect to login
      window.location.href = '/login';
    }
  }
});

// Manual token refresh
try {
  await client.refreshToken();
  console.log('Token refreshed successfully');
} catch (error) {
  console.error('Failed to refresh token:', error);
}

// Token refresh with retry
const client2 = new ZuziaFetch({
  auth: {
    autoRefresh: true,
    refreshRetry: {
      attempts: 3,
      delay: 1000
    }
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="storage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Secure Token Storage</CardTitle>
                  <CardDescription>Protect tokens with secure storage options</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Secure token storage configuration
const client = new ZuziaFetch({
  auth: {
    storage: {
      type: 'secure', // 'memory', 'localStorage', 'sessionStorage', 'secure'
      
      // Encryption for localStorage/sessionStorage
      encrypt: true,
      encryptionKey: 'your-encryption-key',
      
      // Custom storage implementation
      customStorage: {
        get: async (key) => {
          // Get from secure storage (e.g., encrypted IndexedDB)
          return await secureStorage.get(key);
        },
        set: async (key, value) => {
          // Store securely
          await secureStorage.set(key, value);
        },
        remove: async (key) => {
          await secureStorage.remove(key);
        }
      }
    },
    
    // Token validation
    validateToken: (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } catch {
        return false;
      }
    }
  }
});

// Memory-only storage (most secure, doesn't persist)
const secureClient = new ZuziaFetch({
  auth: {
    storage: { type: 'memory' },
    clearOnPageUnload: true
  }
});

// Encrypted localStorage storage
const persistentClient = new ZuziaFetch({
  auth: {
    storage: {
      type: 'localStorage',
      encrypt: true,
      key: 'app-auth-token'
    }
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* OAuth 2.0 Support Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">OAuth 2.0 Support</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Complete OAuth 2.0 implementation with support for all grant types.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authorization Code Flow</CardTitle>
                <CardDescription>Standard OAuth 2.0 authorization code flow</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// OAuth 2.0 Authorization Code Flow
const client = new ZuziaFetch({
  auth: {
    type: 'oauth2',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    
    // OAuth endpoints
    authorizationURL: 'https://auth.example.com/oauth/authorize',
    tokenURL: 'https://auth.example.com/oauth/token',
    
    // Redirect URI
    redirectURI: 'https://yourapp.com/callback',
    
    // Scopes
    scope: ['read', 'write', 'profile'],
    
    // PKCE for security
    usePKCE: true
  }
});

// Initiate OAuth flow
const authURL = client.getAuthorizationURL({
  state: 'random-state-string',
  codeChallenge: 'code-challenge'
});

// Redirect user to authURL
window.location.href = authURL;

// Handle callback (after user authorization)
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state');

// Exchange code for tokens
await client.exchangeCodeForTokens(code, {
  state: state,
  codeVerifier: 'code-verifier'
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Credentials Flow</CardTitle>
                <CardDescription>Server-to-server authentication</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Client Credentials Flow
const client = new ZuziaFetch({
  auth: {
    type: 'oauth2',
    flow: 'client-credentials',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    tokenURL: 'https://auth.example.com/oauth/token',
    scope: ['api:read', 'api:write']
  }
});

// Automatically handles token acquisition
const data = await client.get('/api/protected-resource');

// Manual token acquisition
await client.authenticate();

// Resource Owner Password Credentials (not recommended)
const client2 = new ZuziaFetch({
  auth: {
    type: 'oauth2',
    flow: 'password',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    tokenURL: 'https://auth.example.com/oauth/token',
    username: 'user@example.com',
    password: 'user-password'
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CSRF Protection Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-red-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">CSRF Protection</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Protect against Cross-Site Request Forgery attacks with automatic CSRF token handling.
            </p>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              CSRF protection is automatically enabled for state-changing requests (POST, PUT, DELETE, PATCH).
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Automatic CSRF Protection</CardTitle>
                <CardDescription>Built-in CSRF token management</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Enable automatic CSRF protection
const client = new ZuziaFetch({
  csrf: {
    enabled: true,
    tokenName: 'csrf-token', // Cookie name
    headerName: 'X-CSRF-Token', // Header name
    
    // Auto-fetch token from meta tag
    metaTagName: 'csrf-token',
    
    // Auto-fetch from cookie
    cookieName: 'XSRF-TOKEN',
    
    // Custom token retrieval
    getToken: () => {
      return document.querySelector('meta[name="csrf-token"]')?.content;
    }
  }
});

// Manual CSRF token setting
client.setCSRFToken('csrf-token-value');

// CSRF token is automatically included in requests
await client.post('/api/users', userData);
// X-CSRF-Token: csrf-token-value

// Disable CSRF for specific request
await client.post('/public-endpoint', data, {
  csrf: false
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced CSRF Configuration</CardTitle>
                <CardDescription>Custom CSRF handling and validation</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Advanced CSRF configuration
const client = new ZuziaFetch({
  csrf: {
    enabled: true,
    
    // Double submit cookie pattern
    doubleSubmit: true,
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN',
    
    // SameSite cookie configuration
    sameSite: 'strict',
    secure: true,
    httpOnly: false,
    
    // Token refresh
    autoRefresh: true,
    refreshEndpoint: '/csrf-token',
    
    // Custom validation
    validateToken: (token) => {
      return token && token.length === 32;
    },
    
    // Error handling
    onCSRFError: (error) => {
      console.error('CSRF validation failed:', error);
      // Refresh page to get new token
      window.location.reload();
    }
  }
});

// Laravel-style CSRF protection
const laravelClient = new ZuziaFetch({
  csrf: {
    enabled: true,
    metaTagName: 'csrf-token',
    headerName: 'X-CSRF-TOKEN'
  }
});

// Django-style CSRF protection
const djangoClient = new ZuziaFetch({
  csrf: {
    enabled: true,
    cookieName: 'csrftoken',
    headerName: 'X-CSRFToken'
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Certificate Pinning Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-6 h-6 text-orange-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Certificate Pinning</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Enhance security with SSL certificate pinning to prevent man-in-the-middle attacks.
            </p>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Certificate pinning is available in Node.js environments and requires careful configuration.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Pinning</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Config</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SSL Certificate Pinning</CardTitle>
                  <CardDescription>Pin certificates for enhanced security</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Basic certificate pinning
const client = new ZuziaFetch({
  ssl: {
    // Pin specific certificate
    cert: 'path/to/cert.pem',
    key: 'path/to/key.pem',
    
    // Pin certificate authority
    ca: 'path/to/ca.pem',
    
    // Reject unauthorized certificates
    rejectUnauthorized: true,
    
    // Pin public key (HPKP)
    pinPublicKey: [
      'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB='
    ]
  }
});

// Pin certificate fingerprint
const client2 = new ZuziaFetch({
  ssl: {
    pinFingerprint: [
      'AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD'
    ],
    fingerprintAlgorithm: 'sha256'
  }
});

// Multiple certificate pins (backup)
const client3 = new ZuziaFetch({
  ssl: {
    pins: [
      {
        host: 'api.example.com',
        fingerprints: [
          'primary-cert-fingerprint',
          'backup-cert-fingerprint'
        ]
      }
    ]
  }
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Certificate Management</CardTitle>
                  <CardDescription>Dynamic pinning and certificate validation</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Advanced certificate pinning
const client = new ZuziaFetch({
                  ssl: {
    // Dynamic certificate validation
    validateCertificate: (cert, hostname) => {
      // Custom certificate validation logic
      const expectedFingerprint = getCertificateFingerprint(hostname);
      const actualFingerprint = calculateFingerprint(cert);
      
      if (actualFingerprint !== expectedFingerprint) {
        throw new Error('Certificate pinning validation failed');
      }
      
      return true;
    },
    
    // Certificate chain validation
    validateChain: true,
    maxChainLength: 3,
    
    // OCSP stapling
    ocspStapling: true,
    
    // Certificate transparency
    requireCT: true,
    
    // Pin rotation support
    pinRotation: {
      enabled: true,
      checkInterval: 86400000, // 24 hours
      updateEndpoint: '/certificate-pins',
      
      onPinUpdate: (newPins) => {
        console.log('Certificate pins updated:', newPins);
      }
    },
    
    // Fallback behavior
    onPinFailure: 'reject', // 'reject', 'warn', 'ignore'
    
    // Emergency pin bypass
    emergencyBypass: {
      enabled: true,
      bypassCode: process.env.EMERGENCY_BYPASS_CODE
    }
  }
});

// Certificate monitoring
const client2 = new ZuziaFetch({
  ssl: {
    monitoring: {
      enabled: true,
      alertBeforeExpiry: 2592000000, // 30 days
      
      onCertificateExpiring: (cert, daysLeft) => {
        console.warn(\`Certificate expires in \${daysLeft} days\`);
        // Send alert to monitoring system
      },
      
      onCertificateChanged: (oldCert, newCert) => {
        console.log('Certificate changed, updating pins');
        // Update certificate pins
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

        {/* Additional Security Features */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Additional Security Features</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Comprehensive security features to protect your applications and data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Sanitization</CardTitle>
                <CardDescription>Automatic input sanitization and validation</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Enable request sanitization
const client = new ZuziaFetch({
  security: {
    sanitizeInput: true,
    
    // XSS protection
    xssProtection: {
      enabled: true,
      stripTags: true,
      allowedTags: ['b', 'i', 'em', 'strong'],
      encodeEntities: true
    },
    
    // SQL injection protection
    sqlInjectionProtection: true,
    
    // Input validation
    validateInput: {
      maxLength: 10000,
      allowedCharacters: /^[a-zA-Z0-9\s\-_.@]+$/,
      
      customValidator: (input) => {
        // Custom validation logic
        return isValidInput(input);
      }
    }
  }
});

// Content Security Policy
const client2 = new ZuziaFetch({
  security: {
    csp: {
      enabled: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'https:']
      }
    }
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Limiting & DDoS Protection</CardTitle>
                <CardDescription>Protect against abuse and attacks</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Security-focused rate limiting
const client = new ZuziaFetch({
  security: {
    rateLimit: {
      // Per-IP rate limiting
      perIP: {
        maxRequests: 100,
        window: 3600000, // 1 hour
        blockDuration: 3600000 // 1 hour block
      },
      
      // Per-user rate limiting
      perUser: {
        maxRequests: 1000,
        window: 3600000
      },
      
      // Adaptive rate limiting
      adaptive: {
        enabled: true,
        baseLimit: 100,
        increaseOnSuccess: 1.1,
        decreaseOnFailure: 0.9
      }
    },
    
    // DDoS protection
    ddosProtection: {
      enabled: true,
      threshold: 1000, // requests per minute
      
      // Challenge-response
      challengeResponse: {
        enabled: true,
        type: 'captcha', // 'captcha', 'proof-of-work'
        difficulty: 'medium'
      }
    },
    
    // Suspicious activity detection
    anomalyDetection: {
      enabled: true,
      patterns: [
        'rapid-requests',
        'unusual-user-agent',
        'suspicious-payload'
      ],
      
      onAnomalyDetected: (anomaly) => {
        console.warn('Suspicious activity detected:', anomaly);
        // Log to security monitoring system
      }
    }
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secure Headers</CardTitle>
                <CardDescription>Automatic security headers</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Automatic security headers
const client = new ZuziaFetch({
  security: {
    headers: {
      // HSTS (HTTP Strict Transport Security)
      hsts: {
        enabled: true,
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
      },
      
      // Content Security Policy
      csp: "default-src 'self'; script-src 'self' 'unsafe-inline'",
      
      // X-Frame-Options
      frameOptions: 'DENY',
      
      // X-Content-Type-Options
      contentTypeOptions: 'nosniff',
      
      // Referrer Policy
      referrerPolicy: 'strict-origin-when-cross-origin',
      
      // Permissions Policy
      permissionsPolicy: 'geolocation=(), microphone=(), camera=()'
    }
  }
});

// Custom security headers
client.interceptors.request.use(config => {
  config.headers['X-Request-ID'] = generateSecureId();
  config.headers['X-Client-Version'] = '1.0.0';
  config.headers['X-Timestamp'] = Date.now().toString();
  return config;
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Logging</CardTitle>
                <CardDescription>Security event logging and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Security audit logging
const client = new ZuziaFetch({
  security: {
    auditLog: {
      enabled: true,
      
      // Log security events
      events: [
        'authentication',
        'authorization',
        'csrf-failure',
        'rate-limit-exceeded',
        'suspicious-activity'
      ],
      
      // Log destination
      destination: 'console', // 'console', 'file', 'remote'
      
      // Remote logging
      remoteEndpoint: 'https://logs.example.com/security',
      
      // Log format
      format: 'json',
      
      // Include sensitive data
      includeSensitiveData: false,
      
      // Custom logger
      customLogger: (event) => {
        // Send to security monitoring system
        securityMonitor.log(event);
      }
    },
    
    // Request fingerprinting
    fingerprinting: {
      enabled: true,
      includeHeaders: true,
      includeUserAgent: true,
      includeIP: true,
      
      onSuspiciousFingerprint: (fingerprint) => {
        console.warn('Suspicious request fingerprint:', fingerprint);
      }
    }
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Security Best Practices</h2>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Complete Security Setup</CardTitle>
              <CardDescription>Production-ready security configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// Production security configuration
const secureClient = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  
  // Authentication
  auth: {
    storage: { type: 'memory' }, // Most secure
    autoRefresh: true,
    validateToken: true
  },
  
  // CSRF Protection
  csrf: {
    enabled: true,
    doubleSubmit: true,
    sameSite: 'strict'
  },
  
  // SSL/TLS
  ssl: {
    rejectUnauthorized: true,
    pinPublicKey: ['sha256/...'],
    validateCertificate: true
  },
  
  // Security headers
  security: {
    headers: {
      hsts: { enabled: true, maxAge: 31536000 },
      csp: "default-src 'self'",
      frameOptions: 'DENY'
    },
    
    // Input sanitization
    sanitizeInput: true,
    xssProtection: { enabled: true },
    
    // Rate limiting
    rateLimit: {
      perIP: { maxRequests: 100, window: 3600000 },
      adaptive: { enabled: true }
    },
    
    // Audit logging
    auditLog: {
      enabled: true,
      events: ['all'],
      destination: 'remote'
    }
  },
  
  // Request validation
  validateStatus: (status) => status < 400,
  timeout: 10000,
  
  // Secure defaults
  withCredentials: false, // Only when needed
  maxRedirects: 3
});

// Security checklist for production
const securityChecklist = {
  authentication: '✓ Token-based auth with auto-refresh',
  authorization: '✓ Role-based access control',
  encryption: '✓ HTTPS with certificate pinning',
  csrf: '✓ CSRF protection enabled',
  xss: '✓ Input sanitization and output encoding',
  headers: '✓ Security headers configured',
  rateLimit: '✓ Rate limiting implemented',
  logging: '✓ Security audit logging',
  monitoring: '✓ Anomaly detection enabled',
  updates: '✓ Regular security updates'
};`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Secure by design</h2>
            <p className="text-slate-600 dark:text-slate-300">
              You now have enterprise-grade security features at your disposal. Build applications that protect your
              users and data from modern threats.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Explore Developer Tools
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Security Checklist
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
