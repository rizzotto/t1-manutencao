import { mapToFrequencyDescriptions, frequencyCodes } from './frequencies';

/**
 * Gera as strings da tela de entrada de texto.
 */
class TextInputInputProducer {
    /**
     * Parseia uma data para o formado DD/MM/AAAA, para exibição na tela de entrada de texto.
     * @param {Date} date data a ser exibida
     * @returns {string} conteúdo a ser exibido no campo de texto
     */
    dayMonthYear(date) {
        if (date === undefined || date === null) {
            return "";
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${day}/${month}/${year}`;
    }

    /**
     * Converte um número para uma string com uma quantidade predefinida de dígitos decimais.
     * @param {number} number número a ser convertido para string
     * @param {number} fractionDigits quantidade de dígitos decimais a serem exibidos
     * @returns {string} string representando o número
     */
    decimalNumber(number, fractionDigits = 2) {
        if (!number) return null;
        return number.toFixed(fractionDigits).replace(".", ",");
    }

    /**
     * Converte um número inteiro para uma string (sem dígitos decimais).
     * @param {number} number número a ser convertido para string
     * @returns {string} string representando o número
     */
    intNumber(number) {
        return this.decimalNumber(number, 0);
    }
}

/**
 * Gera os itens da tela de listagem fechada.
 * 
 * @typedef {Object} ClosedListInputItem
 * @property {number} id
 * @property {string} texto
 * @property {boolean} isSelected
 */
class ClosedListInputProducer {
    /**
     * Gera a lista limitando a apenas um item selecionado.
     * @param {string[]} items itens exibidos na lista
     * @param {string} selected item que deve iniciar selecionado
     * @returns {ClosedListInputItem[]} itens no formato esperado pelo componente
     */
    singleSelected(items, selected) {
        return items.map((item, index) => {
            return {
                id: index,
                texto: item,
                isSelected: item === selected
            }
        })
    }

    /**
     * Gera a lista considerando um conjunto de elementos já selecionados.
     * @param {string[]} items itens exibidos na lista
     * @param {string[]} selected itens que devem ser exibidos e iniciar selecionados
     * @returns {ClosedListInputItem[]} itens no formato esperado pelo componente, união entre `items` e `selected`
     */
    multipleSelected(items, selected = []) {
        const allItems = items.slice();

        // adicionar tudo em `selected` sem duplicar
        selected.forEach(item => {
            if (allItems.includes(item)) return;
            allItems.push(item);
        });

        return allItems.map((item, index) => {
            return {
                id: index,
                texto: item,
                isSelected: selected.includes(item)
            }
        })
    }
}

/**
 * Gera os itens da tela de listagem com subitens.
 * 
 * @typedef {Object} SubitemListInputItem
 * @property {string} title
 * @property {string[]} subitems
 * @property {number[]} selectedSubitems
 * 
 * @typedef {Object} FrequencyItem
 * @property {string} name
 * @property {string} frequency
 * 
 * @typedef {Object} SubitemListMetaInputItem
 * @property {string} title
 * @property {string[]} codes
 */
class SubitemListInputProducer {
    /**
     * Gera a lista com base nos códigos das frequências e itens já selecionados.
     * @param {SubitemListInputItem[]} reference itens a ser exibidos, com códigos das frequências
     * @param {FrequencyItem[]} selected itens já selecionados, com frequência associada
     * @returns {SubitemListInputItem[]} itens no formato esperado pelo componente
     */
    frequencyList(reference, selected = []) {
        // para cada item a ser exibido
        return reference.map(({ title, codes }) => {
            // pegar informações do já selecionado
            const existing = selected.find(item => item.name === title);

            let indices;
            if (existing) { // se deve começar selecionado
                // atribuir índice a partir da lista de códigos
                indices = [codes.indexOf(existing.frequency)];
            } else {
                // senão, não há uma frequência pré-selecionada
                indices = [];
            }

            return {
                title: title,
                subitems: mapToFrequencyDescriptions(codes),
                selectedSubitems: indices
            }
        })
    }

    /**
     * Gera a lista com base nos medicamentos que devem ser exibidos.
     * @param {string[]} medicines nomes dos medicamentos a exibir
     * @param {FrequencyItem[]} selected medicamentos já selecionados, com frequência associada
     * @returns {SubitemListInputItem[]} itens no formato esperado pelo componente
     */
    medicineFrequencyList(medicines, selected = []) {
        // gera a lista de referência com os códigos de frequência
        const reference = medicines.map(medicineName => {
            return {
                title: medicineName,
                codes: frequencyCodes.medicines
            }
        })
        
        return this.frequencyList(reference, selected);
    }
}

export { TextInputInputProducer, ClosedListInputProducer, SubitemListInputProducer };
