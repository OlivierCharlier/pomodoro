import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import "bulma";

const Timer = () => {
    const [counter, setCounter] = useState(300);
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("05");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : secondCounter;
                const computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : minuteCounter;

                const newCount = counter - 1;

                setSecond(computedSecond);
                setMinute(computedMinute);
                setCounter(newCount);
            }, 100);
        }
        if (isActive && counter < 0) {
            setIsActive(!isActive);
            setCounter(0);
        }
        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    return (
        <div className={"box"}>
            <div className={"time"}>
                <span className={"minute"}>{minute}</span>
                <span>{":"}</span>
                <span className={"second"}>{second}</span>
            </div>
            <div className={"buttons"}>
                <button
                    type={"button"}
                    onClick={() => {
                        if (!isActive) {
                            const counterPlus = counter + 60;
                            setCounter(counterPlus);

                            if (Number(minute) + 1 < 10) {
                                const minutePlus = String(
                                    `0${Number(minute) + 1}`,
                                );
                                setMinute(minutePlus);
                            } else {
                                const minutePlus = String(Number(minute) + 1);
                                setMinute(minutePlus);
                            }
                        }
                    }}
                    className={"plus"}>
                    {"+"}
                </button>
                <button
                    type={"button"}
                    onClick={() => setIsActive(!isActive)}
                    className={"start"}>
                    {isActive ? "STOP" : "START"}
                </button>
                <button
                    type={"button"}
                    onClick={() => {
                        if (!isActive) {
                            setSecond("00");
                            setMinute("05");
                            setCounter(300);
                            setIsActive(false);
                        }
                    }}
                    className={"reset"}>
                    {"RESET"}
                </button>
                <button
                    type={"button"}
                    onClick={() => {
                        if (!isActive && counter >= 60) {
                            const counterMoins = counter - 60;
                            setCounter(counterMoins);

                            if (Number(minute) - 1 < 10) {
                                const minuteMoins = String(
                                    `0${Number(minute) - 1}`,
                                );
                                setMinute(minuteMoins);
                            } else {
                                const minuteMoins = String(Number(minute) - 1);
                                setMinute(minuteMoins);
                            }
                        }
                    }}
                    className={"moins"}>
                    {"-"}
                </button>
            </div>
        </div>
    );
};

render(<Timer />, document.querySelector("#timer"));
