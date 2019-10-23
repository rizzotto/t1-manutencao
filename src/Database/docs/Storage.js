
/**
 * Documentação da estrutura geral dos dados armazenados no Firebase Storage.
 */

// =========================================================
//                         ESTRUTURA
// =========================================================

/**
 * Estrutura a partir da raiz do Storage:
 * 
 * {
 *     [userId: string]: {
 *          exams: {
 *              [creationDate: number (timestamp)]: File[]
 *          }
 *     }
 * }
 */

// =========================================================
//                          EXEMPLO
// =========================================================

/**
 * Exemplo a partir da raiz do Storage:
 * 
 * {
 *      "id-usuario-0": {
 *          exams: {
 *              1567790349000: File[], // imagens dos exames (sem subpastas)
 *              1567609733000: File[] // imagens dos exames (sem subpastas)
 *          }
 *      }
 * }
 */
