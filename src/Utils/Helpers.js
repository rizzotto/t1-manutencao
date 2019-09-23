import {getFrequencyDescription} from './frequencies';
/**
 * Retorna uma string com os dados de um objeto do tipo date formatados.
 * @param {Object} date
 */
export function formatDate(date){
    let correctedMonth = date.getMonth()+1;
    if(correctedMonth < 10){
        correctedMonth = "0"+correctedMonth;
    }
    return ""+date.getDate() +"/" + correctedMonth + "/" +date.getFullYear();
}

/**
 * Retorna uma string com a altura formatada em x,y m.
 * @param {number} height
 */
export function formatHeight(height){
    if (height % 1 !== 0) {
        return height + " m";
    }
    return (height/100).toLocaleString('pt-BR') + " m";
}

/**
 * Retorna uma string com os valores do array formatados e separados.
 * @param {[]} arr
 * @param {string} sep
 */
export function formatArrayWithSeparator(arr, sep){
    let string = "";
    arr.forEach((item,index) => {
        if(index != 0){
            if(index == arr.length - 1){
                string += item.toLowerCase() + ".";
            }
            else{
                string += item.toLowerCase() + sep;
            }
        }
        else{
            arr.length == 1 ? string += item + "." : string += item + sep;
        }
    });
    return string;
}

/**
 * Retorna uma string formatada com os objetos contendo frequencia e nome.
 * @param {array} arr
 */
export function formatArrayObjectsAnam(arr){
    let str = "";
    arr.forEach((item,index) => {
        let freq = getFrequencyDescription(item.frequency);
        if(arr.length == 1 || index == arr.length - 1){
            str += item.name + ": " + freq;
        }
        else{
            str += item.name + ": " + freq + "\n";
        }
    });
    return str;
}
