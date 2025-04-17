import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import '../styles/admin/MenuAdmin.css'; // Importing custom CSS for Admin Menu page
import axios from 'axios'; // Importing axios for API requests

/**
 * AdminMenu component handles the management of menu items in the admin dashboard.
 * It allows adding, editing, and deleting menu items.
 */
const AdminMenu = () => {
    // State to manage the list of menu items
    const [menuItems, setMenuItems] = useState([]);

    // State to manage the menu item being edited
    const [editMenuItem, setEditMenuItem] = useState(null);

    // State to manage the new item data when adding a new menu item
    const [newItemData, setNewItemData] = useState({
        name: '',
        price: '',
        category: 'Starters',
        description: '',
    });

    // State to manage the updated data for an item being edited
    const [updatedData, setUpdatedData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
    });

    // State to manage whether the add/edit modal is open or not
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

    /**
     * Fetch menu items from the backend when the component mounts.
     * This is called once when the component is first rendered.
     */
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/admin/menu') // API endpoint to fetch all menu items
            .then((res) => {
                setMenuItems(res.data); // Update state with the fetched menu items
            })
            .catch((err) => {
                console.error('Error fetching menu items:', err);
            });
    }, []); // Empty dependency array to run this effect only once on mount

    /**
     * Handles input changes for editing an existing menu item.
     * @param {Object} e - The event object containing the updated input data.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /**
     * Handles input changes for adding a new menu item.
     * @param {Object} e - The event object containing the updated input data.
     */
    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItemData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /**
     * Handles the click of the "Edit" button for a menu item.
     * Opens the modal and loads the existing menu item data for editing.
     * @param {Object} item - The menu item to be edited.
     */
    const handleEditClick = (item) => {
        setEditMenuItem(item); // Set the item being edited
        setUpdatedData({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description,
        });
        setIsAddMenuOpen(true); // Open the modal for editing
    };

    /**
     * Handles the click of the "Save Changes" button in the edit modal.
     * Sends the updated data to the backend and updates the state with the new data.
     */
    const handleSaveClick = () => {
        axios
            .put(`http://localhost:5000/api/admin/menu/${editMenuItem._id}`, updatedData) // Send the updated item data to the server
            .then((res) => {
                const updatedItems = menuItems.map((item) =>
                    item._id === res.data._id ? res.data : item // Update the item in the state
                );
                setMenuItems(updatedItems); // Update the menu items state
                setIsAddMenuOpen(false); // Close the modal
                setEditMenuItem(null); // Reset the editMenuItem state
                setUpdatedData({
                    name: '',
                    price: '',
                    category: '',
                    description: '',
                }); // Reset the updated data
            })
            .catch((err) => {
                console.error('Error updating menu item:', err);
            });
    };

    /**
     * Handles the click of the "Delete" button for a menu item.
     * Deletes the item from the backend and removes it from the state.
     * @param {string} itemId - The ID of the menu item to be deleted.
     */
    const handleDeleteClick = (itemId) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) { // Confirm deletion
            axios
                .delete(`http://localhost:5000/api/admin/menu/${itemId}`) // Send DELETE request to the server
                .then(() => {
                    setMenuItems(menuItems.filter(item => item._id !== itemId)); // Remove the deleted item from the state
                    alert('Menu item deleted successfully!');
                })
                .catch((err) => {
                    console.error('Error deleting menu item:', err);
                    alert('Failed to delete menu item');
                });
        }
    };

    /**
     * Handles the click of the "Add New Item" button.
     * Sends the new menu item data to the backend to add it to the menu.
     */
    const handleAddNewItem = () => {
        axios
            .post('http://localhost:5000/api/admin/menu', newItemData) // Send POST request to add a new item
            .then((res) => {
                setMenuItems([...menuItems, res.data]); // Add the new item to the menu list
                setNewItemData({
                    name: '',
                    price: '',
                    category: 'Starters',
                    description: '',
                }); // Reset the form data
                setIsAddMenuOpen(false); // Close the add menu item form
            })
            .catch((err) => {
                console.error('Error adding new menu item:', err);
            });
    };

    return (
        <div className="menu-container">
            <h2>Admin Menu</h2>

            {/* Button to open the modal for adding a new menu item */}
            <button
                className="add-menu-item-btn"
                onClick={() => setIsAddMenuOpen(true)} // Open the modal for adding new item
            >
                Add New Item
            </button>

            {/* Modal for adding or editing a menu item */}
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
                            <option value="Drinks">Drinks</option>
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

            {/* Menu Table displaying all menu items */}
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
