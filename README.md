# Стандартные куски кода
## 1. Внешний вид (скрытие, толщина, обводка, размер)

#### 1.1.	Скрытие серии 
(Код пишется до стандартного куска «Highcharts.chart({..})». Нумерация с нуля.)
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

### 2.8 Форматирование подсказки виджета (применение через поле «Форматирование подписей/точек »)
В поле «Текст» для круговой и в поле «Форматирование подписей/точек » ставится строчка ниже:

```javascript
@series.name+': '+Math.round(@value.y).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ').bold()
```
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

### 3.7	Убрать слияние строк в таблице (JS код)
Работает только с дополнительной надстройкой на сервер!
disableLeftColspan: true

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
### 4.7 Сортировка расчетного столбца(показателя)
```javascript
w.series[0].data =  w.series[0].data.sort(function(a,b){
    return a.y > b.y? -1: 1 ;
});
```
### 4.8 Вертикальный скролл
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
### 4.9 Сгруппировать колонки гистограммы по две. Одна будет рисоваться поверх другой.
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

### 4.10 Разделить область графика на горизонтальные зоны цвета.
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
### 4.11 Скруглить углы колонок гистограммы.
```javascript
w.plotOptions.series.borderRadius = 12;
```
### 4.12 Сделать гистограмму "Водопад"
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
console.log(w);
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
function pad(n) {return n < 10 ? "0"+n : n;}
if (w.data.rows.length == 1)
    w.general.text = pad((new Date).getDate())+"."+pad((new Date).getMonth()+1)+"."+(new Date).getFullYear();//(new Date).toLocaleDateString()//w.data.rows[0][0] + 'г.';
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
    console.log(info.hierarchyPath)
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
    console.log(info.hierarchyPath)
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
        //console.log('listner1', visApi().getDrillPath(WidgetGuid1), visApi().getDrillPath(WidgetGuid2));
        if (visApi().getDrillLevel(WidgetGuid1) != visApi().getDrillLevel(WidgetGuid2))
            visApi().drillDown(WidgetGuid2, info.selectedValues);
    });
});

visApi().onDrillUpListener({widgetGuid:WidgetGuid1, guid:'lalala'}, function (info) {
    //console.log('uplistner1', visApi().getDrillLevel(WidgetGuid1), visApi().getDrillPath(WidgetGuid1), visApi().getDrillLevel(WidgetGuid2), visApi().getDrillPath(WidgetGuid2));
    if (visApi().getDrillLevel(WidgetGuid1) != visApi().getDrillLevel(WidgetGuid2))
        visApi().drillUp(WidgetGuid2);
});

visApi().onDrillDownListener({widgetGuid:WidgetGuid2, guid:'13131ghadgafdgasga'}, function (info) {
    setTimeout(function () {
        //console.log('listner2', visApi().getDrillPath(WidgetGuid1), visApi().getDrillLevel(WidgetGuid2));
        if (visApi().getDrillLevel(WidgetGuid1) != visApi().getDrillLevel(WidgetGuid2))
            visApi().drillDown(WidgetGuid1, info.selectedValues);
    });
});

visApi().onDrillUpListener({widgetGuid:WidgetGuid2, guid:'fafrfagagag'}, function (info) {
    //console.log('uplistner2', visApi().getDrillLevel(WidgetGuid1), visApi().getDrillPath(WidgetGuid1), visApi().getDrillLevel(WidgetGuid2), visApi().getDrillPath(WidgetGuid2));
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

console.log(w)

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

### 7 Фильтр


### 7.1	Сделать жирным текст в фильтре
```javascript
$('#filter-' + w.general.renderTo).css({'font-weight': 'bold'});
```
### 7.2	Изменение цвета стрелочки и крестика в фильтре
```javascript
$('#' + w.general.renderTo + ' i').css('color', '#efd8de')
```
### 7.3	Фильтр со скруглением
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
