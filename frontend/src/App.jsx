import { useState, useEffect } from 'react';
import './App.css';
import { Tabel } from './components/Tabel';
import { Button } from './components/Button';

function App() {
    const [data, setData] = useState([]);

  // Fetch data from the backend
    useEffect(() => {
    fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await fetch('http://localhost:8000/items');
        const items = await response.json();
        setData(items);
    };

    const addItem = async () => {
        const newName = prompt("Enter name:");
        if (newName === null) return;
        const newDescription = prompt("Enter description:");
        if (newDescription === null) return;
        const newItem = { name: newName, description: newDescription };

        // Send a POST request to add the new item
        const response = await fetch('http://localhost:8000/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        });

        const createdItem = await response.json();
        setData([...data, createdItem]);
    };

    const handleDelete = async (itemId) => {
    // Send a DELETE request
    console.log("Deleting item with ID:", itemId); 
    await fetch(`http://localhost:8000/items/${itemId}`, {
        method: 'DELETE',
    });
    
    const newData = data.filter(item => item.id !== itemId);
    setData(newData);
    };

    const handleEdit = async (itemId) => {
        console.log("Editing item with ID:", itemId);
        const itemToEdit = data.find(item => item.id === itemId);
        const newName = prompt("Enter new name:", itemToEdit.name);
        if (newName === null) return;
        const newDescription = prompt("Enter new description:", itemToEdit.description);
        if (newDescription === null) return;

        // Send a PUT request to update the item
        const response = await fetch(`http://localhost:8000/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: newName, description: newDescription }),
    });

    const updatedItem = await response.json();
    setData(data.map(item => (item.id === itemId ? updatedItem : item)));
    };

    return (
    <div className="App">
        <Tabel 
            data={data}
            setData={setData}
            onDelete={handleDelete}
            onEdit={handleEdit}
        />
        <div style={{ height: '20px' }}></div>
        <Button 
            type="add"
            style={{ width: '100%' }}
            onClick={addItem}
        />
    </div>
    );
}

export default App;