# Расширения для виджетов

Добавил файл - Содержания, для быстрого поиска по заголовкам.

## 1. Внешний вид (скрытие, толщина, обводка, размер)

#### 1.1.	Скрытие серии 
(Код пишется до стандартного куска «Highcharts.chart({..})». Нумерация с нуля.)
```javascript
w.series[1].showInLegend = false;
w.series[1].visible = false;
```
Скрытие первой серии ( и из легенды) для отображения.
Функционалом платформы реализуется фильтрацией столбцов (в настройках виджета на вкладке "Дополнительно")
#### 1.2.	Толщина линии в графике (JS код) и маркер

```javascript
w.series[0].marker = { symbol: 'square', radius: 10 }
// делает маркер первой серии квадратом. Circle, triangle - круг и треугольник соответственно. Radius - размер
```
Менять значение «4» на нужную толщину. w.series[0] – номер серии. Необходимо для всех серий прописать.

#### 1.3.	Убрать белую обводку вокруг столбца или сектора (JS код)
Код пишется до стандартного куска «Highcharts.chart({..})».
В гистограмме вокруг столбца:
```javascript
w.plotOptions.series.borderColor = 'transparent';
```
В круговой диаграмме вокруг сектора:
```javascript
w.plotOptions.pie.borderColor = 'transparent';
```
#### 1.4.	Поменять местами серии на гистограмме (JS код)
Код пишется до стандартного куска «Highcharts.chart({..})».
```javascript
w.series = w.series.reverse();
```
#### 1.5.	Поменять местами категории на гистограмме (JS код)
```javascript
w.xAxis.categories = w.xAxis.categories.reverse();
```
#### 1.6.	Вывести нужные столбцы или поменять столбцы местами (JS код)
```javascript
w.series = [ w.series[2] ,w.series[4],w.series[3]];
```
В данном примере первая и вторая серии отображаться не будут, 4 и 5 серия поменяются местами(нумерация с 0).
#### 1.7.	Скрыть треугольник большого количества значений на виджете (JS код)
```javascript
$('[id*="va-widget-warning"]').css({'display':'none'});
```
#### 1.8.	Показать n значений серии в гистограмме
```javascript
w.series[0].data = w.series[0].data.slice(0,10);
```
Последнее число показывает сколько значений отобразить.

#### 1.9.	Убрать обводку подписей текста серий
```javascript
w.plotOptions.series.dataLabels.style.textOutline = false;
```
#### 1.10.	Убрать тень (подсветку) подписей данных
```javascript
w.plotOptions.series.dataLabels.style.textOutline = false; 
```

#### 1.11   Развернуть легенду. Для гистограммы с накоплением
```javascript
w.legend.reversed = true;
```
#### 1.12.	Отсортировать круговую диаграмму от большего к меньшему, округление до 2 символа (JS код)
```javascript
w.series = w.series.map(function(item) {
    item.data.map(function(innerItem) {
        innerItem.y = +(innerItem.y*(-1)).toFixed(2);
        return innerItem;
    });
    return item;
});
w.series[0].data =  w.series[0].data.sort(function(a,b){
    return a.y > b.y? 1: -1 ;
});
```

*.toFixed(2)-обрезание значения до 2 знаков после запятой. В скобках количество знаков после запятой.
Важно: значение просто обрезается, а не округляется!

Если получилось отсортировать наоборот (от меньшего к большему), то строки:
```javascript
w.series[0].data =  w.series[0].data.sort(function(a,b){
    return a.y > b.y? 1: -1 ;
});
```
заменить на:
```javascript
w.series[0].data =  w.series[0].data.sort(function(a,b){
    return a.y > b.y? -1: 1 ;
});
```

#### 1.13 Покрасить негативные значение серии в другой цвет
```javascript
w.series[0].negativeColor = 'red'; //Красим точки первой серии красным если они меньше 0
```

#### 1.14 Размер баров
Если бары не помещаются вовсе в пределах границы виджета, или самый длинный бар настолько длинный что его подпись отображается на теле бара, поиграться с данной строчкой, меняя то что после знака =. 
Вставлять в начало кода.
```javascript
w.yAxis.maxPadding = 0.1 // Для горизонтальных баров 

w.xAxis.maxPadding = 0.1 // Для вертикальных баров
```

#### 1.15 Скругления и тени рамок
```javascript
var borderRadius = '10px'; // Радиус скругления
var boxShadowString = 'rgba(0, 0, 0, 0.4) 5px 5px 5px 5px'; //Цвет, смещение по y, смецение по x, размытие и спред для тени

$('#widget-' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'box-shadow': boxShadowString
});
$('#widget-header-' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'box-shadow': boxShadowString,
    'border-bottom-left-radius': '0px',
    'border-bottom-right-radius': '0px'
});
$('#' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'border-top-left-radius': '0px',
    'border-top-right-radius': '0px'
});
///Скругляет вместе с заголовком. Если заголовка нет, то стиль widget-header закомментировать 
// и у стиля самого элемента закомментить верхние радиусы. 
///Строки ниже нужны для фильтра
$('#' + w.general.renderTo + ' .rb-filter-header-container').css({
    'border-radius': borderRadius
});
```

#### 1.16 Сделать линию шаговой
```javascript
w.series[0].step = 'right' // Делает первую серию шаговой линией. Доступно left, right, center
```

#### 1.17 Отступы в виджетах хайчартс
Настройка отступов виджета от рамки. Код вставлять до рендерера
```javascript
w.general.marginLeft = 200; //Левый отступ
w.general.marginBottom = 130; //Нижний отступ
w.general.marginRight = 100; //Правый отступ
w.general.marginTop = 50; //Верхний отступ
w.legend.x = 100 // Отступ для легенды
```

#### 1.18 Настройки маркеров
Этот код применит настройки маркеров ко всем сериям.
```javascript
w.series.forEach(function(serie){
    serie.marker.fillColor = "white"; // Делаем сам маркер белым
    serie.marker.lineWidth = 2; // Ширина границы маркера
    serie.marker.lineColor = serie.lineColor; //Цвет границы маркера ставим равным цвету серии
    serie.marker.radius = 6; //Радиус маркера
    serie.marker.symbol = 'circle'; //Символ маркера. Доступны  "circle", "square", "diamond", "triangle" and "triangle-down"
});
```
Если нужно, можно свойства применять к одной конкретной серии. Вот так:
```javascript
 w.series[0].marker.symbol = 'circle' // сделать маркеры первой кругами
```

 Если нужно, можно свойства применять к одной конкретной серии. Вот так w.series[номер серии].marker.symbol = 'circle' - сделать маркеры кругами
 
 #### 1.19 Настройка отступов от границ шапки
```javascript
$('#widget-header-' + w.general.renderTo + ' > a').css({
      'padding': '10px',
 });

```
### 1.20 Удалить лишние слова из легенды
Вставляется в самое начало:
```javascript
    w.series.forEach(function(serie){
        serie.name = serie.name.replace(" - Значение показателя",""); // удалить слова " - Значение показателя"
    });
```

### 1.21 Переименовать серию
Вставляется в самое начало:
*удобно, когда название меняется, и чтобы не прокликивать все в PG, можно поменять так*/
```javascript
    w.series[i].name = "Среднее значение по Свердловской области";
```
### 1.22 Изменить тип серии
Вставляется в самое начало:
*удобно, когда название меняется, и чтобы не прокликивать все в PG, можно поменять так*/
```javascript
    w.series[i].type = "line";
```
### 1.23 Поместить серию выше
Вставляется в самое начало:
*чем выше цифра, тем выше серия*/ 
```javascript
    w.series[i].zIndex = 99;
```
### 1.24 Скрыть подсказку
*Вставляется вместо tooltip: w.tooltip*/
```javascript
        tooltip: {
            backgroundColor:'white',
            enabled: false
        }
```
### 1.25 Изменить отображение даты
#### Для работы необходимо положить на сервер библиотеку: ... , расположенную по адресу: \\serv2\opr$\Библиотека аналитика\Актуальные виджеты\
 
///d - дата для конывертации
///clv - календарный разрез:
/// 0 (undefined) - день, месяц и год
/// 1-год
/// 2-полугодие
/// 3-квартал
/// 4-месяц
/// 5-неделя
/// 6-
/// 7-день

##### function getDateString(d, clv){

```javascript
    w.xAxis.categories.forEach(function(categorie, index){
        w.xAxis.categories[index] = getDateString(new Date(categorie), 4);
    });
```
### 1.26 Убрать автоповорот подписей оси в гистограмме и графике
```javascript
w.xAxis.labels.autoRotation = false;
```
### 1.27 Заменить заголовок виджета автоматически по наименованию показателя серии (заголовок должен быть включен для отображения в настройках)
```javascript
//Замена текста заголовка
$('#widget-header-' + w.general.renderTo + ' a ').text('   ' + w.series[0].name.split('-')[0]);
//w.series[0].name - наименование серии 
//.split('-')[0] - обрезание наименования до "-"
```
### 1.28 Изменить ширину блока легенды на графике (если слишком длинная)
```javascript
w.legend.itemStyle["textOverflow"] = "word-break"; // перенос слов на следующую строку
w.legend.itemStyle.width = "160px";  // ширина блока 160 пикселей 
```
## 2 Форматирование подписей

