import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event)
  const { name, email, message } = JSON.parse(reqBody)

  const runtimeConfig = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    // @ts-expect-error - TS doesn't know about Cloudflare Workers runtime config
    host: runtimeConfig.smtp.host,
    port: runtimeConfig.smtp.port,
    auth: {
      user: runtimeConfig.smtp.user,
      pass: runtimeConfig.smtp.pass,
    },
  })

  const mailOptions = {
    from: 'Shaoula <mail@shaoula.com>',
    replyTo: email,
    to: useRuntimeConfig().contactEmail,
    subject: `${name} Got In Touch Via Website`,
    text: message,
    html:
    `<!DOCTYPE html>
    <html>
        <body>
            <h1>${name} Got in tocuh via website</h1>
            <p>${message}</p>
        </body>
    </html>`,
    envelope: {
      from: 'Shaoula <mail@shaoula.com>',
      to: useRuntimeConfig().contactEmail,
      replyTo: email,
    },
  }

  transporter.sendMail(mailOptions, (error: any) => {
    if (error)
      return new Response(error.toString(), { status: 500 })
    else
      return new Response('Message sent successfully', { status: 200 })
  })
})
