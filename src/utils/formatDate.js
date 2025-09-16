export class FormatDate{
    static fromIsoToString = (isoDatetime) => {
        const list = isoDatetime.split('T')
        if(list.length === 2) {
            const res = [list[0], list[1].slice(0,8)]
            return res.join( " ")
        }
        return isoDatetime
    }
}