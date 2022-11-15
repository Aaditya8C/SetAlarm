import React from "react";
import Clock from "./clock.png";
import Dropdown from "react-bootstrap/Dropdown";
import Ring from "./alarm.mp3";




const setAlarm = document.getElementById("set");
let option = document.getElementsByTagName("option");
let optionValues = option.value;
let ringtone = new Audio(Ring);
let alarmT;
let alarmTime,
  isAlarmSet = false;

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  let dayStatus = "AM";

  if (h > 12) {
    h = h - 12;
    dayStatus = "PM";
  }

  h = h == 0 ? (h = 12) : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = h + ":" + m + ":" + s + "         " + dayStatus;

  document.getElementById("dayTime").innerHTML = time;

  let tempTime = h + ":" + m + ":" + dayStatus;
  //   latestTime = tempTime;
  if (alarmT == tempTime) {
    console.log("Alarm Ringing");
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

//To create 1-12 hrs in the html option tag
const createHours = () => {
  const hours = [];
  for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    hours.push(<option value={i}>{i}</option>);
  }
  return hours;
};

//To create 1-59 mins in the html option tag
const createMinutes = () => {
  const minutes = [];
  for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    minutes.push(<option value={i}>{i}</option>);
  }
  return minutes;
};

//function to set the alarm
function setAlarmClick() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    setAlarm.innerText = "Set Alarm";
    return (alarmTime = false);
  }

  let alarmTime =
    document.getElementById("hrs").value +
    ":" +
    document.getElementById("mins").value +
    ":" +
    document.getElementById("ampm").value;

  if (alarmTime.includes("Hour") || alarmTime.includes("Minutes")) {
    alert("Please select a valid alarm");
  }
  console.log(alarmTime);
  alarmT = alarmTime;
  setAlarm.innerText = "Stop Alarm";
}

const alarm = () => {
  return (
    <>
      <div className=" bg-orange-900 -my-20 xl:h-[30rem]">
        <div className="bg-yellow-200 text-black h-96 w-96 mx-32 my-10 rounded-t-full sm:mx-40 md:mx-[15rem] lg:mx-[25rem] xl:mx-[35rem] xl:h-[30rem]">
          <div className="justify-center mt-48 mx-36 w-96">
            <img src={Clock} alt="not available" className="mt-20 w-28 h-32 pt-5 xl:pt-10 xl:h-40" />
            <h1 className="text-lg mt-4 mx-2" id="dayTime">
              00:00:00 AM/PM
            </h1>
          </div>

          <div className="setAlarm flex mt-10 mx-10 space-x-5">
            <select
              className="outline-offset-4 text-black h-10 w-24 rounded-lg"
              id="hrs"
            >
              <option value="Hours" selected hidden onClick>
                Hours
              </option>
              {createHours()}
            </select>

            <select
              className="second outline-offset-4 text-black h-10 w-24 rounded-lg"
              id="mins"
            >
              <option value="Minutes" selected hidden>
                Minutes
              </option>
              {createMinutes()}
            </select>

            <select
              className="outline-offset-4 text-black h-10 w-24 rounded-lg"
              id="ampm"
            >
              <option value="AM/PM" selected hidden>
                AM/PM
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <button
            className="rounded-full bg-red-900 text-white mx-[7rem] mt-14 h-14 w-40 text-xl font-bold active:bg-red-500 hover:bg-red-800"
            id="set"
            onClick={setAlarmClick}
          >
            Set Alarm
          </button>
        </div>
      </div>
    </>
  );
};

export default alarm;
