# Стандартные куски кода
## 1. Внешний вид (скрытие, толщина, обводка)

### 1.1.	Скрытие серии
```javascript
w.series[1].showInLegend = false;
w.series[1].visible = false;
```
Скрытие первой серии ( и из легенды) для отображения.
### 1.2.	Толщина линии в графике (JS код)

```javascript
w.series[0]['lineWidth'] = '4px'; 
```
Менять значение «4» на нужную толщину. w.series[0] – номер серии. Необходимо для всех серий прописать.

### 1.3.	Убрать белую обводку вокруг столбца или сектора (JS код)
В гистограмме вокруг столбца:
```javascript
w.plotOptions.series.borderColor = 'transparent';
```
В круговой диаграмме вокруг сектора:
```javascript
w.plotOptions.pie.borderColor = 'transparent';
```
### 1.4.	Поменять местами серии на гистограмме (JS код)
```javascript
w.series = w.series.reverse();
```
### 1.5.	Поменять местами категории на гистограмме (JS код)
```javascript
w.xAxis.categories = w.xAxis.categories.reverse();
```
### 1.6.	Вывести нужные столбцы или поменять столбцы местами (JS код)
```javascript
w.series = [ w.series[2] ,w.series[4],w.series[3]];
```
В данном примере первая и вторая серии отображаться не будут, 4 и 5 серия поменяются местами(нумерация с 0).
### 1.7.	Скрыть треугольник большого количества значений на виджете (JS код)
```javascript
$('[id*="va-widget-warning"]').css({'display':'none'});
```
### 1.8.	Показать n значений серии в гистограмме
```javascript
w.series[0].data = w.series[0].data.slice(0,10);
```
Последнее число показывает сколько значений отобразить.

### 1.9.	Убрать обводку подписей текста серий
```javascript
w.plotOptions.series.dataLabels.style.textOutline = false;
```
### 1.10.	Убрать тень (подсветку) подписей данных круговой
```javascript
w.plotOptions.pie.dataLabels.style.textOutline = false; 
```
### 1.11.	Отсортировать круговую диаграмму от большего к меньшему, округление до 2 символа (JS код)
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

## 2.	Форматирование подписей

### 2.1.	Обрезание значения (применение через поле «Форматирование подписей/точек »)

В поле «Текст» для круговой и в поле «Форматирование подписей/точек » ставится строчка ниже:
```javascript
(@value.y).toFixed(2)
```
*.toFixed(2)-обрезание значения до 2 знаков после запятой. В скобках количество знаков после запятой.
Важно: значение просто обрезается, а не округляется!

### 2.2.	Округление значения (применение через поле «Форматирование подписей/точек »)

В поле «Текст» для круговой и в поле «Форматирование подписей/точек » ставится строчка ниже:
```javascript
Math.round(@value.y)
```
Математическое округление.
### 2.3.	Задать надпись с определенным текстом в центре круговой
```javascript
"<center>"+@total+"<br>млрд.руб."

```
    "<center>" - Выравнивание надписи по центру.
    "<br>млрд.руб."- будет перенесено на следующую строку из-за <br>.

### 2.4.	Убрать буквы «K», «G»… (форматирование подписи оси)
```javascript
w.yAxis.labels.format = '{value}';
```
### 2.5.	Сделать все значения на гистограмме больше нуля (JS код)
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

### 2.6.	В виджете-показателе выводить число с точностью до одного символа после запятой

Строку
```javascript
value = Math.round(aggFuncs[w.props.aggregateFunction](w.data.data.values[0]))
```
заменить следующей строкой:
```javascript
value = (aggFuncs[w.props.aggregateFunction](w.data.data.values[0])).toFixed(1);
```
Обрезание значения, а не математическое округление!

### 2.7.	Обрезание значений серий до n знаков после запятой (JS код)
```javascript
w.plotOptions.series.dataLabels.formatter = function(){
    return Number((this.y).toFixed());
};
```
*.toFixed(0) или *.toFixed() -обрезание значения до целого. В скобках количество знаков после запятой.
Важно: значение просто обрезается, а не округляется!

### 2.8.	Округление с пробелами между разрядами (JS код)
```javascript
w.yAxis.stackLabels.formatter = function(){
    return Math.round(this.total).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}
```

