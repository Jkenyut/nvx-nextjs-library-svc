"use client";
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
