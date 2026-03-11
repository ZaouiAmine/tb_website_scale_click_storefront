<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPage } from '../api'

const route = useRoute()
const page = ref<{ product?: { name?: string; price?: number; description?: string }; name?: string; price?: number; description?: string } | null>(null)
const loading = ref(true)
const error = ref('')

const shopId = computed(() => route.params.shop as string)
const productId = computed(() => route.params.product as string)

onMounted(async () => {
  try {
    page.value = await fetchPage(shopId.value, productId.value)
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="p-12 text-center">Loading...</div>
    <div v-else-if="error" class="p-12 text-center text-red-500">{{ error }}</div>
    <div v-else-if="page" class="max-w-2xl mx-auto p-8">
      <h1 class="text-3xl font-bold mb-4">{{ page.product?.name ?? page.name }}</h1>
      <p v-if="(page.product?.price ?? page.price) != null" class="text-2xl text-indigo-600 mb-4">{{ page.product?.price ?? page.price }} د.ج</p>
      <p v-if="page.product?.description ?? page.description" class="text-gray-600">{{ page.product?.description ?? page.description }}</p>
    </div>
    <div v-else class="p-12 text-center text-gray-500">Product not found</div>
  </div>
</template>
