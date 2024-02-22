import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/DataInputForm.css'

const DataInputForm = ({ setData }) => {
  const [formData, setFormData] = useState({
    date: '',
    vehNum: '',
    dieselLTR: '',
    rate: '',
    amount: '',
    netCash: '',
    totalAmount: ''
  });
  const [previewData, setPreviewData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  

  useEffect(() => {
    const { rate, dieselLTR } = formData;
    const calculatedAmount = rate && dieselLTR ? (parseFloat(rate) * parseFloat(dieselLTR)).toFixed(2) : '';
    setFormData(prevState => ({ ...prevState, amount: calculatedAmount }));
  }, [formData.rate, formData.dieselLTR]);

  useEffect(() => {
    const { amount, netCash } = formData;
    const totalAmount = parseFloat(amount) + parseFloat(netCash);
    setFormData(prevState => ({ ...prevState, totalAmount }));
  }, [formData.amount, formData.netCash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate if all fields are filled
    for (const key in formData) {
      if (!formData[key]) {
        setErrorMessage(`Please fill in all fields`);
        return;
      }
    }
  
    // Clear error message
    setErrorMessage('');
  
    // Add form data to previewData
    setPreviewData([...previewData, formData]);
  
    // Set data
    setData([...previewData, formData]);
  
    // Clear form data
    setFormData({
      date: '',
      vehNum: '',
      dieselLTR: '',
            rate: '',
      amount: '',
      netCash: '',
      totalAmount: ''
    });
  };

  return (
    <div className="form-container">
      <div className="form">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
         <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </label>
        <br />
        <label>
          Vehicle Number:
          <input type="text" name="vehNum" value={formData.vehNum} onChange={handleChange} />
        </label>
        <br />
        <label>
          Diesel (LTR):
          <input type="text" name="dieselLTR" value={formData.dieselLTR} onChange={handleChange} />
        </label>
        <br />
        <label>
          Rate:
          <input type="text" name="rate" value={formData.rate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Amount:
          <input type="text" name="amount" value={formData.amount} readOnly />
        </label>
        <br />
        <label>
          Net Cash:
          <input type="text" name="netCash" value={formData.netCash} onChange={handleChange} />
        </label>
        <br />
        <label>
          Total Amount:
          <input type="text" name="totalAmount" value={formData.totalAmount} readOnly />
        </label>
        <br />
        <button type="submit">Submit</button>
        </form>
      </div>
      <div className="preview">
        <h2>Preview</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Vehicle Number</th>
              <th>Diesel (LTR)</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Net Cash</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {previewData.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.vehNum}</td>
                <td>{data.dieselLTR}</td>
                <td>{data.rate}</td>
                <td>{data.amount}</td>
                <td>{data.netCash}</td>
                <td>{data.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


DataInputForm.propTypes = {
  setData: PropTypes.func.isRequired
};

export default DataInputForm;
