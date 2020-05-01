const plt = require('nodeplotlib')
const nj = require('jsnumpy')
const pd = require('pandas-js')

const randomNumberGenerator = ((min, max) => {
	return Math.floor(Math.random() * ((max - min) + 1) + min)
})

const fiftyValues = (arrOne, arrTwo) => {
	if (arrOne.length < 50) {
		arrOne.push(randomNumberGenerator(25,75))
		arrTwo.push(randomNumberGenerator(0, 100))
		fiftyValues(arrOne, arrTwo)
	}
	return [arrOne, arrTwo]
}

//PANDAS-JS
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================


const twoArrays = fiftyValues([],[])
let df; 
for (let i = 0; i < twoArrays[0].length; i++) {
	const temp = new pd.DataFrame([{v1: twoArrays[0][i], v2: twoArrays[1][i]}])
	df !== undefined
	? df = df.append(temp, true)
	: df = temp 
}

df = df.set('zeros', new pd.Series(new Array(50).fill(0)))

const means = df.mean()
const v1Mean = means.values._tail.array[0]
const v2Mean = means.values._tail.array[1]

let v1Variences = []
let v2Variences = []
for (const [v1, v2] of df) {
	v1Variences.push((v1[1] - v1Mean)**2)
	v2Variences.push((v2[1] - v2Mean)**2)
}

df = df.set('v1Varience', new pd.Series(v1Variences))
df = df.set('v2Varience', new pd.Series(v2Variences))
//console.log(df.toString())

const sum = df.sum().values
const std = Math.sqrt(sum._tail.array[3])/df.length 
const stdTwo = Math.sqrt(sum._tail.array[4])/df.length 
console.log(stdTwo/std)
const stddf = df.std()
console.log(stddf._data)

