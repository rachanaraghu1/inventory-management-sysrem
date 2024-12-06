import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });
  const [updateItem, setUpdateItem] = useState({ id: '', name: '', quantity: '', price: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getItems');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5000/addItem', newItem);
      fetchItems();
      setNewItem({ name: '', quantity: '', price: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      await axios.put(`http://localhost:5000/updateItem/${updateItem.id}`, updateItem);
      fetchItems();
      setUpdateItem({ id: '', name: '', quantity: '', price: '' });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteItem/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>

      <h2>Add Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <button onClick={handleAddItem}>Add Item</button>

      <h2>Update Item</h2>
      <input
        type="text"
        placeholder="ID"
        value={updateItem.id}
        onChange={(e) => setUpdateItem({ ...updateItem, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={updateItem.name}
        onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={updateItem.quantity}
        onChange={(e) => setUpdateItem({ ...updateItem, quantity: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={updateItem.price}
        onChange={(e) => setUpdateItem({ ...updateItem, price: e.target.value })}
      />
      <button onClick={handleUpdateItem}>Update Item</button>

      <h2>Inventory Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity} - ${item.price}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
