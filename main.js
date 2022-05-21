Webcam.set({
    width:400,
    height:400,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id= "photo_taken" src= " '+data_uri+' ">';
    });
}

console.log('ml5 version ',ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-dpcbH8wS/model.json", modelLoaded);

function modelLoaded(){
    console.log("model Loaded");
}

function check(){
    img = document.getElementById("photo_taken");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_accuracy_name").innerHTML = results[0].confidence.toFixed(3);
    }
}