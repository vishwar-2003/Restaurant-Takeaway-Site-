const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Correct absolute path to menu.json
const menuPath = path.join(__dirname, 'data', 'menu.json');

// GET /api/menu
app.get('/api/menu', (req, res) => {
  try {
    const data = fs.readFileSync(menuPath);
    const menuData = JSON.parse(data);
    res.json(menuData);
  } catch (err) {
    console.error('Error reading menu.json:', err);
    res.status(500).json({ error: 'Failed to load menu data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/menu`);
});


app.put('/api/menu/:name', (req, res) => {
  const { name } = req.params;
  const { price } = req.body;

  const data = fs.readFileSync(menuPath);
  const menu = JSON.parse(data);

  const itemIndex = menu.findIndex(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (itemIndex !== -1) {
    menu[itemIndex].price = price;
    fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
    res.json({ success: true, updated: menu[itemIndex] });
  } else {
    // 🔍 Debug here
    console.log("Menu item names:", menu.map(item => item.name));
    console.log("User tried to update:", name);
    res.status(404).json({ error: 'Item not found' });
  }
});


// POST route to add a new dish
app.post('/api/menu', (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const data = fs.readFileSync(menuPath);
  const menu = JSON.parse(data);

  // Check if dish already exists
  const exists = menu.some(item => item.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return res.status(409).json({ error: 'Dish already exists' });
  }

  // Add new dish
  const newDish = { name, price };
  menu.push(newDish);
  fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));

  res.status(201).json({ success: true, added: newDish });
});