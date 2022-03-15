const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Sofa = require("../models/sofaModel")

const createSofa = asyncHandler(async (req, res) => {
  const { titulo, lugares, comprimento, largura, profundidade, imagem } = req.body

  if (!titulo || !lugares || !comprimento || !largura || !profundidade || !imagem) {
    res.status(400)
    throw new Error("Por favor preencha todos os campos")
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("Usuário não encontrado")
  }

  const sofa = await Sofa.create({
    usuario: req.user.id,
    titulo,
    imagem,
    lugares,
    comprimento,
    largura,
    profundidade,
    status: "Em Avaliação",
  })

  res.json(sofa)
})

const getSofas = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const sofas = await Sofa.find().sort({ createdAt: -1 })

  if (sofas) {
    res.json(sofas)
  } else {
    res.status(400)
    throw new Error("Nenhum sofa cadastrado")
  }
})

const getSofa = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const sofa = await Sofa.findById(req.params.id)

  if (sofa) {
    res.json(sofa)
  } else {
    res.status(400)
    throw new Error("Nenhum sofa cadastrado")
  }
})

const updateStatus = asyncHandler(async (req, res) => {
  const { avaliacao, avaliador } = req.body
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("Usuário não encontrado")
  }

  const sofa = await Sofa.findById(req.params.id)

  if (!sofa) {
    res.status(404)
    throw new Error("Sofá não encontrado")
  }

  if (user.inspetor === false) {
    res.status(401)
    throw new Error("Não autorizado")
  }

  const sofaNovo = await Sofa.findByIdAndUpdate(req.params.id, { status: avaliacao, avaliador: avaliador })

  res.json(sofaNovo)
})

const updateSofa = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("Usuário não encontrado")
  }

  const sofa = await Sofa.findById(req.params.id)

  if (!sofa) {
    res.status(404)
    throw new Error("Sofá não encontrado")
  }

  if (sofa.usuario.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Não autorizado")
  }

  const sofaAtualizado = await Sofa.findByIdAndUpdate(req.params.id, req.body)

  res.json(sofaAtualizado)
})

const deleteSofa = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("Usuário não encontrado")
  }

  const sofa = await Sofa.findById(req.body.id)

  if (!sofa) {
    res.status(404)
    throw new Error("Sofá não encontrado")
  }

  if (sofa.usuario.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Não autorizado")
  }

  await sofa.remove()

  res.json({
    success: true,
    message: "Sofá deletado com successo",
  })
})

module.exports = {
  createSofa,
  getSofas,
  getSofa,
  updateStatus,
  updateSofa,
  deleteSofa,
}
