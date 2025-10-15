import express from 'express';
import .......... from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = ..........()
const port = ..........

//-- START HELPER --
// การอ่านข้อมูลจาก petdata.json
const DATA_FILE = path.join(__dirname, 'petdb.json');

const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading perdata.json:", error);
        return [];
    }
};

// การเขียนข้อมูลลง petdata.json
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};
//-- END HELPER --

app.use(express.json());
app.use(..........);

// Route: GET การดึงข้อมูลสัตว์เลี้ยงทั้งหมด
app.get('..........', (req, res) => {
    const data = readData();
    res.json(..........);
});

// Route: GET การดึงรายละเอียดข้อมูลสัตวืเลี้ยงตาม ID
app...........('..........', (req, res) => {
    const itemId = parseInt(..........);
    const data = readData();
    const item = __________.find(item => item.petId === ..........);

    if (item) {
        res.json(..........);
    } else {
        res.status(404).json({ message: 'Pet not found' });
    }
});

// Route: POST การรับข้อมูลจากฟอร์มและเพิ่มรายการสัตว์เลี้ยงใหม่
app...........('..........', (req, res) => {
    const newData = ..........;
    const data = readData();

    const newId = data.length > 0 ? Math.max(...data.map(item => item.petId)) + 1 : 1;
    const itemToAdd = { petId: .........., ...newData };

    data.push(..........);
    writeData(data);

    res.status(201).json({ message: 'Data added successfully', addedItem: itemToAdd });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})