let calculatorData = JSON.parse($('.calculator-data').text());

const select = $('#calculator-top-select');
let calculatorCurrentData = calculatorData[0];
function createSelect() {

    calculatorData.forEach(el => {
        let option = $("<option value='" + el.name + "'></option>");
        option.value = el.name;
        option.text(el.name);
        select.append(option);
    })

}


let calculatorInputData = {
    workDays: 1,
    procedurePerDay: calculatorCurrentData.pocedureMin,
    procedurePrice: calculatorCurrentData.priceMin,
    suppliesPrice: calculatorCurrentData.suppliesPrice
}

select.on('change', () => {

    // calculatorData.forEach(el => {

    //     resetInputWorkDays();
    //     console.log(select.val(), el.name);
    //     if (select.val() == el.name) {
    //         console.log('win');
    //         calculatorCurrentData = el;
    //         calculatorInputData = {
    //             workDays: 1,
    //             procedurePerDay: calculatorCurrentData.pocedureMin,
    //             procedurePrice: calculatorCurrentData.priceMin,
    //             suppliesPrice: calculatorCurrentData.suppliesPrice
    //         };

    //         createStats(calculatorInputData);
    //         $('.calculator-top-left__img').css({ 'background': `center / contain no-repeat url(img/${el.img})` });
    //         calculatorUpdate();
    //         return;
    //     }
    // })
    let thisElement = calculatorData.find((element) => element.name === select.val());
    calculatorCurrentData = thisElement;
    calculatorInputData = {
        workDays: 1,
        procedurePerDay: calculatorCurrentData.pocedureMin,
        procedurePrice: calculatorCurrentData.priceMin,
        suppliesPrice: calculatorCurrentData.suppliesPrice
    };
    console.log(thisElement, select.val());
    createStats(calculatorInputData);
    $('.calculator-top-left__img').css({ 'background': `center / contain no-repeat url(img/${thisElement.img})` });
    console.log(thisElement, select.val());
    calculatorUpdate();
})

createSelect();

function resetInputWorkDays() {
    $('#calculatorInputWorkDays')[0].value = 1;
    $('#calculatorWorkDays').text(1);
}

$('#calculatorInputWorkDays').on('input', (event) => {
    $('#calculatorWorkDays').text(event.target.value);
    calculatorInputData.workDays = event.target.value;

    createStats(calculatorInputData);

})
function resetInputProcedurePerDay() {
    $('#calculatorInputProcedurePerDay')[0].value = 1;
    $('#calculatorProcedurePerDay').text(1);
}
function createInputProcedurePerDay(max) {
    $('#calculatorInputProcedurePerDay').on('input', (event) => {
        calculatorInputData.procedurePerDay = event.target.value;
        $('#calculatorProcedurePerDay').text(event.target.value);

        createStats(calculatorInputData);

    })
    $('#calculatorInputProcedurePerDay')[0].max = max;
    console.log($('#calculatorInputProcedurePerDay'));

    $('#calculatorProcedurePerDayMax').text(max);

}

createInputProcedurePerDay(calculatorCurrentData.pocedureMax);



function createInputProcedurePrice(min, max) {
    $('#calculatorInputProcedurePrice').on('input', (event) => {

        $('#calculatorProcedurePrice').text(event.target.value);
        calculatorInputData.procedurePrice = event.target.value;

        createStats(calculatorInputData);

    })
    $('#calculatorProcedurePrice').text(min)
    $('#calculatorInputProcedurePrice')[0].max = max;
    $('#calculatorInputProcedurePrice')[0].min = min;
    $('#calculatorInputProcedurePrice')[0].value = min;
    $('#calculatorProcedurePriceMax').text(max);
    $('#calculatorProcedurePriceMin').text(min);

}

createInputProcedurePerDay(calculatorCurrentData.pocedureMax);
createInputProcedurePrice(calculatorCurrentData.priceMin, calculatorCurrentData.priceMax);

