import Blank from './assets/Blank.svg';
import YellowChip from './assets/Yellow_chip.svg'
import RedChip from './assets/Red_chip.svg'


function Connet4Grid() {

    const board = new Array(6).fill().map(_ => new Array(7).fill())

    return(

    <div className="w-[600px] h-[520px] grid grid-rows-6 grid-cols-7 gap-2 bg-sky-700 mx-[30%] my-[5%] p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0">

        {board.map((row,i) => 
            row.map((col,j) =>
            <div key={i+'-'+j}><img src={Blank} /> </div>)
        )}
    </div>)

}

export default Connet4Grid