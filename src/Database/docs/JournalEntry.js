
/**
 * Documentação da estrutura de uma entrada no diário usada dentro da aplicação
 * e de como é armazenado no Firebase.
 */

// =========================================================
//                         ESTRUTURA
// =========================================================

/**
 * Estrutura dos dados de uma entrada no diário usada dentro do app:
 * 
 * class JournalEntry {
 *      creationDate: Date
 *      humor: {
 *          emotion: string (emoji)
 *          text: string
 *      }
 *      bloodPressure: string (mmHg)
 *      stressLevel: string
 *      symptoms: string[]
 *      medicines: string[]
 * }
 */

// =========================================================

/**
 * Estrutura dos dados de uma entrada no diário usada no Firebase:
 * 
 * [date: number (date, yyyymmdd)]: {
 *      [time: number (date, HHmmss)]: {
 *          // campos no mesmo formato usado no app (ver acima)
 *      }
 * }
 */

// =========================================================
//                         EXEMPLOS
// =========================================================

/**
 * Exemplo de entrada no diário dentro do app:
 * 
 * {
 *      creationDate: Date(2019-09-06, 14:18:32)
 *      humor: {
 *          emotion: "😡"
 *          text: "Raiva"
 *      }
 *      bloodPressure: "12/8"
 *      stressLevel: "Alto"
 *      symptoms: ["Desânimo", "Dores no corpo"]
 *      medicines: ["Diclofenaco", "ASS"]
 * }
 */

// =========================================================

/**
 * Exemplo da mesma entrada no diário armazenada no Firebase:
 * 
 * 20190906: {
 *      141832: {
 *          // campos no mesmo formato usado no app (ver acima)
 *      }
 * }
 */
