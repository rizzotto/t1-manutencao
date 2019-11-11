
/**
 * Representação de uma imagem dentro do app:
 * 
 * class ImageObject {
 *      type: "local"|"remote"
 *      name: string                    // apenas em imagens remotas
 *      mime: "image/png"|"image/jpeg"  // apenas em imagens locais
 *      uri: string                     // imagens locais: sempre presente; imagens remotas: presente quando `promise == null`
 *      promise: Promise<string>        // apenas em imagens remotas; deixa de estar presente quando a promise é completada
 * }
 * 
 * O tipo `ImageObject` modela a estrutura básica de imagens usadas pelo app. O campo `type` indica
 * se é uma imagem local (ainda não persistida no Firebase) ou remota (persistida no Firebase). Em
 * imagens remotas, o campo `name` armazena o nome da imagem no Firebase (não o caminho completo:
 * por exemplo, se o caminho da imagem é `a/b/c.png`, o atributo `name` armazena apenas `c/png`).
 * 
 * O atributo `mime` armazena o MIME type de imagens locais. Isso é usado para gerar a extensão da
 * imagem, antes de ser persistida no Firebase.
 * 
 * Quando o usuário seleciona uma imagem da galeria, essa possui o campo `uri` preenchido com o
 * caminho da imagem no sistema de arquivos do dispositivo ("file:///var/private/...",
 * "/Users/a/...").
 * 
 * Quando o app precisa exibir imagens do Firebase ao usuário, o objeto retornado pelos serviços
 * atribui ao campo `promise` um objeto do tipo `Promise` que completa com a URL para download da
 * imagem. Quando essa promise é completada (sem erros), a URL de download obtida é atribuída ao
 * campo `uri`, e o campo `promise` é removido.
 * 
 * Exemplo de imagens selecionadas a partir da galeria do dispositivo:
 * 
 *      [
 *          { type: "local", mime: "image/png", uri: "file:///var/private/.../a.png" },
 *          { type: "local", mime: "image/jpeg", uri: "file:///tmp/b.jpeg" }
 *      ]
 * 
 * Exemplo de imagens obtidas a partir do Firebase:
 * 
 * - assim que são retornadas pelos serviços:
 * 
 *      [
 *          { type: "remote", name: "img-qotewyr.png", promise: [object] },
 *          { type: "remote", name: "img-ajfhskd.jpg", promise: [object] }
 *      ]
 * 
 * - conforme as promises vão completando, os objetos são atualizados:
 * 
 *      [
 *          { type: "remote", name: "img-qotewyr.png", promise: [object] },
 *          { type: "remote", name: "img-ajfhskd.jpg", uri: "https://firebase.google.com/.../img-ajfhskd.png" }
 *      ]
 * 
 * - quando todas as promises completam (com sucesso):
 * 
 *      [
 *          { type: "remote", name: "img-qotewyr.png", uri: "https://firebase.google.com/.../img-qotewyr.png" },
 *          { type: "remote", name: "img-ajfhskd.jpg", uri: "https://firebase.google.com/.../img-ajfhskd.png" }
 *      ]
 * 
 */

