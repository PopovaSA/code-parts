# Стандартные куски кода
## 1. Внешний вид (скрытие, толщина, обводка, размер)

#### 1.1.	Скрытие серии
```javascript
w.series[1].showInLegend = false;
w.series[1].visible = false;
```
Скрытие первой серии ( и из легенды) для отображения.
#### 1.2.	Толщина линии в графике (JS код) и маркер

```javascript
w.series[0].marker = { symbol: 'square', radius: 10 }
// делает маркер первой серии квадратом. Circle, triangle - круг и треугольник соответственно. Radius - размер
```
Менять значение «4» на нужную толщину. w.series[0] – номер серии. Необходимо для всех серий прописать.

#### 1.3.	Убрать белую обводку вокруг столбца или сектора (JS код)
В гистограмме вокруг столбца:
```javascript
w.plotOptions.series.borderColor = 'transparent';
```
В круговой диаграмме вокруг сектора:
```javascript
w.plotOptions.pie.borderColor = 'transparent';
```
#### 1.4.	Поменять местами серии на гистограмме (JS код)
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
#### 1.11.	Отсортировать круговую диаграмму от большего к меньшему, округление до 2 символа (JS код)
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

#### 1.12 Покрасить негативные значение серии в другой цвет
```javascript
w.series[0].negativeColor = 'red'; //Красим точки первой серии красным если они меньше 0
```

#### 1.13 Размер баров
Если бары не помещаются вовсе в пределах границы виджета, или самый длинный бар настолько длинный что его подпись отображается на теле бара, поиграться с данной строчкой, меняя то что после знака =. 
Вставлять в начало кода.

#### 1.13 Скругления и тени рамок
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

```javascript
w.yAxis.maxPadding = 0.1 // Для горизонтальных баров 

w.xAxis.maxPadding = 0.1 // Для вертикальных баров
```

#### 1.14 Сделать линию шаговой
```javascript
w.series[0].step = 'right' // Делает первую серию шаговой линией. Доступно left, right, center
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

##### Все это можно комбинировать. Например:
```javascript
'<div style="color:' +(Math.round(@value.y*100)/100).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')+ '">'+ @value +'</div>'
```
Округлит до двух знаков после запятой и покрасит подпись в цвет столбца

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

## 3. Таблицы

### 3.1	Наименования столбцов в таблиц. Код вставлять до TableRender
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
$('#table-' + w.general.renderTo).css({'border-collapse':'initial'});
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
### 3.6	Убрать слияние строк в таблице (JS код)
Работает только с дополнительной надстройкой на сервер!
disableLeftColspan: true


## 4 Дополнительная функциональность

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

### 4.5 Окрас столбиков/графика (график, гистограмма, линейная диаграмма) в зависимости от их значения относительно указанного 100 процентного показателя. 
Целевое значение указывается в едининах измерения, пороговые значения указываются в процентах.

```javascript
////////////////////////////////////////////////////////////////////////////////
// СЮДА ВВОДИМ ЗНАЧЕНИЯ ПРЕДЕЛОВ И ЦВЕТА ЗОН
var zone_0 = 500;   // какое значение считаем 100%

// основной цвет баров берется из propertyGrid (т.е. цвет для диапазона от последней явно указанной зоны до 100%)

var zone_1 = 10;            // указываем в процентах первую цветовую зону
var color_1 = '#9DC9EF';    // указываем цвет для первой зоны

var zone_2 = 50;            // указываем в процентах следующую цветовую зону
var color_2 = '#F7B838';    // указываем цвет для следующей цветовой зоны

// если надо еще зоны, раскоментируем следующий код и/или копипастим и исправляем номера переменных т. д. 
// var zone_3 = 80;            // указываем в процентах следующую цветовую зону
// var color_3 = '#aaaaaa';    // указываем цвет для следующей цветовой зоны

var color_00 = '#2BF009'    // цвет баров превышающих 100%

////////////////////////////////////////////////////////////////////////////////

// расчитываю фактичесие значеиня для зон
zone_1 = zone_0 * zone_1 / 100
zone_2 = zone_0 * zone_2 / 100
// если надо еще зоны, раскоментируем следующий код и/или копипастим и исправляем номера переменных т. д. 
// zone_3 = zone_0 * zone_3 / 100

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
    // {
    //     // цветовая зона 3
    //     value: zone_3,
    //     fillColor: color_3,
    //     color: color_3
        
    // },
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

### 4.6 Окрас участков графика в зависимости от значения точки относительно указанного 100 процентного показателя. 
Целевое значение указывается в едининах измерения, пороговые значения указываются в процентах.
Вставляется в начало кода.

```javascript
////////////////////////////////////////////////////////////////////////////////
// СЮДА ВВОДИМ 
var zone_0 = 500;   // какое значение считаем 100% в ед. изм.

// основной цвет баров берется из propertyGrid (т.е. цвет для диапазона от последней явно указанной зоны до 100%)
var color_00 = '#2BF009'    // цвет баров превышающих 100%

var zone_1 = 20;            // указываем в процентах первую цветовую зону
var color_1 = '#9DC9EF';    // указываем цвет для первой зоны

var zone_2 = 50;            // указываем в процентах следующую цветовую зону
var color_2 = '#F7B888';    // указываем цвет для следующей цветовой зоны

// если надо еще зоны, раскоментируем следующую и/или копипастим и исправляем номера переменных т. д. 
// var zone_3 = 80;            // указываем в процентах следующую цветовую зону
// var color_3 = '#F7B800';    // указываем цвет для следующей цветовой зоны

////////////////////////////////////////////////////////////////////////////////

// расчитываю фактичесие значеиня для зон
zone_1 = zone_0 * zone_1 / 100
zone_2 = zone_0 * zone_2 / 100
// если надо еще зоны, раскоментируем следующую и/или копипастим и исправляем номера переменных т. д. 
// zone_3 = zone_0 * zone_3 / 100

w.plotOptions.series.zones = [{
        // цветовая зона 1
        value: zone_1,
        className: 'class_zone_1',
        color: color_1
    },
    {
        // цветовая зона 2
        value: 220,
        className: 'class_zone_2',
        color: color_2
    },
// если надо еще зоны, раскоментируем следующую и/или копипастим и исправляем номера переменных т. д. 
    // {
    //     // основная зона 3
    //     value: zone_3,
    //     className: 'class_zone_3',
    //     coclor: color_3
        
    // },
    {
        // основная зона 0 (основная цветовая из propertyGrid)
        value: zone_0,
        className: 'class_zone_0',
        color: '#7cb5ec'
    },
    {
        // зона 00 - превышеине 100%
        value: zone_0 * 100,
        className: 'class_zone_00',
        color: color_00
    }
    ];
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

## 6 Разное

### 6.1 Сделать жирным текст в фильтре
```javascript
$('#filter-' + w.general.renderTo).css({'font-weight': 'bold'});
```
### 6.2 Сгруппировать колонки гистограммы по две. Одна будет рисоваться поверх другой.
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