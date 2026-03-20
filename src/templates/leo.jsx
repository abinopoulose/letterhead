import './leo.css';
import logo from '../assets/sh-logo.png';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const TemplateLeo = ({ fromName, toName, issueDate, orderNumber, subject, ref, body, footer, yoursFaithfully, language }) => (
  <div className="page">
    <div className="header">
      <div className="school-header">
        <div className="logo-container">
          <img src={logo} alt="School Logo" className="school-logo" />
        </div>
        <div className="school-info">
          <h1 className="school-name">GOVT. L.P. SCHOOL MUTHIYAMALA</h1>
          <div className="school-details">
            <p>KUDAYATHOOR P.O., PIN 685590 <br></br>
            Email: glpsmuthiyamala@gmail.com</p>
          </div>
        </div>
      </div>
      <hr className="header-line" />
      <div className="order-info">
        <span className="order-number">{language=='English'?"Letter No": "നമ്പർ"}: {orderNumber}</span>
        <span className="date">{language=='English'?"Date": "തീയതി"}: {formatDate(issueDate)}</span>
      </div>
      <div className="from-section">
        <span>{language=='English'?"From": "പ്രേഷകൻ"}</span>
        <div className="name">{fromName}</div>
      </div>
      <div className="to-section">
        <span>{language=='English'?"To": "സ്വീകർത്താവ്"}</span>
        <div className="to-content">
          {toName}
        </div>
      </div>
    </div>

    <div className="content">
      <div className="letter-content">
        <div>{language=='English'?"Sir": "സർ"},</div>
        <div className="subject-section">
          <span>{language=='English'?"Sub": "വിഷയം"}:</span>
          <span className="subject"> {subject}</span>
        </div>
        <div className="ref-section">
          <span>{language=='English'?"Ref": "സൂചന"}:</span>
          <span className="ref"> {ref}</span>
        </div>
        <div className="body-content">
        {body.split('\n').map((paragraph, index) => (
          <p key={index} className="body-paragraph">{paragraph}</p>
        ))}
        </div>
        <div className='yours-faithfully-section'>
          {yoursFaithfully}
        </div>
      </div>
    </div>

    <div className="footer">
      {footer}
    </div>
  </div>
);

export default TemplateLeo;
