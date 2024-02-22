import  { useState } from 'react';
import DataInputForm from './components/data_input';
import ExcelGenerator from './components/excel_genrator';
import DocumentGenerator from './components/DocumentGenerator';
// import RedditStatsBulk from './components/RedditStatsBulk';

const App = () => {
  const [data, setData] = useState([]);
  console.log("Data", data)

  return (
    <div className='main_container'>
      {/* <RedditStatsBulk/> */}  
      <div className='buttonContainer' style={{display:'flex', alignItems:'center' ,justifyContent: 'center' ,margin:10}}>
      <ExcelGenerator data={data} />
      <DocumentGenerator data={data} />
      </div>
      <DataInputForm setData={setData} />

    </div>
  );
};

export default App;
