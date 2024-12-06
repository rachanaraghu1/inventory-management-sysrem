const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Item Schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.post('/addItem', async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const newItem = new Item({ name, quantity, price });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error adding item', error });
  }
});

app.get('/getItems', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching items', error });
  }
});

app.put('/updateItem/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, quantity, price }, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
});

app.delete('/deleteItem/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting item', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
