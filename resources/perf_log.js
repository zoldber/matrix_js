class Point {

    constructor(x, y) {

        this.x = x;
        this.y = y;

    }

}

class Chart {

    constructor(plt) {

        this.x = plt.width;
        this.y = plt.height;
        this.ctx = plt.getContext("2d");



    }

    feed (data) {

        this.data = data;

    }

    display() {

        const xRange = this.data[this.data.length - 1].x;

        const yMin = this.data[this.data.length - 1].y;
        const yRange = this.data[0].y - yMin;

        // viewable and margin percentage, e.g. for 0.8, 10% margin exists on all edges
        const v = 0.8
        const m = (1.0 - v) / 2.0;

        var pX, pY, cX, cY;

        pX = ((this.data[0].x / xRange) * this.x * v) + (this.x * m);
        pY = ((1.0 - ((this.data[0].y - yMin) / yRange)) * this.y * v) + (this.y * m);

        for (var i = 1; i < this.data.length; i++) {

            cX = ((this.data[i].x / xRange) * this.x * v) + (this.x * m);
            cY = ((1.0 - ((this.data[i].y - yMin) / yRange)) * this.y * v) + (this.y * m);

            this.ctx.beginPath();

            this.ctx.moveTo(pX, pY);
        
            this.ctx.lineWidth = 2;
        
            this.ctx.strokeStyle = "aqua";
        
            this. ctx.lineTo(cX, cY);
    
            this.ctx.stroke();

            pX = cX;
            pY = cY;

        }


    }

}