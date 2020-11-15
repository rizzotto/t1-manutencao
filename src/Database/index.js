// cria os serviços de persistência injetando as dependências necessárias

import { database as firebaseDatabase, storage as firebaseStorage } from './Firebase';
import AnamnesisService from "./AnamnesisService";
import JournalService from './JournalService';
import ExamService from './ExamService';
import UserService from './UserService';

const anamnesisService = new AnamnesisService(firebaseDatabase);
const journalService = new JournalService(firebaseDatabase);
const userService = new UserService(firebaseDatabase, firebaseStorage);
const examService = new ExamService(firebaseDatabase, firebaseStorage);

export { anamnesisService, journalService, examService, userService };
