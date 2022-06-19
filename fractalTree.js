const height = 400
const width = 400

let length = 110
let angle = 0
let densityCoeff = 30
let branching = 3
let angles = []

let densityWarningToggle = false
let branchWarningToggle = false

function setup() {
    frameRate(20)
    createCanvas(width,height)
    background(50)
    fill(255)
    stroke(255)
    strokeWeight(2)

    createElement("p", "Branching Angle: ")
    let angleSlider = createSlider(0, PI/2, 1, 0.01)
    angleSlider.input(() => {
        angle = angleSlider.value()
        let a = -angle
        angles = []
        while(a <= angle + 0.001 && angle != 0) {
            angles.push(a)
            a += 2 * angle / (branching - 1)
        }
        loop()
    })

    createElement("p", "Density Slider: ")
    let densitySlider = createSlider(1, 70, 30, 0.1)
    densitySlider.input(() => {
        if(densitySlider.value() >= 40 && densityWarningToggle == false){
            alert("WARNING: Don't go too high if you are on a slower device")
            densityWarningToggle = true
        }
        densityCoeff = densitySlider.value()
        loop()
    })

    createElement("p", "Branches Slider: ")
    let branchSlider = createSlider(2,8,3,1)
    branchSlider.input(() => {
        if(branchSlider.value() >= 5 && branchWarningToggle == false){
            alert("WARNING: Don't go too high if you are on a slower device")
            branchWarningToggle = true
        }
        branching = branchSlider.value()
        angle = angleSlider.value()
        let a = -angle
        angles = []
        while(a <= angle + 0.001 && angle != 0) {
            angles.push(a)
            a += 2 * angle / (branching - 1)
        }
        loop()
    })


}
function draw() {
    background(50)
    translate(width/2, height)
    
    branch(length)
    noLoop()
}
function branch(len) {
    let a = -angle

    line(0,0,0,-len)

    if(len < width / densityCoeff)
        return
    for (let i of angles){
        push()
        translate(0,-len)
        rotate(i)
        branch(len * 0.7)
        pop()
    }
}