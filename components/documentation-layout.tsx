"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Book,
  Lightbulb,
  Download,
  Play,
  Zap,
  Shield,
  Wrench,
  Gauge,
  CheckCircle,
  AlertTriangle,
  Search,
  ChevronDown,
  Copy,
  ExternalLink,
} from "lucide-react"

const navigationItems = [
  { title: "Introduction", icon: Book, id: "introduction" },
  { title: "Basic Concepts", icon: Lightbulb, id: "basic-concepts" },
  { title: "Installation and Configuration", icon: Download, id: "installation" },
  { title: "Basic Usage", icon: Play, id: "basic-usage" },
  { title: "Advanced Features", icon: Zap, id: "advanced-features" },
  { title: "Security Features", icon: Shield, id: "security" },
  { title: "Developer Tools", icon: Wrench, id: "developer-tools" },
  { title: "Performance Optimization", icon: Gauge, id: "performance" },
  { title: "Best Practices", icon: CheckCircle, id: "best-practices" },
  { title: "Troubleshooting", icon: AlertTriangle, id: "troubleshooting" },
]

function AppSidebar() {
  return (
    <Sidebar className="border-r border-purple-200 dark:border-purple-800">
      <SidebarHeader className="border-b border-purple-200 dark:border-purple-800 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <div>
            <h2 className="font-semibold text-purple-900 dark:text-purple-100">@ZuziaDev/Fetch</h2>
            <p className="text-xs text-purple-600 dark:text-purple-400">HTTP Client Library</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-700 dark:text-purple-300">Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton className="hover:bg-purple-50 dark:hover:bg-purple-900/50 data-[active=true]:bg-purple-100 dark:data-[active=true]:bg-purple-900">
                    <item.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-purple-900 dark:text-purple-100">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function CodeBlock({ children, language = "javascript" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-purple-900 dark:bg-purple-950 px-4 py-2 rounded-t-lg">
        <span className="text-xs font-medium text-purple-200">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 px-2 text-purple-200 hover:text-white hover:bg-purple-800"
        >
          <Copy className="w-3 h-3" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="bg-purple-950 dark:bg-black p-4 rounded-b-lg overflow-x-auto">
        <code className="text-purple-100 text-sm font-mono">{children}</code>
      </pre>
    </div>
  )
}

export function DocumentationLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Fixed Header */}
          <header className="sticky top-0 z-50 w-full border-b border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-purple-950/80 backdrop-blur-sm">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-purple-600 dark:text-purple-400" />
              <div className="flex-1 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-purple-900 dark:text-purple-100">@ZuziaDev/Fetch</h1>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                  >
                    v2.1.0
                  </Badge>
                </div>
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <Input
                      placeholder="Search documentation..."
                      className="pl-10 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400"
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-8">
            {/* Introduction Section */}
            <section id="introduction" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">Introduction</h2>
                <p className="text-lg text-purple-700 dark:text-purple-300">
                  @ZuziaDev/Fetch is a modern, lightweight HTTP client library for JavaScript that provides a clean and
                  intuitive API for making HTTP requests.
                </p>
              </div>

              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-purple-900 dark:text-purple-100">Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-purple-800 dark:text-purple-200">Promise-based API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-purple-800 dark:text-purple-200">Request/Response interceptors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-purple-800 dark:text-purple-200">
                        Automatic request/response transforms
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-purple-800 dark:text-purple-200">Built-in retry mechanism</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Installation Section */}
            <section id="installation" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  Installation and Configuration
                </h2>
                <p className="text-purple-700 dark:text-purple-300">
                  Get started with @ZuziaDev/Fetch in your project with these simple installation steps.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-purple-900 dark:text-purple-100">NPM Installation</CardTitle>
                    <CardDescription>Install via npm package manager</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock language="bash">npm install zuzia-fetch</CodeBlock>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-purple-900 dark:text-purple-100">Basic Setup</CardTitle>
                    <CardDescription>Initialize @ZuziaDev/Fetch in your application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock>{`import { ZuziaFetch } from 'zuzia-fetch';

// Create a new instance
const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});`}</CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Basic Usage Section */}
            <section id="basic-usage" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">Basic Usage</h2>
                <p className="text-purple-700 dark:text-purple-300">
                  Learn the fundamental operations with @ZuziaDev/Fetch for common HTTP methods.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-purple-900 dark:text-purple-100">GET Request</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock>{`// Simple GET request