### 2.1 Использование форматирования через поле в property grid DD
В поле «Текст» доступны следующие переменные для форматирования:
```javascript
@value.y // Значение по оси Y
@value.x // Значение по оси X
@value   // Значение (если ось одна, например в круговой)
@total   // Общая сумма. Например всего круга в круговой
@series.name // Имя серии
@point.name  // Имя точки
@point.color // Цвет точки
@percent     // Процент (для круговой или stacked Column)
```
#### Примеры использования
##### Округление:
```javascript
Math.round(@value.y * n) / m // Где m и n - степени 10.
Math.round(@value.y*100)/100  //// Математическое округление до двух знаков после запятой. 
Math.round(@value.y)  // Математическое округление
Math.round(@value.y/1000)  // Округление до тысяч
```
##### Поставить пробелы между тысячами
```javascript
Math.round(@value.y).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
```
##### Покрасить подпись в цвет точки
```javascript
'<div style="color:' +@point.color+ '">'+ @value +'</div>'
```
##### Задать надпись с определенным текстом в центре круговой
```javascript
"<center>"+@total+"<br>млрд.руб."
```
    "<center>" - Выравнивание надписи по центру.
    "<br>млрд.руб."- будет перенесено на следующую строку из-за <br>.

##### Форматирование подсказки виджета (применение через поле «Форматирование подписей/точек »)

В поле «Форматирование подписей/точек » ставится строчка ниже:
```javascript
@series.name+': '+Math.round(@value.y).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ').bold()
```
Форматирование подписи круговой диаграммы с указанием наименования серии и наименования точки. Может потребоваться, если в столбцах измерения лежит к примеру "Источник информации", а в строках измерения "Категория информации". В данном случае в series.name отрезается часть наименования, содержащая название показателя, пришедшего из DC. Без использования функции replace подсказка выглядит: "__Обращения граждан - Портал обращений - Благоустройство: 5", с использованием функции replace: "Портал обращений - Благоустройство: 5"
```javascript
@series.name.replace("__Обращения граждан - ","")+" - "+@point.name +" "+': '+Math.round(@value.y).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ').bold()
```

##### Все это можно комбинировать. Например:
```javascript
'<div style="color:' +(Math.round(@value.y*100)/100).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')+ '">'+ @value +'</div>'
```
Округлит до двух знаков после запятой и покрасит подпись в цвет столбца

##### Добавить в фильтр с измерением "Номер недели", надпись "NN неделя текущего года"
```javascript
@value + " неделя " + (new Date().getFullYear())
```
new Date().getFullYear() - возвращает текущий год

### 2.2	Убрать буквы «K», «G»… через форматирование в property grid
Поставить пробелы между тысячами и добавить текст ''
```javascript
(@value).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') + ' штук'
```
Округлит до 0 заков после запятой, поставит пробелы и припишет "Ваш текст"
### 2.3	Сделать все значения на гистограмме больше нуля (JS код)
```javascript

w.series = w.series.map(function(item){
    item.data.map(function(innerItem, index){
        innerItem.y = Math.abs(innerItem.y);
        innerItem.y = +(innerItem.y).toFixed();
        return innerItem;
    });
    return item;
});

```

### 2.4	В виджете-показателе выводить число с точностью до одного символа после запятой

Строку
```javascript
value = Math.round(aggFuncs[w.props.aggregateFunction](w.data.data.values[0]))
```
заменить следующей строкой:
```javascript
value = (aggFuncs[w.props.aggregateFunction](w.data.data.values[0])).toFixed(1);
```
Обрезание значения, а не математическое округление!

### 2.5	Обрезание значений серий до n знаков после запятой (JS код)
```javascript
w.plotOptions.series.dataLabels.formatter = function(){
    return Number((this.y).toFixed());
};
```
*.toFixed(0) или *.toFixed() -обрезание значения до целого. В скобках количество знаков после запятой.
Важно: значение просто обрезается, а не округляется!

### 2.6 Форматирование подписей диаграммы с накоплением (JS код)
##### Округление
```javascript
w.yAxis.stackLabels.formatter = function(){
    return Math.round(this.total).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}
```
Было: 123456789,12345
Стало: 123 456 789
##### Вывод значений в миллионах (миллиардах)
```javascript
w.yAxis.stackLabels.formatter = function(){
    return Math.round(this.total/100000)/10
}
```
В примере мы выводим в миллионах с точность до одного знака после запятой. Для этого делим на сто тысяч, округляем, потом делим еще на 10.  
Было: 123456789,12345
Стало: 123,4    
Аналогично можно сделать вывод в миллиардах и с точность до произвольного знака.
Также можно добавить сделать:
```javascript
w.yAxis.stackLabels.formatter = function(){
    return (Math.round(this.total/100000)/10).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}

```
Чтобы добавить пробелы между тысячами

### 2.7 Работа с подписями оси х
```javascript
w.xAxis.categories = w.xAxis.categories.map(function(item){
    return item + " кв";
})
```
Item - текущая подпись. В этом примере добавляем "кв" к подписям
```javascript
w.xAxis.categories = w.xAxis.categories.map(function(item){
    return item.split('-').reverse().join('.');
})
```
Это пример для форматирования дат в формате гггг-мм-дд. Подпись 2016-01-01 превратится в 01.01.2016
```javascript
w.xAxis.categories = ['Первый', 'Второй']
```
В этом примере мы хардкодим имена категорий

### 2.8 Форматирование подсказки виджета (применение через поле «Форматирование подписей/точек »)
В поле «Текст» для круговой и в поле «Форматирование подписей/точек » ставится строчка ниже:

```javascript
@series.name+': '+Math.round(@value.y).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ').bold()
```
### 2.9 Управление стилями осей
```javascript
w.yAxis[0].title.style= {
             fontSize: '16px',
             fontFamily: '"Open Sans",sans-serif',
             color: '#757575'
            };
w.yAxis[1].title.style= {
             fontSize: '16px',
             fontFamily: '"Open Sans",sans-serif',
             color: '#757575'
            };
w.xAxis.title.style= {
             fontSize: '16px',
             fontFamily: '"Open Sans",sans-serif',
             color: '#757575'
            };     
```

## 3. Таблицы

### 3.1	Наименования столбцов в таблиц. Код вставлять до TableRender
Старый вариант
```javascript
w.data.columns.forEach(function(item){
    item.captions = item.captions.map(function(innerItem){ 
        return '';
    });
});
w.data.columns[0].captions[0] = 'Тариф';
w.data.columns[1].captions[0] = 'ARPU';
w.data.columns[2].captions[0] = 'Кол-во клиентов';

w.data.columns[0]. captions[0]  //– первый столбец таблицы,
w.data.columns[1]. captions[0]  //– второй столбец таблицы,
w.data.columns[2]. captions[0]  //– третий столбец таблицы…
```
Новый вариант
```javascript
$('#table-' + w.general.renderTo + ' th:nth-child(1)')
.text('ФИО')
.css({
    "text-align": "center"
});
```
Замена наименования столбца над данными для виджета "Таблица"
При обнаружении наименования столбца, соответствующего "__Сведения о ЧС", код заменяет его на "Значение показателя". Если 2 ячейки с наименованиями "__Сведения о ЧС" находятся рядом, то они объединяются под новым названием "Значение показателя".
```javascript
w.data.columns.forEach(function (column) {
    column.captions[0] = column.captions[0].replace("__Сведения о ЧС", "Значение показателя");
})
```
### 3.2	Операции со столбцами. Код вставлять после TableRender
#### 3.2.1 Выбор столбца 
Столбец выбирается и сохраняется в переменную следующим образом:
```javascript
var $firstColumn = $('#table-' + w.general.renderTo + ' td:first-child'); //Первый столбец
var $col1 = $('#table-' + w.general.renderTo + ' td:nth-child(1)'); //Второй столбец
var $lastColumn = $('#table-' + w.general.renderTo + ' td:last-child');//Последний столбец
```
td:first-child - первый столбец
td:last-child – последний столбец таблицы,
td:nth-last-child(2) – предпоследний столбец,
td:nth-child(1) – второй по счету столбец,
td:nth-child(2) – третий по счету столбец.

#### 3.2.2 Выравнивание по правому краю
```javascript
$col1.css({
    "text-align":"right"
});
```
#### 3.2.3 Добавить пробелы между тысячами
```javascript
$lastColumn.each(function(index, item){
    $(item).text( $(item).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
});
```
#### 3.2.4 Заменить null на -
```javascript
$lastColumn.each(function(index, item){
    $(item).text($(item).text().replace('null', '-'));
});
```
#### 3.2.5 Ширина одного столбца
```javascript
$('#table-' + w.general.renderTo + ' th:nth-child(1)')
.css({
    "width":"130px"
});
```
#### 3.2.6 Скрыть последний столбец таблицы
Вставить после TableRender
```javascript
$('#table-' + w.general.renderTo + ' tbody > tr > td:last-child').css({
    'display': 'none'
})
```
#### 3.2.7 УДАЛИТЬ последний столбец таблицы
Вставить после TableRender
```javascript
$('#table-' + w.general.renderTo + ' th:last-child').remove();
$('#table-' + w.general.renderTo + ' tbody > tr > td:last-child').remove();
})
```


### 3.3 Покрасить шапку таблицы. Код вставлять после TableRender
Данная настройка есть в настройках таблицы!!!
```javascript
var headColor = '#FDCE18'
$('#table-' + w.general.renderTo + ' thead').css('background',headColor);
```
headColor - цвет шапки

