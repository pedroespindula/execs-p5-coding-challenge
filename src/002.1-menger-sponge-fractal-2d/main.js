const sketch = (sk) => {

  const Sponge = (x, y, size) => {

    const squares = [];

    const generate = () => {
      if (squares.length == 0) {
        generateInner();
      } else {
        squares.forEach((line) => {
          line.forEach((square) => {
            square.generate();
          });
        });
      }
    };

    const generateInner = () => {
      for (let i = 0; i < 3; i++) {
        squares[i] = [];
        for (let j = 0; j < 3; j++) {
          if (i != 1 || j != 1) {
            const squareSize = size / 3;

            const px = x + squareSize * i;
            const py = y + squareSize * j;

            squares[i][j] = Sponge(px, py, squareSize);
          }
        } 
      }
    };

    const drawSquare = () => {
      sk.stroke(255);
      sk.noFill();
      sk.rect(x, y, size, size);
    };

    const show = () => {
      drawSquare();
      squares.forEach((line) => {
        line.forEach((square) => {
          square.show();
        });
      });
    };

    return { squares, generate, show };
  };

  const canvasSize = 600;

  const sponge = Sponge(50, 50, 500);

  sk.mouseClicked = () => sponge.generate();
  
  sk.setup = () => {
    sk.createCanvas(canvasSize, canvasSize);
  };

  sk.draw = () => {
    sk.background(51);
    sponge.show();
  };

};

export default sketch;
