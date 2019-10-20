
/**
 * Serviço de persistência de anamneses no Firebase.
 * 
 * Ver documentação associada em `docs/Exam.js`.
 */
export default class ExamService {
    /**
     * Inicializa o serviço usando uma instância do Firebase Realtime Database e do Firebase Storage.
     */
    constructor(database, storage) {
        this.db = database
        this.storage = storage
    }

    /**
     * Salva um exame com suas imagens  no Firebase.
     * 
     * Qualquer valor em `exam.images` será sobrescrito com a lista com o nome
     * das imagens cujo upload teve sucesso. Se o upload de uma imagem falha,
     * essa é descartada (não terá uma entrada correspondente em `exam.images`).
     * Se o upload de todas as imagens falhar, o exame **não** é persistido.
     * 
     * @param {string} userId ID do usuário que está criando o exame
     * @param {any} exam estrutura com dados do exame (ver `docs/Exam.js`); o atributo `images` é sobrescrito
     * @param {{ mime: "image/jpeg"|"image/png", data: string }[]} images imagens relacionadas ao exame; `data` deve ser o conteúdo da imagem em base64
     * @returns {Promise} promise que completa quando o upload de todas as imagens é concluído e o exame é persistido
     */
    saveExam = async (userId, exam, images) => {
        const imagesBasePath = this._buildBasePath(userId, exam)

        const creationDate = exam.creationDate
        exam.creationDate = null

        // começar com lista vazia e adicionar nome nas imagens cujo upload deu certo
        exam.images = []

        for (const index in images) {
            const image = images[index]
            const name = `img-${index}`

            try {
                await this.uploadImage(imagesBasePath, name, image.mime, image.data)
                exam.images.push(name)
            } catch (error) {
                // ignorar erros
            }
        }

        // se todos os uploads falharam, não salvar o exame
        if (exam.images.length === 0) {
            throw "failed to upload all images"
        }

        // só depois de pelo menos um upload de imagem ter dado certo, salvamos o exame no database
        return this.db.ref(`${userId}/exams/${creationDate.getTime()}`).set(exam)
    }

    /**
     * Persiste uma imagem no Firebase Storage.
     * 
     * @param {string} basePath caminho base para a imagem no storage
     * @param {string} name nome da imagem (sem extensão)
     * @param {"image/jpeg"|"image/png"} mimeType MIME type da imagem (apenas `image/jpeg` e `image/png` são suportados)
     * @param {string} base64Data string representando a imagem no formato base64
     * @returns {Promise} promise que completa quando o upload é finalizado
     */
    uploadImage = (basePath, name, mimeType, base64Data) => {
        const validMimeTypes = ["image/jpeg", "image/png"]
        if (!validMimeTypes.includes(mimeType)) {
            return Promise.reject("invalid mime type")
        }

        const extension = mimeType.split("/").splice(-1)[0]
        const filename = `${name}.${extension}`

        return this.storage.ref(`${basePath}/${filename}`).putString(base64Data, "base64")
    }

    /**
     * Constrói o caminho base no Storage para arquivos de imagem de um exame.
     * 
     * @param {string} userId ID do usuário que criou o exame
     * @param {{creationDate: Date}} exam exame (ver `docs/Exam.js`); apenas o campo `creationDate` é requerido
     * @returns {string} caminho no Storage para arquivos de imagem do exame
     */
    _buildBasePath = (userId, exam) => {
        return `${userId}/exams/${exam.creationDate.getTime()}`
    }
}
