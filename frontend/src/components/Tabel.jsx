import React from "react";
import "./Tabel.css";
import { TabelRow } from "./TabelRow"; 
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

export const Tabel = ({ data, setData, onDelete, onEdit }) => {
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
                            id={item.id}
                            nama={item.name}
                            deskripsi={item.description}
                            ditambahkanPada={formatDate(item.createdAt)}
                            onEdit={() => onEdit(item.id)}
                            onDelete={() => onDelete(item.id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};