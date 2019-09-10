
/**
 * Documentação da estrutura de uma anamnese usada dentro da aplicação e de como
 * é armazenado no Firebase.
 */

// =========================================================
//                         ESTRUTURA
// =========================================================

/**
 * Estrutura dos dados de uma anamnese usada dentro do app:
 * 
 * class AnamnesisRecord {
 *      creationDate: Date
 *      name: string
 *      email: string
 *      birthDate: Date
 *      weight: number (decimal, quilogramas)
 *      height: number (inteiro, centímetros)
 * 
 *      symptoms: string[]
 *      pathologies: string[]
 *      familyPathologies: string[]
 *      lifeRhythm: string
 *      eatingStyle: string
 * 
 *      medicines: {
 *          name: string
 *          frequency: string
 *      }[]
 *      habits: {
 *          name: string
 *          frequency: string
 *      }[]
 * 
 *     changes: string[] (chaves dos campos modificados desde a última anamnese, para mostrar no histórico)
 * }
 * 
 * Os valores em `medicines.frequency` e `habits.frequency` são uma enum com os
 * possíveis valores e conversões para strings que podem ser exibidas para os usuários:
 * 
 * VALOR ARMAZENADO -> DESCRIÇÃO
 * 6-6h             -> a cada 6h
 * 8-8h             -> a cada 8h
 * 12-12h           -> a cada 12h
 * 24-24h           -> a cada 24h
 * 1xw              -> uma vez por semana
 * 1-3xw            -> de uma a três vezes por semana
 * 3xw              -> três vezes por semana
 * +3xw             -> mais de três vezes por semana
 * sm:-1d           -> menos de um maço por dia
 * sm:1d            -> um maço por dia
 * sm:+2d           -> mais de dois maços por dia
 * daily            -> diariamente
 * occasionaly      -> ocasionalmente
 * rarely           -> raramente
 * never            -> nunca
 */

// =========================================================

/**
 * Estrutura dos dados de uma anamnese usada no Firebase:
 * 
 * [creationDate: number (timestamp)]: {
 *     birthDate: string (padrão ISO 8601: YYYY-MM-DD)
 *     // demais campos no mesmo formato usado no app (ver acima)
 * }
 */

// =========================================================
//                         EXEMPLOS
// =========================================================

/**
 * Exemplo de ficha de anamnese dentro do app:
 * 
 * {
 *      creationDate: Date(2019-09-06, 14:18:32)
 *      name: "Cassandra Valentina Gomes"
 *      email: "cassandra.gomes@gmail.com"
 *      birthDate: Date(1990-08-20)
 *      weight: 70.8
 *      height: 174
 * 
 *      symptoms: ["Dor de cabeça", "Febre", "Dor no corpo", "sintoma customizado"]
 *      pathologies: ["Diabetes", "Hipertensão", "Gastrite", "Asma/Bronquite", "Alergias alimentares"]
 *      familyPathologies: ["Alergias alimentares", "Intolerâncias alimentares", "Câncer"]
 *      lifeRhythm: "Muito agitada"
 *      eating: "Desequilibrada"
 * 
 *      medicines: [
 *          {
 *              name: "Diclofenaco"
 *              frequency: "3xw"
 *          },
 *          {
 *              name: "AAS"
 *              frequency: "12-12h"
 *          },
 *          {
 *              name: "insulina"
 *              frequency: "6-6h"
 *          }
 *      ]
 *      habits: [
 *          {
 *              name: "Fumar"
 *              frequency: "sm:+2d"
 *          },
 *          {
 *              name: "Beber"
 *              frequency: "daily"
 *          },
 *          {
 *              name: "Atividade física"
 *              frequency: "never"
 *          }
 *      ]
 * 
 *      changes: ["symptoms", "medicines"]
 * }
 */

// =========================================================

/**
 * Exemplo da mesma ficha de anamnese armazenada no Firebase:
 * 
 * 1567790312000: {
 *      birthDate: "1990-08-20"
 *      // demais campos no mesmo formato usado no app (ver acima)
 * }
 */
