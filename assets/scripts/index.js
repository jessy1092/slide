$(document).ready(function () {
    impress().init();

    d3.json("./assets/data/topic2.json", function(data){
        var clickTag = 0;

        var dataNode = {children: data.map(function(value) { return {value: value}})};

        var d3Pack = d3.layout.pack().size([500, 500]).nodes(dataNode);
        d3Pack.shift();

        var ex4CreatePack = function (d3Pack) {
            var colorScale = d3.scale.linear().domain([1, 10]).range(["#00f", "#0f0"]);

            var dataPack = d3.select(".ex4").selectAll("circle.pack").data(d3Pack);
            dataPack.enter().append("circle").attr("class", "pack");

            d3.select(".ex4").selectAll("circle.pack").transition().duration(1000).attr({
                cx: function (d, i) { return d.x; },
                cy: function (d, i) { return d.y; },
                r: function (d, i) { return d.r; },
                fill: function (d, i) { return colorScale(d.value); },
                stroke: "#000"
            });

            var dataText = d3.select(".ex4").selectAll("text.pack").data(d3Pack);
            dataText.enter().append("text").attr("class", "pack");

            d3.select(".ex4").selectAll("text.pack").transition().duration(1000).attr({
                x: function (d, i) { return d.x; },
                y: function (d, i) { return d.y; },
                fill: "#000",
                "text-anchor": "middle",
                "dominant-baseline": "central"
            }).text(function (d) { return d.value; });
        };

        ex4CreatePack(d3Pack);

        d3.select(".ex4").selectAll("circle.pack").on('click', function () {
            clickTag = ++clickTag % 2;

            var d3PackTmp = d3.layout.pack().size([500, 500]).sort(function (a, b) {
                if (clickTag == 0) {
                    return b.value - a.value;
                } else {
                    return a.value - b.value;
                }
            }).nodes(dataNode);

            d3PackTmp.shift();
            ex4CreatePack(d3PackTmp);
        });
    });
});
