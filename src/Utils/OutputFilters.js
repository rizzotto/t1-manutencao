import { frequencyCodes } from './frequencies';

/**
 * Mapeia o resultado da tela de listagem fechada para alguns formatos de resultado.
 * 
 * @typedef {Object} ClosedListOutputItem
 * @property {string} texto
 * @property {boolean} isSelected
 */
class ClosedListOutputFilter {

    /**
     * Retorna o conteúdo do primeiro item selecionado.
     * @param {ClosedListOutputItem[]} closedListResult resultado da tela de lista fechada
     * @returns {string} conteúdo do primeiro item selecionado
     */
    singleItem(closedListResult) {
        return closedListResult.find(item => item.isSelected).texto;
    }

    /**
     * Mapeia o resultado para os conteúdos dos itens selecionados.
     * @param {ClosedListOutputItem[]} closedListResult resultado da tela de lista fechada
     * @returns {string[]} conteúdos/nomes dos itens selecionados
     */
    allSelected(closedListResult) {
        return closedListResult.filter(item => item.isSelected).map(item => item.texto);
    }
}

/**
 * Mapeia o resultado da tela de listagem com subitens para alguns formatos de resultado.
 * 
 * @typedef {Object} SubitemListMetaItem
 * @property {string} title
 * @property {string[]} codes
 * 
 * @typedef {Object} FrequencyItem
 * @property {string} name
 * @property {string} frequency
 */
class SubitemListOutputFilter {

    /**
     * Mapeia os índices das frequências selecionadas para os itens de frequência correspondentes.
     * @param {number[][]} subitemListResult índices selecionados (retorno da screen)
     * @param {SubitemListMetaItem[]} reference itens exibidos (nome e códigos de frequência)
     * @returns {FrequencyItem[]} itens de frequência correspondentes aos itens/subitens selecionados
     */
    frequencyList(subitemListResult, reference) {
        return subitemListResult
            .map((selectedIndices, index) => {
                // só válido se apenas UM subitem foi selecionado
                if (selectedIndices.length !== 1) return null;
                const selectedIndex = selectedIndices[0];

                // códigos exibidos na seção
                const ref = reference[index];

                return {
                    name: ref.title,
                    frequency: ref.codes[selectedIndex]
                };
            })
            .filter(item => item !== null); // remover inválidos
    }

    /**
     * Mapeia os índices das frequências selecionadas para os medicamentos com frequência correspondentes.
     * @param {number[][]} subitemListResult índices selecionados (retorno da screen)
     * @param {string[]} medicines nomes dos medicamentos inicialmente exibidos na lista
     * @returns {FrequencyItem[]} itens de frequência dos medicamentos com frequência selecionada
     */
    medicineFrequencyList(subitemListResult, medicines) {
        const reference = medicines.map(medicineName => {
            return {
                title: medicineName,
                codes: frequencyCodes.medicines
            }
        })

        return this.frequencyList(subitemListResult, reference)
    }
}

export { ClosedListOutputFilter, SubitemListOutputFilter };
