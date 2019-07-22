<template>
  <v-app id="inspire">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-title>TSP Visualizer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
    >
      <v-list dense>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container grid-list-md>
        <v-layout align-center justify-center column/>
          <v-flex md6 offset-md3>
            <v-tabs
              v-model="active"
              color="blue-grey lighten-3"
              dark
              ripple
              fixed-tabs
              :height="tabHeight"
            >
              <v-tab>input</v-tab>
              <v-tab-item>
                <v-card>
                  <v-textarea
                    class="pt-2 pr-2 pl-2"
                    v-model="points"
                    label="input"
                    solo
                    :placeholder="pointsDemo"
                  >
                  </v-textarea>                  
                  <v-btn small color="normal" @click="draw()">draw</v-btn>
                  <v-btn small color="normal" class="mr-3">import</v-btn>
                  <span>length: {{score}}</span>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>
          <v-flex shrink>
            <div id="myEcharts" style="height: 500px;"></div>
          </v-flex>
        </v-layout>
        
      </v-container>
    </v-content>

    <v-footer color="blue-grey" class="white--text" app>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import Chart from './Chart.vue';
import { ECharts } from 'echarts';
@Component({
  components: {
    Chart,
  },
})
export default class Frame extends Vue {
  private drawer: boolean = false;
  private right: boolean = false;
  private left: boolean = false;
  private active: boolean | null = null;

  private tabHeight: number = 30;
  private points: string = "";
  private pointsDemo: string = `20 120\n50 200\n40 50\n`;
  private verbose: string = "";

  private score: number = 0;

  private eChart: ECharts | null = null; // for eChart
  private options: {
    xAxis: object,
    yAxis: object,
    series: {
      data: number[][],
      type: string
    }[]
  } = {
    xAxis: {},
    yAxis: {},
    series: [{
        data: [[20, 120], [50, 200], [40, 50]],
        type: 'line'
    }]
  };

  @Prop({default: ''}) private source: string = '';

  private mounted() {
    const ele = document.getElementById('myEcharts');
    this.eChart = this.$echarts.init(ele);  
    console.log(this.eChart);
    this.chart(this.options);
  }

  private chart(option: {
    xAxis: object,
    yAxis: object,
    series: {
      data: number[][],
      type: string
    }[]
  }) {
    this.calculateScore(option.series[0].data);
    if (this.eChart !== null)
      this.eChart.setOption(option);
  }

  private calculateScore(array: number[][]) {
    this.score = 0;
    console.log(array.length);
    for (let i = 0; i < array.length - 1; ++i) {
      this.score += this.calcEuclide(array[i], array[i+1]);
    }
    this.score += this.calcEuclide(array[0], array[array.length - 1]);
  }

  private calcEuclide(p1: number[], p2: number[]) : number {
    const x = Math.abs(p1[0] - p2[0]);
    const y = Math.abs(p1[1] - p2[1]);
    return Math.sqrt(x * x + y * y);
  }

  private draw() {
    const pointsArr: string[] = this.points.split('\n');
    let newData: number[][] =  [];
    pointsArr.forEach(ele => {
      const xy: string[] = ele.split(' ');
      if (xy.length > 2) {
        this.verbose = "invalid input\n";
        return;
      }
      const data: number[] = [Number(xy[0]), Number(xy[1])];
      newData.push(data);
    });
    newData.push(newData[0]);
    this.chart({
      xAxis: {},
      yAxis: {},
      series: [{
        data: newData,
        type: 'line'
      }]
    });
  }
}

</script>