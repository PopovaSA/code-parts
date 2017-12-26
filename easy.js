;
var projectAPI = (function () {
    'use strict';
    var EXCEL_SERVICE_URL = 'http://some_server:5000/get_report/';

    /**
     * Функция для связи с сервисом выгрузки
     * @param {string} report - Имя отчета.
     * @param {object} options - Настройки отчета.
     * @param {function} visApi - Временный проброс API visiology.
     * @return {void}
     */
    function getExcelReport(report, options, visApi) {
        var promiseArray = Object.keys(options).map(function (key) {
            var widgetPromise;
            if (options[key].type === 'value') {
                return new Promise(function (resolve, reject) {
                    resolve([key, options[key].value]);
                });
            }
            else if (options[key].type === 'filter') {
                widgetPromise = visApi().getWidgetDataByGuid(options[key].value);
                return widgetPromise.then(function (x) {
                    return [key, x.selected.rows[0][0]]
                });
            }
            else if (options[key].type === 'filterPeriod') {
                widgetPromise = visApi().getWidgetDataByGuid(options[key].value);
                return widgetPromise.then(function (x) {
                    var splitted = x.selected.rows[0][0].split(' ');
                    var from = splitted[1].split('.').reverse().join('-');
                    var to = splitted[3].split('.').reverse().join('-');
                    return [['from', from], ['to', to]]
                });
            }
        });
        //promiseArray = [].concat.apply([], promiseArray); //обрабатываем случай когда приходит массив внутри массива
        //console.log(promiseArray);
        Promise.all(promiseArray).then(function (kv) {
            var queryString = kv.map(function (x) {
                if (typeof(x[0] ) === 'object') {
                    return x.map(function (y) {
                        return y.join('=')
                    }).join('&');
                } else return x.join('=')
            }).join('&');
            var url = EXCEL_SERVICE_URL + report + '?' + queryString;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                if (this.status === 200) {
                    var filename = "Выгрузка.xlsx";
                    var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }
                    var type = xhr.getResponseHeader('Content-Type');

                    var blob = new Blob([this.response], {type: type});
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            // use HTML5 a[download] attribute to specify filename
                            var a = document.createElement("a");
                            // safari doesn't support this yet
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                //console.log(a.download);
                                a.href = downloadUrl;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }

                        setTimeout(function () {
                            URL.revokeObjectURL(downloadUrl);
                        }, 100); // cleanup
                    }
                }
            };
            xhr.send();
        });
    }


    /**
     * Функция для сворачивания уровней измерений в drilldown/
     * @param {string} w - Объект w.
     * @param {string} topLevelName - Имя верхнего уровня.
     * @param {Array} filters - Массив ID фильтров.
     * @param {function} visApi - Временный проброс API visiology.
     * @return {void}
     */
    function makeDrilldown(w, topLevelName, filters, visApi) {
        ///Цвета берутся из цветовой палитры виджета
        var colors = w.colors.slice(1);

        var serie = {
            name: topLevelName,
            data: {}
        };
        var drill = {};
        var data = visApi().getWidgetByGuid(w.general.renderTo).widgetData.data;


        _.zip(data.rows, data.values[0]).forEach(function (item) {
            var row = item[0],
                value = item[1];
            //Заполняем верхнюю серию
            if (serie.data[row[0]] === undefined) {
                serie.data[row[0]] = value
            } else {
                serie.data[row[0]] += value
            }
            //Заполняем дриллы
            for (var i = 1; i < row.length; i++) {
                var drillId = row.slice(0, i).join('-');
                var dataName = row[i];
                var drillTo = drillId + '-' + dataName;
                //console.log(drillTo)
                if (drill[drillId] === undefined) {
                    drill[drillId] = {
                        name: drillId,
                        id: drillId,
                        color: colors[i],
                        data: {}
                    };
                    //Добавляем обработчик клика на нижний уровень
                    if (i === row.length - 1) {
                        drill[drillId].point = {
                            events: {
                                click: _clickHandler
                            }
                        }
                    }
                }
                if (drill[drillId].data[dataName] === undefined) {
                    drill[drillId].data[dataName] = {name: dataName, y: value, drilldown: drillTo}
                } else {
                    drill[drillId].data[dataName].y += value
                }
            }

        });
        //Конвертируем данные серии из объекта в массив
        var temp = [];
        for (var key in serie.data) {
            if (serie.data.hasOwnProperty(key)) {
                temp.push({name: key, y: serie.data[key], drilldown: key})
            }
        }
        serie.data = temp;

        //Конвертируем дриллы из объекта в массив
        drill = Object.keys(drill).map(function (key) {
            return $.extend(drill[key], {
                data: Object.keys(drill[key].data).map(function (dataKey) {
                    return drill[key].data[dataKey]
                })
            })
        });
        if (w.xAxis) w.xAxis.categories = undefined;
        w.series = [serie];
        w.drilldown = {
                activeAxisLabelStyle: {
                    textDecoration: "normal",
                    color: "black",
                    fontWeight: "normal"
                }, activeDataLabelStyle: {
                    textDecoration: "normal",
                    color: "black",
                    fontWeight: "normal"
                },
                series: drill
            };
        function _clickHandler() {
            var values = this.drilldown.split('-');
            _.zip(filters, values).forEach(function (item) {
                visApi().setFilterSelectedValues(item[0],[[item[1]]]);
            });
        }

    }


    function connectNulls(w, color, type, dashStyle, lineWidth) {
        w.series.forEach(function (serie) {
            var interpolatedParts = serie.data.map(function (point, i) {
                if (point.y !== null) return null;
                else {
                    var prevArr = _findVal(serie, i, -1);
                    var nextArr = _findVal(serie, i, 1);
                    if (prevArr === null || nextArr === null) return point;
                    else {
                        var value;
                        if (type === 'previous'){
                            value = prevArr[0];
                        }else if(type === 'interpolate'){
                            value = prevArr[0] + (nextArr[0] - prevArr[0]) / (nextArr[1] - prevArr[1]);
                        }
                        return $.extend({}, point, {y: value, color: color})
                    }
                }
            });
            if (interpolatedParts.filter(function (x) {
                    return x !== null
                }).length !== 0) {
                interpolatedParts = _connect(interpolatedParts, serie);
                console.log(interpolatedParts);
                w.series.push({
                    data: interpolatedParts,
                    color: color,
                    marker: {
                        enabled: false
                    },
                    dashStyle: dashStyle,
                    lineWidth: lineWidth,
                    zIndex: 1,
                    showInLegend: false,
                    enableMouseTracking: false
                });
            }
        });
    }

    function _connect(interp, serie) {
        var result = interp;
        serie.data.forEach(function (item, i) {
            //console.log(item)
            if (serie.data[i + 1] !== undefined && serie.data[i + 1].y === null) {
                result[i] = $.extend({}, interp[i + 1], {y: item.y, name: item.name})
            }
            if (serie.data[i - 1] !== undefined && serie.data[i - 1].y === null) {
                result[i] = $.extend({}, interp[i - 1], {y: item.y, name: item.name})
            }
        });
        return result
    }

    function _findVal(serie, i, step) {
        //console.log(serie,i,step)
        if (serie.data[i] === null) return null;
        else if (serie.data[i].y !== null) return [serie.data[i].y, i];
        else return _findVal(serie, i + step, step)
    }

    return {
        getExcelReport: getExcelReport,
        makeDrilldown: makeDrilldown,
        connectNulls: connectNulls
    };
}());

