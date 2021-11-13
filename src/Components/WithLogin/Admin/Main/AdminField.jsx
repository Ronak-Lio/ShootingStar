import React from 'react';
import './AdminField.css';

function AdminField({totalUser,Serial}) {
    return (
        <div className="adminField">
            <div className="adminField__serial">
            {Serial}
            </div>
            <div className="adminField__Name">
              {totalUser?.data.name}
            </div>
            <div className="adminField__Value">
                {totalUser?.data.value}
            </div>
        </div>
    )
}

export default AdminField
