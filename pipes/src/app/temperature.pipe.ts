import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
   if (!value) {
      return value;
   }
    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }
    let convertedTemp: number = 0;
    if (inputType === 'cel' && outputType === 'fah') {
      // convert Celcius to Fahrenheit
      convertedTemp = val * (9 / 5) + 32;

    } else if (inputType === 'fah' && outputType === 'cel') {
      // convert Fahrenheit to Celcius
      convertedTemp = (val - 32) * (5 / 9);
    } else {
      convertedTemp = val;
    }
    let symbol: '°C' | '°F';
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C': '°F';
    } else {
      symbol = outputType === 'cel' ? '°C': '°F';
    }
    return `${convertedTemp.toFixed(1)}${symbol}`;
  }
}
