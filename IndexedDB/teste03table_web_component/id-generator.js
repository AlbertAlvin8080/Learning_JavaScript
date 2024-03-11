"use strict";

function generate_id() {
    return Date.now().toString(16).toUpperCase();   
}

export {generate_id};