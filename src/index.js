const player1 = {
    NOME: 'Mário',
    MANOBRABILIDADE: 4,
    VELOCIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

const player2 = {
    NOME: 'Luigi',
    MANOBRABILIDADE: 3,
    VELOCIDADE: 4,
    PODER: 3,
    PONTOS: 0,
}

async function RollDado() {
    return Math.floor(Math.random() * 6) +1;
}

async function playerEngine(character1, character2) {
    for (let round = 1; round <= 5; round++){
        console.log(`rodada ${round}`);

        //sortear bloco aleatorio
        let block = await getRandonBlock()
        console.log(`bloco ${block}`)

            //rolar dado
        let dadoResult1 = await RollDado();
        let dadoResult2 = await RollDado();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = dadoResult1 + character1.VELOCIDADE;
            totalTestSkill2 = dadoResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "VELOCIDADE",
                dadoResult1,
                character1.VELOCIDADE
            )

            await logRollResult(
                character2.NOME,
                "VELOCIDADE",
                dadoResult2,
                character2.VELOCIDADE
            )
        }
        if(block === "CURVA"){
            totalTestSkill1 = dadoResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = dadoResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "MANOBRABILIDADE",
                dadoResult1,
                character1.MANOBRABILIDADE
            )

            await logRollResult(
                character2.NOME,
                "MANOBRABILIDADE",
                dadoResult2,
                character2.MANOBRABILIDADE
            )
        }
        if(block === "CONFRONTO"){
            let powerResult1 = dadoResult1 + character1.PODER;
            let powerResult2 = dadoResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊`)

            await logRollResult(
                character2.NOME,
                "PODER",
                dadoResult2,
                character2.PODER
            )

            await logRollResult(
                character1.NOME,
                "PODER",
                dadoResult1,
                character1.PODER
            )

            //resumindo os ifs

            //character1 -= powerResult1 < powerResult2 && character1.PONTOS > 0 ? 1 : 0;

            if (powerResult1 < powerResult2){
                if (character1.PONTOS > 0){
                    character1.PONTOS--;
                } console.log(`${character1.NOME} perdeu o confronto 🐢`)
            }

            if (powerResult1 > powerResult2){
                if (character2.PONTOS > 0){
                    character2.PONTOS--;
                } console.log(`${character2.NOME} perdeu o confronto 🐢`)
            }

            //console.log(powerResult1 === powerResult2 ? "EMPATE, nem um ponto foi perdido" : "");

            if (powerResult1 === powerResult2){
                console.log("EMPATE, nem um ponto foi perdido")
            }

        //verificando o vencedor

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou 1 ponto`);
            character1.PONTOS++;
        } else if(totalTestSkill1 < totalTestSkill2){
            console.log(`${character2.NOME} marcou 1 ponto`);
            character2.PONTOS++;
        }

        console.log("______________________________________")
    }

}

async function getRandonBlock() {
    let random = Math.random()
    let result

    switch(true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result;
}}

async function logRollResult(characterName, block, dadoResult, atribute)
{
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${dadoResult} + ${atribute} = ${dadoResult + atribute}`);
}

async function resultadoFinal(character1, character2){

    console.log("RESULTADO FINAL")
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos`)
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos`)

    if(character1.PONTOS > character2.PONTOS)
        console.log(`${character1.NOME} vemceu 🏆`)
    else if(character1.PONTOS < character2.PONTOS)
        console.log(`${character2.NOME} vemceu 🏆`)
    else console.log("a corrida empatou");
}

(async function main() {
    console.log(
        `🚨🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando... 🚨🏁 \n`
    );

    await playerEngine(player1, player2);
    await resultadoFinal(player1, player2);
})();