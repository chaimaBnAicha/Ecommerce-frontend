import { Component, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ChartComponent, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexLegend, ApexFill } from "ng-apexcharts";
import { getVariableColor } from '../../utilities/root-var';
import { FlatpickrOptions } from 'ng2-flatpickr/ng2-flatpickr';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements AfterViewInit {


  public flatpickrdateOptions: FlatpickrOptions = {
    minDate: "today",
    dateFormat: "Y-m-d",
    inline: true,
    wrap: false
  };

  public dateRangeOptions: FlatpickrOptions = {
    mode: 'range'
  };

  @ViewChild("chart") chart: ChartComponent | any;

  public variableColors = getVariableColor();

  public colors = [this.variableColors.primary, this.variableColors.secondary, this.variableColors.tertiray];
  public colorss = [this.variableColors.primary, this.variableColors.secondary,]

  public salesChart2: Partial<ChartOptions> | any = {
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 72, 39, 21, 148]
    },
    {
      name: "Mobile",
      data: [20, 62, 70, 88, 67, 30, 100, 51, 98]
    },
    {
      name: "Tablet",
      data: [10, 82, 75, 68, 47, 90, 59, 101, 108]
    }],
    chart: {
      height: 355,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    colors: this.colors,
    forecastDataPoints: {
      count: 3
    },
    stroke: {
      width: 3
    },
    grid: {
      show: true,
      strokeDashArray: 7
    },
    markers: {
      size: 6,
      colors: '#FFFFFF',
      strokeColors: this.colors,
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 0,
      shape: 'circle',
      radius: 2,
      offsetX: 0,
      offsetY: 0
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    legend: {
      show: false
    }

  }

  public salesChart1: Partial<ChartOptions> | any = {
    chart: {
      height: 220,
      type: "area",
      toolbar: {
        show: false
      },
    },
    colors: this.colorss,
    dataLabels: {
      enabled: false
    },
    series: [
      {
        name: "Series 1",
        data: [60, 40, 40, 60, 70, 70, 60]
      }
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    grid: {
      show: true,
      strokeDashArray: 7,
    },
    // colors: "",
    stroke: {
      curve: 'straight',
      width: 2
    },
    yaxis: {
      tickAmount: 4,
      floating: false,

      labels: {
        minWidth: 20,
        maxWidth: 20,
        offsetY: -7,
        offsetX: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false
      }
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        minHeight: 20,
        maxHeight: 20,
      },
      categories: [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ]
    }
  }

  public salesChart4: Partial<ChartOptions> | any = {
    series: [15, 40, 45],
    chart: {
      type: 'donut',
      height: 450
    },
    colors: this.colors,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: '55%',
        },
      },
      stroke: {
        colors: undefined,
        width: 30,
      }
    },
    labels: ['Themeforest: 15%', 'Dribble: 40%', 'Figma 45%'],
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      legend: {
        position: 'right',
      },
      options: {
        chart: {
          width: 300
        },
      },


    }]
  }

  constructor() {
  }

  chartShow: boolean = false;

  showChart() {
    setTimeout(() => {
      this.chartShow = true
    }, 1000)
  }

  ngAfterViewInit(): void {
    this.showChart()
  }
}
