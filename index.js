import express from 'express';

const app = express();
app.use(express.json());

let ultimoId = 1;
const usuario_admin = {
    nome: "admin",
    email: "admin@gmail.com",
}
let usuarios = [usuario_admin];

app.get("/usuario", (req, res) => {
    res.json(usuarios).status(200);
}); //requsicao e resposta
app.listen(3000);




app.post("/usuario", (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email sao obrigatorios" });
    }
});
//**
// crud em momoria 
// criar uma rota para pehar todos os usurairis 
// criar rota para cadastarr um novo usuario
// criar uma rota para deletar um usuario 
// criar uma rota para atualizar um usuario */
