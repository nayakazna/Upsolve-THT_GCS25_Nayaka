import React from "react";
import { Button } from "./Button";

export const TabelRow = ({ nama, deskripsi, ditambahkanPada, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{nama}</td>
            <td>{deskripsi}</td>
            <td>{ditambahkanPada}</td>
            <td>
                <Button type="edit" onClick={onEdit}>Edit</Button>
                <Button type="delete" onClick={onDelete}>Hapus</Button>
            </td>
        </tr>
    );
};