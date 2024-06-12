/*Создать html-страницу со списком ссылок. 
Ссылки на внешние источники (которые начинаются с http://) 
необходимо подчеркнуть пунктиром. 
Искать такие ссылки в списке и устанавливать им дополни-
тельные стили необходимо с помощью JS.*/

let regexphttp = /^https:/gi     // ^  вначале строки.  !!  как отэкранить вот такую запись /^https:///gi  ??
let elemLi = document.querySelectorAll('li a')

elemLi.forEach(function(el) {
    if(regexphttp.test(el.getAttribute('href'))) {
        el.parentElement.classList.add('lineOn')    //  для интереса класс ставим родителю . т.е. li 
    }
})

/////////////////////////////////////////////////////////

/*Создать html-страницу с деревом вложенных директорий. 
При клике на элемент списка, он должен сворачиваться или 
разворачиваться. При наведении на элемент, шрифт должен ста-
новится жирным (с помощью CSS).*/

let elUl = document.getElementById('ul')
function changeClass (e) {
    if(e.target.closest('.nested-directories>ul>li').children.length == 0) {
        return         // тут ели нет потомков не будем проверять и менять класс
    }
    if(e.target.closest('li').children.length == 0) {
        return    // тут если попадем в подменю li тогда делаем выход и не проверяем  класс
    }
    e.target.closest('.nested-directories>ul>li').classList.toggle('collapse')     // для разнообразия не будем присваивать класс. доберемся до первых потомков  таки способом
}
elUl.addEventListener('click', changeClass )

/////////////////////////////////////////////////////////

/*Создать html-страницу со списком книг. 
При щелчке на элемент, цвет текста должен меняться на оран-
жевый. При повторном щелчке на другую книгу, предыдущей 
необходимо возвращать прежний цвет. 
Если при клике мышкой была зажата клавиша Ctrl, то элемент 
добавляется/удаляется из выделенных. Если при клике мышкой 
была зажата клавиша Shift, то к выделению добавляются все 
элементы в промежутке от предыдущего кликнутого до текущего.
*/
const cnt = document.querySelector('.books-block')
const srts = document.querySelectorAll('.books-block li')
let previousEl
cnt.addEventListener ('click', (e) => {
    console.log(e)
    if(e.ctrlKey) {
        // e.target.classList.toggle('allocation')   
        if(e.target.classList.contains) {
            e.target.classList.remove('allocation')
        } else {
            e.target.classList.add('allocation')
            previousEl = e.target // сохраним предыдующий кликнутый
        }
    } else if(e.shiftKey) {
        document.onselectstart = () => {
            return false;
        }
        e.target.classList.add('allocation')
        previousEl = e.target  // сохраним предыдующий кликнутый

    } else {
        srts.forEach((el)=>{
            if(el !== e.target ) {
                el.classList.remove('allocation')
            } else {
                e.target.classList.add('allocation')
                previousEl = e.target // сохраним предыдующий кликнутый
            }
        })
    }
})








/////////////////////////////////////////////////////////
// !!!!!!!! Сдаюсь. нужна помощь по выполнению!!!!!!!!!!!!!!!!!!!
// Создать html-страницу для отображения/редактирования текста. 
// При открытии страницы текст отображается с помощью тега 
// div. При нажатии Ctrl + E, вместо div появляется textarea с тем 
// же текстом, который теперь можно редактировать. При нажатии 
// Ctrl + S, вместо textarea появляет div с уже измененным текстом. 
// Не забудьте выключить поведение по умолчанию для этих соче-
// таний клавиш

/////////////////////////////////////////////////////////

/*Создать html-страницу с большой таблицей. 
При клике по заголовку колонки, необходимо отсортировать 
данные по этой колонке. Например: на скриншоте люди отсо-
ртированы по возрасту. Учтите, что числовые значения должны 
сортироваться как числа, а не как строки.*/

let myTable = document.getElementsByClassName('myTable')[0]  // живая коллекция
let tbody = document.getElementById('tbody')
function titleСlicks(e) {
    if(!e.target.closest('th')) {
        return
    }
    // console.log(e.target.cellIndex, e.target.dataset.number == 'true' ? true : false )  // индекс яейки используем как индекс столбца. т.к. числа и строки сортируются по разному запишем в дата столбец это с числами или строками. 
    mySort (e.target.cellIndex, e.target.dataset.number == 'true' ? true : false)  // вызовем функцию и передадим номер столбци и если число то true иначе false 
}

function mySort (column, numBoolean) {          // функция сортировки. т.к. объявслена через function она всплывает и можем записать код ниже
    let rowsArray = Array.from(tbody.rows)    //  массив строк таблицы
    console.log(rowsArray)                      //  массив строк получили. работает !!!! кажется тут что то не так 
    let rez;                                    // будем сохраньять данные для сортировки исходя из условия ниже
    if(numBoolean) {                            // если true то сортируем по числам  . Функцию подставляем в метод сорт
        rez = function (rowA, rowB) { 
            return rowA.cells[column].innerHTML - rowB.cells[column].innerHTML    //  column + 1   т.к . ищем от  всей  myTable
        }
    } else {   // или сортируем строки
        rez = function (rowA, rowB) {
            return rowA.cells[column].innerHTML > rowB.cells[column].innerHTML ? 1 : -1
        }
    }
    // console.log(rez)
    rowsArray.sort(rez)
    tbody.append(...rowsArray) 
}

myTable.addEventListener('click', titleСlicks)

/////////////////////////////////////////////////////////

