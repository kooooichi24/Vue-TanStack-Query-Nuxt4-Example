import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, onMounted, onUnmounted } from 'vue'
import { DEFAULT_QUERIES_OPTIONS } from '~/plugins/vue-query'

// Function to get current second
function getCurrentSecondDigit(): number {
  return new Date().getSeconds() % 10
}

// Function to fetch individual post
async function getPost(id: number) {
  console.log(`🔄 Fetching post ${id} at ${new Date().toLocaleTimeString()}`)
  
  // Simulate actual API call
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch post ${id}`)
  }
  
  return response.json()
}

// Function to fetch posts list
async function listPosts() {
  console.log(`🔄 Fetching posts at ${new Date().toLocaleTimeString()}`)
  
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  return response.json()
}

// Composable to fetch post with current second
export function useReactiveCurrentSecondPost(currentSecond: Ref<number>) {
  const queryKey = computed(() => ['post', currentSecond.value.toString()])

  return useQuery({
    queryKey,
    queryFn: () => getPost(currentSecond.value),
    // Cache configuration
    ...DEFAULT_QUERIES_OPTIONS,
    staleTime: 1000 * 20, // Consider fresh for 20 seconds
    gcTime: 1000 * 60 * 5, // Keep cache for 5 minutes
    enabled: computed(() => currentSecond.value >= 0),
  })
}

// Composable to fetch posts list
export function usePosts() {
  const queryKey = computed(() => ['posts'])

  return useQuery({
    queryKey,
    queryFn: listPosts,
    ...DEFAULT_QUERIES_OPTIONS,
    staleTime: 1000 * 60, // Consider fresh for 1 minute
    gcTime: 1000 * 60 * 10, // Keep cache for 10 minutes
  })
}

// Function to manually invalidate cache
export function useCacheInvalidation() {
  const queryClient = useQueryClient()
  
  const invalidatePost = (id: number) => {
    queryClient.invalidateQueries({ queryKey: ['post', id] })
  }
  
  const invalidateAllPosts = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }
  
  const clearAllCache = () => {
    queryClient.clear()
  }
  
  return {
    invalidatePost,
    invalidateAllPosts,
    clearAllCache,
  }
} 

// Composable to update second in real-time
export function useCurrentSecondDigit() {
  const currentSecondDigit = ref(getCurrentSecondDigit())
  let intervalId: NodeJS.Timeout | null = null

  onMounted(() => {
    intervalId = setInterval(() => {
      currentSecondDigit.value = getCurrentSecondDigit()
    }, 1000) // Update every 1 second
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return currentSecondDigit
} 