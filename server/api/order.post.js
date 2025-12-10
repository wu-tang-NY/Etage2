import formData from 'form-data'
import pkg from 'mailgun.js'
const { Mailgun } = pkg

export default defineEventHandler(async (event) => {
  const { name, phone, from, to, workers, type, date, comment } = await readBody(event)
  const config = useRuntimeConfig()
  const apiKey = config.mailgunApiKey
  const domain = config.mailgunDomain

  const mailgun = new Mailgun(formData)
  const mg = mailgun.client({ username: 'api', key: apiKey })

  try {
    await mg.messages.create(domain, {
      from: `${name} <mailgun@${domain}>`,
      to: 'etage.pereezd@gmail.com',
      subject: 'Заявка',
      html: `
        <h4> Заявка</h4>
        <strong>Имя: </strong> ${name} <br />
        <strong>Телефон: </strong> ${phone}
        <strong>Откуда: </strong> ${from} <br />
        <strong>Куда: </strong> ${to} <br />
        <strong>Планируемая дата: </strong> ${date}
        <strong>Тип транспортировки: </strong> ${type} <br />
        <strong>Количество грузчиков: </strong> ${workers} <br />
        <strong>Комментарий: </strong><br>
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

