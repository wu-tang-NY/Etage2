/**
 * EmailService - Client-side email sending service using Mailgun API
 */
class EmailService {
  constructor() {
    // Mailgun configuration will be set via init() method
    this.apiKey = null;
    this.domain = null;
    this.apiUrl = null;
  }

  /**
   * Initialize the service with configuration
   * Should be called from a Nuxt plugin or component
   * @param {Object} config - Configuration object
   * @param {string} config.apiKey - Mailgun API key
   * @param {string} config.domain - Mailgun domain
   */
  init({ apiKey, domain }) {
    this.apiKey = apiKey || "key-1a62b4a4982b7185d90632a29ca3b9d2";
    this.domain = domain || "mg.etage.com.ua";
    this.apiUrl = `https://api.mailgun.net/v3/${this.domain}/messages`;
  }

  /**
   * Send email using Mailgun API
   * @param {Object} options - Email options
   * @param {string} options.from - Sender email address
   * @param {string|Array} options.to - Recipient email address(es)
   * @param {string} options.subject - Email subject
   * @param {string} options.html - HTML email body
   * @param {string} [options.text] - Plain text email body (optional)
   * @returns {Promise} - Promise that resolves when email is sent
   */
  async sendEmail({ from, to, subject, html, text }) {
    if (!this.apiKey || !this.domain) {
      throw new Error(
        "EmailService not initialized. Call init() first or ensure runtime config is available."
      );
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append("from", from);

      // Handle multiple recipients
      if (Array.isArray(to)) {
        to.forEach((recipient) => formData.append("to", recipient));
      } else {
        formData.append("to", to);
      }

      formData.append("subject", subject);
      formData.append("html", html);

      if (text) {
        formData.append("text", text);
      }

      // Send request to Mailgun API
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`api:${this.apiKey}`)}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Mailgun API error: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("EmailService error:", error);
      throw error;
    }
  }

  /**
   * Send feedback email
   * @param {Object} data - Feedback data
   * @param {string} data.name - User name
   * @param {string} data.phone - User phone
   * @param {string} data.from - From location
   * @param {string} data.comment - Feedback comment
   * @returns {Promise}
   */
  async sendFeedback({ name, phone, from, comment }) {
    const domain = this.domain || "mg.etage.com.ua";
    return this.sendEmail({
      from: `${name} <mailgun@${domain}>`,
      to: "stoleurbike@gmail.com",
      subject: "Отзыв",
      html: `
        <h4>Отзыв</h4>
        <strong>Имя: </strong> ${name} <br />
        <strong>Телефон: </strong> ${phone} <br />
        <strong>Откуда: </strong> ${from} <br />
        <strong>Отзыв: </strong><br>
        <p>${comment}</p>
      `,
    });
  }

  /**
   * Send callback request email
   * @param {Object} data - Callback data
   * @param {string} data.name - User name
   * @param {string} data.phone - User phone
   * @returns {Promise}
   */
  async sendCallback({ name, phone }) {
    const domain = this.domain || "mg.etage.com.ua";
    return this.sendEmail({
      from: `${name} <mailgun@${domain}>`,
      to: "etage.pereezd@gmail.com",
      subject: "Перезвоните мне, пожалуйста",
      html: `
        <h4>Перезвоните мне, пожалуйста</h4>
        <strong>Имя: </strong> ${name} <br />
        <strong>Телефон: </strong> ${phone}
      `,
    });
  }

  /**
   * Send order request email
   * @param {Object} data - Order data
   * @param {string} data.name - User name
   * @param {string} data.phone - User phone
   * @param {string} data.from - From location
   * @param {string} data.to - To location
   * @param {string} data.workers - Number of workers
   * @param {string} data.type - Transport type
   * @param {string} data.date - Planned date
   * @param {string} data.comment - Additional comment
   * @returns {Promise}
   */
  async sendOrder({ name, phone, from, to, workers, type, date, comment }) {
    const domain = this.domain || "mg.etage.com.ua";
    return this.sendEmail({
      from: `${name} <mailgun@${domain}>`,
      to: "etage.pereezd@gmail.com",
      subject: "Заявка",
      html: `
        <h4>Заявка</h4>
        <strong>Имя: </strong> ${name} <br />
        <strong>Телефон: </strong> ${phone} <br />
        <strong>Откуда: </strong> ${from || "Не указано"} <br />
        <strong>Куда: </strong> ${to || "Не указано"} <br />
        <strong>Планируемая дата: </strong> ${date || "Не указано"} <br />
        <strong>Тип транспортировки: </strong> ${type || "Не указано"} <br />
        <strong>Количество грузчиков: </strong> ${
          workers || "Не указано"
        } <br />
        <strong>Комментарий: </strong><br>
        <p>${comment || "Нет комментария"}</p>
      `,
    });
  }
}

// Export singleton instance
export default new EmailService();
