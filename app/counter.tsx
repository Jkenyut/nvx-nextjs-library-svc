"use client";
import Image from "next/image";
import cookie from "js-cookie";

import React from "react";

function Counter() {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          cookie.set("name", "value");
        }}
      >
        button
      </button>
    </div>
  );
}

export default Counter;
