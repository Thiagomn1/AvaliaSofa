const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../models/userModel")

const registerUser = asyncHandler(async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !senha || !email) {
    res.status(400)
    throw new Error("Por favor preencha todos os campos necessários")
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("Usuário já cadastrado")
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(senha, salt)

  const user = await User.create({
    nome,
    email,
    senha: hashPassword,
  })

  if (user) {
    res.json({
      _id: user._id,
      nome: user.nome,
      email: user.email,
      inspetor: user.inspetor,
      token: genToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Dados inválidos")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, senha } = req.body

  if (!senha || !email) {
    res.status(400)
    throw new Error("Por favor preencha todos os campos necessários")
  }

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(senha, user.senha))) {
    res.json({
      _id: user._id,
      nome: user.nome,
      email: user.email,
      inspetor: user.inspetor,
      token: genToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Credenciais inválidas")
  }
})

const genToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
  registerUser,
  loginUser,
}
