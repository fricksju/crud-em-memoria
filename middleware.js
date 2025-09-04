export function verificarAdm(req, res, next) {

    const {tipoUser} = req.body();

    if(tipoUser === "adm" && tipoUser) {
        console.log("Usuario é um adm!")
        next()
    } else {
        return console.log("Da não man")
    } 
    
} 

export function imprimir(req, res, next) {
    let qt = 1
    console.log("ALOOOOOOO: ", qt)
    qt++
    next()
}