import React, { useState, useEffect } from 'react';
import './Menu.css';
import axios from 'axios';

const AdminMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [editMenuItem, setEditMenuItem] = useState(null);
    const [newItemData, setNewItemData] = useState({
        name: '',
        price: '',
        category: 'Starters',
        description: '',
    });
    const [updatedData, setUpdatedData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
    });

    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

    // Fetch menu items from the backend
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/admin/menu')
            .then((res) => {
                setMenuItems(res.data); // Store orders in the state
            })
            .catch((err) => {
                console.error('Error fetching menu items:', err);
            });
    }, []);

    // Handle input changes for editing item
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle input changes for adding a new item
    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItemData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle the edit button click
    const handleEditClick = (item) => {
        setEditMenuItem(item);
        setUpdatedData({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description,
        });
        setIsAddMenuOpen(true); // Open modal for editing
    };

    // Handle save click to update the item
    const handleSaveClick = () => {
        axios
            .put(`http://localhost:5000/api/admin/menu/${editMenuItem._id}`, updatedData)
            .then((res) => {
                const updatedItems = menuItems.map((item) =>
                    item._id === res.data._id ? res.data : item
                );
                setMenuItems(updatedItems);
                setIsAddMenuOpen(false); // Close modal after saving changes
                setEditMenuItem(null);
                setUpdatedData({
                    name: '',
                    price: '',
                    category: '',
                    description: '',
                });
            })
            .catch((err) => {
                console.error('Error updating menu item:', err);
            });
    };

    // Handle delete button click
    const handleDeleteClick = (itemId) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            axios
                .delete(`http://localhost:5000/api/admin/menu/${itemId}`)
                .then(() => {
                    setMenuItems(menuItems.filter(item => item._id !== itemId));
                    alert('Menu item deleted successfully!');
                })
                .catch((err) => {
                    console.error('Error deleting menu item:', err);
                    alert('Failed to delete menu item');
                });
        }
    };

    // Handle add new menu item button click
    const handleAddNewItem = () => {
        axios
            .post('http://localhost:5000/api/admin/menu', newItemData)
            .then((res) => {
                setMenuItems([...menuItems, res.data]); // Add the newly added item to the menu list
                setNewItemData({
                    name: '',
                    price: '',
                    category: 'Starters',
                    description: '',
                }); // Reset the form
                setIsAddMenuOpen(false); // Close the add menu item form
            })
            .catch((err) => {
                console.error('Error adding new menu item:', err);
            });
    };

    return (
        <div className="menu-container">
            <h2>Admin Menu</h2>

            {/* Add New Item Button */}
            <button
                className="add-menu-item-btn"
                onClick={() => setIsAddMenuOpen(true)} // Open the modal for adding new item
            >
                Add New Item
            </button>

            {/* Add New Item Modal */}
            {isAddMenuOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h3>{editMenuItem ? 'Edit' : 'Add'} Menu Item</h3>
                        <input
                            type="text"
                            name="name"
                            value={editMenuItem ? updatedData.name : newItemData.name}
                            onChange={editMenuItem ? handleInputChange : handleNewItemChange}
                            placeholder="Name"
                        />
                        <input
                            type="number"
                            name="price"
                            value={editMenuItem ? updatedData.price : newItemData.price}
                            onChange={editMenuItem ? handleInputChange : handleNewItemChange}
                            placeholder="Price"
                        />
                        <select
                            name="category"
                            value={editMenuItem ? updatedData.category : newItemData.category}
                            onChange={editMenuItem ? handleInputChange : handleNewItemChange}
                        >
                            <option value="Starters">Starters</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Drinks">Drinks</option> {/* New category added */}
                        </select>
                        <textarea
                            name="description"
                            value={editMenuItem ? updatedData.description : newItemData.description}
                            onChange={editMenuItem ? handleInputChange : handleNewItemChange}
                            placeholder="Description"
                        />
                        <button onClick={editMenuItem ? handleSaveClick : handleAddNewItem}>
                            {editMenuItem ? 'Save Changes' : 'Add New Item'}
                        </button>
                        <button className="cancel-button" onClick={() => setIsAddMenuOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Menu Table */}
            <div className="menu-table-container">
                <table className="menu-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button onClick={() => handleEditClick(item)}>Edit</button>
                                    <button onClick={() => handleDeleteClick(item._id)}>Delete</button> {/* Delete button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMenu;