Математическое округление до целого числа.
Было: 123456789,12345
Стало: 123 456 789

### 2.9.	Вывод значений в миллионах (миллиардах)
```javascript
w.yAxis.stackLabels.formatter = function(){
    return (this.total/1000000).toFixed(1)
}
```
*.toFixed(1)-обрезание значения до 1 знаков после запятой. В скобках количество знаков после запятой.
Важно: значение просто обрезается, а не округляется!
Было: 123456789,12345
Стало: 123,4
```javascript
return (this.total/100000).toFixed(1); //– для вывода в миллионах,
return (this.total/100000000).toFixed(1;) //– для вывода в миллиардах и так далее..

```

### 2.10.	Форматирование подсказки виджета (применение через поле «Форматирование подписей/точек »)

В поле «Текст» для круговой и в поле «Форматирование подписей/точек » ставится строчка ниже:
```javascript
@series.name+': '+Math.round(@value.y).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ').bold()
```

## 3. Таблицы

### 3.1.	Наименования столбцов в таблиц. Код вставлять до TableRender
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

### 3.2.	Операции со столбцами. Код вставлять после TableRender
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
 $col1.text(_text.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
```
#### 3.2.4 Заменить null на -
```javascript
$col1.text().replace('null', '-'));
```

### 3.3. Покрасить шапку таблицы
```javascript
var headColor = '#FDCE18'
$('#table-' + w.general.renderTo + ' thead').css('background',headColor);
```
headColor - цвет шапки

### 3.3.	Убрать слияние строк в таблице (JS код)
Работает только с дополнительной надстройкой на сервер!
disableLeftColspan: true


## 4.	Дополнительная функциональность

## 4.1.	Накопление в гистограмме

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

## 4.2.	PlotLine (линия) на гистограмме

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

### 4.3.	Логарифмическая шкала

w.yAxis.type = 'logarithmic'

### 4.4.	Изменения при добавлении пользовательского виджета с сайта https://www.highcharts.com/

При копировании кода виджета с страницы https://www.highcharts.com/ в пользовательский виджет «”container”» поменять на следующую надпись:
w.general.renderTo


## 5.	Текст (заголовки, отступы)

### 5.1.	Перенос записи (в заголовке) на новую строку
Перед самим заголовком ставится следующая комбинация символов:
<br>

### 5.2.	Перед заголовком виджета отступ от рамки
Перед самим заголовком ставится то, что в кавычках:
 «　»

### 5.3.	Перед заголовком виджета отступ от рамки (отступ поменьше)
Перед самим заголовком ставится то, что в кавычках:
« »

## 6. Разное

### 6.1 Баг со скейлингом графиков
Добавить в начало кода графика
```javascript
if (!Highcharts.isWrapped){
    (function (HighCharts) {
         // Partial fix to show datalabels on the right position for zoomed charts
        HighCharts.wrap(HighCharts.Pointer.prototype, 'normalize', function (proceed, event, chartPosition) {
            var e = proceed.call(this, event, chartPosition);
            var element = this.chart.container;
            if (element && element.offsetWidth && element.offsetHeight) {
    
                var scaleX = element.getBoundingClientRect().width / element.offsetWidth;
                var scaleY = element.getBoundingClientRect().height / element.offsetHeight;
                if (scaleX !== 1) {
                    e.chartX = parseInt(e.chartX / scaleX, 10);
                }
                if (scaleY !== 1) {
                    e.chartY = parseInt(e.chartY / scaleY, 10);
                }
    
            }
            return e;
        });
     Highcharts.isWrapped = true;  
    }(Highcharts));
}
```

### 6.2 Сделать жирным текст в фильтре
```javascript
$('#filter-' + w.general.renderTo).css({'font-weight': 'bold'});
```

### 6.3 Добавить переключение фильтра по клику на диаграмму
```javascript
var filterGuid = 'Сюда вставляем id фильтра';

w.series.forEach(function(serie){
    serie.point= {events: {
        click: function(){
           setFilter(filterGuid, [this.name]); //this.name - имя серии(столбца), this.point.name - имя точки(строки)
        }
    }
}});

function setFilter(guid, values){
    commandService.sendCommand({
              CommandType: "SetFilterValues+Command",
              WidgetGuid: guid,
              SelectedValues: values
            });
}
```
