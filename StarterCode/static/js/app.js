
function init(sample) {
d3.json("samples.json").then(data => {
   var metadata = data.metadata;
   var metadataResults = metadata.filter(name =>name.id ==sample)[0];
   var panel = d3.select("#sample-metadata");
   panel.html ("");
   Object.entries(metadataResults).forEach(([key, values])=>{panel.append("p").text (`${key}:${values}`)});
   var samples = data.samples;
   var results = samples.filter(name =>name.id ==sample)[0];
   var trace = [{  
      x: results.otu_ids.slice(0, 10),
      y:results.samples_values,
      text:results.otu_lables,
      type: "bar",
      orientation:"h",
   }];
   var layout ={
      title: "Sample Id's versus Values",
      xaxis: { title: "Values"},
      yaxis: { title: "Id's"},

   };
   var trace1 =[{
      x: results.otu_ids,
      y:results.samples_values,
      text:results.otu_lables,
      mode: "markers",
      marker :{size: results.sample_values, color: results.otu_ids}, 
   }];
   var layout1 ={
      title: "Sample Id's vs Values",
      // xaxis: { title: "Degrees (F)"},
      // yaxis: { title: "Degrees (F)"},
   };

Plotly.newPlot("bar", trace, layout)
Plotly.newPlot("bubble", trace1, layout1)
var names = data.names
var selDataset = d3.select ("#selDataset");
names.forEach((name)=>{selDataset.append("option").text (`${name}`)});
});
};
init(940)
function optionChanged(sample){
   init(sample)
};