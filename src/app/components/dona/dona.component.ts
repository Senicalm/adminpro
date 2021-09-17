import { getLocaleNumberSymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title:string = 'sin titulo';
  @Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
  @Input('data') doughnutChartData: MultiDataSet = [[20, 20, 20]];
  // [
  //   [350, 450, 100],
  //    [50, 150, 120],
  //    [250, 130, 70],
  // ];

  public doughnutChartType: ChartType = 'doughnut';

  public colors:Color[] = [
    {backgroundColor:['#9E120E','#FF5800','#FFB414']},
    // {backgroundColor:['#9E120E','#FF5800','#FFB414']},
    // {backgroundColor:['#9E120E','#FF5800','#FFB414']}
  ];

  constructor() { }

  ngOnInit(): void {
     

  }

}