### 3.4 Закрепить шапку таблицы. Код вставлять после TableRender
Работает только вместе с подкраской шапки. В противном случае под шапкой будут видны строки при скролле.
```javascript
$('#table-' + w.general.renderTo).css({'border-collapse':'initial'}); // initial - жирные разделители столбцов; collapse - тонкие разделители
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});
```
### 3.5 Покрасить строку таблицы в зависимости от значения
```javascript
$('#table-' + w.general.renderTo + ' tbody tr').each(function(index,item){
    var val = +$(item.children[2]).text(); //children[2] - берем значение третьего столбца
    if (val >= 0){
        $(item).css({background: "#DCEBD3"}); //Цвет, если больше нуля
    }else{
        $(item).css({background: "#F9D6D5"});  //Цвет, если меньше нуля
    }
});
```

### 3.6 Покрасить числовые клетки таблицы в зависимости от значения
```javascript
$('#table-' + w.general.renderTo + ' tbody td').each(function(index,item){
    var val = +$(item).text(); 
    if (val < 0){
        $(item).css({background: "#DCEBD3"});
    }else if (val >100){
        $(item).css({background: "red"});
    }
});
```
В этом примере у нас два условия: для значений меньше нуля и больше ста. Можно менять цвет и добавлять условия

### Раскраска числовых данных определенного столбца в зависимости от значения
```javascript
$('#table-' + w.general.renderTo + ' tr > td:nth-child(4)').each(function(i, td) { // child(4) - раскраска для 4 столбца
    var value = +td.innerHTML;
    
    var color = '#607D8B'; // цвет данных ячейки по-умолчанию
    if (value > 0.0) {
        color = '#ff1744'; // цвет данных ячейки при значении больше нуля
    } else if (value <= 0.0) {
        color = '#64dd17'; // цвет данных ячейки при значении меньше или равной нулю
    }
    
    $(td).css({ // размещение данных в столбце
        "color": color, // установленного цвета
        'font-size': 15, // установленного размера
        'text-align': 'center', // по центру
        'font-weight' : 'bold' // полужирным шрифтом
    });
});
```
### 3.7	Убрать слияние строк в таблице (JS код)
После стандартного куска
```javascript
$("#table-"+w.general.renderTo+" tr td").show();
$("#table-"+w.general.renderTo+" tr").find('td[rowspan]').attr('rowspan', 1);
```

### 3.8	Покраска полоской 
```javascript
$('#table-' + w.general.renderTo + ' tr:nth-child(even) td').addClass("b05");
```

### 3.9 Дописать в ячейку слово
```javascript
.each(function(index,item){
    $(item).find('td:first').attr("valign", "top");
    var ya = $(item).find('td:nth-child(4)');
    ya.html('<span style="font-size:16px;">' + ya.html() + '</span>%</br>Явка');
    var g = $(item).find('td:nth-child(6)');
    g.html('<span style="font-size:16px;">' + g.html() + '</span>%</br>Голосов');
    var yar = $(item).find('td:nth-child(5)');
    yar.html('<span style="color:#2499F0;">' + yar.html() + '</span></br>место');
    var gr = $(item).find('td:nth-child(7)');
    gr.html('<span style="color:#9829AD;">' + gr.html() + '</span></br>место');
});

visApi().getWidgetDataByGuid(filterGuid).then(function(info) {
    $('#table-' + w.general.renderTo + ' tbody tr').each(function(index,item){
        if ( $(item).find('td:nth-child(3)').text() == info.selected.rows[0][0] ) {
            $(item).addClass( 'VasyaVasya' );
            $(item).find('td').css('background-color', '#E3F2FD');
            $(item).find('td:nth-child(3)').css({
                'border-left': '5px solid #2290E3',
                'font-weight': 'bold'
            });
//если нужно дописать другим цветом
            $(item).find('td:nth-child(5) span').css('font-size','16px');
            if ( !/место/.test( $(item).find('td:nth-child(5)').html() ) )
                $(item).find('td:nth-child(5)').html( $(item).find('td:nth-child(5)').html() + 'место' );
            $(item).find('td:nth-child(7) span').css('font-size','16px');
            if ( !/место/.test( $(item).find('td:nth-child(5)').html() ) )
                $(item).find('td:nth-child(7)').html( $(item).find('td:nth-child(7)').html() + 'место' );
        }
    });
});
```

### 3.10 Раскраска светофором значения и полоска
```javascript
var borderRadius = '10px'; // Радиус скругления
var boxShadowString = 'rgba(0, 0, 0, 0.2) 4px 4px 8px 4px'; 
//Цвет, смещение по y, смецение по x, размытие и спред для тени
//Картинка для раскраски серым
var img = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiQAAAFaCAYAAAAuM0ZcAAAGMUlEQVR4nO3csW0EIBBFQdvaCCpwRdd/MRBfGS9gpoINn74Ev5/P5/8HACD0Vx8AACBIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQBys/eubwAAHmchAQByggQAyAkSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMjNWqu+AQB4nIUEAMgJEgAgJ0gAgJwgAQByggQAyAkSACAnSACAnH9IAICchQQAyAkSACAnSACAnCABAHKCBADICRIAIOfZLwCQs5AAADlBAgDkBAkAkBMkAEBOkAAAOUECAOQECQCQ8w8JAJCzkAAAOUECAOQECQCQEyQAQE6QAAA5QQIA5GbvXd8AADzOQgIA5AQJAJATJABATpAAADlBAgDkBAkAkBMkAEBOkAAAOUECAOQECQCQm7VWfQMA8DgLCQCQEyQAQE6QAAA5QQIA5AQJAJATJABATpAAADn/kAAAOQsJAJATJABATpAAADlBAgDkBAkAkBMkAEDOs18AIGchAQByggQAyAkSACAnSACAnCABAHKCBADICRIAIOcfEgAgZyEBAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyAkSACA3e+/6BgDgcRYSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcrPWqm8AAB5nIQEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyAkSACDnHxIAIGchAQByggQAyAkSACAnSACAnCABAHKCBADICRIAICdIAICcj9EAgJyFBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyPmpFQDIWUgAgJwgAQByggQAyAkSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyM3eu74BAHichQQAyAkSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQBys9aqbwAAHmchAQByggQAyAkSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyAkSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyAkSACAnSACA3Nx76xsAgMdZSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyAkSACA355z6BgDgcRYSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyAkSACAnSACAnCABAHJz761vAAAeZyEBAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByfmoFAHIWEgAgJ0gAgJwgAQByggQAyAkSACAnSACAnCABAHKCBADI+RgNAMhZSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMj5hwQAyFlIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyM05p74BAHichQQAyAkSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgNzce+sbAIDHWUgAgJwgAQByggQAyAkSACAnSACAnCABAHKCBADI+YcEAMhZSACAnCABAHKCBADICRIAICdIAICcIAEAcp79AgA5CwkAkBMkAEBOkAAAOUECAOQECQCQEyQAQE6QAAA5/5AAADkLCQCQEyQAQE6QAAA5QQIA5AQJAJATJABATpAAADlBAgDkBAkAkBMkAEBuzjn1DQDA4ywkAEBOkAAAOUECAOQECQCQEyQAQE6QAAC5uffWNwAAj7OQAAA5QQIA5AQJAJATJABATpAAADlBAgDkBAkAkPMPCQCQs5AAADlBAgDkBAkAkBMkAEBOkAAAOUECAOQ8+wUAchYSACAnSACAnCABAHKCBADICRIAICdIAICcIAEAcv4hAQByFhIAICdIAICcIAEAcoIEAMgJEgAgJ0gAgJwgAQByggQAyAkSACAnSACA3Jxz6hsAgMdZSACAnCABAHKCBADICRIAICdIAICcIAEAcl/S8zbmgqpofgAAAABJRU5ErkJggg==')";

$('#widget-' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'box-shadow': boxShadowString
});
$('#widget-header-' + w.general.renderTo).css({
    'border-radius': borderRadius,
   // 'box-shadow': boxShadowString,
    'border-bottom-left-radius': '0px',
    'border-bottom-right-radius': '0px'
});
$('#' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'border-top-left-radius': '0px',
    'border-top-right-radius': '0px'
});

TableRender({
    table: w.general,
    style: w.style,
    columns: w.data.columns,
    records: w.data.records,
    editMask: w.data.editMask,
    rowNames: w.data.rowNames,
    colNames: w.data.colNames,
    showToolbar: false
});


$('#table-' + w.general.renderTo).css({'border-collapse':'initial'});
document.getElementById("grid-"+ w.general.renderTo).addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});


$('#table-' + w.general.renderTo + ' thead tr:first-child th:first-child')[0].innerHTML = "Район"

$('#table-' + w.general.renderTo + ' th:nth-child(1)').css({
    "text-align": "center"
})[0].rowspan=2;

$('#table-' + w.general.renderTo + '').css("border-collapse","collapse");
$('#table-' + w.general.renderTo + ' thead th').css("border","1px solid rgb(200,209,215)").css("background-color","rgb(235,238,240)").css("padding","15px 5px");

//интервалы значений для светофора
$('#table-' + w.general.renderTo + ' tbody td').css("border","0")
    .each(function(index,item){
    var val = +$(item).text(); 
    if (val < 100){
        $(item).css({"background-color": "#FFB0B0"});
    }
   if (val >= 100){
        $(item).css({"background-color": "#D1FF9D"});
    }
   if (val > 120){
        $(item).css({"background-color": "#FFEA9B"});
    }
});

$('#table-' + w.general.renderTo + ' tbody tr')
    .css("height", "40px")
    .each(function(index,item){
    $(item.children[0]).css({"color": "rgb(96, 125, 139)"})
    $(item.children[1]).css({"text-align": "right"});
    $(item.children[2]).css({"text-align": "right"});
    $(item.children[3]).css({"text-align": "right"});
    $(item.children[4]).css({"text-align": "right"});
    $(item.children[5]).css({"text-align": "right"});
});


//Расскраска
$('#table-' + w.general.renderTo + ' tr:nth-child(even)').css("background-color","rgb(244,246,247)");
$('#table-' + w.general.renderTo + ' tr:nth-child(even) td').css("background-image",img);
$('#table-' + w.general.renderTo + ' tr:nth-child(odd)').css("background-color","");
$('#table-' + w.general.renderTo + ' tr:nth-child(odd) td').css("background-image","");
$('#table-' + w.general.renderTo)
    .bind("sortEnd",function(e, table) {
    $('#table-' + w.general.renderTo + ' tr:nth-child(even)').css("background-color","rgb(244,246,247)");
    $('#table-' + w.general.renderTo + ' tr:nth-child(even) td').css("background-image",img);
    $('#table-' + w.general.renderTo + ' tr:nth-child(odd)').css("background-color","");
    $('#table-' + w.general.renderTo + ' tr:nth-child(odd) td').css("background-image","");
});
```
### 3.11 Сделать отображение персональной информации 
Нужно, когда информация лежит в одной строке, а нужно вывести в одном столбце. 
Все привязываем в "столбцы". Скрываем строки, скрываем "показатель".

