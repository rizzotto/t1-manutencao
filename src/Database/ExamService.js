
import RNFetchBlob from 'rn-fetch-blob';

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
     * @param {{ mime: "image/jpeg"|"image/png", path: string }[]} images imagens relacionadas ao exame; `path` deve ser o caminho da imagem no sistema de arquivos local
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
            const filename = `img-${index}.${this._buildExtension(image.mime)}`

            try {
                await this.uploadImage(imagesBasePath, filename, image.path)
                exam.images.push(filename)
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
     * Busca as URLs para download das imagens de um exame.
     * 
     * @param {string} userId ID do usuário que criou o exame
     * @param {any} exam exame cujas URLs das imagens são requisitadas
     * @returns {Promise<string>[]} array com promises que completam com uma URL de download de imagem, na mesma ordem das imagens em `exam.images`
     */
    getImagesDownloadURLs = (userId, exam) => {
        const basePath = this._buildBasePath(userId, exam)
        return exam.images.map(imageName => {
            return this.storage.ref(`${basePath}/${imageName}`).getDownloadURL()
        })
    }

    /**
     * Persiste uma imagem no Firebase Storage.
     * 
     * @param {string} basePath caminho base para a imagem no storage
     * @param {string} filename nome da imagem (com extensão)
     * @param {string} path caminho da imagem no sistema de arquivos
     * @returns {Promise} promise que completa quando o upload é finalizado
     */
    uploadImage = (basePath, filename, path) => {
        return RNFetchBlob.fs.readFile(path, "base64")
            .then(data => {
                return this.storage.ref(`${basePath}/${filename}`).putString(data, "base64")
            })
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

    /**
     * Converte um MIME type de imagem para extensão de arquivo.
     * 
     * @param {"image/jpeg"|"image/png"} mimeType MIME type da imagem (apenas `image/jpeg` e `image/png` são suportados)
     * @returns {string} extensão de acordo com o mime
     */
    _buildExtension = (mimeType) => {
        const validMimeTypes = ["image/jpeg", "image/png"]
        if (!validMimeTypes.includes(mimeType)) {
            return Promise.reject("invalid mime type")
        }

        return mimeType.split("/").splice(-1)[0]
    }
}