const response = await api.get('/users');
console.log(response.data);

// GET with query parameters
const users = await api.get('/users', {
  params: { page: 1, limit: 10 }
});`}</CodeBlock>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-purple-900 dark:text-purple-100">POST Request</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock>{`// POST with JSON data
const newUser = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// POST with custom headers
const response = await api.post('/users', data, {
  headers: { 'Authorization': 'Bearer token' }
});`}</CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Advanced Features Section */}
            <section id="advanced-features" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">Advanced Features</h2>
                <p className="text-purple-700 dark:text-purple-300">
                  Explore powerful features for complex use cases and enhanced functionality.
                </p>
              </div>

              <div className="space-y-4">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Card className="border-purple-200 dark:border-purple-800 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-purple-900 dark:text-purple-100">Retry Configuration</CardTitle>
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                              Advanced
                            </Badge>
                          </div>
                          <ChevronDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <CardDescription>Configure automatic retry behavior for failed requests</CardDescription>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="border-purple-200 dark:border-purple-800 mt-2">
                      <CardContent className="pt-6">
                        <CodeBlock>{`// Configure retry behavior
const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  retry: {
    attempts: 3,
    delay: 1000,
    exponentialBackoff: true,
    retryCondition: (error) => {
      return error.response?.status >= 500;
    }
  }
});

// Override retry for specific requests
const response = await api.get('/users', {
  retry: { attempts: 5, delay: 2000 }
});`}</CodeBlock>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Card className="border-purple-200 dark:border-purple-800 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-purple-900 dark:text-purple-100">Caching System</CardTitle>
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              Performance
                            </Badge>
                          </div>
                          <ChevronDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <CardDescription>Implement intelligent caching for improved performance</CardDescription>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="border-purple-200 dark:border-purple-800 mt-2">
                      <CardContent className="pt-6">
                        <CodeBlock>{`// Enable caching
const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
    storage: 'memory' // or 'localStorage'
  }
});

// Cache specific requests
const users = await api.get('/users', {
  cache: { ttl: 600000 } // 10 minutes
});

// Bypass cache
const freshData = await api.get('/users', {
  cache: false
});`}</CodeBlock>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Card className="border-purple-200 dark:border-purple-800 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-purple-900 dark:text-purple-100">Proxy Configuration</CardTitle>
                            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                              Network
                            </Badge>
                          </div>
                          <ChevronDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <CardDescription>Configure proxy settings for network requests</CardDescription>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="border-purple-200 dark:border-purple-800 mt-2">
                      <CardContent className="pt-6">
                        <CodeBlock>{`// Configure proxy settings
const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  proxy: {
    host: 'proxy.company.com',
    port: 8080,
    auth: {
      username: 'user',
      password: 'pass'
    }
  }
});

// Environment-based proxy
const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  proxy: process.env.NODE_ENV === 'development' ? {
    host: 'localhost',
    port: 3128
  } : false
});`}</CodeBlock>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </section>

            {/* Security Features Section */}
            <section id="security" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">Security Features</h2>
                <p className="text-purple-700 dark:text-purple-300">
                  Built-in security features to protect your applications and data.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                      <Shield className="w-5 h-5" />
                      Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock>{`// Bearer token authentication
api.setAuthToken('your-jwt-token');

// Basic authentication
api.setAuth('username', 'password');

// Custom authentication
api.interceptors.request.use((config) => {
  config.headers.Authorization = \`Custom \${getToken()}\`;
  return config;
});`}</CodeBlock>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                      <Shield className="w-5 h-5" />
                      Request Validation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock>{`// Input sanitization
const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  sanitize: true,
  validateStatus: (status) => status < 400
});

// CSRF protection
api.defaults.headers.common['X-CSRF-Token'] = 
  document.querySelector('meta[name="csrf-token"]')?.content;`}</CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
