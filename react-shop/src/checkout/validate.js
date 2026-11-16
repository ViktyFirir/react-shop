export function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  const phone = values.phone.trim()
  const digitsCount = phone.replace(/\D/g, '').length

  if (!/^[\d\s+-]+$/.test(phone) || digitsCount < 7 || digitsCount > 15) {
    errors.phone = 'Use digits, spaces, + and -, from 7 to 15 digits'
  }

  const email = values.email.trim()
  const atIndex = email.indexOf('@')

  if (atIndex === -1 || email.indexOf('.', atIndex + 1) === -1) {
    errors.email = 'Email must contain @ and a dot after it'
  }

  if (values.address.trim().length < 10) {
    errors.address = 'Address must be at least 10 characters'
  }

  return errors
}