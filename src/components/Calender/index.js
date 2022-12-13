/* eslint-disable react-hooks/rules-of-hooks */
import "./index.css";

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { DAYS, MONTHS } from "./data";
import Button from "react-bootstrap/Button";
import { TotalDays } from "./days";
import ModalComponent from "./AddHolidayModal";
import ShowDeatilsModal from "./showDetailsModal";

function calender() {
  const [monthNumber, setMonthNumber] = useState(1);
  const [monthDay, setMonthDay] = useState([]);
  const [AddmodalShow, setAddModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [totalDayInComp, setTotalDayInComp] = useState([...TotalDays]);
  const [addDate, setAddDate] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [showData, setShowData] = useState({date:"", details:""});

  const handelChange = (e) => {
    setMonthNumber(e.target.value);
  };

  const handleAddHoliday = () => {
    setTotalDayInComp([
      ...totalDayInComp.map((day) => {
        if (day.date === addDate) {
          return {
            day: day.day,
            holiday: true,
            holidayDetails: addDesc,
            date: day.date,
            week: day.week,
          };
        }
        return day;
      }),
    ]);
  };

  const handleShowDetails = (day) => {
    setModalShow(true)
    setShowData({date: day.date, details: day.holidayDetails})
  };

  useEffect(() => {
    const setMonthDay1 = totalDayInComp.filter(
      (val) =>
        val.date.split("-")[1] === MONTHS[monthNumber - 1].value.toString()
    );
    setMonthDay([...setMonthDay1]);
  }, [monthNumber, totalDayInComp]);

  const showWeek = (monthDay, week) => {
    const week2 = monthDay?.filter((day) => day.week === week);
    if (week2.length < 7) {
      const shift = 7 - week2.length;
      if (week2[0]?.day === "SUN") {
        for (let i = 0; i < shift; i++) {
          week2.push({ date: "" });
        }
      } else {
        for (let i = 0; i < shift; i++) {
          week2.unshift({ date: "" });
        }
      }
    }
    return week2.map((day1) => (
      <td>
        {day1.date.split("-")[0] ? (
          <div onClick={()=> day1.holiday && handleShowDetails(day1)} className={`day-text ${day1.holiday && "holiday"}`}>
            {day1.date.split("-")[0]}
          </div>
        ) : (
          ""
        )}
      </td>
    ));
  };

  return (
    <div className="calender-main-container">
      <div className="calnder-header">
        <div className="calender-month">
          <Form.Select
            aria-label="Default select example"
            className="month-dropdown"
            onChange={handelChange}
          >
            {MONTHS.map((month) => (
              <option value={month.value}>{month.text}</option>
            ))}
          </Form.Select>
          <h4>2019</h4>
        </div>
        <div className="add-holiday-btn">
          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Add Holiday
          </Button>
        </div>
      </div>
      <hr />
      <table>
        <tr>
          {DAYS.map((day) => (
            <td>
              <div className="day-text">{day}</div>
            </td>
          ))}
        </tr>
        {[1, 2, 3, 4, 5].map((week) => {
          return (
            <>
              <tr></tr>
              {showWeek(monthDay, week)}
            </>
          );
        })}
      </table>

      <ModalComponent
        show={AddmodalShow}
        onHide={() => setAddModalShow(false)}
        addDateFn={(val) => setAddDate(val)}
        addDescFn={(val) => setAddDesc(val)}
        onAddHoliday={() => {
          setAddModalShow(false);
          handleAddHoliday();
        }}
      />
      <ShowDeatilsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        date={showData.date}
        details={showData.details}
      />
    </div>
  );
}

export default calender;
