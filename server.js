import express from 'express';
import path from 'path';

const app = express();
const PORT = 3001;


app.use(express.static(path.join(import.meta.dirname, 'dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});