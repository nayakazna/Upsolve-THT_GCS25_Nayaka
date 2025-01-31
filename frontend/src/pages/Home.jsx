import React, { useState, useEffect } from 'react';
import { Tabel } from '../components/Tabel';
import { Button } from '../components/Button';

function Home() {
    const [data, setData] = useState([]);

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

        const response = await fetch('http://localhost:8000/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        });

        const createdItem = await response.json();
        setData([...data, createdItem]);
    };

    const handleDelete = async (itemId) => {
        await fetch(`http://localhost:8000/items/${itemId}`, { method: 'DELETE' });
        setData(data.filter(item => item.id !== itemId));
    };

    const handleEdit = async (itemId) => {
        const itemToEdit = data.find(item => item.id === itemId);
        const newName = prompt("Enter new name:", itemToEdit.name);
        if (newName === null) return;
        const newDescription = prompt("Enter new description:", itemToEdit.description);
        if (newDescription === null) return;

        const response = await fetch(`http://localhost:8000/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, description: newDescription }),
        });

        const updatedItem = await response.json();
        setData(data.map(item => (item.id === itemId ? updatedItem : item)));
    };

    return (
        <div className="Home">
            <h1>Items List</h1>
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

export default Home;