```javascript
TableRender({
    table: w.general,
    style: w.style,
    columns: w.data.columns,
    records: w.data.records,
    editMask: w.data.editMask,
    rowNames: w.data.rowNames,
    colNames: w.data.colNames,
    showToolbar: false
});

$('#table-' + w.general.renderTo + ' tr:first-child').css({
    'display': 'none'
});

$('#table-' + w.general.renderTo + ' tbody > tr > td:last-child').css({
    'display': 'none'
});

$('#table-' + w.general.renderTo + ' tbody').remove();
$('#table-' + w.general.renderTo + ' thead > tr:first-child').remove();
$('#table-' + w.general.renderTo + ' thead > tr > th:nth-child(2n+1)').remove();
$('#table-' + w.general.renderTo + ' thead > tr > th').css({
    'text-align': 'left'
});


var info =  $('#table-' + w.general.renderTo + ' thead > tr:nth-child(1) > th').text();
$('#table-' + w.general.renderTo + ' thead > tr:nth-child(1) > th').html('<b>e-mail: </b>'+info);

var info2 =  $('#table-' + w.general.renderTo + ' thead > tr:nth-child(2) > th').text();
$('#table-' + w.general.renderTo + ' thead > tr:nth-child(2) > th').html('<b>тел.: </b>'+info2);

var info3 =  $('#table-' + w.general.renderTo + ' thead > tr:nth-child(3) > th').text();
$('#table-' + w.general.renderTo + ' thead > tr:nth-child(3) > th').html('<b>моб.: </b>'+info3);

var info4 =  $('#table-' + w.general.renderTo + ' thead > tr:nth-child(4) > th').text();
if (info4!== "null")
    info4 = getDateString(new Date(info4), 7);
else
    info4 = "";
$('#table-' + w.general.renderTo + ' thead > tr:nth-child(4) > th').html('<b>срок окончания полномочий: </b>'+ info4);


$('#table-' + w.general.renderTo + ' thead > tr > th').css('font-weight', 'normal');
```
### 3.12 Скрыть строку заголовка таблицы (не виджета)
Вставить после TableRender
```javascript
$('#table-' + w.general.renderTo + ' thead').css({
    'display': 'none'
})
```

### 3.13 Скрыть границы таблицы
Вставить после TableRender
```javascript
$('#table-' + w.general.renderTo + ' table').css({
    'border': 'none'
})
```
### 3.14 Запрет разбивания слов (td = таблца, th = заголовок)
Вставить после TableRender
```javascript
$('#table-' + w.general.renderTo + ' th')
.css({"word-wrap":"","word-break":"","overflow":"hidden"}) 
```
### 3.15 Обратная сортировка ПЕРВОГО столбца в таблице
Вставить ДО TableRender
```javascript
w.data.rowNames.sort(function(a, b) {
    return (a[0] < b[0]) ? 1: -1;
});

w.data.records.sort(function(a, b) {
    return (a.rowNames[0] < b.rowNames[0]) ? 1: -1;
});
 
```

### 3.16 Расчет количества дней между датами
Расчет производится добавлением кода c# в разделе "Аналитика".
Шаги выполнения:
1.	Необходимо проверить, что столбцы, которые будут использоваться для расчета дат, имеют формат DATE

2.	Обработка дат, если в столбце нет null или пустой строки
```javascript
DateTime.Parse(["15","24","DATE"]) - преобразовывает строку в формат DateTime для того, чтобы позволить использовать ее в расчетах. 
```

3.	Если в столбце имеется пустая строка или null, то необходимо подставить в нее другое значение (в примере используется текущая дата)
```javascript
 (["15","30","DATE"]) == "" – условие, если столбец возвращает пустую строку
|| – ИЛИ 
 ["15","30","DATE"] == null – условие, если столбец возвращает null
? DateTime.Now – заменяет null/пустую строку текущей датой
: DateTime.Parse(["15","30","DATE"]) – преобразовывает строку в формат DateTime
as string – используется для того, чтобы привести поля к единому типу данных 

```

4.	Использование расчета


5.	Округление полученных значений
```javascript
 .TotalDays,2
 2 – количество знаков после запятой
```

Полная формула для копирования:
```javascript
Math.round((( ["Серия 1"] as string) == "" || ["Серия 1"] == null ? DateTime.Now : DateTime.Parse["Серия 1"] as string)  ) - DateTime.Parse["Серия 2"]) ).TotalDays,2)
```

### 3.17 Сделать значения ячеек жирными и расположить по центру

Для всей таблицы
```javascript
$('#table-' + w.general.renderTo + ' tr>td').css({ 'font-weight': 'bold', 'text-align': 'center' });
```
Кроме первого столбца
```javascript
$('#table-' + w.general.renderTo + ' tr>td:not(:first-child)').css({ 'font-weight': 'bold', 'text-align': 'center' });
```

## 4 Гистограммы

### 4.1 Изменения при добавлении пользовательского виджета с сайта https://www.highcharts.com/

При копировании кода виджета с страницы https://www.highcharts.com/ в пользовательский виджет «”container”» поменять на следующую надпись:
w.general.renderTo

### 4.2 Накопление в гистограмме

Применить накопленный итог ко всем сериям гистограммы.
```javascript
w.series = w.series.map(function(item){
    var sum = 0;
    item.data = item.data.map(function(ditem){
        ditem.y += sum;
        sum = ditem.y;
        return ditem;
    });
    return item;
});
```

### 4.3 PlotLine (линия) на гистограмме

Только для виджета с 1 серией!

Добавить линию с определенным значением (в данном случае значение =38).
```javascript
plotLineId = 'myPlotLine1';
plotLineOptions = {
    color: "rgba(0,128,128,1.00)", //Цвет линии
    id: plotLineId,
    width: 5, // толщина линии в пикселях
    value: 38, //значение линии
    dashStyle: 'solid' //тип линии - сплошная
};
w.yAxis.plotLines.push (plotLineOptions)
//Составление подписи линии в легенде
for_series = {
    color: "rgba(0,128,128,1.00)", // цвет линии для отображения в легенде
    name: 'Среднее значение превышения СС по подразделениям', // Подпись в легенде
    dashStyle: 'shortdash',
    marker: {
        enabled: false}
};
w.series.push(for_series)
w.plotOptions.series.grouping = false
w.plotOptions.series.events = {}
w.plotOptions.series.events.legendItemClick = function(){
    return false
}
```

### 4.4 Логарифмическая шкала

w.yAxis.type = 'logarithmic'


### 4.5 Сортировка расчетного столбца(показателя)
```javascript
w.series[0].data =  w.series[0].data.sort(function(a,b){
    return a.y > b.y? -1: 1 ;
});
w.xAxis.categories = undefined;

```
### 4.6 Вертикальный скролл
```javascript
   var h = $('#' + w.general.renderTo).height();
    w.general.height = w.series[0].data.length * 22.22 + 100; 

    window.charts[w.general.renderTo] = Highcharts.chart({
        chart: w.general,
        xAxis: w.xAxis,
        yAxis: w.yAxis,
        plotOptions: w.plotOptions,
        series: w.series,
        drilldown: w.drilldown,
        legend: w.legend,
        tooltip: w.tooltip
    });
    $('#' + w.general.renderTo).find('.highcharts-container').css({
'overflow-y': 'auto'
 }).height(h);
```
### 4.7 Сгруппировать колонки гистограммы по две. Одна будет рисоваться поверх другой.
Проверено на 2.11

