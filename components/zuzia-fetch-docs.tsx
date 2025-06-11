"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Book,
  Zap,
  Shield,
  Wrench,
  Gauge,
  CheckCircle,
  AlertTriangle,
  FileText,
  Search,
  Github,
  Moon,
  Sun,
  ChevronDown,
  Copy,
  Play,
  Download,
  Star,
  Users,
  Activity,
  MemoryStickIcon as Memory,
  Network,
  Settings,
} from "lucide-react"

import { CoreFeaturesPage } from "./core-features-page"
import { AdvancedFeaturesPage } from "./advanced-features-page"
import { SecurityFeaturesPage } from "./security-features-page"
// Import the new page components
import { DeveloperToolsPage } from "./developer-tools-page"
import { PerformancePage } from "./performance-page"
import { BestPracticesPage } from "./best-practices-page"
import { TroubleshootingPage } from "./troubleshooting-page"
import { ApiReferencePage } from "./api-reference-page"

const navigationItems = [
  { title: "Getting Started", icon: Book, id: "getting-started" },
  { title: "Core Features", icon: Zap, id: "core-features" },
  { title: "Advanced Features", icon: Settings, id: "advanced-features" },
  { title: "Security Features", icon: Shield, id: "security" },
  { title: "Developer Tools", icon: Wrench, id: "developer-tools" },
  { title: "Performance", icon: Gauge, id: "performance" },
  { title: "Best Practices", icon: CheckCircle, id: "best-practices" },
  { title: "Troubleshooting", icon: AlertTriangle, id: "troubleshooting" },
  { title: "API Reference", icon: FileText, id: "api-reference" },
]

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

