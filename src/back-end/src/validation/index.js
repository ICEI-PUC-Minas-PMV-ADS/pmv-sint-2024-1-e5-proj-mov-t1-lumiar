const z = require('zod')
const mongoose = require('mongoose')

const addressSchema = z.object({
    street: z.string().max(50),
    district: z.string().max(50),
    state: z.string().max(50),
    country: z.string().max(50),
    cep: z.string().max(50),
})

const donationSchema = z.object({
    value: z.number(),
    children: z.any().refine((id) => {
        return mongoose.Types.ObjectId.isValid(id)
    }),
    godfather: z.any().refine((id) => {
        return mongoose.Types.ObjectId.isValid(id)
    }),
})

const institutionSchema = z.object({
    name: z.string().max(100),
    password: z.string(),
    creationDate: z.date(),
    email: z.string().email(),
    cnpj: z.string(),
    children: z.object({}),
    description: z.string().max(200),
    address: addressSchema,
    affiliation: z.boolean(),
})

const godfatherSchema = z.object({
    name: z.string().max(100),
    age: z.number().int().positive(),
    email: z.string().email(),
    cpf: z.string(),
    cpf: z.any().refine((value) => {
        const isValidCpf = isValidCPF(value)
        return isValidCpf
    }),
    donations: z.object({}),
})

function formatErrorMessages(validationResponse) {
    if (!validationResponse.success) {
        validationResponse.errorMessages = validationResponse.error.issues.map((error) => {
            return {
                message: `Erro de validação: O atributo ${error.path} deve ser um(a) ${error.expected} ao invés de ${error.received}`,
                statusCode: 400,
            }
        })
    }

    return validationResponse
}

function isValidCPF(cpf) {
    cpf = sanitizeCPF(cpf)

    if (!isValidLength(cpf) || isRepeatingDigits(cpf)) {
        return false
    }

    const checkDigitOne = calculateDigit(cpf, 9)
    if (!validateDigit(cpf, checkDigitOne, 9)) return false

    const checkDigitTwo = calculateDigit(cpf, 10)
    return validateDigit(cpf, checkDigitTwo, 10)
}

function sanitizeCPF(cpf) {
    return cpf.replace(/[^\d]/g, '')
}

function isValidLength(cpf) {
    return cpf.length === 11
}

function isRepeatingDigits(cpf) {
    return /^(.)\1+$/.test(cpf)
}

function calculateDigit(cpf, end) {
    let sum = 0
    for (let i = 0; i < end; i++) {
        sum += parseInt(cpf.charAt(i)) * (end + 1 - i)
    }
    let rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
}

function validateDigit(cpf, expectedDigit, position) {
    return parseInt(cpf.charAt(position)) === expectedDigit
}

function validationDate(customSchema, data) {
    const hashSchema = {
        godfather: godfatherSchema,
        institution: institutionSchema,
        donation: donationSchema,
    }

    const parsedCustomSchema = hashSchema[customSchema].safeParse(data)
    formatErrorMessages(parsedCustomSchema)

    return parsedCustomSchema
}

module.exports = { validationDate }
