const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3111;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Sample Schema
const Item = mongoose.model('Item', new mongoose.Schema({
  name: String
}));

// CRUD APIs
app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).send(item);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.put('/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(item);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