function AppSidebar({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
            <img src="/images/logo.png" alt="@ZuziaDev/Fetch Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-slate-100">@ZuziaDev/Fetch</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">HTTP Client Library</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 dark:text-slate-300">Documentation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    className="hover:bg-blue-50 dark:hover:bg-slate-800 data-[active=true]:bg-blue-100 dark:data-[active=true]:bg-slate-700"
                    onClick={() => setCurrentPage(item.id)}
                  >
                    <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-slate-900 dark:text-slate-100">{item.title}</span>
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

export function ZuziaFetchDocs() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("javascript")
  const [currentPage, setCurrentPage] = useState("home")

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
        <SidebarProvider>
          <AppSidebar setCurrentPage={setCurrentPage} />
          <SidebarInset>
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <div className="flex h-16 items-center gap-4 px-6">
                <SidebarTrigger className="text-slate-600 dark:text-slate-400" />
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">@ZuziaDev/Fetch</h1>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">v2.1.6</Badge>
                  </div>
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search documentation..."
                        className="pl-10 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {language === "javascript" ? "JavaScript" : "TypeScript"}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setLanguage("javascript")}>JavaScript</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage("typescript")}>TypeScript</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    <Moon className="w-4 h-4" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
              {currentPage === "home" && (
                <>
                  {/* Hero Section */}
                  <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 py-20">
                    <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
                    <div className="relative max-w-7xl mx-auto px-6">
                      <div className="text-center space-y-8">
                        <div className="space-y-4">
                          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100">
                            @ZuziaDev/Fetch
                            <span className="block text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              Modern HTTP Client
                            </span>
                          </h1>
                          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Powerful, feature-rich HTTP client with advanced capabilities for modern JavaScript
                            applications. Built for developers who demand performance, security, and simplicity.
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4 mr-2" />
                            Get Started
                          </Button>
                          <Button variant="outline" size="lg">
                            <Download className="w-4 h-4 mr-2" />
                            Install Now
                          </Button>
                        </div>
                        <div className="flex items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>2.1k stars</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-green-500" />
                            <span>50k+ downloads</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span>Active community</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Features Grid */}
                  <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                          Everything you need for HTTP requests
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                          Comprehensive features designed for modern web development
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          {
                            icon: Zap,
                            title: "Core Features",
                            description: "Promise-based API, interceptors, automatic transforms",
                            color: "text-yellow-500",
                          },
                          {
                            icon: Settings,
                            title: "Advanced Features",
                            description: "Retry logic, caching, request/response middleware",
                            color: "text-blue-500",
                          },
                          {
                            icon: Shield,
                            title: "Security Features",
                            description: "CSRF protection, XSS prevention, secure defaults",
                            color: "text-green-500",
                          },
                          {
                            icon: Wrench,
                            title: "Developer Tools",
                            description: "TypeScript support, debugging, testing utilities",
                            color: "text-purple-500",
                          },
                          {
                            icon: Gauge,
                            title: "Performance",
                            description: "Optimized for speed, memory efficient, lightweight",
                            color: "text-red-500",
                          },
                          {
                            icon: CheckCircle,
                            title: "Best Practices",
                            description: "Industry standards, proven patterns, documentation",
                            color: "text-emerald-500",
                          },
                          {
                            icon: AlertTriangle,
                            title: "Troubleshooting",
                            description: "Error handling, debugging guides, common solutions",
                            color: "text-orange-500",
                          },
                          {
                            icon: FileText,
                            title: "API Reference",
                            description: "Complete documentation, examples, interactive demos",
                            color: "text-indigo-500",
                          },
                        ].map((feature, index) => (
                          <Card
                            key={index}
                            className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
                          >
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
                    </div>
                  </section>

                  {/* Code Examples Section */}
                  <section className="py-20 px-6 bg-white dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Simple yet powerful</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                          Get started with just a few lines of code
                        </p>
                      </div>
                      <Tabs defaultValue="basic" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="basic">Basic Usage</TabsTrigger>
                          <TabsTrigger value="advanced">Advanced</TabsTrigger>
                          <TabsTrigger value="security">Security</TabsTrigger>
                          <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basic" className="space-y-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle>Installation</CardTitle>
                                <CardDescription>Get started with npm or yarn</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <CodeBlock language="bash">
                                  {`npm install @zuziadev/fetch

# or with yarn
yarn add @zuziadev/fetch`}
                                </CodeBlock>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader>
                                <CardTitle>Basic Setup</CardTitle>
                                <CardDescription>Initialize your HTTP client</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <CodeBlock>
                                  {`const { ZuziaFetch } = require('@zuziadev/fetch');

const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 5000
});`}
                                </CodeBlock>
                              </CardContent>
                            </Card>
                          </div>
                          <Card>
                            <CardHeader>
                              <CardTitle>Making Requests</CardTitle>
                              <CardDescription>Simple GET and POST examples</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <CodeBlock>
                                {`// GET request
const users = await api.get('/users');

// POST request with data
const newUser = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// With query parameters
const filteredUsers = await api.get('/users', {
  params: { page: 1, limit: 10 }
});`}
                              </CodeBlock>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="advanced" className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Advanced Configuration</CardTitle>
                              <CardDescription>Retry logic, caching, and interceptors</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <CodeBlock>
                                {`const { ZuziaFetch } = require('@zuziadev/fetch');

const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  retry: {
    attempts: 3,
    delay: 1000,
    exponentialBackoff: true
  },
  cache: {
    enabled: true,
    ttl: 300000 // 5 minutes
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${getToken()}\`;
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);`}
                              </CodeBlock>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="security" className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Security Features</CardTitle>
                              <CardDescription>Built-in protection and secure defaults</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <CodeBlock>
                                {`const { ZuziaFetch } = require('@zuziadev/fetch');

const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  // CSRF protection
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  
  // Request sanitization
  sanitize: true,
  
  // Secure defaults
  withCredentials: true,
  validateStatus: (status) => status < 400
});

// Token management
api.setAuthToken('your-jwt-token');

// Custom authentication
api.setAuth('username', 'password');`}
                              </CodeBlock>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="typescript" className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>TypeScript Support</CardTitle>
                              <CardDescription>Full type safety and IntelliSense</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <CodeBlock language="typescript">
                                {`interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

const api = new ZuziaFetch({
  baseURL: 'https://api.example.com'
});

// Typed responses
const users = await api.get<User[]>('/users');
const user = await api.post<User, CreateUserRequest>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Type-safe configuration
const config: ZuziaFetchConfig = {
  timeout: 5000,
  retry: { attempts: 3 }
};`}
                              </CodeBlock>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </section>

                  {/* Performance Benchmarks */}
                  <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                          Performance Benchmarks
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">Optimized for speed and efficiency</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Activity className="w-5 h-5 text-green-500" />
                              Request Speed
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span>@ZuziaDev/Fetch</span>
                                <span className="font-bold text-green-600">27ms</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full w-[100%]"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Axios</span>
                                <span className="font-bold text-blue-600">52ms</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-[75%]"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Fetch API</span>
                                <span className="font-bold text-purple-600">38ms</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full w-[95%]"></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Memory className="w-5 h-5 text-blue-500" />
                              Memory Usage
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">12KB</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Gzipped bundle size</div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Core</span>
                                  <span className="text-sm">8KB</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Features</span>
                                  <span className="text-sm">3KB</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Utils</span>
                                  <span className="text-sm">1KB</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Network className="w-5 h-5 text-purple-500" />
                              Network Efficiency
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">98%</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Success rate</div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Retry success</span>
                                  <span className="text-sm text-green-600">95%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Cache hits</span>
                                  <span className="text-sm text-blue-600">87%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Error recovery</span>
                                  <span className="text-sm text-purple-600">92%</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </section>

                  {/* Migration Guide */}
                  <section className="py-20 px-6 bg-white dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Migration Guide</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                          Easy migration from other HTTP clients
                        </p>
                      </div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Migrating from Axios</CardTitle>
                          <CardDescription>@ZuziaDev/Fetch provides a similar API with enhanced features</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Axios</h4>
                              <CodeBlock>
                                {`import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000
});

api.interceptors.request.use(config => {
  config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

const response = await api.get('/users');`}
                              </CodeBlock>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">@ZuziaDev/Fetch</h4>
                              <CodeBlock>
                                {`const { ZuziaFetch } = require('@zuziadev/fetch');

const api = new ZuziaFetch({
  baseURL: 'https://api.example.com',
  timeout: 5000
});

api.interceptors.request.use(config => {
  config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

const response = await api.get('/users');`}
                              </CodeBlock>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>
                </>
              )}
              {currentPage === "core-features" && <CoreFeaturesPage />}
              {currentPage === "advanced-features" && <AdvancedFeaturesPage />}
              {currentPage === "security" && <SecurityFeaturesPage />}
              {currentPage === "developer-tools" && <DeveloperToolsPage />}
              {currentPage === "performance" && <PerformancePage />}
              {currentPage === "best-practices" && <BestPracticesPage />}
              {currentPage === "troubleshooting" && <TroubleshootingPage />}
              {currentPage === "api-reference" && <ApiReferencePage />}

              {/* Footer */}
              <footer className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src="/images/logo.png"
                            alt="@ZuziaDev/Fetch Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="font-bold text-xl">@ZuziaDev/Fetch</span>
                      </div>
                      <p className="text-slate-400">Modern HTTP client for JavaScript applications</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Documentation</h3>
                      <ul className="space-y-2 text-slate-400">
                        <li>
                          <a href="#" className="hover:text-white">
                            Getting Started
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            API Reference
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            Examples
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            Migration Guide
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Community</h3>
                      <ul className="space-y-2 text-slate-400">
                        <li>
                          <a href="#" className="hover:text-white">
                            GitHub
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            Discord
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            Stack Overflow
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            Twitter
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Resources</h3>
                      <ul className="space-y-2 text-slate-400">
                        <li>
                          <a href="#" className="hover:text-white">
                            Changelog
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            Contributing
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            License
                          </a>
                        </li>
                        <li>
                          <a href="#" className="hover:text-white">
                            Security
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
                    <p>&copy; 2024 @ZuziaDev/Fetch. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
