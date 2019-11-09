import { formatDate, formatHeight, formatArrayWithSeparator, formatArrayObjectsAnam, textWhenEmpty } from '../Utils/Helpers';

/**
 * 
 * @param {String} anamnese 
 * 
 * Função responsável por criar um HTML correspondente à anamnese.
 * A variável msg corresponde à este HTML, e toda a mesma deve ser tratada como uma String, logo
 * todas as tags devem estar dentro dos ` ` para que seja possível o uso de variáveis e funções.
 */
export function anamnesisToHtml(anamnese) {
    const msg =
    `
        <h1 id="name">${anamnese.name}</h1>
        <h2>${formatDate(anamnese.creationDate)}</h2>

        <h1>Email</h1>

        <style>
        ${style}
        </style>

    `
    return msg
}


/**
 * Para facilitar a visuaização da estilização, usar a variável style abaixo como um arquivo css,
 * pois o modo em que a dependencia funciona, não é aceito um link à um arquivo css separado.
 */
const style = `
    h1 { font-Weight: bold; font-size: 48px} 
    h1#name { color: #c9d}  
    h2 { color: #BFBFBF}

`
