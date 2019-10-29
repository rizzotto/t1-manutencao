import {getFrequencyDescription} from './frequencies';
/**
 * Retorna uma string com os dados de um objeto do tipo date formatados no padrão dd/mm/aaaa.
 * @param {Object} date
 * @returns {String}
 */
export function formatDate(date){
    if(!_isEmpty(date)){
        let correctedMonth = date.getMonth()+1;
        if(correctedMonth < 10){
            correctedMonth = "0"+correctedMonth;
        }
        return ""+date.getDate() +"/" + correctedMonth + "/" +date.getFullYear();
    }
    return "N/A";
}

/**
 * Retorna uma string com a altura formatada em x,y m.
 * @param {Number} height
 * @returns {String}
 */
export function formatHeight(height){
    if(!_isEmpty(height)){
        if (height % 1 !== 0) {
            return height + " m";
        }
        return (height/100).toFixed(2).replace(".", ",") + " m";
    }
    return "N/A";
}

/**
 * Retorna uma string com os valores de um array formatados e separados por um separador.
 * @param {[]} arr
 * @param {String} sep
 * @returns {String}
 */
export function formatArrayWithSeparator(arr, sep){
    if(!_isEmpty(arr)){
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
    return "N/A";
}

/**
 * Retorna uma string formatada com os objetos de um array contendo frequencia e nome.
 * @param {Array} arr
 * @returns {String}
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
                str += item.name + ": " + freq + "\n";
            }
        });
        return str;
    }
    return "N/A";
}

/**
 * Utiliza um texto definido quando a variável passada no primeiro parâmetro for vazia.
 * @param {*} s 
 * @param {String} text Texto a ser utilizado quando está vazio
 */
export function textWhenEmpty(s, text){
    return (_isEmpty(s)) ? text : s;
}

/**
 * Verifica se a variável está vazia
 * @param {*} v
 * @returns {Boolean}
 */
_isEmpty = (v) => {
    if(!v || v == null || v == undefined || v == ""){
        return true;
    }
    return false; 
}