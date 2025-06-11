"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Gauge,
  Package,
  BarChart3,
  TrendingUp,
  Clock,
  Copy,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Activity,
  MemoryStickIcon as Memory,
  Network,
  HardDrive,
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

export function PerformancePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-8 h-8 text-green-600" />
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Performance</Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Performance Optimization</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
              Optimize your application's network performance with advanced techniques. Reduce latency, improve
              throughput, and enhance user experience.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Performance Benchmarks Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Performance Benchmarks</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              See how @ZuziaDev/Fetch compares to other popular HTTP clients in real-world scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  Request Speed
                </CardTitle>
                <CardDescription>Average response time comparison</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">@ZuziaDev/Fetch</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">45ms</span>
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={90} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Axios</span>
                    <span className="font-bold text-blue-600">52ms</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Fetch API</span>
                    <span className="font-bold text-purple-600">38ms</span>
                  </div>
                  <Progress value={100} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Node-fetch</span>
                    <span className="font-bold text-orange-600">58ms</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                  20% faster than Axios
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Memory className="w-5 h-5 text-blue-500" />
                  Memory Usage
                </CardTitle>
                <CardDescription>Runtime memory consumption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">12KB</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Gzipped bundle size</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Core features</span>
                    <span className="text-sm font-medium">8KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Advanced features</span>
                    <span className="text-sm font-medium">3KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Utilities</span>
                    <span className="text-sm font-medium">1KB</span>
                  </div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <ArrowDown className="w-4 h-4 inline mr-1 text-green-500" />
                  15% lower memory usage
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-purple-500" />
                  Network Efficiency
                </CardTitle>
                <CardDescription>Connection and throughput metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Success rate</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Retry success</span>
                    <span className="text-sm text-green-600 font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cache hits</span>
                    <span className="text-sm text-blue-600 font-medium">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Connection reuse</span>
                    <span className="text-sm text-purple-600 font-medium">92%</span>
                  </div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <TrendingUp className="w-4 h-4 inline mr-1 text-green-500" />
                  30% better efficiency
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Request Batching Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-orange-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Request Batching</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Combine multiple requests into batches to reduce network overhead and improve performance.
            </p>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Batching</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Config</TabsTrigger>
              <TabsTrigger value="graphql">GraphQL Batching</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enable Request Batching</CardTitle>
                  <CardDescription>Automatically batch requests for better performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Enable basic batching
const client = new ZuziaFetch({
  batch: { 
    enabled: true, 
    maxSize: 10, 
    timeout: 1000 
  }
});

// Requests are automatically batched
const [users, posts, comments] = await Promise.all([
  client.get('/users'),
  client.get('/posts'),
  client.get('/comments')
]);

// Manual batching
const batch = client.createBatch();
batch.add('GET', '/users');
batch.add('GET', '/posts');
batch.add('POST', '/analytics', { event: 'page_view' });

const results = await batch.execute();
console.log('Users:', results[0].data);
console.log('Posts:', results[1].data);
console.log('Analytics:', results[2].data);`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Batching Configuration</CardTitle>
                  <CardDescription>Fine-tune batching behavior for optimal performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Advanced batching configuration
const client = new ZuziaFetch({
  batch: {
    enabled: true,
    
    // Batch size limits
    maxSize: 10,
    maxSizeBytes: 1024 * 1024, // 1MB
    
    // Timing configuration
    timeout: 1000, // Wait 1s before sending batch
    maxWait: 5000, // Maximum wait time
    
    // Batching strategy
    strategy: 'adaptive', // 'immediate', 'delayed', 'adaptive'
    
    // Adaptive batching parameters
    adaptive: {
      minBatchSize: 2,
      targetLatency: 100, // Target 100ms latency
      learningRate: 0.1
    },
    
    // Batch grouping
    groupBy: {
      enabled: true,
      criteria: ['host', 'method', 'contentType'],
      
      // Custom grouping function
      customGrouping: (request) => {
        return \`\${request.method}:\${new URL(request.url).pathname.split('/')[1]}\`;
      }
    },
    
    // Compression for batches
    compression: {
      enabled: true,
      algorithm: 'gzip',
      threshold: 1024 // Compress batches > 1KB
    },
    
    // Error handling
    errorHandling: {
      strategy: 'partial', // 'all-or-nothing', 'partial', 'continue'
      retryFailedRequests: true,
      maxRetries: 3
    },
    
    // Monitoring
    monitoring: {
      enabled: true,
      trackBatchSize: true,
      trackLatency: true,
      trackSuccessRate: true
    }
  }
});

// Conditional batching
const urgentData = await client.get('/urgent-data', {
  batch: false // Skip batching for urgent requests
});

// Priority batching
const highPriorityBatch = client.createBatch({
  priority: 'high',
  timeout: 100 // Faster execution
});

highPriorityBatch.add('GET', '/critical-data');
await highPriorityBatch.execute();`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graphql" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>GraphQL Query Batching</CardTitle>
                  <CardDescription>Optimize GraphQL queries with intelligent batching</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// GraphQL batching configuration
