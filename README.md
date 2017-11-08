# Стандартные куски кода
## 1. Внешний вид (скрытие, толщина, обводка)

#### 1.1.	Скрытие серии
```javascript
w.series[1].showInLegend = false;
w.series[1].visible = false;
```
Скрытие первой серии ( и из легенды) для отображения.
#### 1.2.	Толщина линии в графике (JS код) и маркер

```javascript
w.series[0]['lineWidth'] = '4px'; //Толщина линии
w.series[0].marker = { symbol: 'square' }// делает маркер первой серии квадратом. Circle, triangle - круг и треугольник соответственно.  
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

## 2.	Форматирование подписей

### 2.1. Использование форматирования через поле в property grid DD
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

### 2.2.	Убрать буквы «K», «G»… через js код (форматирование подписи оси через js код)
```javascript
w.yAxis.labels.format = '{value:.,:0f} Ваш текст';
```
Округлит до 0 заков после запятой, поставит пробелы и припишет "Ваш текст"
### 2.3.	Сделать все значения на гистограмме больше нуля (JS код)
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

### 2.4.	В виджете-показателе выводить число с точностью до одного символа после запятой

Строку
```javascript
value = Math.round(aggFuncs[w.props.aggregateFunction](w.data.data.values[0]))
```
заменить следующей строкой:
```javascript
value = (aggFuncs[w.props.aggregateFunction](w.data.data.values[0])).toFixed(1);
```
Обрезание значения, а не математическое округление!

### 2.5.	Обрезание значений серий до n знаков после запятой (JS код)
```javascript
w.plotOptions.series.dataLabels.formatter = function(){
    return Number((this.y).toFixed());
};
```
*.toFixed(0) или *.toFixed() -обрезание значения до целого. В скобках количество знаков после запятой.
Важно: значение просто обрезается, а не округляется!

### 2.6. Форматирование подписей диаграммы с накоплением (JS код)
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


### 3.3. Покрасить шапку таблицы. Код вставлять после TableRender
Данная настройка есть в настройках таблицы!!!
```javascript
var headColor = '#FDCE18'
$('#table-' + w.general.renderTo + ' thead').css('background',headColor);
```
headColor - цвет шапки

### 3.4. Закрепить шапку таблицы. Код вставлять после TableRender
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
### 3.6.	Убрать слияние строк в таблице (JS код)
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
           //Можно применять сразу два фильтра, для этого определить еще один id фильтра и вызвать setFilter второй раз
           //Вот так setFilter(filterGuid, [this.name]);setFilter(filterGuid2, [this.point.name])
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

### 6.4 Добавить новую серию, рассчитанную по формуле от других серий.
```javascript
var newSeriesName = "New Series",  //Имя новой серии
    newSeriesColor = 'blue';        //Цвет новой серии
/*
*Формула для расчета новой серии. Столбцы помечаются как $номерСтолбца. 
*Например $0 - нулевой столбец, $2 - второй столбец(начиная с 0).
*В приведенной ниже формуле мы нулевой столбец умножаем на 20, первый на 30, далее складываем
*и делим результат на значение второго столбца
*/
var formula = '(20 * $0 + 30 * $1) / $2'; // Формула

//Код - обработчик. Новая серия добавляется в конец.
var items = w.series.map(function(serie){
    return serie.data;
});
var repacedFormula = formula.replace(/\$\d/g, function(str){
    return 'col['+str.slice(1)+'].y'
});
//console.log(repacedFormula)
var newSeriesData = _.zip.apply(this,items).map(function(col){
    var newValue =  eval(repacedFormula);
    return $.extend({},col[0],{y:newValue})
});
w.series = w.series.concat([{
    'name': newSeriesName,
    'data': newSeriesData,
    'color': newSeriesColor
}])
```

### 6.5 Добавить drilldown в гистограмму или pie и применение фильтров при клике на нижнем уровне.
 Этот способ предпочтительней использования пользовательского виджета. Просто копируем код и заменяем им код виджета. Большая часть настроек из property grid будет работать.
```javascript
//Цвета необходимо задавать здесь. Каждый уровень берет свой цвет по порядку.
var colors = ["#FDCE18", "#9DB1CF", "#31475D", "#D0DAE8", "#B45E40", "#EDAE58", "#F5D897", "#767676", "#A29FA2"]

/*
*Список id фильтров, которые будут применяться при клике на элемент нижнего уровня. 
*Нужно передавать в том же порядке, что и уровни.
*Если нужен только фильтр нижнего уровня, то остальные оставляем пустыми строками.
*/
var filters = ['f7dd606ccc714e3796647e61eb56069e','87599cfde18e461ea1f56bb65d35ca06','34b29e8ba4bf4b2dbc7cce6ca3a5ecb0','3a320669408e47ce8a96934f0bfad664'];

var serie = {
	name: 'Состояние', 
	data: {}
}
var drill = {}
var data = getWidgetByGuid(w.general.renderTo).widgetData.data;


var treeData = {}
_.zip(data.rows, data.values[0]).forEach(function(item){
    var row = item[0],
        value = item[1]
    //Заполняем верхнюю серию
    if (serie.data[row[0]] === undefined) {
        serie.data[row[0]] = value
    }else {
        serie.data[row[0]] += value
    }
    //Заполняем дриллы
    for (var i = 1;i<row.length;i++){
        var drillId = row.slice(0,i).join('-')
        var dataName = row[i];
        var drillTo = drillId + '-' + dataName
        //console.log(drillTo)
        if (drill[drillId] === undefined){
            drill[drillId] = {
                name: drillId,
                id: drillId,
                color: colors[i],
                data: {}
            }
            //Добавляем обработчик клика на нижний уровень
            if(i === row.length - 1){
                drill[drillId].point = {events:{
                    click: clickHandler
                }}
            }
        }
        if (drill[drillId].data[dataName] === undefined){
            drill[drillId].data[dataName] = {name: dataName,y: value, drilldown: drillTo} 
        }else {
            drill[drillId].data[dataName].y += value
        }
    }
    
});
//Конвертируем данные серии из объекта в массив
var temp = []
for (var key in serie.data) {
    temp.push({name: key, y: serie.data[key], drilldown:key})
}
serie.data = temp;

//Конвертируем дриллы из объекта в массив
drill = Object.keys(drill).map(function(key){
    return $.extend(drill[key], {data: Object.keys(drill[key].data).map(function(dataKey){
        return drill[key].data[dataKey]
    })})
});
if (w.xAxis) w.xAxis.categories = undefined;
//console.log(serie);
//console.log(drill)
Highcharts.chart({
    chart: w.general,
    lang: {
        drillUpText: "Назад к {series.name}"
    },
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: w.plotOptions,
    series: [serie],//w.series,
    drilldown: {
        activeAxisLabelStyle: {
            textDecoration: "normal",
            color: "black",
            fontWeight: "normal"
        },activeDataLabelStyle: {
            textDecoration: "normal",
            color: "black",
            fontWeight: "normal"
        },
        series: drill
    },
    legend: w.legend,
    tooltip: w.tooltip,
    colors: w.colors
});

function clickHandler(){
    var values = this.drilldown.split('-');
    _.zip(filters,values).forEach(function(item){
        setFilter(item[0],[item[1]])
    })
    console.log(this)
}

function setFilter(guid, values){
    commandService.sendCommand({
              CommandType: "SetFilterValues+Command",
              WidgetGuid: guid,
              SelectedValues: values
            });
}
```
