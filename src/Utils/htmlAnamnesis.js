import { formatDate, formatHeight, formatArrayWithSeparator, textWhenEmpty } from '../Utils/Helpers';
import {getFrequencyDescription} from './frequencies';



/**
 * 
 * @param {String} anamnese 
 * 
 * Função responsável por criar um HTML correspondente à anamnese.
 * A variável msg corresponde à este HTML, e toda a mesma deve ser tratada como uma String, logo
 * todas as tags devem estar dentro dos ` ` para que seja possível o uso de variáveis e funções.
 */


export function formatArrayObjectsAnam(arr){
    if(!_isEmpty(arr)){
        let str = "";
        arr.forEach((item,index) => {
            let freq = getFrequencyDescription(item.frequency);
            if(arr.length == 1 || index == arr.length - 1){
                str += item.name + ": " + freq;
            }
            else{
                str += item.name + ": " + freq + "<br>";
            }
        });
        return str;
    }
    return "N/A";
}

export function anamnesisToHtml(anamnese) {
    const msg =
        `
        <div id="adjust">
            <img height="70" width="70" src="data:image/png;base64,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"></img>
        </div>
        <p id="name">${anamnese.name}</p>
        <p id="date">${formatDate(anamnese.creationDate)}</p>

        <p id="title">Email</p>
        <p>${anamnese.email}<br></p>
        
        <p id="title">Data de Nascimento:</p>
        <p>${formatDate(anamnese.birthDate)}<br></p>
        
        
        <p id="title">Peso e Altura:</p>
        <p>${anamnese.weight} kg, ${formatHeight(anamnese.height)}<br></p>

        <div id="line"></div>

        <p id="title">Principais Sintomas: </p>
        <p>${formatArrayWithSeparator(anamnese.sympthons, ', ')}<br></p>

        
        <p id="title">Medicamentos: </p>
        <p>${formatArrayObjectsAnam(anamnese.medicines)}</p>


        <p id="title">Patologias: </p>
        <p>${formatArrayWithSeparator(anamnese.pathologies, ', ')}<br></p>

        <p id="title">Histórico Familiar: </p>
        <p>${formatArrayWithSeparator(anamnese.familiarPathologies, ', ')}<br></p>

        <div id="line"></div>

        <p id="title">Hábitos: </p>
        <p>${formatArrayObjectsAnam(anamnese.habits)}</p>

        <p id="title">Estilo de Vida: </p>
        <p>${textWhenEmpty(anamnese.lifeRhythm, 'N/A')}.<br></p>

        <p id="title">Alimentação: </p>
        <p>${textWhenEmpty(anamnese.eatingStyle, 'N/A')}.<br></p>

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
    p#title { 
        font-Weight: bold;
        font-size: 16
    }
    p#name {
        font-size: 35px;
        font-Weight: bold;
        margin-bottom: 0px
    } 
    p#date { color: #BFBFBF}
    p {font-size: 14px}
    div#line {background-color: #000; padding: 0.5px}
    div#adjust {
        float: right;
        margin: 0
    }
`
