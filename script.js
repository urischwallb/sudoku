let arrSolvd = [];
let arrReset = [];
let arrUser = [];
let user, password;
var countUpDate = null;
var timerSet = null;
const arrEmpty = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//1
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//2
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//3
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//4
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//5
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//6
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//7
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//8
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '] //9
];

let userCheck = () => {
    user = document.getElementById('username').value;
    password = document.getElementById('password').value;
    if (user == 'abcd' && password == '1234') {
        let div = document.getElementById('open');
        div.style.display = 'none';
        let div2 = document.getElementById('lvl');
        div2.style.display = 'block';
        let welc = document.getElementById('WelcomeUser').innerHTML += user;
    }
    else {
        alert('enter valid user name and password');
    }

}

function sudokuMake() {//making the first sudoku
    let arrMake = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//1
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//2
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//3
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//4
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//5
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//6
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//7
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//8
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '] //9
    ];//get empty array
    let randNum = makeRandom();//get a random number
    let correntRow = [];
    let cntBug = 0;
    for (let i = 0; i < arrMake.length; i++) {
        for (let j = 0; j < arrMake[i].length; j++) {
            correntRow = returnRow(arrMake, j);//return corrent row
            if (arrMake[i].indexOf(randNum) != -1) {//if the number isn't exist on the line
                randNum = makeRandom();//roll new number
                correntRow = [];
                j--;
            }
            else if (correntRow.indexOf(randNum) != -1) {//if the num exist on the row
                randNum = makeRandom();//roll new number
                correntRow = [];
                arrMake[i] = [...' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                j = -1;
            }
            else if (box(i, j, arrMake, randNum) != true) {//if the number isn't exist on the box
                randNum = makeRandom();//roll new number
                correntRow = [];
                j--;
                cntBug++
                if (cntBug > 10) {//if the block stuck reset him
                    //debugger
                    if (i % 3 == 0) {
                        arrMake[i] = [...' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                        j = -1;
                    }
                    if (i % 3 == 1) {
                        arrMake[i - 1] = [...' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                        arrMake[i] = [...' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                        i += -1;
                        j = -1;
                    }
                    else /* if (i % 3 == 1) */ {
                        arrMake[i - 2] = [...' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                        arrMake[i - 1] = [...' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                        arrMake[i] = [...' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                        i += -2;
                        j = -1;
                    }

                }
            }
            else {
                cntBug = 0;
                arrMake[i][j] = randNum;//the final num insert to the arr
            }

        }
        console.info(arrMake[i]);//printing the corrent line of the array

    }
    arrSolvd = [...arrMake]//solvd sudoku 
    return arrMake;//return the sudoku after initialize 
}

function box(i, j, arrMake, randNum) {
    let blockSqr;
    if (i % 3 == 0) {
        //[x][x][x]
        //[o][o][o]
        //[o][o][o]
        if (j % 3 == 0) {
            //[x][o][o]

            blockSqr = [//the block
            ///* arrMake[i][j] ,*/ arrMake[i  ][j + 1], arrMake[i    ][j + 2] ,
            /* arrMake[i + 1][j], */ arrMake[i + 1][j + 1], arrMake[i + 1][j + 2],
            /* arrMake[i + 2][j], */ arrMake[i + 2][j + 1], arrMake[i + 2][j + 2]
            ];

            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
        else if (j % 3 == 1) {
            //[o][x][o]
            blockSqr = [//the block
                //arrMake[i    ][j - 1],/*arrMake[i][j + 1], */ arrMake[i    ][j + 1] ,
                arrMake[i + 1][j - 1], /* arrMake[i + 1][j ], */ arrMake[i + 1][j + 1],
                arrMake[i + 2][j - 1],/*  arrMake[i + 2][j ], */ arrMake[i + 2][j + 1]
            ];
            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
        else { //if (j % 3 == 2)
            //[o][o][x]
            blockSqr = [//the block
                //arrMake[i    ][j - 2], arrMake[i    ][j - 1], /* arrMake[i    ][j + 2] , */
                arrMake[i + 1][j - 2], arrMake[i + 1][j - 1],/*  arrMake[i + 1][j] , */
                arrMake[i + 2][j - 2], arrMake[i + 2][j - 1]/* , arrMake[i + 2][j]  */
            ];
            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
    }
    else if (i % 3 == 1) {
        //[o][o][o]
        //[x][x][x]
        //[o][o][o]
        if (j % 3 == 0) {
            //[x][o][o]

            blockSqr = [//the block
                arrMake[i - 1][j], arrMake[i - 1][j + 1], arrMake[i - 1][j + 2],
                ///* arrMake[i][j],*/ arrMake[i    ][j + 1], arrMake[i    ][j + 2] ,
                arrMake[i + 1][j], arrMake[i + 1][j + 1], arrMake[i + 1][j + 2]
            ];

            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
        else if (j % 3 == 1) {
            //[o][x][o]
            blockSqr = [//the block
                arrMake[i - 1][j - 1],/*  arrMake[i - 1][j], */ arrMake[i - 1][j + 1],
                //arrMake[i    ][j - 1], /*arrMake[i][j],*/ arrMake[i    ][j + 1] ,
                arrMake[i + 1][j - 1],/*  arrMake[i + 1][j], */ arrMake[i + 1][j + 1]
            ];
            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
        else { //if (j % 3 == 2)
            //[o][o][x]
            blockSqr = [//the block
                arrMake[i - 1][j - 2], arrMake[i - 1][j - 1], /* arrMake[i - 1][j] , */
                //arrMake[i    ][j - 2], arrMake[i    ][j - 1], /* arrMake[i][j] , */
                arrMake[i + 1][j - 2], arrMake[i + 1][j - 1], /* arrMake[i + 1][j]  */
            ];
            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
    }
    else if (i % 3 == 2) {
        //[o][o][o]
        //[o][o][o]
        //[x][x][x]
        if (j % 3 == 0) {
            //[x][o][o]
            blockSqr = [//the block
            /* arrMake[i - 2][j] , */ arrMake[i - 2][j + 1], arrMake[i - 2][j + 2],
            /* arrMake[i - 1][j], */  arrMake[i - 1][j + 1], arrMake[i - 1][j + 2],
                ///* arrMake[i][j],*/ arrMake[i    ][j + 1], arrMake[i    ][j + 2] 
            ];

            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
        else if (j % 3 == 1) {
            //[o][x][o]
            blockSqr = [//the block
                arrMake[i - 2][j - 1], /* arrMake[i - 2][j], */   arrMake[i - 2][j + 1],
                arrMake[i - 1][j - 1], /* arrMake[i - 1][j], */   arrMake[i - 1][j + 1],
                //arrMake[i    ][j - 1], /* arrMake[i ][j],*/ arrMake[i    ][j + 1] 
            ];
            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
        else { //if (j % 3 == 2)
            //[o][o][x]
            blockSqr = [//the block
                arrMake[i - 2][j - 2], arrMake[i - 2][j - 1], /* arrMake[i - 2][j] , */
                arrMake[i - 1][j - 2], arrMake[i - 1][j - 1],/*  arrMake[i - 1][j] , */
                //arrMake[i    ][j - 2], arrMake[i    ][j - 1]/* , arrMake[i][j] */ 
            ];
            if (blockSqr.indexOf(randNum) != -1) {//
                return false;
            }
        }
    }
    return true;
}

function userBoard(cnt) {//set the number into the user board

    let mat = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//1
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//2
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//3
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//4
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//5
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//6
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//7
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],//8
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '] //9
    ];

    //debugger
    let arr = sudokuMake();//making board and returning it full
    let i = makeRandom() - 1 //return number between 0-8
    let j = makeRandom() - 1 //return number between 0-8

    while (cnt > 0) {
        if (mat[i][j] == ' ') {//if the cell is empty
            mat[i][j] = arr[i][j];//insert into the cell value
            setNumToBoard(i, j, arr[i][j]);//insert into the user board
            cnt--;
            i = makeRandom() - 1 //return number between 0-8
            j = makeRandom() - 1 //return number between 0-8
        }
        else {//if the cell is not empty
            i = makeRandom() - 1 //return number between 0-8
            j = makeRandom() - 1 //return number between 0-8
        }
    }
    arrReset = [...mat];//insert into the reset board
    //console.log(arrReset);//print the Reset arr
    let div = document.getElementById('lvl');
    div.style.display = 'none';
    let div2 = document.getElementById('game');
    div2.style.display = 'block';

}

function onInputUser(i, j) {
    let num = document.getElementById(`c${i}${j}`);
    if (isNaN(num.value)) {
        num.value = '';
    }
    else if (num.value > 9 || num.value < 1) {
        num.value = '';
    }
}

let sudokuCheck = () => {//sudoku checking for the resolut    
    for (let i = 0; i < arrSolvd.length; i++) {
        for (let j = 0; j < arrSolvd[i].length; j++) {

            //get the solvd data
            let num = document.getElementById(`t${i}${j}`).innerHTML;
            let num2 = document.getElementById(`c${i}${j}`);
            if (isNaN(num) == true) {//if non touch cell selected
                if (num2.value == '' || num2.value == ' ') {
                    alert('try again! the sudoku isnt correct');
                    return false;
                }
                else {
                    num = num2.value;
                }
            }
            if (num != `${arrSolvd[i][j]}`) {//if the user solvd sudoku not equal to the solvd sudoku
                alert('try again! the sudoku isnt correct');
                return false;
            }
        }
    }
    alert('great! you solvd the sudoku - ' + timerSet);//finish msg
    sudokuHome();//reset the program
    return true;//if the user solvd sudoku equal to the solvd sudoku

}

function setNumToBoard(i, j, num) {//set the number into the user board
    document.getElementById(`t${i}${j}`).innerHTML = num;
    // document.getElementById(`r${i}${j}`).innerHTML = num;
}

function sudokuReset() {//sudoku reseting
    arrUser = [...arrReset];
    for (let i = 0; i < arrUser.length; i++) {
        for (let j = 0; j < arrUser[i].length; j++) {
            resetToBoard(i, j);
            if (arrReset[i][j] != ' ') {
                setNumToBoard(i, j, arrUser[i][j]);
            }
        }
    }

}

function sudokuHome() {//sudoku reseting
    countUpDate = null;
    for (let i = 0; i < arrReset.length; i++) {
        for (let j = 0; j < arrReset[i].length; j++) {
            resetToBoard(i, j);
        }
    }
    arrUser = [];
    arrSolvd = [];
    arrReset = [];
    let div = document.getElementById('game');
    div.style.display = 'none';
    let div2 = document.getElementById('lvl');
    div2.style.display = 'block';
}

function resetToBoard(i, j) {//set the number into the user board
    document.getElementById(`t${i}${j}`).innerHTML = `<input type="text" oninput="onInputUser('${i}','${j}')" id="c${i}${j}" class="cells">`;
}

function PopupCenter() {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    let w = 350;
    let h = 100;
    let url;
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, "sudoku", 'scrollbars=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    //let myWindow = window.open("", "MsgWindow", "width=300,height=100");
    newWindow.document.write("<title>sudoku</title><p>insert number from 1-9 on each cell with no replay in row/line/block </p><br> -|GOOD LUCK|-|GOOD LUCK|-|GOOD LUCK|-");
    // Puts focus on the newWindow  
    if (window.focus) {
        newWindow.focus();
    }
}

function returnRow(arr, j) {
    let arrRow = [];
    for (let i = 0; i < arr.length; i++) {
        arrRow.push(arr[i][j]);
    }
    return arrRow;
}

function makeRandom() {
    let num
    num = Math.floor(Math.random() * (10 - 1)) + 1;//return number between 1-9
    return num;
}
function timer() {
    // Set the date we're counting down to
    countUpDate = new Date().getTime()
    // Update the count down every 1 second
    setInterval(function () {
        // Get todays date and time
        let now = new Date().getTime();
        // Find the distance between now an the count date
        let distance = now - countUpDate;

        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result
        timerSet = document.getElementById("timer").innerHTML = `time: ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