function calculatorUpdate() {
    resetInputProcedurePerDay();
    createInputProcedurePerDay(calculatorCurrentData.pocedureMax);

    createInputProcedurePrice(calculatorCurrentData.priceMin, calculatorCurrentData.priceMax);
}

var ctx = document.getElementById("payback-chart").getContext("2d");
var gradient = ctx.createLinearGradient(1000, 0, 0, 0);
gradient.addColorStop(0, 'rgba(0, 113, 223, 0.6)');
gradient.addColorStop(1, 'rgba(0, 113, 223, 0)');
const chartLabels = $('#payback-chart').data('labels');
const chartValues = $('#payback-chart').data('values');
let chartData = {
    labels: chartLabels,
    datasets: [{
        backgroundColor: gradient,
        fill: true,
        borderColor: 'rgb(0, 113, 223)',
        datalabels: {
            color: '#545459',
            anchor: function (context) {
                let anc = 'left';
                switch (context.dataIndex) {
                    case 1:
                        anc = 'start';
                        break;
                    case 2:
                        anc = 'start';
                        break;
                    case 3:
                        anc = 'start';
                        break;
                    case 4:
                        anc = 'end';
                        break;
                    case 5:
                        anc = 'end';
                        break;
                    default:
                        anc = 'end';
                        break;
                }
                return anc;
            },
            align: function (context) {
                let pos = 'left';
                switch (context.dataIndex) {
                    case 1:
                        pos = 'right';
                        break;
                    case 2:
                        pos = 'right';
                        break;
                    case 3:
                        pos = 'right';
                        break;
                    case 4:
                        pos = 'left';
                        break;
                    case 5:
                        pos = 'left';
                        break;
                    default:
                        pos = 'left';
                        break;
                }
                return pos;
            },
            offset: 8,
            display: function (context) {
                return context.dataIndex != 0;
            },
            font: function (context) {
                var width = context.chart.width;
                var size = Math.round(width / 32);
                return {
                    size: (size <= 14) ? size : 14
                };
            }
        },
        data: [0, 1, 2, 3, 4, 5],
    }]
};
let chartConfig = {
    type: 'line',
    data: chartData,
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                grace: '6%',
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    },
    plugins: [ChartDataLabels]
};
const paybackChart = new Chart(
    ctx,
    chartConfig
);
function roundNumber(num) {
    if (Number.isInteger(num)) {
        return num;
    } else {
        return num.toFixed(2);
    }
}
function updateChart(newData) {

    paybackChart.data.datasets[0].data = newData;
    console.log(paybackChart.data.datasets[0]);
    paybackChart.update();
}
function createStats({ workDays, procedurePrice, procedurePerDay, suppliesPrice }) {
    let incomeDay = (procedurePrice * procedurePerDay) - (suppliesPrice * procedurePerDay) - ((procedurePrice * procedurePerDay) / 4);
    let incomeYear = (incomeDay * workDays) * 12;

    $('#calculatorEmployeeBonus').text(roundNumber((workDays * procedurePrice * procedurePerDay) / 4));



    $('#calculatorSupplies').text(roundNumber(suppliesPrice * workDays * procedurePerDay));

    $('#calculatorIncomeDay').text(roundNumber(incomeDay));
    $('#calculatorIncomeMonth').text(roundNumber(incomeDay * workDays));
    $('#calculatorIncomeYear').text(roundNumber(incomeYear));
    $('#calculatorIncomeYear1').text(roundNumber(incomeYear));
    $('#calculatorIncomeYear2').text(roundNumber(incomeYear * 2));
    $('#calculatorIncomeYear3').text(roundNumber(incomeYear * 3));
    $('#calculatorIncomeYear4').text(roundNumber(incomeYear * 4));
    $('#calculatorIncomeYear5').text(roundNumber(incomeYear * 5));
    updateChart([0, roundNumber(incomeYear), roundNumber(incomeYear * 2), roundNumber(incomeYear * 3), roundNumber(incomeYear * 4), roundNumber(incomeYear * 5)]);
}

createStats(calculatorInputData);


