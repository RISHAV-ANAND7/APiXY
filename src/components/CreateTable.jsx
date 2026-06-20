import { useState } from 'react';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import AddRow from './AddRow';

const CreateTable = ({ text, data, setData }) => {
  const [rows, addRows] = useState([0]);

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2, color: 'var(--text-secondary)', fontWeight: 600 }}>
        {text}
      </Typography>
      <Table 
        sx={{ 
          minWidth: "100%", 
          border: "1px solid var(--border-color)",
          borderRadius: '8px',
          overflow: 'hidden'
        }} 
        size="small"
      >
        <TableHead sx={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <TableRow>
            <TableCell sx={{ borderBottom: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", width: 50 }}></TableCell>
            <TableCell sx={{ borderBottom: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", color: 'var(--text-secondary)', fontWeight: 600 }}>KEY</TableCell>
            <TableCell sx={{ borderBottom: "1px solid var(--border-color)", color: 'var(--text-secondary)', fontWeight: 600 }}>VALUE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <AddRow 
              addRows={addRows}
              rowId={index}
              key={index}
              data={data}
              setData={setData}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default CreateTable;