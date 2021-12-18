//https://teachablemachine.withgoogle.com/models/37UwfFjcr/
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90,
    });
    
    Webcam.attach("#camera");
    
    function clickphoto(){
        Webcam.snap(function(data_uri) {
            document.getElementById("snapshot").innerHTML='<img id="image" src="'+data_uri+'"/>';
        });
    }
    
    console.log('ml5 version',ml5.version)
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/37UwfFjcr/model.json',modelLoaded);
    
    function modelLoaded() {
        console.log("Model loaded");
    }
    
    function speak() {
        var synth=window.speechSynthesis;
        speak1="The first prediction is "+prediction1;
        speak2="and the second prediction is "+prediction2;
        var utterthis=new SpeechSynthesisUtterance(speak1+speak2);
        synth.speak(utterthis);
    }
    
    function check() {
        img=document.getElementById('image');
        classifier.classify(img,gotResult);
    }
    
    function gotResult(error,results) {
        if(error){
            console.error(error);
        } else{
            console.log(results);
            document.getElementById("resultname1").innerHTML=results[0].label;
            document.getElementById("resultname2").innerHTML=results[1].label;
            prediction1=results[0].label;
            prediction2=results[1].label;
            speak();
    
            if(results[0].label=="Good"){
                document.getElementById("emoji1").innerHTML="👍";
            }
            if(results[0].label=="Bad"){
                document.getElementById("emoji1").innerHTML="👎";
            }
            if(results[0].label=="Okay"){
                document.getElementById("emoji1").innerHTML="👌";
            }
            if(results[1].label=="Okay"){
                document.getElementById("emoji2").innerHTML="👌";
            }
            if(results[1].label=="Bad"){
                document.getElementById("emoji2").innerHTML="👎";
            }
            if(results[1].label=="Happy"){
                document.getElementById("emoji2").innerHTML="👍";
            }
    }
}