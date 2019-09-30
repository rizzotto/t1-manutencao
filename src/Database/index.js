// cria os serviços de persistência injetando as dependências necessárias

import { database as firebaseDatabase } from './Firebase';
import AnamnesisService from "./AnamnesisService";
import JournalService from './JournalService';

const anamnesisService = new AnamnesisService(firebaseDatabase);
const journalService = new JournalService(firebaseDatabase);

export { anamnesisService, journalService };
