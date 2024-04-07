const InstitutionModel = require("../models/institution");
const Validation = require("../validation");

class Institution {
  static async createDocument(req, res) {
    const body = req.body;
    const { cnpj } = body;
    Validation.validationDate("institution", body);

    const institution = await InstitutionModel.findOne({ cnpj }).lean();
    if (institution) {
      return res.status(404).json({
        message: "Já existe um cnpj cadastrado para essa instituição",
      });
    }

    const institutionCreated = await institution.create({ body });
    return res.status(200).json(institutionCreated);
  }

  static async updateDocument(req, res) {
    const body = req.body;
    const { _id: idInstitution } = body;
    Validation.validationDate("institution", body);

    try {
      const updatedInstitution = await InstitutionModel.updateById(
        idInstitution,
        body
      );
      return res.status(200).json(updatedInstitution);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "falha ao atualizar o documento" });
    }
  }

  static async getAllDocument(_, res) {
    try {
      const institutions = await InstitutionModel.find().lean();
      return res.status(200).json(institutions);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "falha ao buscar documentos" });
    }
  }

  static async getDocumentById(req, res) {
    const { _id: idInstitution } = req.params;

    try {
      const institution = await InstitutionModel.findById(idInstitution);
      if (institution) {
        res.status(404).json({
          error: `instituição com id ${idInstitution} não encontrado`,
        });
      }
      return res.status(200).json(institution);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "falha ao buscar documentos" });
    }
  }

  static async getByName(req, res) {
    const { name: institutionName } = req.params;

    try {
      const institution = await InstitutionModel.findByName(institutionName);
      if (institution) {
        res.status(404).json({
          error: `Instituição com nome ${institutionName} não encontrado`,
        });
      }
      return res.status(200).json(institution);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "falha ao buscar documentos" });
    }
  }

  static async delDocumentById(req, res) {
    const { _id: idInstitution } = req.params;

    try {
      const institution = await InstitutionModel.findOneAndDelete({
        _id: idInstitution,
      });

      if (institution) {
        res.status(404).json({
          error: `Institution com id ${idInstitution} não encontrado`,
        });
      }
      return res.status(200).json(godfather);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "falha ao buscar documentos" });
    }
  }
}

module.exports = Institution;
