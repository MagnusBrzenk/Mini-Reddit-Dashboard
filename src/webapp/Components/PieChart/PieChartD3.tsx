import * as d3 from "d3";
import PREZ from "__UTILS/frontendPresentation";
import { PieChart } from "./index";
type Id3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

/**
 *
 */
export class PieChartD3 {
    //
    readonly svgDivWrapperId: string;
    private mainSvgGroup: Id3Selection | undefined;
    private arcData: number[] | undefined;
    private plotWidth: number | undefined;
    private plotHeight: number | undefined;

    //
    constructor(svgDivWrapperId: string) {
        this.svgDivWrapperId = svgDivWrapperId;
    }

    //Method to reset SVG display
    initPieChart(initialArcData: number[], params: PieChart.IPieChartParams) {
        // Reset SVG space
        const svgWrapperDiv = document.getElementById(this.svgDivWrapperId);
        if (!!svgWrapperDiv)
            svgWrapperDiv.childNodes.forEach(function(thisChildNode, key, parent) {
                svgWrapperDiv.removeChild(thisChildNode);
            });

        // Dynamically parametrize size of chart based on container DIV
        // Calc Height, Width & Margins
        const wrapperWidth = !!svgWrapperDiv ? svgWrapperDiv!.offsetWidth : 1;
        const wrapperHeight = !!svgWrapperDiv ? svgWrapperDiv!.offsetHeight : 1;
        const margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        };
        this.plotWidth = wrapperWidth - margin.left - margin.right;
        this.plotHeight = wrapperHeight - margin.top - margin.bottom;

        //Create our main svg, and append a group positioned within the defined margins
        const svgWrapper: Id3Selection = d3.select("#" + this.svgDivWrapperId);
        this.mainSvgGroup = svgWrapper
            .append("svg")
            .attr("width", this.plotWidth + margin.left + margin.right)
            .attr("height", this.plotHeight + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .append("g")
            .attr("transform", `translate(${this.plotWidth / 2}, ${this.plotHeight / 2})`);
    }
    // }

    //
    updatePieChart(updatedArcData: number[], params: PieChart.IPieChartParams) {
        this.arcData = updatedArcData;

        if (!this.plotWidth || !this.plotHeight || !this.arcData || !this.mainSvgGroup)
            throw new Error("updatePieChart being called before essential class properties have been defined!");
        const arcData = this.arcData;
        const width = this.plotWidth!;
        const height = this.plotHeight!;
        const mainSvgGroup = this.mainSvgGroup!;

        //
        //Draw basic pie:
        const radius = Math.min(width, height) / 2;

        // const color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"]);
        const color = PREZ.qualitativeColorPalette;

        const pie = d3
            // .pie()
            .pie<number>()
            // .value(d => d.count)
            .value(d => d)
            .sort(null);

        const arc = d3
            .arc<number>()
            .innerRadius(0)
            .outerRadius(radius);

        function type(d: any) {
            d.apples = Number(d.apples);
            d.oranges = Number(d.oranges);
            return d;
        }

        //
        const path = mainSvgGroup.selectAll("path").data(pie(arcData)); //Dont need key function; default index is fine

        // Update existing arcs
        path.transition()
            .duration(700)
            // .attrTween("d", arcTween);
            .attrTween("d", function arcTween(a: any) {
                const i = d3.interpolate((this as any)._current, a);
                // this._current = i(1);
                (this! as any)._current = i(1);
                return (t: any) => arc(i(t))!;
            });

        // Enter new arcs
        path.enter()
            .append("path")
            // .attr("fill", (d, i) => color(i))
            .attr("fill", (d, i) => color[i])
            .attr("d", arc as any)
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            .each(function(d) {
                // this._current = d;
                (this! as any)._current = d;
            });
    }
}