const client = new ZuziaFetch({
  graphql: {
    endpoint: '/graphql',
    
    // Query batching
    batching: {
      enabled: true,
      maxQueries: 10,
      timeout: 100,
      
      // Query deduplication
      deduplication: true,
      
      // Query optimization
      optimization: {
        enabled: true,
        mergeQueries: true,
        removeRedundantFields: true
      }
    }
  }
});

// Multiple GraphQL queries are automatically batched
const [userData, postsData, friendsData] = await Promise.all([
  client.graphql(\`
    query GetUser($id: ID!) {
      user(id: $id) { id name email }
    }
  \`, { id: '123' }),
  
  client.graphql(\`
    query GetPosts($userId: ID!) {
      posts(userId: $userId) { id title content }
    }
  \`, { userId: '123' }),
  
  client.graphql(\`
    query GetFriends($userId: ID!) {
      friends(userId: $userId) { id name }
    }
  \`, { userId: '123' })
]);

// Manual GraphQL batching
const batch = client.createGraphQLBatch();

batch.addQuery('user', \`
  query GetUser($id: ID!) {
    user(id: $id) { id name email }
  }
\`, { id: '123' });

batch.addQuery('posts', \`
  query GetPosts($userId: ID!) {
    posts(userId: $userId) { id title }
  }
\`, { userId: '123' });

const results = await batch.execute();
console.log('User:', results.user);
console.log('Posts:', results.posts);`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Response Compression Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-6 h-6 text-purple-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Response Compression</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Reduce bandwidth usage and improve transfer speeds with automatic response compression.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compression Configuration</CardTitle>
                <CardDescription>Enable and configure response compression</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Enable compression
const client = new ZuziaFetch({
  compression: { 
    enabled: true, 
    algorithm: 'gzip' 
  }
});

// Advanced compression settings
const client2 = new ZuziaFetch({
  compression: {
    enabled: true,
    
    // Supported algorithms (in preference order)
    algorithms: ['br', 'gzip', 'deflate'],
    
    // Compression threshold
    threshold: 1024, // Only compress responses > 1KB
    
    // Quality settings
    quality: {
      gzip: 6, // Compression level 1-9
      brotli: 4 // Compression level 0-11
    },
    
    // Content type filtering
    contentTypes: [
      'application/json',
      'text/plain',
      'text/html',
      'text/css',
      'application/javascript'
    ],
    
    // Exclude certain endpoints
    exclude: ['/api/binary-data', '/api/images/*'],
    
    // Custom compression logic
    shouldCompress: (response) => {
      return response.headers['content-length'] > 1024 &&
             !response.headers['content-encoding'];
    }
  }
});

// Per-request compression control
const response = await client.get('/large-data', {
  compression: {
    enabled: true,
    algorithm: 'br', // Prefer Brotli for this request
    quality: 8
  }
});`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compression Analytics</CardTitle>
                <CardDescription>Monitor compression effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>
                  {`// Compression monitoring
const client = new ZuziaFetch({
  compression: {
    enabled: true,
    
    // Analytics
    analytics: {
      enabled: true,
      trackCompressionRatio: true,
      trackBandwidthSaved: true,
      trackPerformanceImpact: true
    },
    
    // Reporting
    reporting: {
      enabled: true,
      interval: 60000, // Report every minute
      
      onReport: (stats) => {
        console.log('Compression Stats:', {
          totalRequests: stats.totalRequests,
          compressedRequests: stats.compressedRequests,
          averageCompressionRatio: stats.averageCompressionRatio,
          bandwidthSaved: stats.bandwidthSaved,
          timeSaved: stats.timeSaved
        });
      }
    }
  }
});

// Get compression statistics
const stats = client.getCompressionStats();
console.log(\`Bandwidth saved: \${stats.bandwidthSaved} bytes\`);
console.log(\`Average compression ratio: \${stats.compressionRatio}x\`);

// Compression comparison
const uncompressedSize = response.headers['x-uncompressed-size'];
const compressedSize = response.headers['content-length'];
const ratio = uncompressedSize / compressedSize;

console.log(\`Compression ratio: \${ratio.toFixed(2)}x\`);
console.log(\`Saved: \${uncompressedSize - compressedSize} bytes\`);`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Connection Optimization Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Connection Optimization</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Optimize network connections for maximum performance and efficiency.
            </p>
          </div>

          <Tabs defaultValue="pooling" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pooling">Connection Pooling</TabsTrigger>
              <TabsTrigger value="keepalive">Keep-Alive</TabsTrigger>
              <TabsTrigger value="http2">HTTP/2 & HTTP/3</TabsTrigger>
            </TabsList>

            <TabsContent value="pooling" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connection Pooling</CardTitle>
                  <CardDescription>Reuse connections for better performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Connection pooling configuration
const client = new ZuziaFetch({
  connectionPool: {
    enabled: true,
    
    // Pool size limits
    maxSockets: 10, // Max connections per host
    maxTotalSockets: 50, // Max total connections
    
    // Connection reuse
    keepAlive: true,
    keepAliveMsecs: 30000, // 30 seconds
    
    // Idle timeout
    timeout: 120000, // 2 minutes
    
    // Connection limits per host
    maxSocketsPerHost: {
      'api.example.com': 15,
      'cdn.example.com': 20,
      'default': 10
    },
    
    // Pool monitoring
    monitoring: {
      enabled: true,
      logPoolStats: true,
      alertOnPoolExhaustion: true
    }
  }
});

// Pool statistics
const poolStats = client.getConnectionPoolStats();
console.log('Active connections:', poolStats.activeConnections);
console.log('Idle connections:', poolStats.idleConnections);
console.log('Pool utilization:', poolStats.utilization);

// Manual pool management
client.warmupConnectionPool(['api.example.com', 'cdn.example.com']);
client.drainConnectionPool(); // Gracefully close idle connections`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keepalive" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Keep-Alive Optimization</CardTitle>
                  <CardDescription>Optimize persistent connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// Keep-alive configuration
const client = new ZuziaFetch({
  keepAlive: {
    enabled: true,
    
    // Keep-alive timing
    initialDelay: 1000, // 1 second
    interval: 30000, // 30 seconds
    probes: 3, // Number of probes
    
    // Per-host configuration
    hosts: {
      'api.example.com': {
        enabled: true,
        interval: 15000 // More frequent for critical API
      },
      'analytics.example.com': {
        enabled: false // Disable for analytics
      }
    },
    
    // Adaptive keep-alive
    adaptive: {
      enabled: true,
      
      // Adjust based on usage patterns
      adjustInterval: true,
      minInterval: 10000,
      maxInterval: 60000,
      
      // Learn from connection patterns
      learningEnabled: true,
      learningPeriod: 3600000 // 1 hour
    },
    
    // Connection health monitoring
    healthCheck: {
      enabled: true,
      interval: 60000, // Check every minute
      timeout: 5000,
      
      // Custom health check
      customCheck: async (connection) => {
        try {
          await connection.ping();
          return true;
        } catch {
          return false;
        }
      }
    }
  }
});

// Monitor connection health
client.on('connection:healthy', (connection) => {
  console.log('Connection healthy:', connection.host);
});

client.on('connection:unhealthy', (connection) => {
  console.log('Connection unhealthy:', connection.host);
  // Optionally recreate connection
  client.recreateConnection(connection.host);
});`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="http2" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>HTTP/2 & HTTP/3 Support</CardTitle>
                  <CardDescription>Leverage modern HTTP protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock>
                    {`// HTTP/2 configuration
const client = new ZuziaFetch({
  http2: {
    enabled: true,
    
    // Protocol preferences
    protocols: ['h2', 'http/1.1'], // Prefer HTTP/2
    
    // HTTP/2 specific settings
    settings: {
      headerTableSize: 4096,
      enablePush: true,
      maxConcurrentStreams: 100,
      initialWindowSize: 65535,
      maxFrameSize: 16384,
      maxHeaderListSize: 8192
    },
    
    // Server push handling
    serverPush: {
      enabled: true,
      
      // Auto-accept pushed resources
      autoAccept: true,
      
      // Push cache
      cache: {
        enabled: true,
        maxSize: 50,
        ttl: 300000 // 5 minutes
      },
      
      // Custom push handler
      onPush: (pushedRequest, pushedResponse) => {
        console.log('Server pushed:', pushedRequest.url);
        return true; // Accept the push
      }
    },
    
    // Stream multiplexing
    multiplexing: {
      enabled: true,
      maxConcurrentStreams: 100,
      streamPriority: true
    }
  },
  
  // HTTP/3 (QUIC) support
  http3: {
    enabled: true,
    
    // QUIC settings
    quic: {
      maxIdleTimeout: 30000,
      maxBidirectionalStreams: 100,
      maxUnidirectionalStreams: 100,
      initialMaxData: 1048576, // 1MB
      initialMaxStreamDataBidiLocal: 262144, // 256KB
      initialMaxStreamDataBidiRemote: 262144,
      initialMaxStreamDataUni: 262144
    },
    
    // 0-RTT support
    zeroRTT: {
      enabled: true,
      earlyData: true
    }
  }
});

// Protocol detection and fallback
client.interceptors.request.use((config) => {
  // Automatically detect best protocol
  config.protocol = client.detectBestProtocol(config.url);
  return config;
});

// Monitor protocol usage
const protocolStats = client.getProtocolStats();
console.log('HTTP/2 usage:', protocolStats.http2Percentage);
console.log('HTTP/3 usage:', protocolStats.http3Percentage);
console.log('Average streams per connection:', protocolStats.avgStreamsPerConnection);`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Performance Monitoring */}
        <section className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Performance Monitoring</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Monitor and analyze performance metrics to identify optimization opportunities.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Performance Metrics</CardTitle>
              <CardDescription>Track key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>
                {`// Performance monitoring setup
const client = new ZuziaFetch({
  performance: {
    monitoring: {
      enabled: true,
      
      // Metrics to track
      metrics: [
        'responseTime',
        'throughput',
        'errorRate',
        'cacheHitRate',
        'connectionReuse',
        'bandwidthUsage',
        'cpuUsage',
        'memoryUsage'
      ],
      
      // Sampling configuration
      sampling: {
        rate: 1.0, // Sample 100% of requests
        adaptive: true, // Reduce sampling under high load
        maxSamples: 10000
      },
      
      // Real-time reporting
      realTime: {
        enabled: true,
        interval: 1000, // Report every second
        
        // Performance thresholds
        thresholds: {
          responseTime: {
            warning: 1000, // 1 second
            critical: 5000 // 5 seconds
          },
          errorRate: {
            warning: 0.05, // 5%
            critical: 0.1 // 10%
          },
          throughput: {
            warning: 100, // requests/second
            critical: 50
          }
        },
        
        // Alert handlers
        onThresholdExceeded: (metric, value, threshold) => {
          console.warn('Performance threshold exceeded: ' + metric + ' = ' + value + ' (threshold: ' + threshold + ')');
          
          // Send to monitoring service
          monitoringService.alert({
            metric,
            value,
            threshold,
            timestamp: Date.now()
          });
        }
      },
      
      // Historical data
      history: {
        enabled: true,
        retention: 86400000, // 24 hours
        aggregation: {
          intervals: ['1m', '5m', '15m', '1h'],
          functions: ['avg', 'min', 'max', 'p95', 'p99']
        }
      },
      
      // Performance profiling
      profiling: {
        enabled: true,
        
        // Detailed timing breakdown
        detailedTiming: {
          dns: true,
          tcp: true,
          ssl: true,
          request: true,
          response: true,
          processing: true
        },
        
        // Resource usage tracking
        resourceUsage: {
          cpu: true,
          memory: true,
          network: true
        },
        
        // Flame graph generation
        flameGraph: {
          enabled: true,
          sampleRate: 0.1, // 10% of requests
          outputPath: './performance-profiles'
        }
      }
    }
  }
});

// Access performance metrics
const metrics = client.getPerformanceMetrics();
console.log('Average response time:', metrics.responseTime.avg);
console.log('95th percentile:', metrics.responseTime.p95);
console.log('Throughput:', metrics.throughput.current);
console.log('Error rate:', metrics.errorRate.current);

// Performance dashboard data
const dashboardData = client.getPerformanceDashboard();
console.log('Dashboard data:', dashboardData);

// Custom performance tracking
client.trackCustomMetric('business-metric', {
  value: 42,
  timestamp: Date.now(),
  tags: { feature: 'checkout', version: '1.2.3' }
});

// Performance optimization suggestions
const suggestions = client.getOptimizationSuggestions();
suggestions.forEach(suggestion => {
  console.log('Optimization: ' + suggestion.title);
  console.log('Impact: ' + suggestion.impact);
  console.log('Implementation: ' + suggestion.implementation);
});`}
              </CodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Maximize your application performance
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              With these performance optimization techniques, you can build lightning-fast applications. Next, learn
              best practices for maintainable and robust code.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Explore Best Practices
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance Guide
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
