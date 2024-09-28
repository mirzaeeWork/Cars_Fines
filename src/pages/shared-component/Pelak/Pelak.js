import { Iran } from '../../../SVg/iran';
import './Plak.css';

function Pelak({ sections, setSections, handleClick, btn }) {

  const handleChange = (e, num, sectionKey) => {
    const inputValue = e.target.value;

    // Create a regex pattern for allowed input
    const regex = new RegExp(`^\\d{0,${num}}\\s?$`);

    // Check if the input value matches the regex
    if (regex.test(inputValue)) {
      setSections(prevSections => ({ ...prevSections, [sectionKey]: inputValue }));
    }
  };

  return (
    <main className="main-home">
      <div className="header">
        <h3>برای مشاهده نتایج جرائم، شماره پلاک خودرو را وارد کنید.</h3>
      </div>
      <div className="c-car-plate">
        <span className="c-car-plate__flag">
          <Iran />
        </span>
        <input
          className="c-car-plate__input c-car-plate__input--section1 jsCarPlateSection1"
          type="tel"
          placeholder="_  _"
          id="searchFormCarPlateSection1"
          value={sections.section1}
          onChange={(e) => handleChange(e, 2, 'section1')}
        />
        <select
          className="c-car-plate__input c-car-plate__input--section2 c-car-plate__select jsCarPlateSection2"
          aria-label="انتخاب حرف پلاک"
          id="searchFormCarPlateSection2"
          value={sections.section2 || ''}
          onChange={(e) => setSections(prev => ({ ...prev, section2: e.target.value }))}
        >
          <option value=""> حرف </option>
          <option value="الف">الف</option>
          <option value="ب">ب</option>
          <option value="پ">پ</option>
          <option value="ت">ت</option>
          <option value="ث">ث</option>
          <option value="ج">ج</option>
          <option value="د">د</option>
          <option value="ز">ز</option>
          <option value="س">س</option>
          <option value="ش">ش</option>
          <option value="ص">ص</option>
          <option value="ط">ط</option>
          <option value="ع">ع</option>
          <option value="ف">ف</option>
          <option value="ق">ق</option>
          <option value="ک">ک</option>
          <option value="گ">گ</option>
          <option value="ل">ل</option>
          <option value="م">م</option>
          <option value="ن">ن</option>
          <option value="و">و</option>
          <option value="ه">ه</option>
          <option value="ی">ی</option>
          <option value="D">D</option>
          <option value="S">S</option>
        </select>

        <input
          className="c-car-plate__input c-car-plate__input--section3 jsCarPlateSection3"
          type="tel"
          placeholder="_  _  _"
          value={sections.section3}
          onChange={(e) => handleChange(e, 3, 'section3')}
        />
        <span className="c-car-plate__dash">__</span>
        <input
          className="c-car-plate__input c-car-plate__input--section4 jsCarPlateSection4"
          type="tel"
          placeholder="_  _"
          value={sections.section4}
          onChange={(e) => handleChange(e, 2, 'section4')}
        />
        <span className="c-car-plate__iran"></span>
      </div>
      <div>
        <button className="btn" type="" onClick={handleClick}>{btn}</button>
      </div>
    </main>

  )
}

export default Pelak