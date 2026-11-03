import React from 'react';
import { TableRow, TableCell, Checkbox, TextField, IconButton } from "@mui/material";
import { TrashIcon } from './Icons';

const AddRow = ({ addRows, rowId, data, setData }) => {
  const currentRow = (data || []).find((entry) => entry.id === rowId) || {};

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const updatedRow = { ...currentRow, id: rowId, check: isChecked };

    setData((prev) => {
      const index = prev.findIndex((item) => item.id === rowId);
      if (index === -1) {
        return [...prev, updatedRow];
      }
      const newArray = [...prev];
      newArray[index] = updatedRow;
      return newArray;
    });

    // Auto-generate new row when checking the last item
    if (isChecked) {
      addRows((oldArr) => {
        if (!oldArr.includes(rowId + 1)) {
          return [...oldArr, rowId + 1];
        }
        return oldArr;
      });
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    // Auto-check when user begins typing
    const isChecked = currentRow.check !== undefined ? currentRow.check : true;
    const updatedRow = { ...currentRow, id: rowId, check: isChecked, [name]: value };

    setData((prev) => {
      const index = prev.findIndex((item) => item.id === rowId);
      if (index === -1) {
        return [...prev, updatedRow];
      }
      const newArray = [...prev];
      newArray[index] = updatedRow;
      return newArray;
    });

    // Auto-add next row if typing in last row
    addRows((oldArr) => {
      if (!oldArr.includes(rowId + 1)) {
        return [...oldArr, rowId + 1];
      }
      return oldArr;
    });
  };

  const handleDeleteRow = () => {
    setData((prev) => prev.filter((item) => item.id !== rowId));
    addRows((oldArr) => (oldArr.length > 1 ? oldArr.filter((id) => id !== rowId) : [0]));
  };

  return (
    <TableRow
      sx={{
        transition: 'background-color 0.15s',
        '&:hover': {
          backgroundColor: 'var(--bg-tertiary)',
          '& .row-delete-btn': { opacity: 1 },
        },
      }}
    >
      {/* Active Checkbox */}
      <TableCell sx={{ width: 44, p: '4px 8px', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
        <Checkbox
          checked={currentRow.check !== undefined ? !!currentRow.check : true}
          size="small"
          onChange={handleCheckboxChange}
          sx={{
            p: 0.5,
            color: 'var(--text-muted)',
            '&.Mui-checked': { color: 'var(--accent-color)' },
          }}
        />
      </TableCell>

      {/* Key Input */}
      <TableCell sx={{ p: 0, borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
        <TextField
          variant="standard"
          placeholder="Key (e.g. limit or Content-Type)"
          InputProps={{
            disableUnderline: true,
            style: {
              padding: '8px 12px',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)',
            },
          }}
          sx={{ width: '100%' }}
          onChange={handleTextChange}
          name="key"
          value={currentRow.key || ''}
        />
      </TableCell>

      {/* Value Input */}
      <TableCell sx={{ p: 0, borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
        <TextField
          variant="standard"
          placeholder="Value (e.g. 10 or {{baseUrl}})"
          InputProps={{
            disableUnderline: true,
            style: {
              padding: '8px 12px',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)',
            },
          }}
          sx={{ width: '100%' }}
          onChange={handleTextChange}
          name="value"
          value={currentRow.value || ''}
        />
      </TableCell>

      {/* Delete Action */}
      <TableCell sx={{ width: 38, p: '2px 4px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <IconButton
          size="small"
          className="row-delete-btn"
          onClick={handleDeleteRow}
          sx={{
            opacity: 0.4,
            p: 0.4,
            color: 'var(--text-muted)',
            '&:hover': { color: 'var(--method-delete)', opacity: 1 },
          }}
        >
          <TrashIcon size={14} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default AddRow;
