
function learnFunction() {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    console.log("Data was learned successfully");
    
}



function predictData() {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    console.log(4);
    var predicted_class = dt.predict({
     
        title: "Kill the Ashes",
        artist_name: "Adam"
    });

    var treeModel = dt.toJSON();

    console.log(treeModel);

}



