import { TableRow, TableCell, Checkbox, TextField } from "@mui/material";

const AddRow = ({ addRows, rowId, data, setData }) => {
  // Get the current row object (or empty if new)
  const currentRow = data.find((entry) => entry.id === rowId) || {};

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const updatedRow = { ...currentRow, id: rowId, check: isChecked };

    // Update rows array
    setData((prev) => {
      const index = prev.findIndex((item) => item.id === rowId);
      if (index === -1) {
        return [...prev, updatedRow];
      }
      const newArray = [...prev];
      newArray[index] = updatedRow;
      return newArray;
    });

    // Generate new row only when checked
    if (isChecked) {
      addRows((oldArr) => [...oldArr, rowId + 1]);
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const updatedRow = { ...currentRow, id: rowId, [name]: value };

    setData((prev) => {
      const index = prev.findIndex((item) => item.id === rowId);
      if (index === -1) {
        return [...prev, updatedRow];
      }
      const newArray = [...prev];
      newArray[index] = updatedRow;
      return newArray;
    });
  };

  return (
    <TableRow sx={{ '&:hover': { backgroundColor: 'var(--bg-tertiary)' } }}>
      <TableCell sx={{ borderBottom: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", padding: '4px 8px' }}>
        <Checkbox
          checked={!!currentRow.check}
          size="small"
          onChange={handleCheckboxChange}
          sx={{
            color: 'var(--text-secondary)',
            '&.Mui-checked': { color: 'var(--accent-color)' }
          }}
        />
      </TableCell>
      <TableCell sx={{ borderBottom: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", padding: 0 }}>
        <TextField
          variant="standard"
          placeholder="Key"
          InputProps={{ disableUnderline: true, style: { padding: '8px 12px', fontSize: '14px', fontFamily: 'monospace', color: 'var(--text-primary)' } }}
          sx={{ width: '100%' }}
          onChange={handleTextChange}
          name="key"
          value={currentRow.key || ""}
        />
      </TableCell>
      <TableCell sx={{ borderBottom: "1px solid var(--border-color)", padding: 0 }}>
        <TextField
          variant="standard"
          placeholder="Value"
          InputProps={{ disableUnderline: true, style: { padding: '8px 12px', fontSize: '14px', fontFamily: 'monospace', color: 'var(--text-primary)' } }}
          sx={{ width: '100%' }}
          onChange={handleTextChange}
          name="value"
          value={currentRow.value || ""}
        />
      </TableCell>
    </TableRow>
  );
};

export default AddRow;