Код добавить в гистограмму до конструктора
```javascript
//Работает с количеством колонок <=6
var n_cols = Math.floor((w.series.length + 1) / 2);
var pPaddingBig, pPaddingSmall,  start, step;
if (n_cols === 1) {
    pPaddingBig = 0.1;
    pPaddingSmall = .2;
    start = 0;
    step = 0;
}else if (n_cols === 2){
    pPaddingBig = 0.3;
    pPaddingSmall = 0.4;
    start = -0.2;
    step = 0.4;
}else{
    pPaddingBig = 0.3;
    pPaddingSmall = 0.4;
    start = -0.3;
    step = 0.3;
}
w.series.forEach(function(item, i){
    var zIndex, pointPadding;
    if (i%2===0){
        pointPadding = pPaddingBig
        zIndex = 0;
    }else{
        pointPadding = pPaddingSmall
        zIndex = 10;
    }
    var pointPlacement = start + Math.floor(i/2) * step;
    Object.assign(item, {
        pointPadding: pointPadding,
        pointPlacement: pointPlacement,
        zIndex: zIndex
    }) 
});
 
w.plotOptions.series.grouping = false
w.plotOptions.column = {
            grouping: false,
            shadow: false,
            borderWidth: 0
        };
```

### 4.8 Разделить область графика на горизонтальные зоны цвета.
```javascript
w.general.marginLeft = 70; //Левый отступ
w.general.marginRight = 20; //Правый отступ

////////////////////////////////////////////////////////////////////////////////
// СЮДА ВВОДИМ ЗНАЧЕНИЯ ПРЕДЕЛОВ И ЦВЕТА ЗОН
var zone_0 = 200;   // какое значение считаем 100%

// основной цвет баров берется из propertyGrid (т.е. цвет для диапазона от последней явно указанной зоны до 100%)

var zone_1 = 50;            // указываем в процентах первую цветовую зону
var color_1 = '#ff5252';    // указываем цвет для первой зоны

var zone_2 = 60;            // указываем в процентах следующую цветовую зону
var color_2 = '#b2ff59';    // указываем цвет для следующей цветовой зоны

// если надо еще зоны, раскоментируем следующий код и/или копипастим и исправляем номера переменных т. д. 
 var zone_3 = 100;            // указываем в процентах следующую цветовую зону
 var color_3 = '#ffd740';    // указываем цвет для следующей цветовой зоны

var color_00 = '#ff5252'    // цвет баров превышающих 100%

////////////////////////////////////////////////////////////////////////////////

// расчитываю фактичесие значеиня для зон
zone_1 = zone_0 * zone_1 / 100
zone_2 = zone_0 * zone_2 / 100
// если надо еще зоны, раскоментируем следующий код и/или копипастим и исправляем номера переменных т. д. 
 zone_3 = zone_0 * zone_3 / 100

w.plotOptions.series.zones = [{
        // цветовая зона 1
        value: zone_1,
        fillColor: color_1, // цвет заливки
        color: color_1    // цвет линии
    },
    {
        // цветовая зона 2
        value: zone_2,
        fillColor: color_2,
        color: color_2
    },
// если надо еще зоны, раскоментируем следующий код и/или копипастим и исправляем номера переменных т. д. 
     {
         // цветовая зона 3
         value: zone_3,
         fillColor: color_3,
         color: color_3
        
     },
    // сюда вставляем дополнительные зоны
    
    {
        // основная зона 0 (цвет берется из propertyGrid (но можно разкомментировать ниже две строки и указать тут)) 
        value: zone_0,
        // fillColor: color_00,
        // color: color_00
    },
    {
        // зона 00 - превышение 100%
        value: zone_0 * 100,
        fillColor: color_00,
        color: color_00
    }
    ];
    


w.series.forEach(function(serie){
    serie.marker.fillColor = "white";
    serie.marker.lineWidth = 3;
    serie.marker.lineColor = serie.lineColor;
    serie.marker.radius = 7;
    serie.marker.symbol = 'circle';
});

var borderRadius = '10px'; // Радиус скругления
var boxShadowString = 'rgba(0, 0, 0, 0.2) 4px 4px 8px 4px'; //Цвет, смещение по y, смецение по x, размытие и спред для тени

$('#widget-' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'box-shadow': boxShadowString
});
$('#widget-header-' + w.general.renderTo).css({
    'border-radius': borderRadius,
  //  'box-shadow': boxShadowString,
    'border-bottom-left-radius': '0px',
    'border-bottom-right-radius': '0px'
});
$('#' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'border-top-left-radius': '0px',
    'border-top-right-radius': '0px'
});



Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip,
    colors: w.colors
});
```
### 4.9 Скруглить углы колонок гистограммы.
```javascript
w.plotOptions.series.borderRadius = 12;
```
### 4.10 Сделать гистограмму "Водопад"
```javascript
w.xAxis.categories = months.map(function(x){
    return x + '\'' + w.xAxis.categories[0].split('-')[0].slice(2);
});
w.xAxis.max = 11;

__________________________________
w.general.type = 'waterfall'

w.series[0].data.push({
            name: 'Итого',
            isSum: true,
            color: '#375067'
        })
w.xAxis.categories.push('Итого');
w.tooltip.formatter = function(){
    return '<span style="color:'+this.point.color+'">\u25CF</span> '+this.point.name+': <b>'+Math.round(this.y).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+'</b><br/>';
}
Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    legend: w.legend,
    tooltip: w.tooltip,
    colors: w.colors
});
```

## 5 Текст (заголовки, отступы)

### 5.1 Перенос записи (в заголовке) на новую строку
Перед самим заголовком ставится следующая комбинация символов:
<br>

### 5.2 Перед заголовком виджета отступ от рамки
Перед самим заголовком ставится то, что в кавычках:
 «　»

### 5.3 Перед заголовком виджета отступ от рамки (отступ поменьше)
Перед самим заголовком ставится то, что в кавычках:
« »

### 5.4	Сделать ссылку
Вставлять в поле для текста в PG
```javascript
<a target="_top" href="/dashboardsViewer?sectionId=3&dashboardId=48b1bc576ce74912ad263ba933da340e&sheetId=456f08afc3a045cc91e75d8f8d84e08a"style="color:#2196f3">Показатели социально-экономического развития</a>
```

### 5.5	Оформить ссылку как кнопку
```javascript
TextRender({
    text: w.general,
    style: w.style
});

var original_bgc = $('#' + w.general.renderTo).css('background-color');

$('#' + w.general.renderTo).hover(
    function() {
        $('#' + w.general.renderTo).css('background-color', '#2196F3');
        $('#' + w.general.renderTo + ' div a').css('color', '#ECEFF1');
    },
    function() {
        $('#' + w.general.renderTo).css('background-color', original_bgc);
        $('#' + w.general.renderTo + ' div a').css('color', w.style.color);
    }
);
/*
//это для правильного отображения даты
function pad(n) {return n < 10 ? "0"+n : n;}
if (w.data.rows.length == 1)
    w.general.text = pad((new Date).getDate())+"."+pad((new Date).getMonth()+1)+"."+(new Date).getFullYear();//(new Date).toLocaleDateString()//w.data.rows[0][0] + 'г.';
*/
```

### 5.6	Подтянуть в текстовый виджет значение из фильтра
Привязать текст к OLAP, вставить в начало код
```javascript
if (w.data.rows.length == 1)
    w.general.text = w.data.rows[0][0];
```
для дат:
```javascript
function pad(n) {return n < 10 ? "0"+n : n;}
if (w.data.rows.length == 1)
    w.general.text = pad((new Date).getDate())+"."+pad((new Date).getMonth()+1)+"."+(new Date).getFullYear();//(new Date).toLocaleDateString()//w.data.rows[0][0] + 'г.';
```

## 6 Разное

### 6.1 Сделать жирным текст в фильтре
```javascript
$('#filter-' + w.general.renderTo).css({'font-weight': 'bold'});
```

