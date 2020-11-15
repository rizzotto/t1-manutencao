export default class UserService{
    constructor(database, storage) {
        this.db = database;
        this.storage = storage;
    }

    purgeUserData = async (userId) => {
        try{
            await this.db.ref(`${userId}`).remove();
            await this.storage.ref(`${userId}`).delete();
        }catch(e){}
    }
}