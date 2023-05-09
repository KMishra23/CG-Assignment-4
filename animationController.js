const ballXL1 = -0.35
const ballYL1 = 0.1
const ballXL2 = -0.3
const ballYL2 = 0.74

export class animationController {
    constructor() {
        this.ballState = "OnCatapult"
        this.catapultState = "WaitForCommand"
        this.piston1State = "Inactive"
        this.piston2State = "Inactive"

        this.ballXAfterLaunch = -0.35
        this.ballYAfterLaunch = 0.1
        this.ballXAfterLaunch2 = -0.3
        this.ballYAfterLaunch2 = 0.74
        this.gravity = -0.003

        this.catapultForwardAcc = 2
        this.catapultBackwardAcc = -0.5
        this.catapultCurrAcc = 0

    }

    collisionChecker() {

    }
}