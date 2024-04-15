"use strict"

// Game Creation and Logic
class GuessingNumberHTMLCreation {
  constructor(container) {
    this.container = container
  }

  createGameCoverDiv() {
    const gameCoverDiv = document.createElement("div")
    gameCoverDiv.className = "game__cover"
    this.gameCoverDiv = gameCoverDiv
    this.container.append(gameCoverDiv)
  }

  createRangeInputs() {
    const rangeContainer = document.createElement("div")
    rangeContainer.className = "game__range"
    this.gameCoverDiv.append(rangeContainer)

    const fromLabel = document.createElement("label")
    fromLabel.innerText = "From "
    fromLabel.setAttribute("for", "startNum")
    rangeContainer.append(fromLabel)

    const startNumberInput = document.createElement("input")
    startNumberInput.setAttribute("type", "number")
    startNumberInput.setAttribute("value", "1")
    startNumberInput.id = "startNum"
    rangeContainer.append(startNumberInput)
    this.startNumberInput = startNumberInput

    const toLabel = document.createElement("label")
    toLabel.innerText = "To "
    toLabel.setAttribute("for", "endNum")
    rangeContainer.append(toLabel)

    const endNumberInput = document.createElement("input")
    endNumberInput.setAttribute("type", "number")
    endNumberInput.setAttribute("value", "100")
    endNumberInput.id = "endNum"
    rangeContainer.append(endNumberInput)
    this.endNumberInput = endNumberInput
  }

  createAttemptsInput() {
    const attemptContainer = document.createElement("div")
    attemptContainer.className = "game__attemps"
    this.gameCoverDiv.append(attemptContainer)

    const label = document.createElement("label")
    label.innerText = "Attempts to guess "
    label.setAttribute("for", "attemptsNum")
    attemptContainer.append(label)

    const attemptInput = document.createElement("input")
    attemptInput.setAttribute("type", "number")
    attemptInput.setAttribute("value", "5")
    attemptInput.id = "attemptsNum"
    attemptContainer.append(attemptInput)

    this.attempsInp = attemptInput
  }

  createShowArea() {
    const showArea = document.createElement("div")
    showArea.className = "game__show"
    showArea.id = "showArea"
    this.gameCoverDiv.append(showArea)
    this.showArea = showArea
  }

  createPlayButtons() {
    const btnsContainer = document.createElement("div")
    btnsContainer.className = "game__buttons"
    this.gameCoverDiv.append(btnsContainer)

    const upButton = document.createElement("button")
    upButton.innerText = "↑"
    upButton.id = "upButton"
    upButton.className = "game__btn"
    btnsContainer.append(upButton)
    this.upButton = upButton

    const winButton = document.createElement("button")
    winButton.innerText = "✓"
    winButton.id = "winButton"
    winButton.className = "game__btn"
    btnsContainer.append(winButton)
    this.winButton = winButton

    const downButton = document.createElement("button")
    downButton.innerText = "↓"
    downButton.id = "downButton"
    downButton.className = "game__btn"
    btnsContainer.append(downButton)
    this.downButton = downButton
  }

  createPlayAgainButton() {
    const playAgainButton = document.createElement("button")
    playAgainButton.innerText = "Play again"
    playAgainButton.className = "game__play-again"
    this.gameCoverDiv.append(playAgainButton)
    this.playAgainBtn = playAgainButton
  }

  createWizardImage() {
    const img = document.createElement("img")
    img.src = "../img/wizard.png"
    img.alt = "wizard"
    img.className = "game__image"
    this.wizardImage = img
    this.container.append(img)
  }

  render() {
    this.createGameCoverDiv()
    this.createRangeInputs()
    this.createAttemptsInput()
    this.createShowArea()
    this.createPlayButtons()
    this.createPlayAgainButton()
    this.createWizardImage()
  }
}

class GuessingGame extends GuessingNumberHTMLCreation {
  constructor(containerSelector, rulesList, imagePaths) {
    super(containerSelector)
    this.rulesList = rulesList
    this.imagePaths = imagePaths
  }