### 6.2 Динамическая смена заголовка при дрилдауне (фиксированные заголовки)
```javascript
var c = Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});

var title_names = [   '    Департаменты / службы', '   Топ департаментов/служб по количеству документов',
'   Топ ответственных лиц в департаменте/службе по количеству документов', '   Топ рубрик(тематик) по количеству документов', '   Топ организаций/граждан по количеству документов', ];

visApi().onDrillDownListener({widgetGuid: w.general.renderTo, guid: 'davai-dosvidaniya'}, function (info) {
    setTimeout(function() {
        var drill_level = visApi().getDrillLevel(w.general.renderTo);
        $('#widget-header-' + w.general.renderTo + ' a').text(title_names[drill_level]);
        c.series[0].options.color = w.colors[drill_level];
        c.series[0].update(c.series[0].options);
        /* $('#' + w.general.renderTo + ' g.highcharts-series-group rect').each(function() {
            $(this).attr('fill', w.colors[drill_level])
        }); */
    });
});

visApi().onDrillUpListener({widgetGuid: w.general.renderTo, guid: 'poka-poka'}, function (info) {
    setTimeout(function() {
        var drill_level = visApi().getDrillLevel(w.general.renderTo);
        $('#widget-header-' + w.general.renderTo + ' a').text(title_names[visApi().getDrillLevel(w.general.renderTo)]);
        c.series[0].options.color = w.colors[drill_level];
        c.series[0].update(c.series[0].options);
    });
});
```
### 6.3 Динамическая смена подписи в правом верхнем углу при дрилдауне 
```javascript
if ( !$('#widget-header-' + w.general.renderTo + ' div').length )
    $('#widget-header-' + w.general.renderTo).append('<div></div>');

Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});

visApi().onDrillDownListener({widgetGuid:w.general.renderTo, guid:'00037ca5-9bd0-4f10-94f0-d444651a62f2'}, function (info) { //guid должен быть уникален для листа
    $('#widget-header-' + w.general.renderTo + ' div')
    .html(
        info.hierarchyPath.reduce(function(sum, current) {
            return sum + current[0] + '<br>';
        }, '')//.slice(0,-1)
    );
});

visApi().onDrillUpListener({widgetGuid:w.general.renderTo, guid:'1a441a49-d1e9-48b5-86c5-ab0c651a8d4a'}, function (info) { //guid должен быть уникален для листа
    $('#widget-header-' + w.general.renderTo + ' div')
    .html(
        info.hierarchyPath.reduce(function(sum, current) {
            return sum + current[0] + '<br>';
        }, '')//.slice(0,-1)
    );
});
```
### 6.4 Синхронный дрилдаун на двух гистограммах
Код для гистограммы
```javascript
if ( !$('#widget-header-' + w.general.renderTo + ' div').length )
    $('#widget-header-' + w.general.renderTo).append('<div></div>');

Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: w.tooltip
});

visApi().onDrillDownListener({widgetGuid:w.general.renderTo, guid:'00037ca5-9bd0-4f10-94f0-d444651a62f2'}, function (info) { //guid должен быть уникален для листа
    $('#widget-header-' + w.general.renderTo + ' div')
    .html(
        info.hierarchyPath.reduce(function(sum, current) {
            return sum + current[0] + '<br>';
        }, '')//.slice(0,-1)
    );
});

visApi().onDrillUpListener({widgetGuid:w.general.renderTo, guid:'1a441a49-d1e9-48b5-86c5-ab0c651a8d4a'}, function (info) { //guid должен быть уникален для листа
    
    log(info.hierarchyPath)
    $('#widget-header-' + w.general.renderTo + ' div')
    .html(
        info.hierarchyPath.reduce(function(sum, current) {
            return sum + current[0] + '<br>';
        }, '')//.slice(0,-1)
    );
});
```
Дополнительно создается текстовый виджет, куда кладется код для синхронного дриллдауна:
```javascript
TextRender({
    text: w.general,
    style: w.style
});

var WidgetGuid1 = '29c9b324ce4e48ee9ea09e2c6b1907ae';
var WidgetGuid2 = '4bf38a2d69c044d7b31dba56080d64b6';

visApi().onDrillDownListener({widgetGuid:WidgetGuid1, guid:'33112313nepo'}, function (info) {
    setTimeout(function () {
              if (visApi().getDrillLevel(WidgetGuid1) != visApi().getDrillLevel(WidgetGuid2))
            visApi().drillDown(WidgetGuid2, info.selectedValues);
    });
});

visApi().onDrillUpListener({widgetGuid:WidgetGuid1, guid:'lalala'}, function (info) {
  visApi().getDrillLevel(WidgetGuid2), visApi().getDrillPath(WidgetGuid2));
    if (visApi().getDrillLevel(WidgetGuid1) != visApi().getDrillLevel(WidgetGuid2))
        visApi().drillUp(WidgetGuid2);
});

visApi().onDrillDownListener({widgetGuid:WidgetGuid2, guid:'13131ghadgafdgasga'}, function (info) {
    setTimeout(function () {
             if (visApi().getDrillLevel(WidgetGuid1) != visApi().getDrillLevel(WidgetGuid2))
            visApi().drillDown(WidgetGuid1, info.selectedValues);
    });
});

visApi().onDrillUpListener({widgetGuid:WidgetGuid2, guid:'fafrfagagag'}, function (info) {
 visApi().getDrillLevel(WidgetGuid2), visApi().getDrillPath(WidgetGuid2));
    if (visApi().getDrillLevel(WidgetGuid1) != visApi().getDrillLevel(WidgetGuid2))
        visApi().drillUp(WidgetGuid1);
});
```
### 6.5 Влияние виджета на фильтр или текст
В фильтре/текстовом виджете пишется выбранное на влияющем виджите
```javascript
visApi().onFilterChangedMessage({guid: "123", filterGuid: "b389423b2fcf4bf4ab305853603995a1"}, function (info) { 	//id влияющего виджета
    visApi().setFilterSelectedValues('fff60def91a44ef38153ca19e07fc541', info.selectedValues); 	//id фильтра
    var t = '';
    if (info.selectedValues.length > 0) {
        info.selectedValues.forEach(function(item) {
           t += item[0] + ', '; 
        });
        t = t.slice(0, -2);
    }
	$('#ca081446a6504d209627fc41c927f125 > div').text(t),	//id текстового виджета
	$('#b39eeb325c874e0f9afd52d808c55738 > div').text(t), 	//id текстового виджета
	$('#c0cd936e7ec244379c2be2d51129c1a0 > div').text(t); 	//id текстового виджета
});
```

### 6.6 Вставить видео(пользовательский виджет, без привязки)
```javascript
var AUTOPLAY = 0;
$('#' + w.general.renderTo).html('<video width="100%" height="100%" controls="controls" autoplay poster="https://bi.polymedia.ru/images_1/Video.jpg"><source src="https://bi.polymedia.ru/video/Visiology_full.mp4" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"></video>')
```

### 6.7 Накопление на виджете График-диаграмма с областями
```javascript
w.plotOptions.series.borderRadius = 3;
w.plotOptions.series.stacking = 'normal';

w.general.zoomType = 'x'
w.series = [ w.series[4] ,w.series[1],w.series[2], w.series[0],w.series[3]];
 w.tooltip.crosshairs = {
                    width: 1.5,
                    dashStyle: 'solid',
                    color: 'red'
                };
w.tooltip.shared = true;
w.tooltip.formatter = function(){
        var s = '';
        $.each(this.points, function () {
            s += '<br/>' + this.series.name + ': ' + (Math.round(this.y/1)/1).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        });
        return s;
}


w.series[0]['lineWidth'] = '1px';
w.series[1]['lineWidth'] = '1px';
w.series[2]['lineWidth'] = '1px';
w.series[3]['lineWidth'] = '1px';
w.series[4]['lineWidth'] = '1px';
Highcharts.chart({
    chart: w.general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: w.series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: {
        enabled: true,
        shared: true,
        style: {
            fontSize: '12px',
            fontFamily: 'Arial'
        },
    
        crosshairs: {
                width: 2,
                color: 'red',
                dashStyle: 'shortdot'
            },
        // formatter: function() {
        //     return '<br/>' + this.series.name + ': ' + this.y.toFixed().toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        // }
    },
    
});


var borderRadius = '4px'; // Радиус скругления
var boxShadowString = 'rgba(0, 0, 0, 0.05) 4px 4px 8px 4px'; //Цвет, смещение по y, смецение по x, размытие и спред для тени

$('#widget-' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'box-shadow': boxShadowString
});
$('#widget-header-' + w.general.renderTo).css({
    'border-radius': borderRadius,
  //  'box-shadow': boxShadowString,
    'border-bottom-left-radius': '0px',
    'border-bottom-right-radius': '0px'
});
$('#' + w.general.renderTo).css({
    'border-radius': borderRadius,
    'border-top-left-radius': '0px',
    'border-top-right-radius': '0px'
});
```

### 6.8 Скрыть колонки в графике/гистограмме (когда нажимаете F5, часть серий сразу "выключена")
Вставляется в самое начало:
```javascript
w.series[0].visible = false;
w.series[1].visible = false;
w.series[2].visible = false;
w.series[3].visible = false;
```

### 6.9 Добавить переход по клику по значениях дракона
```javascript
$('#' + w.general.renderTo + ' g.mainBars').each(function (i, e) {
    if (e.__data__.part === "secondary") {
        e.style.cursor = "pointer";
    }
});

$('#' + w.general.renderTo + ' g.mainBars').click(function (e) {
    var data = e.target.__data__;
    if (data.part === "secondary") {
        window.parent.location = "https://gtlk.polymedia.ru/dashboardsViewer?sectionId=3&dashboardId=60d1f9704c63402581ccbecdf0962408&sheetId=6f885ba46c614ec291a2e5f627217eae&cfo_filter=" + data.key;
    }
});
```
### 6.10 СОРТИРОВКА НА ВТОРОМ УРОВНЕ DRILLDOWN
Добавить после Highcharts.chart
```javascript
//СОРТИРОВКА НА ВТОРОМ УРОВНЕ DRILLDOWN
//guid должен быть уникальным (например дэшборд-лист-виджет-начало или конец кода)
visApi().onDrillDownListener({widgetGuid: w.general.renderTo, guid: '8-1-1-0'}, function (info) {

//собираем массив из наименования + значение
    var array = []; 
    info.widgetDataContainer.dataFrame.rows.forEach(function(el, ind, els){
        array[ind] = [el, info.widgetDataContainer.dataFrame.values[0][ind]];
    });
//выполняем сортировку массива    
    array = array.sort(function(a,b){ 
        return a[1] > b[1] ? -1: 1;
    });

//разбираем массив на строки (текст) и значения    
    array.forEach(function(el, ind, els){ 
        info.widgetDataContainer.dataFrame.rows[ind] = el[0];
        info.widgetDataContainer.dataFrame.values[0][ind] = el[1];
    });
    
    setTimeout(function() {

    });
});
//guid должен быть уникальным (например дэшборд-лист-виджет-начало или конец кода) 
visApi().onDrillUpListener({widgetGuid: w.general.renderTo, guid: '8-1-1-1'}, function (info) {

});
//КОНЕЦ СОРТИРОВКИ НА ВТОРОМ УРОВНЕ DRILLDOWN
```

