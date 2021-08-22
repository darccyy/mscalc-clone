// const {ipcRenderer} = require("electron");
const fs = require("fs");
const path = require("path");
const $ = require("jquery");
const {ipcMain} = require("electron/main");
const {ipcRenderer} = require("electron");

var ans = 0;
var prev = 0;
var color = {
  accent: "green",
  theme: "dark",
};
var buttons = [
  [
    {
      display: "%",
      function: "percent()",
    }, {
      display: "CE",
      function: "clearAll()",
    }, {
      display: "C",
      function: "clear()",
    }, {
      display: "&#9003;",
      function: "backspace()",
    },
  ],
  [
    {
      display: "&#185;/&#8339;",
      function: "oneOver()"
    }, {
      display: "x&#178;",
      function: "square()",
    }, {
      display: "&#8730;x",
      function: "root()",
    }, {
      display: "&#247;",
      function: "divide()",
    },
  ],
  [
    {
      display: "7",
      function: "addNumber(7)",
      attr: ["main", "bold"],
    }, {
      display: "8",
      function: "addNumber(8)",
      attr: ["main", "bold"],
    }, {
      display: "9",
      function: "addNumber(9)",
      attr: ["main", "bold"],
    }, {
      display: "&#10005;",
      function: "multiply()",
    },
  ],
  [
    {
      display: "4",
      function: "addNumber(4)",
      attr: ["main", "bold"],
    }, {
      display: "5",
      function: "addNumber(5)",
      attr: ["main", "bold"],
    }, {
      display: "6",
      function: "addNumber(6)",
      attr: ["main", "bold"],
    }, {
      display: "-",
      function: "subtract()",
    },
  ],
  [
    {
      display: "1",
      function: "addNumber(1)",
      attr: ["main", "bold"],
    }, {
      display: "2",
      function: "addNumber(2)",
      attr: ["main", "bold"],
    }, {
      display: "3",
      function: "addNumber(3)",
      attr: ["main", "bold"],
    }, {
      display: "+",
      function: "add()",
    },
  ],
  [
    {
      display: "&#8314;/&#8331;",
      function: "negate()",
      attr: ["main"],
    },
    {
      display: "0",
      function: "addNumber(0)",
      attr: ["main", "bold"],
    },
    {
      display: ".",
      function: "decimal()",
      attr: ["main"],
    },
    {
      display: "=",
      function: "calculate()",
      attr: ["extra"],
    },
  ],
];

function init() {
  str = "";
  for (i in buttons) {
    row = "";
    for (j in buttons[i]) {
      item = buttons[i][j];
      row += `
        <item class="${item.attr?.join(" ") || ""}">
          <button onclick="${item.function || ""}">
            ${item.display}
          </button>
        </item>
      `;
    }
    str += `
      <row>
        ${row}
      </row>
    `;
  }
  $("#buttons").html(str);

  $("#titlebar button:nth-child(1)").on("click", minimize);
  $("#titlebar button:nth-child(2)").on("click", maximize);
  $("#titlebar button:nth-child(3)").on("click", quit);
  $("body").attr("accent", color.accent);
  $("body").attr("theme", color.theme);
  changeAns();
}

function minimize() {
  ipcRenderer.send("minimize");
}

function maximize() {
  ipcRenderer.send("maximize");
}

function quit() {
  ipcRenderer.send("quit");
}

ipcRenderer.on("focus", () => {
  $("body").attr("focus", true);
});

ipcRenderer.on("blur", () => {
  $("body").attr("focus", false);
});

function checkAns() {
  if (!ans && ans !== 0) {
    ans = 0;
  }
}

function changeAns() {
  return //! Testing
  $("#answer h1").html(ans || 0);
  $("#answer h2").html(prev || "");
}

function addNumber(number) {
  checkAns();
  ans *= 10;
  ans += number;
  changeAns();
}

function clearAll() {
  ans = 0;
  prev = 0;
  changeAns();
}

function clear() {
  clearAll();
}

function percent() {

}

function oneOver() {

}

function square() {

}

function root() {
  
}

function backspace() {

}

function divide() {

}

function multiply() {

}

function subtract() {

}

function add() {

}

function negate() {

}

function decimal() {

}

function calculate() {

}