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
                  <v-btn small color="normal">draw</v-btn>
                  <v-btn small color="normal">import</v-btn>
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

  private options: object = {
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
    console.log(this.$echarts);
    const chart: any = this.$echarts.init(ele);    
    chart.setOption(this.options);
    console.log(this.$echarts);
  }
}

</script>