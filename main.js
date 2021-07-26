prediction_1= "";
prediction_2= "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML= '<img id= "captured_image" src= "'+data_uri+'"/>"';    
    });
}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/R9nNpkUZy/model.json', modelLoaded);
function modelLoaded() {
    console.log("model loaded !!!!!!!")
}
function speak() {
    var synth= window.speechSynthesis;
    speak_data_1= "The first prediction is" + prediction_1;
    speak_data_2= "The second prediction is" + prediction_2;
    var utterThis= newSpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check() {
    img= document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error, results) {
    if(error){
        console.error();
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML= results[0].label;
        document.getElementById("result_emotion_name2").innerHTML= results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak();
        if(results[0].label == "Thumbs Up")
        {
            console.log("up1");
            document.getElementById("update_emoji").innerHTML= "&#128077;";
        }
        if(results[0].label == "Thumbs Down")
        {
            console.log("down1");
            document.getElementById("update_emoji").innerHTML= "&#128078;";
        }
        if(results[0].label == "Clapping")
        {
            console.log("clapping");
            document.getElementById("update_emoji").innerHTML= "&#128079;";
        }
        
        
        //pred 2
        
        if(results[1].label == "Thumbs Up")
        {
            console.log("up2");
            document.getElementById("update_emoji2").innerHTML= "&#128077;";
        }
        if(results[1].label == "Thumbs Down")
        {
            console.log("down2");
            document.getElementById("update_emoji2").innerHTML= "&#128078;";
        }
        if(results[1].label == "Clapping")
        {
            console.log("clap2");
            document.getElementById("update_emoji2").innerHTML= "&#128079;";
        }
        if(results[1].label == "Good")
        {
            console.log("good2");
            document.getElementById("update_emoji2").innerHTML= "&#128076;";
        }
    }
}