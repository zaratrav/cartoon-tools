
let img = new Image();

document.getElementById('upload').addEventListener('change', function(e){
    let reader = new FileReader();
    reader.onload = function(event){
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

function process(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img,0,0);

    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = imageData.data;

    for(let i=0;i<data.length;i+=4){
        let r=data[i], g=data[i+1], b=data[i+2];

        if("pixar"==="cartoon"){
            r = Math.round(r/50)*50;
            g = Math.round(g/50)*50;
            b = Math.round(b/50)*50;
        }

        if("pixar"==="disney"){
            r = r * 1.1;
            g = g * 0.9;
            b = b * 0.8;
        }

        if("pixar"==="comic"){
            r = r > 128 ? 255 : 0;
            g = g > 128 ? 255 : 0;
            b = b > 128 ? 255 : 0;
        }

        if("pixar"==="pixar"){
            r = r * 1.2;
            g = g * 1.1;
            b = b * 1.1;
        }

        if("pixar"==="pop"){
            r = (r>128)?255:0;
            g = (g>128)?255:0;
            b = (b>128)?255:0;
        }

        data[i]=r;
        data[i+1]=g;
        data[i+2]=b;
    }

    ctx.putImageData(imageData,0,0);
}
