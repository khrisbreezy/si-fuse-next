export const startupLevel = (level) => {
    let team = 0, problem = 0, market = 0, business_model = 0, scale = 0, vision = 0, investor_exit = 0, products = 0;
    if (level && level.all) {
        JSON.parse(level.all).forEach(lev => {
            if (lev.length === 2 && lev.startsWith('P')) {
                problem++;
            } else if (lev.startsWith('V')) {
                vision++
            } else if (lev.startsWith('PR')) {
                products++
            } else if (lev.startsWith('M')) {
                market++
            } else if (lev.startsWith('BM')) {
                business_model++
            } else if (lev.startsWith('TC')) {
                team++
            } else if (lev.startsWith('S')) {
                scale++
            } else if (lev.startsWith('I')) {
                investor_exit++
            }
        })
    }
    return {team, problem, market, business_model, scale, vision, investor_exit, products};
}

export const getFairness = value => {
    switch (true) {
        case value >= 7:
            return 'perfect';
        case value >= 4:
            return 'good';
        default:
            return 'fair';
    }
}