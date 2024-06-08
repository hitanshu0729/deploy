import React from "react";

const SieveBlocks = ({ array, sieve }) => {
  return (
    <>
      {array.map((_, i) => (
        <div
          key={i}
          className={`w-[10vw] h-[10vw] md:w-[7vw] md:h-[7vw] lg:h-[5vw]  lg:w-[5vw] items-center flex justify-center text-white ${
            sieve[i] === "red"
              ? "bg-red-600"
              : sieve[i] === "green"
              ? "bg-green-600"
              : sieve[i] === "yellow"
              ? "bg-yellow-600"
              : "bg-orange-600"
          }`}
        >
          {i}
        </div>
      ))}
    </>
  );
};

export default SieveBlocks;
