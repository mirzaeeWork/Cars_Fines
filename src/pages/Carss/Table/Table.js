import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertToPersianNumbers, } from '../../../utils/replaceNumber';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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

export default function CustomizedTables({ showData, setCrud, setSections, handleClick }) {
  const [open, setOpen] = React.useState(false);


  const handleModal = () => {
    setOpen(!open);
  };

  const confirmDelete = async () => {
    // Call the handleClick function to perform the deletion
    await handleClick();
    handleModal(); // Close the modal after deletion
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> پلاک خودرو</StyledTableCell>
              <StyledTableCell align="center">عملیات</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {showData.map((row, index) => (
              <StyledTableRow key={row.license_plate}>
                <StyledTableCell align="center">
                  {convertToPersianNumbers(String(row.license_plate) || '')}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <MdEdit style={{ fontSize: '20px', color: '#6738be' }}
                    onClick={() => {
                      const licensePlate = row.license_plate; // شماره پلاک کامل

                      // استفاده از regex برای استخراج بخش‌ها
                      const match = licensePlate.match(/ایران\s(\d{2})\s-\s(\d{3})\s([\S]{1,3})\s(\d{2})/);
                      if (match) {
                        const [, section4, section3, section2, section1] = match; // استخراج بخش‌ها از نتایج regex

                        // قرار دادن این بخش‌ها در state
                        setSections({
                          section4: section4,
                          section3: section3,
                          section2: section2,
                          section1: section1,
                          sectionId: row.id
                        });

                        // تغییر وضعیت CRUD به حالت ویرایش
                        setCrud(prev => ({ ...prev, edit: true }));
                      }
                    }}
                  />
                  <MdDelete
                    style={{ fontSize: '20px', marginRight: '20px', color: '#6738be' }}
                    onClick={() => {
                      setSections(prev => ({ ...prev, sectionId: row.id }));
                      setCrud(prev => ({ ...prev, delete: true }));
                      handleModal();
                    }}
                  />
                </StyledTableCell>

              </StyledTableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>


      <DeleteConfirmationModal
        message='آیا از حذف این پلاک مطمئن هستید؟'
        open={open}
        handleClose={handleModal}
        confirmDelete={confirmDelete}
      />
    </>
  );
}
