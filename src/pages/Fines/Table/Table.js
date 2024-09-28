import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertToPersianNumbers, splitIntoThreeDigits } from '../../../utils/replaceNumber';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DeleteConfirmationModal from '../../shared-component/DeleteConfirmationModal ';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#6738be',
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ showData, handleClick }) {

  const [open, setOpen] = React.useState(false);
  const [Id, setId] = React.useState(false);


  const handleModal = () => {
    setOpen(!open);
  };

  const confirmDelete = async () => {
    // Call the handleClick function to perform the deletion
    await handleClick(Id);
    handleModal(); // Close the modal after deletion
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">کد تخلف</StyledTableCell>
              <StyledTableCell align="center">عنوان تخلف</StyledTableCell>
              <StyledTableCell align="center">مبلغ (ریال)</StyledTableCell>
              <StyledTableCell align="center">عملیات</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">
                  {convertToPersianNumbers(String(row.violation_code) || '')}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.violation_title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {convertToPersianNumbers(splitIntoThreeDigits(String(row.amount) || ''))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/fines/${row.id}`}><MdEdit style={{ fontSize: '20px', color: '#6738be' }} /></Link>
                  <MdDelete
                    style={{ fontSize: '20px', marginRight: '20px', color: '#6738be' }}
                    onClick={() => {
                      handleModal();
                      setId(row.id)
                    }}

                  />
                </StyledTableCell>

              </StyledTableRow>

            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmationModal
        message='آیا از حذف این تخلف مطمئن هستید؟'
        open={open}
        handleClose={handleModal}
        confirmDelete={confirmDelete}
      />

    </>
  );
}