  createRules() {
    const rulesContainer = document.createElement("div")
    rulesContainer.className = "rules"
    this.container.parentElement.append(rulesContainer)

    const title = document.createElement("h3")
    title.innerText = "Game rules:"
    rulesContainer.append(title)

    const rules = document.createElement("ol")
    rulesContainer.append(rules)

    for (let i = 0; i < this.rulesList.length; i++) {
      const li = document.createElement("li")
      li.innerText = `${i + 1}. ${this.rulesList[i]}`
      rules.append(li)
    }
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
      this.wizardImage.src = this.imagePaths[this.getRandomNumInRange(0, this.imagePaths.length - 1)]
      this.gameLogic()
    }
    this.downButton.onclick = () => {
      this.endValue = this.randomNum - 1
      this.attemptsAmount--
      this.wizardImage.src = this.imagePaths[this.getRandomNumInRange(0, this.imagePaths.length - 1)]
      this.gameLogic()
    }
    this.winButton.onclick = () => {
      this.showArea.innerText = "A computer has won!"
      this.wizardImage.src = "../img/wizard.png"
      this.attemptsAmount = 0
    }
    this.playAgainBtn.onclick = () => {
      this.attemptsAmount = parseInt(this.attempsInp.value)
      this.startValue = parseInt(this.startNumberInput.value)
      this.endValue = parseInt(this.endNumberInput.value)

      this.wizardImage.src = "../img/wizard.png"

      this.gameLogic()
    }
  }

  getRandomNumInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  gameLogic() {
    this.randomNum = this.getRandomNumInRange(this.startValue, this.endValue)
    this.showArea.innerText = this.randomNum

    if (isNaN(this.randomNum)) {
      this.showArea.innerText = "Selecting a number..."
      this.wizardImage.src = "../img/wizard.png"
    }
    if (this.startValue > this.endValue) {
      this.showArea.innerText = "The start of the range should be less than the end of the range"
      this.wizardImage.src = "../img/wizard.png"
    }
    if (this.attemptsAmount < 0) {
      this.showArea.innerText = "A computer has lost :("
      this.wizardImage.src = "../img/wizard_sad.png"
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

const rulesList = [
  "Select a range and a number of attempts you let a computer to have",
  "Now, guess a number in the selected range",
  "If a computer shows you a number greater than yours - press the 'down button'",
  "If a computer shows you a number less than yours - press the 'up button'",
  "Press the 'Play again' button after a game and ENJOY again :)",
]

const imagePaths = [
  "../img/wizard_thinking.png",
  "../img/wizard_glad.png",
  "../img/wizard_shock.png",
  "../img/wizard_sad.png",
]

const container = document.querySelector(".game")

if (container) {
  let game = new GuessingGame(container, rulesList, imagePaths)
  game.render()
}

// ----------------------------------------------------

// Dice logic
const diceCont = document.querySelector(".dice")

// Adding dices
const addBtn = document.getElementById("addDice")

if (diceCont && addBtn) {
  addBtn.addEventListener("click", () => addDice(diceCont))
}

function addDice(diceCont) {
  if (diceCont.children.length < 20) {
    const dice = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    dice.setAttributeNS(null, "fill", "#fff")
    dice.setAttributeNS(null, "viewBox", "0 0 16 16")

    const dicePath = document.createElementNS("http://www.w3.org/2000/svg", "path")
    dicePath.classList.add("path")
    dicePath.setAttributeNS(
      null,
      "d",
      "M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm5 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
    )
    dice.append(dicePath)

    diceCont.append(dice)
  }
}

// Removing dices
const removeBtn = document.getElementById("removeDice")

if (diceCont && removeBtn) {
  removeBtn.addEventListener("click", () => removeDice(diceCont))
}

function removeDice(diceCont) {
  const diceChildrendArr = diceCont.children
  if (diceChildrendArr.length <= 1) {
    return
  }

  diceCont.removeChild(diceCont.lastElementChild)
}

const paths = [
  "M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm5 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  "M0 3a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3zm5.5 1a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm6.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  "M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm2.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  "M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm1 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM4 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  "M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm2.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  "M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm1 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM12 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM4 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
]

// Dice throw logic
function diceGameLogic(paths, speed = 3000) {
  const pathsArr = document.getElementsByClassName("path")
  if (pathsArr.length) {
    for (let i = 0; i < pathsArr.length; i++) {
      const intervalID = setInterval(() => {
        const randomPathIndex = Math.floor(Math.random() * paths.length)
        const randomPath = paths[randomPathIndex]
        pathsArr[i].setAttribute("d", randomPath)
      }, 100)
      setTimeout(() => clearInterval(intervalID), speed)
    }
  }
}

// Throw dice event
const diceBtn = document.querySelector(".dice__button")

if (diceBtn) {
  diceBtn.addEventListener("click", () => {
    diceGameLogic(paths)
  })
}

// Throw dice fast event
const fastThrowBtn = document.getElementById("fastThrow")

if (fastThrowBtn) {
  fastThrowBtn.addEventListener("click", () => diceGameLogic(paths, 1000))
}

// Boring logic

const site = "http://www.boredapi.com/api/activity?"

async function getInfo(site) {
  try {
    const API_URL = getSelectedOptions(site)
    const response = await fetch(API_URL)
    if (response.ok) {
      const data = await response.json()
      if (data.error) {
        findingErrorHandler(data.error)
        return
      } else {
        bundingData(data)
      }
    }
  } catch (err) {
    const display = document.querySelector("#b-result")
    display.innerText = "Sorry, something went wrong"

    console.error(err)
  }
}

function bundingData(data) {
  const typeSpan = document.getElementById("b-type")
  const partSpan = document.getElementById("b-part")
  const accSpan = document.getElementById("b-acc")
  const actSpan = document.getElementById("b-result")

  actSpan.innerText = data.activity
  typeSpan.innerText = data.type
  partSpan.innerText = data.participants
  accSpan.innerText = accessibilityHandler(data.accessibility)
}

function accessibilityHandler(accessibility) {
  let result

  if (accessibility <= 0.3) {
    result = "high"
  } else if (accessibility <= 0.6) {
    result = "medium"
  } else {
    result = "low"
  }

  return result
}

function findingErrorHandler(error) {
  const display = document.querySelector("#b-result")
  display.innerText = error
  display.classList.add("b-result-error")
  setTimeout(() => {
    display.classList.remove("b-result-error")
  }, 2000)

  const typeSpan = document.querySelector("#b-type")
  typeSpan.innerText = "-"

  const partSpan = document.querySelector("#b-part")
  partSpan.innerText = "-"

  const accSpan = document.querySelector("#b-acc")
  accSpan.innerText = "-"
}

function getSelectedOptions(site) {
  let newSite = site

  const typeInpNodeList = document.querySelectorAll("[data-s-type]")
  for (const input of typeInpNodeList) {
    if (input.checked) {
      newSite += `type=${input.name}&`
    }
  }

  const partInpNodeList = document.querySelectorAll("[data-s-part]")
  for (const input of partInpNodeList) {
    if (input.checked && parseInt(input.getAttribute("data-s-part")) > 0) {
      newSite += `participants=${parseInt(input.getAttribute("data-s-part"))}&`
    }
  }

  const accInpNodeList = document.querySelectorAll("[data-s-acc]")
  for (const input of accInpNodeList) {
    if (input.checked) {
      const inputValue = input.getAttribute("data-s-acc")
      if (inputValue === "high") {
        newSite += "minaccessibility=0&maxaccessibility=0.3&"
      } else if (inputValue === "medium") {
        newSite += "minaccessibility=0.4&maxaccessibility=0.6&"
      } else {
        newSite += "minaccessibility=0.7&maxaccessibility=1&"
      }
    }
  }
  return newSite
}

const boringBtn = document.querySelector(".boring__button")
if (boringBtn) {
  boringBtn.addEventListener("click", async () => await getInfo(site))
}
