import emailService from '@/utils/emailService'

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize email service with runtime config
  const config = useRuntimeConfig()
  emailService.init({
    apiKey: config.public.mailgunApiKey,
    domain: config.public.mailgunDomain
  })

  // Make emailService available globally
  return {
    provide: {
      emailService
    }
  }
})

