const apiKey = useRuntimeConfig().brevoApiKey

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event)

  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({...JSON.parse(reqBody), listIds: [5]}),
  }

  const { ok, body } = await fetch('https://api.brevo.com/v3/contacts', options)

  if (!ok)
    return new Response(body, { status: 500 })

  return new Response('OK', { status: 201 })
})
