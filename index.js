import express from 'express';

const app = express();
app.use(express.json());

let ultimoId = 1;
const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "admin@gmail.com",
}

let usuarios = [usuario_admin];

app.get("/usuarios", (req, res) => {
    res.json(usuarios).status(200);
}); //requsicao e resposta


app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email sao obrigatorios" });
    }
    const novoUsuario ={
        id: ultimoId +1,
        nome: nome,
        email: email,
    };
    
    usuarios.push(novoUsuario);
    ultimoId+=1;

    res.status(201).json(novoUsuario.id);
});

app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    const idNumerico = parseInt(id);

    if (isNaN(idNumerico)){
        return res.status(400).json({ mensagem: "ID invalido, precisa ser um numero" }); //ele nao vai parar ali, se ele for invalido parar ali
    }
    //procurar o usuario com esse id, procurando pelo index 
    let posicao_do_usuario = usuarios.findIndex( //retorna posicao
        (usuario) => usuario.id === idNumerico //= valor variavel; == perguntando se eh igual; === compara o tipo e o valor.
    ); 
    if(posicao_do_usuario === -1){
        return res.status(404).json({ mensagem: "Usuario nao encontrado" }); //seguir daqui se eu nao tneho usuario
    }

    /*let posicao_do_usuario = -1;


    for(let posicao =0; posicao < usuario_admin.length; posicao++){ //array nessa posicao faca tal coisa 
        if (usuarios[posicao].id === idNumerico){
            posicao_do_usuario = posicao;
            break;
        }
    }//percorrendo todo o array e procurando pelo id
*/
usuarios.splice(posicao_do_usuario, 1); //remover o usuario da posicao encontrada, ele para e apaga o prox 
res.status(204).send(); //204 sem conteudo  
});

app.listen(3000);
//**
// crud em momoria 
// criar uma rota para pehar todos os usurairis 
// criar rota para cadastarr um novo usuario
// criar uma rota para deletar um usuario 
// criar uma rota para atualizar um usuario 
// */


