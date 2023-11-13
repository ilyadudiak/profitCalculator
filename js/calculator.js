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

    calculatorData.forEach(el => {

        resetInputWorkDays();
        if (select.val() == el.name) {
            calculatorCurrentData = el;
            calculatorInputData = {
                workDays: 1,
                procedurePerDay: calculatorCurrentData.pocedureMin,
                procedurePrice: calculatorCurrentData.priceMin,
                suppliesPrice: calculatorCurrentData.suppliesPrice
            };
            createStats(calculatorInputData);
            $('.calculator-top-left__img').css({ 'background': `center / contain no-repeat url(../img/${el.img})` });
            calculatorUpdate();
        }
    })

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


function createStats({ workDays, procedurePrice, procedurePerDay, suppliesPrice }) {
    console.log(suppliesPrice);
    console.log($('#calculatorCurrentData'));
    $('#calculatorEmployeeBonus').text((workDays * procedurePrice * procedurePerDay) / 4);
    $('#calculatorSupplies').text(suppliesPrice * workDays * procedurePerDay);
}

createStats(calculatorInputData);



// let currentChartData = [0, 2076, 2076 * 2, 2076 * 3, 2076 * 4, 2076 * 5];
// var ctx = document.getElementById("payback-chart").getContext("2d");
// var gradient = ctx.createLinearGradient(1000, 0, 0, 0);
// gradient.addColorStop(0, 'rgba(0, 113, 223, 0.6)');
// gradient.addColorStop(1, 'rgba(0, 113, 223, 0)');
// const chartLabels = $('#payback-chart').data('labels');
// const chartValues = $('#payback-chart').data('values');
// const chartData = {
//     labels: chartLabels,
//     datasets: [{
//         backgroundColor: gradient,
//         fill: true,
//         borderColor: 'rgb(0, 113, 223)',
//         datalabels: {
//             color: '#545459',
//             anchor: function (context) {
//                 let anc = 'left';
//                 switch (context.dataIndex) {
//                     case 1:
//                         anc = 'start';
//                         break;
//                     case 2:
//                         anc = 'start';
//                         break;
//                     case 3:
//                         anc = 'start';
//                         break;
//                     case 4:
//                         anc = 'end';
//                         break;
//                     case 5:
//                         anc = 'end';
//                         break;
//                     default:
//                         anc = 'end';
//                         break;
//                 }
//                 return anc;
//             },
//             align: function (context) {
//                 let pos = 'left';
//                 switch (context.dataIndex) {
//                     case 1:
//                         pos = 'right';
//                         break;
//                     case 2:
//                         pos = 'right';
//                         break;
//                     case 3:
//                         pos = 'right';
//                         break;
//                     case 4:
//                         pos = 'left';
//                         break;
//                     case 5:
//                         pos = 'left';
//                         break;
//                     default:
//                         pos = 'left';
//                         break;
//                 }
//                 return pos;
//             },
//             offset: 8,
//             display: function (context) {
//                 return context.dataIndex != 0;
//             },
//             font: function (context) {
//                 var width = context.chart.width;
//                 var size = Math.round(width / 32);
//                 return {
//                     size: (size <= 14) ? size : 14
//                 };
//             }
//         },
//         data: currentChartData,
//     }]
// };
// const chartConfig = {
//     type: 'line',
//     data: chartData,
//     options: {
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 grace: '6%',
//                 grid: {
//                     display: false
//                 }
//             },
//             y: {
//                 grid: {
//                     display: false
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             },
//             tooltip: {
//                 enabled: false
//             }
//         }
//     },

// };
// const paybackChart = new Chart(
//     ctx,
//     chartConfig
// );