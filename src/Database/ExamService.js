
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'react-native-uuid';

/**
 * @typedef {Object} ImageObject
 * @property {"local"|"remote"} type tipo da imagem:
 *   - `"local"`: imagem que está no dispositivo do usuário, ainda não persistida no firebase
 *   - `"remote"`: imagem que está persistida no firebase
 * @property {string} [name] nome da imagem (apenas imagens remotas)
 * @property {"image/png"|"image/jpeg"} [mime] MIME type da imagem (apenas imagens locais)
 * @property {string} [uri] localização da imagem
 *   - imagens locais: URL da imagem no dispositivo, sempre disponível;
 *   - imagens remotas: URL para download da imagem, disponível depois que a promise for concluída; disponível quando `promise == null` (ver abaixo)
 * @property {Promise<string>} [promise] promise que completa com a URL de download da imagem (apenas imagens remotas); quando a promise completa, o valor no campo `uri` é atualizado e esse campo é setado para `null`
 */

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
     * Cria um exame e salva suas imagens no Firebase.
     * 
     * Qualquer valor em `exam.images` será sobrescrito com a lista com o nome
     * das imagens cujo upload teve sucesso. Se o upload de uma imagem falha,
     * essa é descartada (não terá uma entrada correspondente em `exam.images`).
     * Se o upload de todas as imagens falhar, o exame **não** é persistido.
     * 
     * @param {string} userId ID do usuário que está criando o exame
     * @param {any} exam estrutura com dados do exame (ver `docs/Exam.js`); o atributo `images` é sobrescrito
     * @param {ImageObject[]} images imagens relacionadas ao exame; `uri` deve ser o caminho da imagem no sistema de arquivos local
     * @returns {Promise} promise que completa quando o upload de todas as imagens é concluído e o exame é persistido
     */
    createExam = async (userId, exam, images) => {
        const imagesBasePath = this._buildBasePath(userId, exam)

        const creationDate = exam.creationDate
        exam.creationDate = null

        // começar com lista vazia e adicionar nome nas imagens cujo upload deu certo
        exam.images = []

        for (const image of images) {
            if (image.type !== "local") {
                throw "cannot create an exam with remote images"
            }

            const filename = `img-${uuid.v4()}.${this._buildExtension(image.mime)}`

            try {
                await this._uploadImage(imagesBasePath, filename, image.uri)
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
     * Retorna as imagens de um exame.
     * 
     * @param {string} userId ID do usuário que criou o exame
     * @param {any} exam exame cujas URLs das imagens são requisitadas
     * @return {ImageObject[]} array com informações das imagens do exame, na mesma order das imagens em `exam.images`
     */
    getImages = (userId, exam) => {
        const basePath = this._buildBasePath(userId, exam)

        return exam.images.map(imageName => {
            // promise da url de download da imagem
            const promise = this.storage.ref(`${basePath}/${imageName}`).getDownloadURL()

            // objeto que representa uma imagem
            const imageObject = {
                type: "remote",
                name: imageName,
                promise
            }

            // quando a promise completa, atualiza o objeto que representa a imagem para ter a url
            // retornada, e remove a promise do objeto (porque não é mais necessária)
            promise.then(url => {
                imageObject.uri = url
                imageObject.promise = null
            })

            return imageObject
        })
    }

    /**
     * Retorna todos os exames de um usuário, junto às imagens (`imageObjects`).
     * 
     * @param {string} userId ID do usuário cujos exames devem ser listados
     * @returns {any[]} exames do usuário, do mais recente ao mais antigo; cada exame também tem uma propriedade `imageObjects` com um array de `ImageObject`, com as promises para URL de download das imagens
     */
    listExams = async (userId) => {
        const snap = await this.db.ref(`${userId}/exams`).orderByKey().once("value")
        const value = snap.val()

        return Object.keys(value)
            .map(timestamp => {
                const exam = value[timestamp]
                exam.creationDate = new Date(parseInt(timestamp))

                exam.imageObjects = this.getImages(userId, exam)

                return exam
            })
            .sort((a, b) => a.creationDate < b.creationDate)
    }

    // TODO: deleteExam, updateExam

    //
    // FUNÇÕES AUXILIARES
    //

    /**
     * Persiste uma imagem no Firebase Storage.
     * 
     * @param {string} basePath caminho base para a imagem no storage
     * @param {string} filename nome da imagem (com extensão)
     * @param {string} path caminho da imagem no sistema de arquivos
     * @returns {Promise} promise que completa quando o upload é finalizado
     */
    _uploadImage = (basePath, filename, path) => {
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
