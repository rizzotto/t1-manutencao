
/**
 * Objeto que mapeia os códigos de frequência para a descrição textual.
 */
const frequencies = {
    "6-6h": "a cada 6h",
    "8-8h": "a cada 8h",
    "12-12h": "a cada 12h",
    "24-24h": "a cada 24h",
    "1xw": "uma vez por semana",
    "2xw": "duas vezes por semana",
    "1-3xw": "de uma a três vezes por semana",
    "3xw": "três vezes por semana",
    "+3xw": "mais de três vezes por semana",
    "sm:-1d": "menos de um maço por dia",
    "sm:1d": "um maço por dia",
    "sm:+2d": "mais de dois maços por dia",
    "daily": "diariamente",
    "occasionaly": "ocasionalmente",
    "rarely": "raramente",
    "never": "nunca"
};

/**
 * Mapeia um código de frequência para a descrição textual.
 * @param {string} code código de frequência
 * @returns {string} descrição da frequência
 */
const getFrequencyDescriptionForCode = (code) => {
    return frequencies[code] || "desconhecido";
};

/**
 * Mapeia uma lista de códigos de frequência para as descrições textuais.
 * @param {string[]} codes lista com códigos de frequência
 * @return {string[]} descrições das frequências
 */
const mapFrequencyCodes = (codes) => {
    return codes.map(getFrequencyDescriptionForCode);
};

/**
 * Códigos de frequência das telas com subitens.
 */
const frequencyCodes = {
    medicines: ["6-6h", "8-8h", "12-12h", "24-24h", "1xw", "2xw", "3xw"],
    smoking: ["sm:+2d", "sm:1d", "sm:-1d", "occasionaly", "rarely"],
    drinking: ["daily", "+3xw", "3xw", "1-3xw", "1xw", "occasionaly", "rarely"],
    physicalActivity: ["daily", "+3xw", "3xw", "1-3xw", "1xw", "occasionaly", "rarely"]
};

/**
 * Descrição das frequências das telas com subitens.
 */
const frequencyDescriptions = {
    medicines: mapFrequencyCodes(frequencyCodes.medicines),
    smoking: mapFrequencyCodes(frequencyCodes.smoking),
    drinking: mapFrequencyCodes(frequencyCodes.drinking),
    physicalActivity: mapFrequencyCodes(frequencyCodes.physicalActivity)
}

export {
    frequencyCodes,
    frequencyDescriptions,
    getFrequencyDescriptionForCode as getFrequencyDescription,
    mapFrequencyCodes as mapToFrequencyDescriptions
};
