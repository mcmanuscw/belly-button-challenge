const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



//establish the drop down selector
function dropdown(){

    let dropdown_tag = d3.select("#selDataset");

    d3.json(url).then((data)=> {

        let names_list = data.names
        names_list.forEach((sample) => {
            dropdown_tag
              .append("option")
              .text(sample)
              .property("value", sample);
          });
          
          metadata_table(names_list[0])
          charts(names_list[0]);

    });


}

dropdown() 

// fetches the data whenever we change the value in the dropdown
function optionChanged(sample) {
    // Fetch new data each time a new sample is selected
    metadata_table(sample);
    charts(sample);
    
  }
  

function metadata_table(name){
        
    d3.json(url).then((data)=> {
        let metadata_tag = d3.select("#sample-metadata");
        let metadata_list = data.metadata

        var result = metadata_list.filter(word => word.id == name);
        var first_result = result[0] // sets up first element as the default

        metadata_tag.html("")  

        Object.entries(first_result).forEach(([key, value]) => {
            metadata_tag.append("h6").text(`${key.toUpperCase()}: ${value}`);

          });
          
      

    });



}



function charts(name){
        
    d3.json(url).then((data)=> {
        //let metadata_tag = d3.select("#sample-metadata");
        let metadata_list = data.metadata

        var result = metadata_list.filter(word => word.id == name);
        var first_result = result[0] // sets up first element as the default

        let samples_list = data.samples

        var samples_result = samples_list.filter(word => word.id == name);
        var samples_first_result = samples_result[0] // sets up first element as the default

        var otu_ids = samples_first_result.otu_ids;
        var otu_labels = samples_first_result.otu_labels;
        var sample_values = samples_first_result.sample_values;
      
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        // Create the trace for the bar chart. 
        var barData = [
          {
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
          }
        ];
        // Create the layout for the bar chart. 
        var barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: { t: 30, l: 150 }
        };
        // Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar", barData, barLayout);
    

    });



}































// // Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log("data",data[0]);
//   });






//Trace for the sample data / orientation will be landscape - see exercise 9 re: top 10
// let trace1 = {
//  //x = otu_ids
//  x: d3.json(url).then(function(data){
//     data.map(row => row.otu_id)

//  }

//  //y = sample values
    

// }


