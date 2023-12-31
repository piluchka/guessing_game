"use strict"

class GuessingNumberHTMLCreation {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector)
  }

  createRangeInputs() {
    const rangeContainer = document.createElement("div")
    rangeContainer.className = "range"
    this.container.append(rangeContainer)

    const label = document.createElement("label")
    label.innerText = "Range "
    rangeContainer.append(label)

    const startNumberInput = document.createElement("input")
    startNumberInput.setAttribute("type", "number")
    startNumberInput.setAttribute("value", "1")
    startNumberInput.id = "startNum"
    label.append(startNumberInput)
    this.startNumberInput = startNumberInput

    const splitSymbol = document.createElement("span")
    splitSymbol.innerText = " - "
    label.append(splitSymbol)

    const endNumberInput = document.createElement("input")
    endNumberInput.setAttribute("type", "number")
    endNumberInput.setAttribute("value", "100")
    endNumberInput.id = "endNum"
    label.append(endNumberInput)
    this.endNumberInput = endNumberInput
  }

  createAttemptsInput() {
    const attemptContainer = document.createElement("div")
    attemptContainer.className = "attempts"
    this.container.append(attemptContainer)

    const label = document.createElement("label")
    label.innerText = "Attempts "
    attemptContainer.append(label)

    const attemptInput = document.createElement("input")
    attemptInput.setAttribute("type", "number")
    attemptInput.setAttribute("value", "5")
    attemptInput.id = "attemptsNum"
    label.append(attemptInput)

    this.attempsInp = attemptInput
  }

  createShowArea() {
    const showContainer = document.createElement("div")
    showContainer.className = "showNumber"
    this.container.append(showContainer)

    const area = document.createElement("p")
    area.id = "showArea"
    showContainer.append(area)
    this.showArea = area
  }

  createPlayButtons() {
    const btnsContainer = document.createElement("div")
    btnsContainer.className = "buttons"
    this.container.append(btnsContainer)

    const upButton = document.createElement("button")
    upButton.innerText = "↑"
    upButton.id = "upButton"
    btnsContainer.append(upButton)
    this.upButton = upButton

    const winButton = document.createElement("button")
    winButton.innerText = "✓"
    winButton.id = "winButton"
    btnsContainer.append(winButton)
    this.winButton = winButton

    const downButton = document.createElement("button")
    downButton.innerText = "↓"
    downButton.id = "downButton"
    btnsContainer.append(downButton)
    this.downButton = downButton
  }

  createPlayAgainButton() {
    const playAgainBtnContainer = document.createElement("div")
    playAgainBtnContainer.className = "playAgain"
    this.container.append(playAgainBtnContainer)

    const playAgainButton = document.createElement("button")
    playAgainButton.innerText = "Play again"
    playAgainBtnContainer.append(playAgainButton)

    this.playAgainBtn = playAgainButton
  }

  render() {
    this.createRangeInputs()
    this.createAttemptsInput()
    this.createShowArea()
    this.createPlayButtons()
    this.createPlayAgainButton()
  }
}

class GuessingGame extends GuessingNumberHTMLCreation {
  constructor(containerSelector) {
    super(containerSelector)
  }

  createRules() {
    const rulesContainer = document.createElement("div")
    rulesContainer.className = "rules"
    this.container.append(rulesContainer)

    const title = document.createElement("h3")
    title.innerText = "Game rules:"
    rulesContainer.append(title)

    const rulesList = document.createElement("ol")
    rulesContainer.append(rulesList)

    const firstRule = document.createElement("li")
    firstRule.innerText = "Select a range and a number of attempts you let a computer have"
    rulesList.append(firstRule)

    const secondRule = document.createElement("li")
    secondRule.innerText = "Now, choose a number in the selected range"
    rulesList.append(secondRule)

    const thirdRule = document.createElement("li")
    thirdRule.innerText = "If a computer shows you a number greater than yours - press the 'down button'"
    rulesList.append(thirdRule)

    const forthRule = document.createElement("li")
    forthRule.innerText = "If a computer shows you a number less than yours - press the 'up button'"
    rulesList.append(forthRule)

    const fifthRule = document.createElement("li")
    fifthRule.innerText = "If a computer guesses your number - press the 'check button'"
    rulesList.append(fifthRule)
    
    const sixthRule = document.createElement("li")
    sixthRule.innerText = "Press the 'Play again' button after a game and ENJOY again :)"
    rulesList.append(sixthRule)
  }

  getValuesFromInputs() {
    this.startValue = parseInt(this.startNumberInput.value)
    this.endValue = parseInt(this.endNumberInput.value)
    this.attemptsAmount = parseInt(this.attempsInp.value)
  }

  createRangeInputsEvents() {
    this.startNumberInput.oninput = () => {
      this.startValue = parseInt(this.startNumberInput.value)
      this.gameLogic()
    }
    this.endNumberInput.oninput = () => {
      this.endValue = parseInt(this.endNumberInput.value)
      this.gameLogic()
    }
  }

  createAttemptInputEvent() {
    this.attempsInp.oninput = () => {
      this.attemptsAmount = parseInt(this.attempsInp.value)
    }
  }

  createButtonsEvents() {
    this.upButton.onclick = () => {
      this.startValue = this.randomNum + 1
      this.attemptsAmount--
      this.gameLogic()
    }
    this.downButton.onclick = () => {
      this.endValue = this.randomNum - 1
      this.attemptsAmount--
      this.gameLogic()
    }
    this.winButton.onclick = () => {
      this.showArea.innerText = "A computer has won!"
      this.attemptsAmount = 0
    }
    this.playAgainBtn.onclick = () => {
      this.attemptsAmount = parseInt(this.attempsInp.value)
      this.startValue = parseInt(this.startNumberInput.value)
      this.endValue = parseInt(this.endNumberInput.value)

      this.gameLogic()
    }
  }

  getRandomNumInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  gameLogic() {
    this.randomNum = this.getRandomNumInRange(this.startValue, this.endValue)
    this.showArea.innerText = this.randomNum

    if (isNaN(this.randomNum)) this.showArea.innerText = "Selecting a number..."
    if (this.startValue > this.endValue)
      this.showArea.innerText = "The start of the range should be less than the end of the range"
    if (this.attemptsAmount < 0) {
      this.showArea.innerText = "A computer has lost :("
    }
  }

  render() {
    super.render()
    this.createRules()
    this.getValuesFromInputs()
    this.createRangeInputsEvents()
    this.createAttemptInputEvent()
    this.createButtonsEvents()
    this.gameLogic()
  }
}

let game = new GuessingGame("#container")
game.render()
