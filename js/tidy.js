// 功能说明：足球模块整理后台传过来的数据

/**
 * 足球胜平负
 * @param {*} _infoItem 
 */
function winFlatLoss (_infoItem) {
    _infoItem.odds['winFlatLoss'] = [
        {
            key: '主胜',
            val: _infoItem.odds.s51['ss3']
        }, {
            key: '平',
            val: _infoItem.odds.s51['ss1']
        }, {
            key: '主负',
            val: _infoItem.odds.s51['ss0']
        }
    ]
}

/**
 * 足球比分
 * @param {*} _infoItem 
 */
function score (_infoItem) {
    let wins = [], losses = [], draws = []
    Object.entries(_infoItem.odds.s52).map(val => {
        let _arr = val[0].substring(2).split('')
        if (_arr[1] !== '_') {
            _arr[0] >= _arr[1] 
            ? (_arr[0] == _arr[1]
                ? draws.push({
                    key: _arr.join(':'),
                    val: val[1]
                    }) 
                : wins.push({
                    key: _arr.join(':'),
                    val: val[1]
                    }))
            : losses.push({
                key: _arr.join(':'),
                val: val[1]
                })
        } 
    })
    wins.push({
        key: '胜其他',
        val: _infoItem.odds.s52['ss3_']
    })
    losses.push({
        key: '负其他',
        val: _infoItem.odds.s52['ss0_']
    })
    draws.push({
        key: '平其他',
        val: _infoItem.odds.s52['ss1_']
    })
    _infoItem.odds['score'] = {
        wins: wins,
        draws: draws,
        losses: losses
    }
}

/**
 * 足球半全场
 * @param {*} _infoItem 
 */
function halfFull (_infoItem) {
    let wins = [{result: '胜胜'},{result: '胜平'},{result: '胜负'}], 
        losses = [{result: '负胜'},{result: '负平'},{result: '负负'}], 
        draws = [{result: '平胜'},{result: '平平'},{result: '平负'}]
    Object.entries(_infoItem.odds.s54).map(val => {
        let _arr = val[0].substring(2).split('')
        switch (_arr[0]) {
            case '0':
                switch (_arr[1]) {
                    case '0':
                        losses[2]['key'] = '负负'
                        losses[2]['val'] = val[1]
                        break;
                    case '1':
                        losses[1]['key'] = '负平'
                        losses[1]['val'] = val[1]
                        break;
                    case '3':
                        losses[0]['key'] = '负胜'
                        losses[0]['val'] = val[1]
                        break;
                }
                break;
            case '1':
                switch (_arr[1]) {
                    case '0':
                        draws[2]['key'] = '平负'
                        draws[2]['val'] = val[1]
                        break;
                    case '1':
                        draws[1]['key'] = '平平'
                        draws[1]['val'] = val[1]
                        break;
                    case '3':
                        draws[0]['key'] = '平胜'
                        draws[0]['val'] = val[1]
                        break;
                }
                break;
            case '3':
                switch (_arr[1]) {
                    case '0':
                        wins[2]['key'] = '胜负'
                        wins[2]['val'] = val[1]
                        break;
                    case '1':
                        wins[1]['key'] = '胜平'
                        wins[1]['val'] = val[1]
                        break;
                    case '3':
                        wins[0]['key'] = '胜胜'
                        wins[0]['val'] = val[1]
                        break;
                }
                break;
        }
    })
    _infoItem.odds['halfFull'] = {
        wins: wins,
        draws: draws,
        losses: losses
    }
}

/**
 * 足球进球数
 * @param {*} _infoItem 
 */
function goals (_infoItem) {
    let goals = []
    Object.entries(_infoItem.odds.s53).map( val => {
        goals.push({
            key: val[0].substring(3),
            val: val[1]
        })
    })
    _infoItem.odds['goals'] = goals
}

/**
 * 足球让球胜平负
 * @param {*} _infoItem 
 */
function letwinFlatLoss (_infoItem) {
    _infoItem.odds['letwinFlatLoss'] = [
        {
            key: '主胜',
            val: _infoItem.odds.s56['ss3'],
            ssletBall: _infoItem.odds.s56['ssletBall']
        }, {
            key: '平',
            val: _infoItem.odds.s56['ss1'],
            ssletBall: _infoItem.odds.s56['ssletBall']
        }, {
            key: '主负',
            val: _infoItem.odds.s56['ss0'],
            ssletBall: _infoItem.odds.s56['ssletBall']
        }
    ]
}