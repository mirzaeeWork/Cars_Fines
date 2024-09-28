import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertToPersianNumbers, MiladiToShamsi, splitIntoThreeDigits } from '../../../utils/replaceNumber';
import { MdDensitySmall } from "react-icons/md";
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#6738be',
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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

export default function CustomizedTables({ showData }) {
  // محاسبه جمع کل amount ها
  const totalAmount = showData.reduce((acc, row) => acc + (row.amount || 0), 0);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">شرح تخلف</StyledTableCell>
            <StyledTableCell align="center">کد تخلف</StyledTableCell>
            <StyledTableCell align="center">محل تخلف</StyledTableCell>
            <StyledTableCell align="center">تاریخ</StyledTableCell>
            <StyledTableCell align="center">شناسه پرداخت</StyledTableCell>
            <StyledTableCell align="center">پلاک</StyledTableCell>
            <StyledTableCell align="center">مبلغ (ریال)</StyledTableCell>
            <StyledTableCell align="center">عملیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showData.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.violation_title}
              </StyledTableCell>
              <StyledTableCell align="center">
                {convertToPersianNumbers(String(row.violation_code) || '')}
              </StyledTableCell>
              <StyledTableCell align="center">
                {convertToPersianNumbers(String(row.violation_location) || '')}
              </StyledTableCell>
              <StyledTableCell align="center">
                {convertToPersianNumbers(MiladiToShamsi(row.date))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {convertToPersianNumbers(String(row.payment_id) || '')}
              </StyledTableCell>
              <StyledTableCell align="center">
                {convertToPersianNumbers(String(row.license_plate) || '')}
              </StyledTableCell>
              <StyledTableCell align="center">
                {convertToPersianNumbers(splitIntoThreeDigits(String(row.amount) || ''))}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`car-fines/${row.id}`}><MdDensitySmall /></Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}

          {/* ردیف اضافی برای نمایش جمع کل */}
          <StyledTableRow>
            <StyledTableCell align="center" colSpan={6} component="th" sx={{ fontWeight: 'bold' }}>
              جمع کل مبلغ:
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
              {convertToPersianNumbers(splitIntoThreeDigits(String(totalAmount)))}
            </StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
