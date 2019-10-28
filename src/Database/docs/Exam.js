
/**
 * Documentação da estrutura de um exame usado dentro da aplicação e de como
 * é armazenado no Firebase.
 */

// =========================================================
//                         ESTRUTURA
// =========================================================

/**
 * Estrutura dos dados de um exame usado dentro do app:
 * 
 * class Exam {
 *      creationDate: Date
 *      name: string
 *      description: string
 *      images: string[] // nomes dos arquivos de imagem salvos no Firebase Storage
 * }
 * 
 * O atributo `images` contém uma lista com o nome das imagens do exame conforme
 * persistidas no Firebase Storage. Os itens da lista contém apenas o nome do
 * arquivo, e não o caminho completo para o mesmo.
 * 
 * O caminho completo para uma imagem de um exame é obtido conforme documentado em `docs/Storage.js`:
 * 
 *      `${user_id}/exams/${exam.creationDate.getTime()}/${img_name}`
 * 
 */

// =========================================================

/**
 * Estrutura dos dados de um exame usado no Firebase:
 * 
 * [creationDate: number (timestamp)]: {
 *     // demais campos no mesmo formato usado no app (ver acima)
 * }
 */

// =========================================================
//                         EXEMPLOS
// =========================================================

/**
 * Exemplo de exame dentro do app:
 * 
 * {
 *      creationDate: Date(2019-09-06, 14:18:32)
 *      name: "Dr. Carlos"
 *      description: "Visita ao cardiologista para check-up de rotina."
 *      images: ["img1.jpg", "img2.jpg", "img3.jpg"]
 * }
 */

// =========================================================

/**
 * Exemplo do mesmo exame armazenado no Firebase:
 * 
 * 1567790312000: {
 *      // demais campos no mesmo formato usado no app (ver acima)
 * }
 */
