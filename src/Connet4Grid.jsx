import exampleImage from './assets/Ellipse_bg.svg';
function Connet4Grid() {

    const board = new Array(6).fill().map(_ => new Array(7).fill())

    return(<div className="w-[600px] h-[520px] grid grid-rows-6 grid-cols-7 gap-2 bg-sky-500 mx-[30%] my-[5%]">

        {board.map((row,i) => 
            row.map((col,j) =>
            <div key={i+'-'+j}><img src={exampleImage} /> </div>)
        )}
    </div>)

}

export default Connet4Grid