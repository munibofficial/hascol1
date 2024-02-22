import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, AlignmentType } from 'docx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon from the icon library
import { faDownload } from '@fortawesome/free-solid-svg-icons'; // Import the download icon


const DocumentGenerator = ({ data }) => {
  const generateWord = () => {
    const date = prompt('Enter the date (e.g., Feb 02, 2024):');
    const subject = prompt('Enter the subject (e.g., Jan 2024):');
    const billDate = prompt('Enter the billDate (e.g., Jan 2024):');



    if (date && subject) {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: date,
                spacing: { before: 200, after: 200, line: 240 }, // Adjust line spacing as needed
                alignment: AlignmentType.RIGHT,
                style: 'heading',
              }),
              new Paragraph({
                text: 'Zubair Rana,',
                style: 'body',
              }),
              new Paragraph({
                text: 'Manager Operations,',
                style: 'body',
              }),
              new Paragraph({
                text: 'Shakoor and Company Limited,',
                style: 'body',
              }),
              new Paragraph({
                text: `Subject: ${subject}`,
                style: 'heading',
                spacing: { line: 300 },
              }),
              new Paragraph({
                text: 'Dear Sir,',
                style: 'body',
                spacing: { line: 300 },
              }),
              new Paragraph({
                text: `I am writing to request the payment of the outstanding bills for  ${billDate}. As per our records, there are unpaid bills from your end that need to be settled at the earliest. I have attached the invoice copies with this letter for your reference. Please find the details of the outstanding bills below:`,
                style: 'body',
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph('DATE')], alignment: AlignmentType.CENTER }),
                      new TableCell({ children: [new Paragraph('VEH#')], alignment: AlignmentType.CENTER }),
                      new TableCell({ children: [new Paragraph('DIESEL LTR')], alignment: AlignmentType.CENTER }),
                      new TableCell({ children: [new Paragraph('RATE')], alignment: AlignmentType.CENTER }),
                      new TableCell({ children: [new Paragraph('Amount')], alignment: AlignmentType.CENTER }),
                      new TableCell({ children: [new Paragraph('NET CASH')], alignment: AlignmentType.CENTER }),
                      new TableCell({ children: [new Paragraph('TOTAL AMOUNT')], alignment: AlignmentType.CENTER }),
                    ],
                  }),
                  ...data.map(row => (
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph(row.date)], alignment: AlignmentType.CENTER }),
                        new TableCell({ children: [new Paragraph(row.vehNum)], alignment: AlignmentType.CENTER }),
                        new TableCell({ children: [new Paragraph(row.dieselLTR)], alignment: AlignmentType.CENTER }),
                        new TableCell({ children: [new Paragraph(row.rate)], alignment: AlignmentType.CENTER }),
                        new TableCell({ children: [new Paragraph(row.amount)], alignment: AlignmentType.CENTER }),
                        new TableCell({ children: [new Paragraph(row.netCash)], alignment: AlignmentType.CENTER }),
                        new TableCell({
                          children: [new Paragraph(
                            (parseFloat(row.amount.replace(',', '')) + parseInt(row.netCash)).toFixed(2)
                          )],
                          alignment: AlignmentType.CENTER
                        }),
                      ],
                    })
                  )),
                ],
              }),
              new Paragraph({
                text: 'Please clear the bills as soon as possible. If you have any queries or concerns, please do not hesitate to contact me at your convenience.',
                style: 'body',
              }),
              new Paragraph({
                text: 'Best regards,',
                style: 'body',
              }),
              new Paragraph({
                text: 'Mr. Muhammad Bilal Gujjar,',
                style: 'body',
              }),
            ],
          },
        ],
        styles: {
          paragraphStyles: [
            {
              id: 'heading',
              name: 'Heading',
              basedOn: 'Normal',
              next: 'Normal',
              quickFormat: true,
              run: {
                size: 32,
                bold: true,
              },
            },
            {
              id: 'body',
              name: 'Body Text',
              basedOn: 'Normal',
              next: 'Normal',
              quickFormat: true,
              run: {
                size: 24,
              },
            },
            {
              id: 'bold',
              name: 'Bold Text',
              basedOn: 'Normal',
              next: 'Normal',
              quickFormat: true,
              run: {
                bold: true,
              },
            },
          ],
        },
      });

      Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'generated.docx');
      });
    }
  };

  return (
    <div className='button' style={{ display: 'grid', justifyContent: 'end' }}>
    <button onClick={generateWord} style={{backgroundColor: 'blue' , color:'white' , marginRight: 10}}>
      <FontAwesomeIcon icon={faDownload} /> Generate Word
    </button>
  </div>
  );
};

DocumentGenerator.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DocumentGenerator;
