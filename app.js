const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
const submission = []

for(let i = 0; i < 81; i++){
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9);
    puzzleBoard.appendChild(inputElement)

    if(
       ((i % 9) <= 2 && (i < 21 || i > 53)) ||
       ((i % 9 >= 6  && i % 9 <= 8) && (i < 27 || i > 53)) ||
       ((i % 9 >= 3  && i % 9 <= 5) && (i > 27 && i < 53))
    ){
        inputElement.classList.add('odd-section');
    }
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if(isSolvable && solution){
        inputs.forEach((input,i) => {
            input.value=solution[i]
        })
        solutionDisplay.innerHTML = 'This is the solution';
        submission.length=0
    }
    else{
        console.log("UNSOLVABLE")
        solutionDisplay.innerHTML = 'This is not solvable';
        submission.length = 0
    }
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input =>{
         if(input.value)
         submission.push(input.value)
         else
         submission.push('.')
    })
    console.log(submission)
}

const solve = () => {
    joinValues()
    const data = submission.join('')
    console.log('data',data)
    var options = {
        method : 'POST',
        url : 'https://asudokuapi.herokuapp.com/',
        header :{
           'content-type' : 'application/json',
            'host' :'https://asudokuapi.herokuapp.com//'
        },
       
        data : {
            puzzle : data,
        }
        
    }

    //console.log(options.data)
    axios.request(options).then(function(response){
        console.log(response.data);
        populateValues(response.data.solvable, response.data.solution)
    }).catch(function(err){
        console.error(err);
    });
}

solveButton.addEventListener('click', solve)