import { database as firebaseDatabase } from './Firebase';
import AnamnesisService from "./AnamnesisService";
import JournalService from './JournalService';

const databaseServices = {
    anamnesis: new AnamnesisService(firebaseDatabase),
    journal: new JournalService(firebaseDatabase)
}

export default databaseServices;