## 7 Фильтр


### 7.1	Сделать жирным текст в фильтре
```javascript
$('#filter-' + w.general.renderTo).css({'font-weight': 'bold'});
```
### 7.2	Изменение цвета стрелочки и крестика в фильтре
```javascript
$('#' + w.general.renderTo + ' i').css('color', '#efd8de')
```
### 7.3	Фильтр со скруглением (как в Свердловске)
```javascript
FilterRender({
    filter: w.general,
    style: w.style,
    textStyle: w.textStyle,
    data: w.data
});
$('#' + w.general.renderTo + ' i').css('color', '#efd8de');
var borderRadius = '4px'; // Радиус скругления

$('#' + w.general.renderTo).css({ // Скругление фильтра
    'border-radius': borderRadius,
    'background-color': ''
}).find('.rb-filter-header-container').css({ 
    'border-radius': borderRadius,
    'background-color': '',
    'border' : '1px solid #D2D2D2'// цвет рамки фильтра
   });
   
$('#' + w.general.renderTo).css({
     'background-color': ''
}).find('.rb-filter-body-container').css({
    'background-color': '',
    'border-color' : '#D2D2D2' // цвет рамки внутри фильтра
   });
   
   
$('#' + w.general.renderTo).find('.rb-filter-header-text').css({
    'font-weight': 'bold'
});

//отступ внутри фильтра
$('#'+ w.general.renderTo +' div.rb-filter-header-container').css({
    'padding': "2px 10px", 
    'background-color': '#fff'
});

//скрытие радиобаттонов выбора "включить" и "исключить"
$('#'+ w.general.renderTo +' div.rb-filter-exclude-container').css({
    'display': 'none'
});

$('#'+ w.general.renderTo +' .rb-filter-body-container').css({
    'margin': '1px 0 0'
});
$('#'+ w.general.renderTo +' .rb-filter-header-close').css({
    'margin': '0 0'
});
```
### 7.4	Глобальный фильтр
Скрипт, лежащий по адресу K:\ОСИ\Отдел управления проектами\Аналитикам\global-filters v6.zip нужно положить на сервер, тогда во всех фильтрах с пробелом в конце названия будет устанавливаться одинаковое значение.

### 7.5 Установить значение фильтра в зависимости от значения параметра URI
```javascript
var filterValue = (new URL(window.parent.location.href)).searchParams.get("initial_filter_value");
if (filterValue) {
    w.data.selected = [{
        text: filterValue,
        id: filterValue,
    }];
}
```
### 7.6 Автоматическая установка в фильтре значение на последнюю дату
1. Ставит последнее пришешее знаечние в данных
2. Всегда работает, даже если есть внешнее влияние

```javascript
//Смена календарного разреза
function changePOK(x)
{
    //if (w.data.selected.length < 1){
        visApi().getWidgetDataByGuid(w.general.renderTo).then(function (widgetData) {
            var per = widgetData.data.rows[widgetData.data.rows.length - 1];
            visApi().setFilterSelectedValues(w.general.renderTo, [per], function (response) {});
//Если настроен шаблон для отображения
		//$('#' + w.general.renderTo + ' .rb-filter-header-text span').text((new Date(per)).toLocaleDateString('ru-RU'));
        });
    //}
}
changePOK();
```
### 7.7 Установить значение фильтра на "все" (сбросить значение фильтра)
```javascript
 visApi().setFilterSelectedValues(filtrGuid, [], function (response) {}); //filtrGuid - идентификатор фильтра
```

## 8 Плоские таблицы
Общая часть
Для использования кода на плоских таблицах необходимо внести общие корректировки стандартного кода, в дальнейшем дополнять эти блоки необходимыми кусками кода и доделками внешнего вида. Данные куски кода являются обязательными! 
```javascript
var dataGrid = DataGridRender({
    general: w.general,
    errorState: w.errorState,
    dataGridOptions: w.dataGridOptions,
    textFormatters: w.textFormatters,
    style: w.style,
});

```
//ЧАСТЬ 0 – Описание переменных
```javascript

//ЧАСТЬ 0 – Описание переменных

var oldOnCellPrepared = dataGrid.dataGridInstance.option("onCellPrepared");
dataGrid.dataGridInstance.option("onCellPrepared", function(event){  
```
//ЧАСТЬ 1 – Установление стиля таблицы
```javascript

//ЧАСТЬ 1 – Установление стиля таблицы

    oldOnCellPrepared(event); // Важная строка
    
});
```
//ЧАСТЬ2 – Управление элементами таблицы 
```javascript

//ЧАСТЬ 2 – Управление элементами таблицы 

dataGrid;   // Важная строка, обязательно должно быть в самом конце всего кода
    
});
```
Итого все вместе

```javascript
var dataGrid = DataGridRender({
    general: w.general,
    errorState: w.errorState,
    dataGridOptions: w.dataGridOptions,
    textFormatters: w.textFormatters,
    style: w.style,
});


//ЧАСТЬ0 – Описание переменных

var oldOnCellPrepared = dataGrid.dataGridInstance.option("onCellPrepared");
dataGrid.dataGridInstance.option("onCellPrepared", function(event){  

//ЧАСТЬ1 – Установление стиля таблицы

    oldOnCellPrepared(event); // Важная строка
    
});

//ЧАСТЬ2 – Управление элементами таблицы 

dataGrid;   // Важная строка, обязательно должно быть в самом конце всего кода
```

### 8.1 Выравнивание столбцов плоской таблицы по правому и левому краю
Код вставлять под комментарием с номером части

// В следующей переменной указать какой столбец по номеру (начиная с 0) какому выравниванию (по правому или левому краю) соответствует.

ЧАСТЬ 0
```javascript
var columnsAlignment = 
[
    {
        index:0,
        alignment: "left"
    },
    {
        index:1,
        alignment: "left"
    },
    {
        index:2,
        alignment: "right"
    },   // И так далее для нужных столбцов
]; 
```
ЧАСТЬ 1
```javascript
    // Установка расположение текста
    var columnAlignment = columnsAlignment.find(x=>x.index===event.columnIndex)
    if (columnAlignment)
        $(event.cellElement).css("text-align", columnAlignment.alignment);
```

### 8.2 Задать высоту строк плоской таблицы
Высота задается отступом от верхней и нижней границы строки в пикселях.

Добавляется в область Часть 1 (Код вставлять под комментарием с номером части)

ЧАСТЬ 1
```javascript
$(event.cellElement).css("padding-top", "1px").css("padding-bottom", "0px");
```

### 8.3 Форматирование строки плоской таблицы (цвет и жирность шрифта)
Код вставлять под комментарием с номером части

ЧАСТЬ 0
```javascript
var rowStyles = 
    [
        { index: 0, fontWeight: 'bold', backgroundColor: '#f2f3f3' },
        { index: 1, fontWeight: 'normal', backgroundColor: '#f265f3' },
        { index: 2, fontWeight: 'bold', backgroundColor: '#f2f3f3' },
        { index: 3, fontWeight: 'bold', backgroundColor: 'red' }
    ];
```

ЧАСТЬ 1
```javascript
// Жирные строки
    var rowStyle = rowStyles.find(x=>x.index===event.rowIndex)
    if(rowStyle)
        $(event.cellElement)
            .css("font-weight", rowStyle.fontWeight)
            .css("background-color", rowStyle.backgroundColor);
```

### 8.4 Отключение сортировки плоской таблицы
Код вставлять под комментарием с номером части

ЧАСТЬ 2
```javascript
dataGrid.dataGridInstance.option("sorting", "none"); // отключение сортировки
```

### 8.5 Отключение постраничной прокрутки
Код вставлять под комментарием с номером части

ЧАСТЬ 2
```javascript
dataGrid.dataGridInstance.option("pager", {visible: false});// отключение постраничной прокрутки
```

### 8.6 Переход на другой лист дэшборда при нажатии на конкретный элемент
Имитирует выбор показателя (значения измерения) в таблице для перехода на более подробный лист с анализом. 

Код вставлять под комментарием с номером части

ЧАСТЬ 0
```javascript
//Задаем строки, по нажатию на которые будет происходить переход
// Название элемента задается жестко 
var avaliableValues = 
[
    'АО "Михеевский ГОК"',
    'ООО "Инвест Развитие"'
];
```

ЧАСТЬ 1
```javascript
//Устанавливаем подчеркивание для нужных значений, курсов меняем на «руку» при наведении
    if(event.rowType === "data" && avaliableValues.indexOf(event.displayValue) > -1 && event.columnIndex === 1){
        $(event.cellElement)
            .css("text-decoration", "underline")
            .css("cursor","pointer")
            .click(x=>alert(event.cell.rowPath[0]));
    }
```

ЧАСТЬ 2
```javascript
dataGrid.dataGridInstance.option("onCellClick", function(event){
    
    var cellText = event.displayValue;
    
    if (avaliableValues.indexOf(cellText) > -1)
    {
        
        visApi().setFilterSelectedValues("b4f1160b394f4759978ce07f72d7d08e", [[text]]);//Установка значения в фильтре. При необходимости влияния элементом на фильтр

        setTimeout(x=>
            $('#7aff23927fd14b74a1e76484b9b8780b').click(),1000); // Идентификатор листа, на который происходит переход

    }
});
```
Идентификатор листа можно получить скопировав ссылку на лист. В конце будет указана переменная «sheetGuid».
&sheetGuid=bd32afddbc8043d0b49651078f3a6564&fit=true

