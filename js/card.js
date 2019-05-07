
class Card
{
    constructor(data)
    {
        this.data = data;
    }

    //given card data, draws all relevant charts and graphs
    drawVisualizations()
    {
        this.drawSynergies();
    }

    drawSynergies() 
    {
        let data = this.data;
        // Define the chart to be drawn.
        let table = new google.visualization.DataTable();
        let house = data.house;
        table.addColumn('string', 'House');
        table.addColumn('number', 'Winrate');
        table.addColumn({ type: 'string', role: 'style' });
        if (house != "Brobnar") {
            table.addRows([
                ['Brobnar', data.synergies.Brobnar, '#ef481f']
            ]);
        }
        if (house != "Dis") {
            table.addRows([
                ['Dis', data.synergies.Dis, '#540099']
            ]);
        }
        if (house != "Logos") {
            table.addRows([
                ['Logos', data.synergies.Logos, '#4cedff']
            ]);
        }
        if (house != "Mars") {
            table.addRows([
                ['Mars', data.synergies.Mars, '#70ff4c']
            ]);
        }
        if (house != "Sanctum") {
            table.addRows([
                ['Sanctum', data.synergies.Sanctum, '#205caa']
            ]);
        }
        if (house != "Shadows") {
            table.addRows([
                ['Shadows', data.synergies.Shadows, '#444444']
            ]);
        }
        if (house != "Untamed") {
            table.addRows([
                ['Untamed', data.synergies.Untamed, '#26600d']
            ]);
        }

        let options = {
            width: 600,
            height: 350,
            title: "House Synergies",
            titleTextStyle: {
                fontName: 'Segoe UI',
                fontSize: 20,
                bold: true,
                italic: false},
                  
            legend: { position: 'none' },
            vAxis: {
                minValue: 0.4,
                maxValue: 0.6
            }
        };

        // Instantiate and draw the chart.
        let chart = new google.visualization.ColumnChart(document.getElementById('ColumnChart'));
        chart.draw(table, options);
    }
}