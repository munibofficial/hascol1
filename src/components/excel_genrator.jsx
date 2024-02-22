import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon from the icon library
import { faDownload } from '@fortawesome/free-solid-svg-icons'; // Import the download icon


const ExcelGenerator = ({ data }) => {
  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'generated.xlsx');
  };

  return (
    <div className='button' style={{ display: 'grid', justifyContent: 'end'  }}>
    <button onClick={generateExcel} style={{backgroundColor: 'green' , color:'white' , marginRight: 10}}>
      <FontAwesomeIcon icon={faDownload} /> Generate Excel
    </button>
  </div>
  );
};

ExcelGenerator.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ExcelGenerator;
