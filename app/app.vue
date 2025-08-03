<template>
  <div>
    <h1>@tanstack/vue-query Cache Learning</h1>
    
    <!-- Current second display -->
    <div>
      <h2>Current Second: {{ currentSecondDigit }}</h2>
      <p>Fetch post with this second number (updates every second)</p>
      <p>🔄 Real-time update: {{ new Date().toLocaleTimeString() }}</p>
    </div>

    <div>
      <h2>🎯 Cache Observation Guide</h2>
        
      <div>
        <div>
          <h3>What to observe:</h3>
          <ul>
            <li>• <strong>Same second:</strong> Cache hit - data loads instantly</li>
            <li>• <strong>Different second:</strong> Cache miss - new API call</li>
            <li>• <strong>20 seconds later:</strong> Data becomes stale, refetch occurs</li>
            <li>• <strong>Cache status:</strong> Watch the status indicator above</li>
          </ul>
        </div>
        
        <div>
          <h3>Current behavior:</h3>
          <p>Every second, the query key changes: ['post', {{ currentSecondDigit }}]</p>
          <p>This means a new cache entry is created for each second.</p>
        </div>
      </div>
    </div>

    <!-- Post for current second -->
    <div>
      <h2>Post for Current Second (ID: {{ currentSecondDigit }})</h2>
      
      <div v-if="currentPostQuery.isPending">
        ⏳ Loading...
      </div>
      
      <div v-else-if="currentPostQuery.isError">
        ❌ Error: {{ currentPostQuery.error?.message }}
      </div>
      
      <div v-else-if="currentPostQuery.data">
        <div>
          <h3>{{ currentPostQuery.data.title }}</h3>
          <p>{{ currentPostQuery.data.body }}</p>
          <p>Post ID: {{ currentPostQuery.data.id }}</p>
        </div>
      </div>
      
      <div>
        <p>Cache Status: {{ currentPostQuery.isFetching ? '🔄 Refetching' : '✅ Cached' }}</p>
        <p>Last Updated: {{ currentPostQuery.dataUpdatedAt ? new Date(currentPostQuery.dataUpdatedAt).toLocaleTimeString() : 'None' }}</p>
      </div>
    </div>

    <!-- Posts list -->
    <div>
      <h2>Posts List</h2>
      
      <div v-if="postsQuery.isPending">
        ⏳ Loading...
      </div>
      
      <div v-else-if="postsQuery.isError">
        ❌ Error: {{ postsQuery.error?.message }}
      </div>
      
      <div v-else-if="postsQuery.data">
        <div v-for="post in postsQuery.data.slice(0, 5)" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>

    <!-- Cache operation buttons -->
    <div>
      <h2>Cache Operations</h2>
      
      <div>
        <button @click="invalidateCurrentPost">
          Invalidate Current Post Cache
        </button>
        
        <button @click="invalidateAllPosts">
          Invalidate All Posts Cache
        </button>
        
        <button @click="clearAllCache">
          Clear All Cache
        </button>
      </div>
    </div>

    <!-- Cache information -->
    <div>
      <h2>Cache Information</h2>
      
      <div>
        <p><strong>Current Second Post:</strong></p>
        <ul>
          <li>• staleTime: 20 seconds (Consider fresh for 20 seconds)</li>
          <li>• gcTime: 5 minutes (Keep cache for 5 minutes)</li>
          <li>• refetchOnWindowFocus: false</li>
          <li>• refetchOnMount: false</li>
        </ul>
        
        <p><strong>Posts List:</strong></p>
        <ul>
          <li>• staleTime: 1 minute (Consider fresh for 1 minute)</li>
          <li>• gcTime: 10 minutes (Keep cache for 10 minutes)</li>
        </ul>
        
        <p>
          💡 <strong>Learning Points:</strong><br>
          • When accessing the same second again, data is returned from cache<br>
          • After 20 seconds, data is considered "stale" and refetch occurs<br>
          • Cache can be manually cleared using invalidation buttons
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  useReactiveCurrentSecondPost, 
  usePosts, 
  useCacheInvalidation,
  useCurrentSecondDigit 
} from '~/composables/usePosts'

// Get current second
const currentSecondDigit = useCurrentSecondDigit()

// Fetch post with current second (with cache)
const currentPostQuery = useReactiveCurrentSecondPost(currentSecondDigit)

// Fetch posts list (with cache)
const postsQuery = usePosts()

// Cache operation functions
const { invalidatePost, invalidateAllPosts: invalidateAllPostsFn, clearAllCache: clearAllCacheFn } = useCacheInvalidation()

// Invalidate current post cache
const invalidateCurrentPost = () => {
  invalidatePost(currentSecondDigit.value)
}

// Invalidate all posts cache
const invalidateAllPosts = () => {
  invalidateAllPostsFn()
}

// Clear all cache
const clearAllCache = () => {
  clearAllCacheFn()
}
</script>
