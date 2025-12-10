import formData from 'form-data'
import pkg from 'mailgun.js'
const { Mailgun } = pkg

export default defineEventHandler(async (event) => {
  const { name, phone, from, comment } = await readBody(event)
  const config = useRuntimeConfig()
  const apiKey = config.mailgunApiKey
  const domain = config.mailgunDomain

  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({ username: 'api', key: apiKey })

  try {
    await mg.messages.create(domain, {
      from: `${name} <mailgun@${domain}>`,
      to: 'iodessa557@gmail.com',
      subject: 'Отзыв',
      html: `
        <h4>Отзыв</h4>
        <strong>Имя: </strong> ${name} <br />
        <strong>Телефон: </strong> ${phone}
        <strong>Откуда: </strong> ${from} <br />
        <strong>Отзыв: </strong><br>
        <p>${comment}</p>
      `
    })
  } catch (e) {
    console.error('Mailgun error:', e)
    throw createError({
      statusCode: 500,
      message: 'Failed to send email'
    })
  }

  return 'OK'
})

