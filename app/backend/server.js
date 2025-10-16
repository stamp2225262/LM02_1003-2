import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
app.use(express.json());

//-- START HELPER --
const DATA_FILE = path.join(__dirname, 'petdb.json');

app.get('/', (req, res) => {
res.send('Hello World!')
})

const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading petdb.json:", error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error("Error writing petdb.json:", error);
  }
};
//-- END HELPER --

app.use(express.json());
app.use(cors());

// Route: GET สัตว์เลี้ยงทั้งหมด
app.get('/api/get/petlist', (req, res) => {
  const data = readData();
  res.json(data);
});

// Route: GET รายละเอียดสัตว์เลี้ยงตาม ID
app.get('/api/getpets/:pet_id', (req, res) => {
  const itemId = parseInt(req.params.pet_id);
  const data = readData();
  const item = data.find(item => item.petId === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Pet not found' });
  }
});

// Route: POST เพิ่มข้อมูลสัตว์เลี้ยงใหม่
app.post('/api/insert', (req, res) => {
  const newData = req.body;
  const data = readData();

  const newId = data.length > 0 ? Math.max(...data.map(item => item.petId)) + 1 : 1;
  const itemToAdd = { petId: newId, ...newData };

  data.push(itemToAdd);
  writeData(data);

  res.status(201).json({ message: 'Data added successfully', addedItem: itemToAdd });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
