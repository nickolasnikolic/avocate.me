window.onload = () => {

// fire a request at the api
const x = new XMLHttpRequest();
x.addEventListener('load', (e) => {
    //when data is ready with a 200 response
    if(e.target.readyState == 4){
        //pull the image from the img folder
        const i = new Image();
        i.src = './img/cache.png';

        i.addEventListener('load', () => {
            console.log('loaded', i);
            //process it
            //put it on canvas
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;//i.width;
            canvas.height = window.innerHeight;//i.height;
            const c = canvas.getContext('2d');
            c.drawImage(i, 0, 0, i.width, i.height);
            //get image data
            let imageData = c.getImageData(0,0,i.width, i.height);
            console.log(imageData);
            //where there is a pixel, put a circle 
            let imageArray = [];
            let xArrayOffset = 0;
            for(let y = 0; y < imageData.height; y++){
                let xOfPixel = 0;
                xArrayOffset += imageData.width * 4;
                for(let x = 0; x < imageData.width * 4; x += 4){

                    let pixel = {};
                    
                    pixel.r = imageData.data[x + xArrayOffset];
                    pixel.g = imageData.data[x + 1 + xArrayOffset];
                    pixel.b = imageData.data[x + 2 + xArrayOffset];
                    pixel.a = imageData.data[x + 3 + xArrayOffset];

                    pixel.x = xOfPixel++;
                    pixel.y = y;
                    
                    imageArray.push(pixel)

                }
            }
            let m = {}; //mouselocation
            window.addEventListener('mousemove', (e) => {
                m.x = e.x;
                m.y = e.y;
            });

            function animate(){
                c.clearRect(0,0, canvas.width, canvas.height);
                
                imageArray.forEach((pixel, index, wholeArray) => {
                    if(index % 6 == 0){
                        c.fillStyle = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${pixel.a / 255})`;
                        c.strokeStyle = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${pixel.a / 255})`;
    
                        let redRatio = pixel.r / 255;
                        let greenRatio = pixel.g / 255;
                        let blueRatio = pixel.b / 255;
                        let sizeOfPixel = redRatio * greenRatio * blueRatio * 100;

                        let randomPointCloseToCircleX = pixel.x + Math.random() * 3;
                        let randomPointCloseToCircleY = pixel.y + Math.random() * 3;
                        
                        c.beginPath();
                        c.arc(randomPointCloseToCircleX, randomPointCloseToCircleY, sizeOfPixel, 0, Math.PI * 2);
                        c.stroke();
                        //c.fill();
                        c.closePath();
                    }
                });
                requestAnimationFrame(animate);
            }
            animate();

            //display it
            document.body.appendChild(canvas);
        });
    }
});
x.open('get', './api/');
x.send();

};