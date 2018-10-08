import request from 'request'
import { parse }  from './PGNParser'

export default class LichessIterator {

    constructor(playerName, ready) {
        
        request.get(`https://lichess.org/api/games/user/${encodeURIComponent(playerName)}`, { json: false }, (err, res, body) => {
            let parsedPGNs = parse(body)
            ready(parsedPGNs.filter((pgn)=>{
                return pgn.headers.Variant === "Standard" &&
                (pgn.headers.Black === playerName || pgn.headers.White === playerName)
            }))
        })
    }
}