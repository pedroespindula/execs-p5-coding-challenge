const sketch = (sk) => {
  const width = 600;
  const heigth = 600;

  let stars;

  const Star = (starSpeed) => {

    let x;
    let y;
    let z;

    let pz;

    const initValues = () => {
      x = sk.random(-width / 2, width / 2);
      y = sk.random(-heigth / 2, heigth / 2);
      z = sk.random(width);
      pz = z;
    };

    const update = () => {
      z -= starSpeed;
      if (z < 1) {
        initValues();
      };
    };

    const drawEllipse = () => {
      const sx = sk.map(x / z, 0, 1, 0, width);
      const sy = sk.map(y / z, 0, 1, 0, heigth);

      const size = sk.map(z, 0, width, 16, 0);

      sk.fill(255);
      sk.noStroke();
      sk.ellipse(sx, sy, size, size);
    };

    const drawTrail = () => {
      const px = sk.map(x / pz, 0, 1, 0, width);
      const py = sk.map(y / pz, 0, 1, 0, heigth);
      
      const sizeX = sk.map(x / z, 0, 1, 0, width);
      const sizeY = sk.map(y / z, 0, 1, 0, heigth);

      pz = z;

      sk.stroke(255);
      sk.line(px, py, sizeX, sizeY);
    };

    const show = () => {
      drawEllipse();
      drawTrail();
    };


    initValues();
    return {x, y, z, pz, update, show};
  };
  
  sk.setup = () => {
    sk.createCanvas(width, heigth);

    const speed = 10;
    const numStars = 800;

    stars = Array.from({length: numStars}, () => Star(speed));
  };

  sk.draw = () => {
    sk.background(51);
    sk.translate(width / 2, heigth / 2);

    stars.forEach((star) => {
      star.update();
      star.show();
    });
  };
};

export default sketch;
