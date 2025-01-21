import React, { useState } from "react";
import "./Tabel.css";
import { TabelRow } from "./TabelRow"; 

export const Tabel = ({data, setData}) => {

    const [editItem, setEditItem] = useState(null);

    const handleEdit = (nama) => {
        const itemToEdit = data.find(item => item.nama === nama);
        const newName = prompt("Enter new name:", itemToEdit.nama);
        if (newName === null) return;
        const newDescription = prompt("Enter new description:", itemToEdit.deskripsi);
        if (newDescription === null) return;
        const newData = data.map(item => 
            item.nama === nama 
            ? { ...item, nama: newName, deskripsi: newDescription } 
            : item
        );
        setData(newData);
        console.log(`Edit ${nama}`);
    };

    const handleDelete = (nama) => {
        const newData = data.filter(item => item.nama !== nama);
        setData(newData);
        console.log(`Deleted ${nama}`);
    };

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Ditambahkan pada</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <TabelRow
                            key={index}
                            nama={item.nama}
                            deskripsi={item.deskripsi}
                            ditambahkanPada={item.ditambahkanPada}
                            onEdit={() => handleEdit(item.nama)}
                            onDelete={() => handleDelete(item.nama)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};