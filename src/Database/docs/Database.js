
/**
 * Documentação da estrutura geral dos dados armazenados no Firebase Realtime Database.
 */

// =========================================================
//                         ESTRUTURA
// =========================================================

/**
 * Estrutura a partir da raiz do Realtime Database:
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
 *          exams: {
 *              [creationDate: number (timestamp)]: Exam
 *          }
 *     }
 * }
 */

// =========================================================
//                          EXEMPLO
// =========================================================

/**
 * Exemplo a partir da raiz do Realtime Database:
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
 * 
 *          exams: {
 *              1567790349000: {
 *                  // dados do exame
 *              },
 *              1567609733000: {
 *                  // dados do exame
 *              }
 *          }
 *      }
 * }
 */
