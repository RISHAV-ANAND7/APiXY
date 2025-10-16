import { TableRow, TableCell, Checkbox, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  TableCell: {
    border: "1px solid rgba(224, 224, 224, 1)",
    borderCollapse: "collapse",
    padding: "7px 5px !important",
  },
  Checkbox: {
    padding: "2px 5px !important",
  },
  TextField: {
    width: "100%",
  },
}));

const AddRow = ({ addRows, rowId, data, setData }) => {
  const classes = useStyles();

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

    // ✅ Generate new row only when checked
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
    <TableRow>
      <TableCell className={classes.TableCell}>
        <Checkbox
          checked={!!currentRow.check}
          size="large"
          className={classes.Checkbox}
          onChange={handleCheckboxChange}
        />
      </TableCell>
      <TableCell className={classes.TableCell}>
        <TextField
          className={classes.TextField}
          inputProps={{ style: { height: 30, padding: "0 5px" } }}
          onChange={handleTextChange}
          name="key"
          value={currentRow.key || ""}
        />
      </TableCell>
      <TableCell className={classes.TableCell}>
        <TextField
          className={classes.TextField}
          inputProps={{ style: { height: 30, padding: "0 5px" } }}
          onChange={handleTextChange}
          name="value"
          value={currentRow.value || ""}
        />
      </TableCell>
    </TableRow>
  );
};

export default AddRow;
