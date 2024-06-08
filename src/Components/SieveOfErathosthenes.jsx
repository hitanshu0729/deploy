import React, { useState, useEffect, useCallback, useRef } from "react";

const SieveOfEratosthenes = () => {
  const [number, setNumber] = useState(0);
  const [sieve, setSieve] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [ele, setEle] = useState(0);
  const isRunningRef = useRef(isRunning);
  const speed = 500;
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const handleChange = (e) => {
    if (e.target.value <= 0 || e.target.value > 1000)
      alert("Number must be in range 1-1000");
    else setNumber(parseInt(e.target.value) || 0);
    // if (e.target.value == 0) alert("Enter number in range 1-1000");
  };

  const startSieve = useCallback(async () => {
    setIsRunning(true);
    setSieve(Array(number).fill("red"));
    const sieveArray = Array(number).fill("red");
    sieveArray[0] = "grey";
    sieveArray[1] = "grey";
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (sieveArray[i] === "red") {
        sieveArray[i] = "yellow";
        setEle(i);
        setSieve([...sieveArray]);

        for (let j = i * i; j < number; j += i) {
          if (!isRunningRef.current) return;
          sieveArray[j] = "green";
          setSieve([...sieveArray]);
          // console.log(speed);
          await new Promise((resolve) => setTimeout(resolve, speed)); // 1-second delay
        }

        sieveArray[i] = "red";
        setSieve([...sieveArray]);
      }
    }

    setIsRunning(false);
  }, [number]);

  useEffect(() => {
    if (isRunning) {
      startSieve();
    }
  }, [isRunning, startSieve]);

  const stopSieve = () => {
    setIsRunning(false);
    setNumber(0);
    setSieve([]);
    setEle(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#313552] text-white py-8 w-full">
      <h1 className="text-4xl mb-6 mt-6">Sieve of Eratosthenes</h1>
      <input
        placeholder="Enter number"
        type="number"
        value={number || ""}
        className="border w-[350px] max-w-[40vw] border-black p-2 text-black"
        onChange={handleChange}
        disabled={isRunning}
      />
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-40"
          onClick={stopSieve}
          disabled={!isRunning}
        >
          Reset
        </button>
      </div>
      {isRunning && ele && (
        <div className="text-white text-3xl mt-4">
          Checking for elements divisible by {ele}
        </div>
      )}
      <div className="flex gap-1 flex-wrap justify-center mt-4 max-w-[94vw]">
        {[...Array(number)].map((_, i) => (
          <div
            key={i}
            className={`w-[10vw] h-[10vw] md:w-[7vw] md:h-[7vw] lg:h-[5vw]  lg:w-[5vw] items-center flex 
              justify-center text-white ${
                sieve[i] === "grey"
                  ? "bg-blue-500"
                  : sieve[i] === "green"
                  ? "bg-green-600"
                  : sieve[i] === "yellow"
                  ? "bg-yellow-600"
                  : sieve[i] === "orange"
                  ? "bg-orange-600"
                  : "bg-red-600"
              }`}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SieveOfEratosthenes;
