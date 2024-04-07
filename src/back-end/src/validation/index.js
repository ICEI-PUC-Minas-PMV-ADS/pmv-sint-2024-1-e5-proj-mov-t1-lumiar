const z = require("zod");
const mongoose = require("mongoose");

class Validation {
  static addressSchema = z.object({
    street: z.string().max(50),
    district: z.string().max(50),
    state: z.string().max(50),
    country: z.string().max(50),
    cep: z.string().max(50),
  });

  static godfatherSchemaValidation() {
    const godfatherSchema = z.object({
      name: z.string().max(100),
      age: z.number().int().positive(),
      email: z.string().email(),
      cpf: z.string().refine((value) => {
        return Validation.isValidCPF(value);
      }),
      donations: z.object(),
    });

    return godfatherSchema;
  }

  static institutionsSchemaValidation() {
    const godfatherSchema = z.object({
      name: z.string().max(100),
      creationData: z.date(),
      email: z.string().email(),
      children: z.object(),
      CNPJ: z.string(),
      description: z.string().max(200),
      roll: z.string().max(50),
      address: Validation.addressSchema,
      donations: z.object(),
      affiliation: z.boolean(),
    });

    return godfatherSchema;
  }

  static donationSchemaValidation() {
    const godfatherSchema = z.object({
      value: z.number(),
      children: z.any().refine((id) => {
        return mongoose.Types.ObjectId.isValid(id);
      }),
      godfather: z.any().refine((id) => {
        return mongoose.Types.ObjectId.isValid(id);
      }),
    });

    return godfatherSchema;
  }

  static validationDate(customSchema, data) {
    const hashSchema = {
      godfather: Validation.godfatherSchemaValidation,
      institution: Validation.institutionsSchemaValidation,
      donation: Validation.donationSchemaValidation,
    };

    const parsedCustomSchema = hashSchema[customSchema].safeParse(data);
    Validation.formatErrorMessages(parsedCustomSchema);

    return parsedCustomSchema;
  }

  static formatErrorMessages(validationResponse) {
    if (!validationResponse.success) {
      validationResponse.errorMessages = validationResponse.error.issues.map(
        (error) => {
          return `Erro de validação: O atributo ${error.path} deve ser um(a) ${error.expected} ao invés de ${error.received}`;
        }
      );
    }

    return validationResponse;
  }

  static isValidCPF(cpf) {
    cpf = Validation.sanitizeCPF(cpf);

    if (!Validation.isValidLength(cpf) || Validation.isRepeatingDigits(cpf))
      return false;

    const checkDigitOne = Validation.calculateDigit(cpf, 9);
    if (!Validation.validateDigit(cpf, checkDigitOne, 9)) return false;

    const checkDigitTwo = Validation.calculateDigit(cpf, 10);
    return Validation.validateDigit(cpf, checkDigitTwo, 10);
  }

  static sanitizeCPF(cpf) {
    return cpf.replace(/[^\d]/g, "");
  }

  static isValidLength(cpf) {
    return cpf.length === 11;
  }

  static isRepeatingDigits(cpf) {
    return /^(.)\1+$/.test(cpf);
  }

  static calculateDigit(cpf, end) {
    let sum = 0;
    for (let i = 0; i < end; i++) {
      sum += parseInt(cpf.charAt(i)) * (end + 1 - i);
    }
    let rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  static validateDigit(cpf, expectedDigit, position) {
    return parseInt(cpf.charAt(position)) === expectedDigit;
  }
}

module.exports = Validation;
