
/**
 * Documentação da estrutura geral dos dados armazenados no Firebase.
 */

// =========================================================
//                         ESTRUTURA
// =========================================================

/**
 * Estrutura a partir da raiz do Firebase:
 * 
 * {
 *     [userId: string]: {
 *         anamneses: {
 *             [creationDate: number (timestamp)]: AnamnesisRecord
 *         }
 * 
 *          journalEntries: {
 *              [date: number (yyyymmdd)]: {
 *                  [time: number (HHmmss)]: JournalEntry
 *              }
 *          }
 * 
 *         // demais informações serão definidas conforme necessário
 *     }
 * }
 */

// =========================================================
//                          EXEMPLO
// =========================================================

/**
 * Exemplo a partir da raiz do Firebase:
 * 
 * {
 *      "id-usuario-0": {
 *          anamneses: {
 *              1567790312000: {
 *                  // dados da anamnese
 *              },
 *              1567609253000: {
 *                  // dados da anamnese
 *              }
 *          }
 * 
 *          journalEntries: {
 *              20190906: {
 *                  141832: {
 *                      // dados da entrada no diário
 *                  },
 *                  212012: {
 *                      // dados da entrada no diário
 *                  }
 *              }
 *          }
 *      }
 * }
 */
