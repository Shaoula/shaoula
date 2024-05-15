const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event)

  const options = {
    method: 'POST' as const,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': runtimeConfig.brevo.apiKey,
    },
    body: JSON.stringify({ ...JSON.parse(reqBody), listIds: [5] }),
  }

  const data = await $fetch('https://api.brevo.com/v3/contacts', options)

  if (!data)
    return new Response('Failed to subscribe', { status: 500 })

  return new Response('OK', { status: 201 })
})
