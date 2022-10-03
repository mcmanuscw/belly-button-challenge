//Try to figure out which data key to use for each 
// dropdown >> use "names" key
// bar >> use "samples" key
// guage>> use "metadata" key
// bubble>> use "samples" key


// url to gather data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



//establish the drop down selector for the names dataset
function dropdown(){


    // 
    let dropdown_tag = d3.select("#selDataset");

    d3.json(url).then((data)=> {

        // initializes variable / list of "names" single array of ids using the "names" key
        let names_list = data.names

        //to iterate thorugh the sample data 
        names_list.forEach((sample) => {
            dropdown_tag
              .append("option")
              .text(sample)
              .property("value", sample);
          });
          
          //establishes the default selection - first position of the names list array
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
  

// establish the metadata table 
  function metadata_table(name){
        
    d3.json(url).then((data)=> {
        
        // initializes variable / metadata array using the "metadata" key
        let metadata_list = data.metadata
        
        
        let metadata_tag = d3.select("#sample-metadata");
        
        var result = metadata_list.filter(word => word.id == name);
        
         // sets up first element as the default
        var first_result = result[0]

        
        metadata_tag.html("")  

        Object.entries(first_result).forEach(([key, value]) => {
            metadata_tag.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });

}

function charts(name){
        
    
    //Bar Chart
    d3.json(url).then((data)=> {
        // initialize the metadata dataset
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
        var layout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: { t: 30, l: 150 }
        };
        // Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar", barData, layout)
    });

    //Bubble Chart
    d3.json(url).then((data)=>){
        
        let metadata_list = data.metadata

        var result = metadata_list.filter(word => word.id == name);
        var first_result = result[0] // sets up first element as the default

        let samples_list = data.samples

        var samples_result = samples_list.filter(word => word.id == name);
        var samples_first_result = samples_result[0] // sets up first element as the default

        var otu_ids = samples_first_result.otu_ids;
        var otu_labels = samples_first_result.otu_labels;
        var sample_values = samples_first_result.sample_values;
      
        var xticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        
        // Create the trace for the bar chart. 
        var bubbleData = [
            {
              y: sample_value,
              x: xticks,
              text: otu_labels,
              mode: 'markers'
              type: otu_labels
              marker:   {
                size: sample_values,
                color: otu_ids,
                colorscale: 'sunsetdark'


              }
            }
          ];

          var layout = {
            title: "<b>Bacterial Observations per Sample"<b>"
          }


    }



}




//app.js