### 8.7 Сделать жирную шапку плоской таблицы
Код вставлять под комментарием с номером части

ЧАСТЬ 1
```javascript
// Жирнение заголовков
    if (event.rowType === "header")
       $(event.cellElement).css("font-weight", "bold");
```

## 9 Сводная таблица
Общая часть

Для использования кода на сводных таблицах необходимо внести общие корректировки стандартного кода, в дальнейшем дополнять эти блоки необходимыми кусками кода и доделками внешнего вида. Данные куски кода являются обязательными! 

//ЧАСТЬ 0 – Дополнительная часть для выравнивания столбцов
```javascript
//ЧАСТЬ 0 – Дополнительная часть для выравнивания столбцов
var pgrid = OlapTableRender({
   general: w.general,
   pivotGridOptions: w.pivotGridOptions,
   style: w.style,
   errorState: w.errorState,
   textFormatters: w.textFormatters
});
```
//ЧАСТЬ 1 – Описание переменных
```javascript

//ЧАСТЬ 1 – Описание переменных

var oldOnCellPrepared = pgrid.pivotGridInstance.option("onCellPrepared");
pgrid.pivotGridInstance.option("onCellPrepared", function(event){

```
//ЧАСТЬ 2 – Управление таблицей
```javascript

//ЧАСТЬ 2 – Управление таблицей

oldOnCellPrepared(event);
});
pgrid; //эта строчка всегда должна оставаться последней

```

Итого все вместе

```javascript

//ЧАСТЬ 0 – Дополнительная часть для выравнивания столбцов

var pgrid = OlapTableRender({
   general: w.general,
   pivotGridOptions: w.pivotGridOptions,
   style: w.style,
   errorState: w.errorState,
   textFormatters: w.textFormatters
});

// ЧАСТЬ 1 – Описание переменных

var oldOnCellPrepared = pgrid.pivotGridInstance.option("onCellPrepared");
pgrid.pivotGridInstance.option("onCellPrepared", function(event){

// ЧАСТЬ 2 – Управление таблицей

oldOnCellPrepared(event);
});
pgrid; //эта строчка всегда должна оставаться последней
```

### 9.1 Сделать текст заголовка жирным в сводной таблице
Код вставлять под комментарием с номером части

ЧАСТЬ 2
```javascript
if(event.area === "column")
       $(event.cellElement).css("font-weight", "bold");
```

### 9.2 Задать выравнивание столбцов по правому краю
Код необходимо задавать для каждого столбца таблицы. Нумерация столбцов с 0.
Код вставлять под комментарием с номером части

ЧАСТЬ 0
```javascript
var dataSource = w.pivotGridOptions.dataSource;
function expandAllItems(dataSource){
   var rowFields = dataSource.fields()
       .filter(function(field){ return field.area === "row"; })
       .slice(0, -1);

   rowFields.forEach(function(field){ dataSource.expandAll(field.dataField); });
}
```

ЧАСТЬ 1
```javascript
var columnsAlignment = 
[
        {
        index:0,
        alignment: "right"
    },
        {
        index:1,
        alignment: "right"
    },
] // ..И так далее для каждого нужного столбца
```

ЧАСТЬ 2
```javascript
    // Расположение текста
        var columnAlignment = columnsAlignment.find(x=>x.index===event.columnIndex)
        if (columnAlignment && event.area === "data")
            $(event.cellElement).css("text-align", columnAlignment.alignment);
```

### 9.3 Изменить высоту строк сводной таблицы
Высота задается отступом от верхней и нижней границы строки в пикселях.
Код вставлять под комментарием с номером части

ЧАСТЬ 2
```javascript
    // Скукоживание высоты строк
     if(event.area === "data" || event.area === "row")
       $(event.cellElement).css("padding-top", "6px").css("padding-bottom", "6px");
```

### 9.4 Сводная таблица, развернутая до второго уровня по умолчанию
Заменить все.
```javascript
//разворачиваем первый уровень в строках
w.pivotGridOptions.dataSource._fields[0].expanded = true;

//явно задаем возможность разворачивать каждый уровень
w.pivotGridOptions.dataSource._fields.forEach(function (f) { return f.allowExpandAll = true; });

//добавляем пункт меню "Раскрыть все строки"
w.pivotGridOptions.onContextMenuPreparing = function (event) {
    var pivotGrid = event.component;

    var pasteAfterItemIndex = event.items
        .findIndex(function (item) { return item.text === "Свернуть все"; });

    var newItems = [{
        text: "Раскрыть все строки",
        onItemClick: function onItemClick() {
            pivotGrid.beginUpdate();
            pivotGrid.getDataSource().fields()
                .filter(function (f) { return f.dataField[0] === "r"; })
                .map(function (f) { return f.dataField; })
                .forEach(function (fieldId) { return pivotGrid.getDataSource().expandAll(fieldId); });
            pivotGrid.endUpdate();
        }
    }, {
        text: "Свернуть все строки",
        onItemClick: function onItemClick() {
            pivotGrid.beginUpdate();
            pivotGrid.getDataSource().fields()
                .filter(function (f) { return f.dataField[0] === "r"; })
                .map(function (f) { return f.dataField; })
                .sort(function(a,b){ return Number(b.split("-")[1]) - Number(a.split("-")[1]); })
                .forEach(function (fieldId) { return pivotGrid.getDataSource().collapseAll(fieldId); });
            pivotGrid.endUpdate();
        }
    }]; 

    //вставляем новый пункт после пункта "Свернуть все"
    event.items.splice(pasteAfterItemIndex + 1, 0, newItems[0], newItems[1]);
};

OlapTableRender({
    general: w.general,
    pivotGridOptions: w.pivotGridOptions,
    style: w.style,
    errorState: w.errorState,
    textFormatters: w.textFormatters
});
```

## 10 Круговая гистограмма

### 10.1 Форматирование легенды и подсказки
Для подписей в подсказке используются html- символы. Пример: 
&#1096;&#1090; -html коды конкретных букв «ш» и «т»

//http://yapro.ru/web-master/xhtml/html-kodi-bukv-i-specialinih-simvolov.html  - Можно использовать для вставления символов в подсказку
```javascript
var widgetId = w.general.renderTo;
w.plotOptions.pie.dataLabels.enabled = false;
var tooltip = {
  useHTML: true,
  backgroundColor: "white",
  borderColor: "",
  borderRadius: 4,
  borderWidth: 0,
  shape: "square",
  shadow: true,
  formatter: function formatter() {
    return "<span style='z-index:9999;background-color:black;'>\n            <div style='font-size:12px;font-weight:bold;'>".concat(this.key, "</div>\n            <div><span style='font-size:20px;font-weight:bold;'>").concat(Math.round(this.y), "</span><span style='font-size:10px;color:rgb(173,173,173);'>  &#1096;&#1090;</span></div>\n            <div style='font-size:14px;font-weight:bold;color:rgb(20, 173, 252)'>").concat(Math.round(this.percentage), " %</div>\n        </span>");
  }
};

w.legend.labelFormatter = function () {
  return "<span style='color:black;display:flex;flex-wrap:nowrap;width:170px;padding-right:2px;padding-left:2px;'>\n        <!-- <span style='border-radius:20px;background-color:".concat(this.color, ";width:10px;height:10px;'></span> -->\n        <span style='font-weight:bold;'>").concat(this.name, "</span><span style='color:rgb(173,173,173);margin-left:2px;'>").concat(Math.round(this.percentage), "% </span>\n        <span style='font-weight:bold;margin-left: auto;'>").concat(Math.round(this.y), "</span>\n    </span>");
};

w.legend.useHTML = true;
w.plotOptions.pie.borderWidth = 0; //убираем перекрытия между кусками пая

Highcharts.chart({
  chart: w.general,
  plotOptions: w.plotOptions,
  series: w.series,
  drilldown: w.drilldown,
  legend: w.legend,
  tooltip: tooltip,
  colors: w.colors
});
$("#" + widgetId + " .highcharts-container ").css("z-index", 2);
$("#widget-action-"+widgetId).css("z-index", 3);
$("#" + "pie-title-" + widgetId).css("z-index", 1);
```
## 11 Изображение

### 11.1 Изображение как кнопка (прозрачное/с ховером)
Отличие от текста, что нажимать можно в любом месте области виджета, а не только на сам текст
```javascript
ImageRender({
    image: w.general
});
// // Ссылки на картинки при наведении. Можно поставить свои. Чтобы не пролагивало, добавьте картинки на сам дэшборд, и сделайте ссылки с самого дашборда через F12 и инспектирование элемента.
// var arrowImg = 'url(/corelogic/api/query/image?fileGuid=6ea0e83a9d1c48ae849a94582e8344f3&access_token=NoAuth) center center no-repeat',
// arrowHoverImg = 'url(/corelogic/api/query/image?fileGuid=4ba76ab61ad241eabcb731ba49083a29&access_token=NoAuth) center center no-repeat';


$('#' + w.general.renderTo + ' div')
    .css({
        "cursor": "pointer"
    })
    // //Функция ховера при наведении на виджет
    // .hover(
    //     function() {
    //         $(this).css({'background': arrowImg});
    //      },
    //     function() {
    //         $(this).css({'background': arrowHoverImg});
    //     })
    .click(function(event){
    // ваша ссылка тут
        window.top.location.href = 'http://';
    });
    
```

