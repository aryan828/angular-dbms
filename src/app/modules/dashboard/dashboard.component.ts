import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {FormControl, FormGroup} from '@angular/forms';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DataRequest {
  data: string;
  group: string;
  range: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private chartService: DashboardService, private sbar: MatSnackBar) {
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  selected: string;
  selectedData: string;
  fetchedData: string;
  availableData: string[] = ['Customer Data', 'Food Sales Data', 'Cash Flow', 'Expenditures'];

  chartData = [
    {
      data: [],
      label: 'Monthly Income'
    },
    {
      data: [],
      label: 'Monthly Expenditure'
    }
  ];
  chartLabels = [];
  public pieChartPlugins = [pluginDataLabels];
  pieChartData = [
    {
      data: [],
      label: 'Monthly Expenditure'
    }
  ];
  pieChartLabels = [];
  chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          // return ctx.chart.data.labels[ctx.dataIndex];
          return ctx.chart.data.datasets[ctx.dataIndex + 1];
        },
      },
    }
  };
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(30, 169, 224, 0.8)', 'rgba(255,165,0,0.9)', 'rgba(139, 136, 136, 0.9)', 'rgba(255, 161, 181, 0.9)', 'rgba(255, 102, 0, 0.9)', 'rgba(0, 99, 71, 0.5)', 'rgba(0, 141, 182, 0.5)'],
    },
  ];

  avgValue: number = null;
  pDish: string = null;
  tcust: number = null;


  public lineChartOptions: any = {
    responsive: true,
    animation: {
      onComplete(): void {
        const chartInstance = this.chart;
        const  ctx = chartInstance.ctx;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach((dataset, i) => {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    }
  };

  ngOnInit(): void {
    this.chartService.getAvg().subscribe((x) => this.avgValue = x);
    this.chartService.getPD().subscribe((x) => this.pDish = x);
    this.chartService.getTC().subscribe((x) => this.tcust = x);
  }

  fetchData(): void {
    const request: DataRequest = {
      data: this.selectedData,
      group: this.selected,
      range: this.range.value
    };
    this.fetchedData = this.selectedData;
    if (this.selectedData === 'Food Sales Data') {
      this.chartService.fetchGraphData(request).subscribe((data) => {
        console.log(data);
        this.pieChartLabels = data.map((x) => x.name);
        this.pieChartData[0].data = data.map((x) => x.timer);
      });
    } else if (this.selectedData === 'Cash Flow') {
      this.chartService.getData1(request).subscribe((gdata) => {
        const chartData = [
          {
            data: [],
            label: 'Monthly Income'
          },
          {
            data: [],
            label: 'Monthly Expenditure'
          }
        ];
        this.chartData = chartData;
        this.chartData[0].data = gdata.map((x) => x.income);
        this.chartData[1].data = gdata.map((x) => x.expense);
        this.chartLabels = gdata.map((x) => x.month);
        console.log(this.chartLabels);
      });
    } else if (this.selectedData === 'Customer Data') {
      if (this.range.value.end === null || this.range.value.start === null) {
        this.sbar.open('Date range not selected!');
      } else {
        this.chartService.fetchGraphData(request).subscribe((data) => {
          console.log(data);
          const chartData = [
            {
              data: [],
              label: 'Orders Received'
            }
          ];
          chartData[0].data = data.map((x) => x.sales);
          this.chartData = chartData;
          this.chartLabels = data.map((x) => x.month);
        });
      }
    } else if (this.selectedData === 'Expenditures') {
      this.chartService.getData2(request).subscribe((data) => {
        console.log(data);
        this.pieChartLabels = data.map((x) => x.cat);
        this.pieChartData[0].data = data.map((x) => x.sum);
      });
    }
  }

  openSnackBar(message: string): void {
    this.sbar.open(message, 'Dismiss', {
      duration: 3000
    });
  }
}
