const { setDoc, doc, collection, getDoc, getDocs, updateDoc, query, where, orderBy, limit } = require("firebase/firestore")
const { db } = require("./connection")

const salvar = async (jogador) => {
    if (!(await getDoc(doc(db, "jogadores", jogador.nome.toLowerCase()))).exists()) {
        jogador.vitorias = 0;
        await setDoc(doc(collection(db, "jogadores"), jogador.nome.toLowerCase()), jogador);
    }
}

const obter = async (nome) => {
    return (await getDoc(doc(db, "jogadores", nome.toLowerCase()))).data();
}

const obterTodos = async () => {
    return (await getDocs(collection(db, "jogadores"))).docs.map((doc) => doc.data());
}

const marcarVitoria = async (nome) => {
    const jogador = (await obter(nome));
    if (!jogador.vitorias) {
        jogador.vitorias = 1;
    } else {
        jogador.vitorias++;
    }
    await updateDoc(doc(collection(db, "jogadores"), nome.toLowerCase()), {vitorias:jogador.vitorias});
    return jogador;
}

const obterTop10 = async() => {
    const condicoes = query(collection(db, "jogadores"), orderBy("vitorias", "desc"), limit(10), where("vitorias", ">", 0));
    return ((await getDocs(condicoes)).docs.map((doc) => doc.data()));
}

module.exports = {salvar, obter, obterTodos, marcarVitoria, obterTop10};