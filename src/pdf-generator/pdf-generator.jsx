import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TemplateLeo from '../templates/leo';
import './pdf-generator.css';

const PdfGenerator = ({ 
  // schoolName,
  fromName,
  orderNumber,
  issueDate,
  toName,
  subject,
  ref,
  body,
  footer,
  yoursFaithfully,
  language

}) => {
  const printRef = useRef();
  
  const handleGeneratePdf = async () => {
    const element = printRef.current;
    
    // Get the full height of the content
    const fullHeight = element.scrollHeight;
    const fullWidth = element.scrollWidth;
    
    // Create a canvas with the full dimensions
    const canvas = await html2canvas(element, {
      scale: 2,
      width: fullWidth,
      height: fullHeight,
      windowWidth: fullWidth,
      windowHeight: fullHeight,
      scrollX: 0,
      scrollY: 0,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (fullHeight * pdfWidth) / fullWidth;

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`glps_${dd}-${mm}-${yy}_${hh}-${min}-${ss}.pdf`);
  };

  return (
    <div className="pdf-container">
      <div className='scrollable-container'>
        <TemplateLeo
          // schoolName={schoolName}
          fromName={fromName}
          orderNumber={orderNumber}
          issueDate={issueDate}
          toName={toName}
          subject={subject}
          ref={ref}
          body={body}
          footer={footer}
          yoursFaithfully={yoursFaithfully}
          language={language}
        />
      </div>

      <div ref={printRef} className='render-outside'>
        <TemplateLeo
          // schoolName={schoolName}
          fromName={fromName}
          orderNumber={orderNumber}
          issueDate={issueDate}
          toName={toName}
          subject={subject}
          ref={ref}
          body={body}
          footer={footer}
          yoursFaithfully={yoursFaithfully}
          language={language}
        />
      </div>
      
      <button onClick={handleGeneratePdf} className="download-button">
        <b>Download PDF</b>
      </button>
    </div>
  );
};

export default PdfGenerator;
