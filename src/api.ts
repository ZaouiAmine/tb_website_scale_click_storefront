const API_BASE = import.meta.env.VITE_API_URL || 'https://upouh4n30.cloud.scaliny.com'

export async function fetchPage(shopId: string, productId: string) {
  const res = await fetch(`${API_BASE}/api/pages/get?shopId=${shopId}&productId=${productId}`)
  if (!res.ok) throw new Error('Page not found')
  return res.json()
}
