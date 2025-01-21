import React from "react";
import "./Button.css";

export const Button = ({ type, onClick }) => {
    const getButtonLabel = () => {
        switch (type) {
            case "add":
                return "Tambah";
            case "edit":
                return "Edit";
            case "delete":
                return "Hapus";
            default:
                return "Button";
        }
    };

    return (
        <div>
            <button onClick={onClick}>{getButtonLabel()}</button>
        </div>
    );
};