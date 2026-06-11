import React from "react";
import s from "./styles/Table.module.scss";

export const StandardTable = ({ columns = [], rows = [] }) => {
    if (!columns.length || !rows.length) return null;

    return (
        <div className={s.tableWrapper}>
            <table className={s.table}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.map((cell, cellIdx) => (
                                <td key={cellIdx}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
