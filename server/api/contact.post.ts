import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event)
  const { name, email, message } = JSON.parse(reqBody)

  const transporter = nodemailer.createTransport({
    host: useRuntimeConfig().smtpHost,
    port: useRuntimeConfig().smtpPort,
    auth: {
      user: useRuntimeConfig().smtpUser,
      pass: useRuntimeConfig().smtpPass,
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
