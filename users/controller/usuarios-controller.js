import { PrismaClient } from "@prisma/client";

    let usuarios = []
    let ultimoId = 0

    const prisma = new PrismaClient();

    async function listarTodosUsuarios(req, res) {
        console.log("Cheguei no controller");
        const allUsers = await prisma.users.findMany()
        res.status(200).json(allUsers);
    }



    async function criarUsuario(req, res) {
        const { nome, email, idade } = req.body;

        const novoUsuario = {
        nome: nome,
        email: email,
        idade: idade,
        };

        const criarUser = await prisma.users.create({
            data: novoUsuario
        })
        

        res.status(201).json(criarUser);
    }

    async function deletarUsuario(req, res) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
        return res
            .status(400)
            .json({ mensagem: "ID inválido, precisa ser um numero" });
        }

        const deletarUser = await prisma.users.delete({
            where: {
                id: id 
            }
        })
        res.status(204).send(deletarUser);
    }

    function atualizarUsuario(req, res) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
        return res
            .status(400)
            .json({ mensagem: "ID inválido, precisa ser um numero" });
        }

        const usuario = usuarios.find((usuario) => usuario.id === id);
        if (!usuario) {
        return res.status(404).json({ mensagem: "Usuario nao encontrado" });
        }

        const { nome, email } = req.body;

        if (!nome && !email) {
        return res.status(400).json({ mensagem: "manda pelo menos um dos dados" });
        }

        

        if (email) {
        let email_existe = usuarios.findIndex((usuario) => usuario.email === email);
        }

        if (email_existe !== -1) {
            return res.status(409).json({ mensagem: "Email ja cadastrado" });
        }

       

    
        

        res.status(200).json(usuario);
    }

    async function listarUsuarioId(req, res) {
         const id = parseInt(req.params.id)
        const findById = await prisma.users.findUnique({where: {id: id}})

            return res
        .status(200)
        .json(findById);
    }

    export {listarTodosUsuarios, criarUsuario, deletarUsuario, atualizarUsuario, listarUsuarioId};