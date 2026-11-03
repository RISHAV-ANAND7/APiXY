import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip
} from '@mui/material';
import AddRow from './AddRow';
import { PlusIcon, TrashIcon } from './Icons';

const CreateTable = ({ text, data = [], setData }) => {
  const [rows, setRows] = useState([0]);

  useEffect(() => {
    if (data && data.length > 0) {
      setRows(data.map((_, i) => i).concat([data.length]));
    } else {
      setRows([0]);
    }
  }, [data]);

  const handleAddNewRow = () => {
    const nextId = rows.length > 0 ? Math.max(...rows) + 1 : 0;
    setRows((prev) => [...prev, nextId]);
  };

  const handleClearAll = () => {
    setData([]);
    setRows([0]);
  };

  const activeCount = data.filter((d) => d.check && d.key).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {/* Table Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" sx={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '13px' }}>
            {text}
          </Typography>
          {activeCount > 0 && (
            <Chip
              label={`${activeCount} active`}
              size="small"
              sx={{
                height: 20,
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: 'var(--accent-subtle)',
                color: 'var(--accent-color)',
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            onClick={handleAddNewRow}
            startIcon={<PlusIcon size={13} />}
            sx={{
              color: 'var(--accent-color)',
              fontSize: '12px',
              backgroundColor: 'var(--accent-subtle)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { filter: 'brightness(1.1)' },
            }}
          >
            Add Row
          </Button>

          {data.length > 0 && (
            <Button
              size="small"
              onClick={handleClearAll}
              startIcon={<TrashIcon size={12} />}
              sx={{
                color: 'var(--text-muted)',
                fontSize: '12px',
                textTransform: 'none',
                '&:hover': { color: 'var(--method-delete)' },
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>

      {/* Table Container */}
      <Box
        sx={{
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-input)',
        }}
      >
        <Table size="small">
          <TableHead sx={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <TableRow>
              <TableCell sx={{ width: 44, borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }} />
              <TableCell sx={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.05em' }}>
                KEY
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.05em' }}>
                VALUE
              </TableCell>
              <TableCell sx={{ width: 38, borderBottom: '1px solid var(--border-color)' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((rowId, index) => (
              <AddRow
                addRows={setRows}
                rowId={rowId}
                key={rowId || index}
                data={data}
                setData={setData}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default CreateTable;
