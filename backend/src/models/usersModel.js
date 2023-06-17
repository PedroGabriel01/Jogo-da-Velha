const { where, query, getDocs, collection, doc } = require('firebase/firestore');
const connection = require('./connection');

const save = (obj) => {
    connection.firestore.setDoc(doc(collection(connection.db, "usuarios")), obj);
};

const getAll = async () => {
    return (await getDocs(collection(connection.db, "usuarios"))).docs.map(doc => doc.data());
}

module.exports = {
    save,
    getAll
}