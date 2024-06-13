import { ChartTypeRegistry } from 'chart.js';

declare module 'chart.js' {
  interface ChartTypeRegistry {
    gauge: {
      chartOptions: any;
      datasetOptions: any;
      defaultDataPoint: number;
    };
  }
}
